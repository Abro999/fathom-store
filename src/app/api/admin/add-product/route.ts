import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

function parseVariants(text: string, optionName: string, comparePrice?: number) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.map((line) => {
    const parts = line.split("|").map((p) => p.trim());
    const value = parts[0] || "Default";
    const price = Number(parts[1]) || 0;
    const stock = Number(parts[2]) || 0;
    return {
      title: value,
      price,
      compareAtPrice: comparePrice,
      inventory: stock,
      options: optionName ? { [optionName]: value } : {},
    };
  });
}

async function uploadImage(
  owner: string,
  repo: string,
  token: string,
  path: string,
  base64Data: string,
  message: string
) {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, content: base64Data }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to upload an image.");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      password,
      title,
      slug,
      descriptor,
      description,
      imageFiles,
      category,
      comparePrice,
      optionName,
      variants: variantsText,
      features,
      specifications,
      shipping,
      badges,
    } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }
    if (!title || !slug || !imageFiles?.length || !variantsText) {
      return NextResponse.json({ error: "Please fill in title, slug, at least one photo and a variant." }, { status: 400 });
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    const productsPath = "src/data/products.ts";

    if (!owner || !repo || !token) {
      return NextResponse.json({ error: "Admin isn't fully configured yet — GitHub settings missing." }, { status: 500 });
    }

    const id = `p-${Date.now()}`;
    const comparePriceNum = comparePrice ? Number(comparePrice) : undefined;

    const parsedVariants = parseVariants(variantsText, optionName, comparePriceNum);
    const basePrice = parsedVariants[0]?.price ?? 0;
    const totalInventory = parsedVariants.reduce((sum, v) => sum + v.inventory, 0);

    // Upload each photo into /public/uploads, then reference it by its local path.
    const imagePaths: string[] = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const base64 = file.dataUrl.split(",")[1];
      const fileName = `${id}-${i + 1}.jpg`;
      const filePath = `public/uploads/${fileName}`;
      await uploadImage(owner, repo, token, filePath, base64, `Add product photo for ${title}`);
      imagePaths.push(`/uploads/${fileName}`);
    }

    const featureLines = (features || "").split("\n").map((l: string) => l.trim()).filter(Boolean);
    const specLines = (specifications || "")
      .split("\n")
      .map((l: string) => l.trim())
      .filter(Boolean)
      .map((line: string) => {
        const idx = line.indexOf(":");
        return idx === -1
          ? { label: line, value: "" }
          : { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
      });

    const imagesCode = imagePaths
      .map(
        (url, i) =>
          `      { id: ${JSON.stringify(id + "-img" + (i + 1))}, url: ${JSON.stringify(url)}, alt: ${JSON.stringify(title)} },`
      )
      .join("\n");

    const variantsCode = parsedVariants
      .map(
        (v, i) =>
          `      { id: ${JSON.stringify(id + "-v" + (i + 1))}, title: ${JSON.stringify(v.title)}, price: ${v.price}${
            v.compareAtPrice ? `, compareAtPrice: ${v.compareAtPrice}` : ""
          }, sku: ${JSON.stringify(id.toUpperCase() + "-" + (i + 1))}, inventory: ${v.inventory}, options: ${JSON.stringify(v.options)} },`
      )
      .join("\n");

    const optionsCode = optionName
      ? `[{ name: ${JSON.stringify(optionName)}, values: ${JSON.stringify(parsedVariants.map((v) => v.title))} }]`
      : "[]";

    const featuresCode = JSON.stringify(featureLines);
    const specsCode = JSON.stringify(specLines);
    const badgesCode = badges && badges.length ? JSON.stringify(badges) : "undefined";

    const entry = `
  {
    id: ${JSON.stringify(id)},
    slug: ${JSON.stringify(slug)},
    title: ${JSON.stringify(title)},
    descriptor: ${JSON.stringify(descriptor || "")},
    description: ${JSON.stringify(description || "")},
    images: [
${imagesCode}
    ],
    price: ${basePrice},
    ${comparePriceNum ? `compareAtPrice: ${comparePriceNum},` : ""}
    currency: "INR",
    variants: [
${variantsCode}
    ],
    options: ${optionsCode},
    inventory: ${totalInventory},
    rating: 4.5,
    reviewCount: 0,
    category: ${JSON.stringify(category)},
    tags: ["new"],
    badges: ${badgesCode},
    shipping: ${JSON.stringify(shipping || "Ships in 3-5 business days.")},
    specifications: ${specsCode},
    features: ${featuresCode},
    faqs: [],
  },`;

    const getRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${productsPath}`, {
      headers: { Authorization: `token ${token}`, Accept: "application/vnd.github+json" },
    });
    if (!getRes.ok) {
      return NextResponse.json({ error: "Couldn't read the product file from GitHub." }, { status: 500 });
    }
    const fileData = await getRes.json();
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");

    const MARKER = "export const products: Product[] = [";
    const idx = content.indexOf(MARKER);
    if (idx === -1) {
      return NextResponse.json({ error: "Couldn't find the products list in the file." }, { status: 500 });
    }

    const insertPos = idx + MARKER.length;
    const newContent = content.slice(0, insertPos) + entry + content.slice(insertPos);
    const newContentBase64 = Buffer.from(newContent, "utf-8").toString("base64");

    const putRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${productsPath}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add product: ${title}`,
        content: newContentBase64,
        sha: fileData.sha,
      }),
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      return NextResponse.json({ error: err.message || "Couldn't save the product to GitHub." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Product added! It'll be live on the site in about 2 minutes.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong. Please try again." }, { status: 500 });
  }
}
