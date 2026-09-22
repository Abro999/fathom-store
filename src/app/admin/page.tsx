"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES = ["tech", "home", "fashion", "accessories", "outdoor"];

function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminAddProductPage() {
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    descriptor: "",
    description: "",
    category: "tech",
    comparePrice: "",
    optionName: "",
    variants: "Default | 999 | 20",
    features: "",
    specifications: "",
    shipping: "Ships in 3-5 business days.",
  });
  const [badges, setBadges] = useState<string[]>([]);
  const [images, setImages] = useState<{ name: string; dataUrl: string }[]>([]);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const toggleBadge = (b: string) => {
    setBadges((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setStatus({ type: "loading", message: "Processing photos…" });
    try {
      const compressed = await Promise.all(
        files.map(async (file, i) => ({
          name: `img${Date.now()}_${i}.jpg`,
          dataUrl: await compressImage(file),
        }))
      );
      setImages((prev) => [...prev, ...compressed]);
      setStatus({ type: "idle" });
    } catch {
      setStatus({ type: "error", message: "Couldn't process one of the photos. Try a different one." });
    }
  };

  const removeImage = (name: string) => {
    setImages((prev) => prev.filter((img) => img.name !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setStatus({ type: "error", message: "Add at least one photo." });
      return;
    }
    setStatus({ type: "loading", message: "Adding product…" });
    try {
      const res = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, badges, imageFiles: images, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong." });
        return;
      }
      setStatus({ type: "success", message: data.message });
      setForm({
        title: "",
        slug: "",
        descriptor: "",
        description: "",
        category: "tech",
        comparePrice: "",
        optionName: "",
        variants: "Default | 999 | 20",
        features: "",
        specifications: "",
        shipping: "Ships in 3-5 business days.",
      });
      setBadges([]);
      setImages([]);
    } catch {
      setStatus({ type: "error", message: "Network error, try again." });
    }
  };

  const inputClass =
    "w-full border border-line px-4 py-3 font-sans text-sm outline-none focus-visible:border-charcoal bg-cream";

  return (
    <div className="container-page py-14 max-w-xl">
      <h1 className="font-display text-3xl text-charcoal mb-2">Add a product</h1>
      <p className="text-sm text-charcoal/60 font-sans mb-8">
        Fills in the product catalog directly. Takes about 2 minutes to go live after submitting.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Admin password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Product title</label>
          <input name="title" value={form.title} onChange={handleChange} className={inputClass} required />
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">
            URL slug (no spaces, e.g. wireless-earbuds)
          </label>
          <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} required />
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Short one-line descriptor</label>
          <input name="descriptor" value={form.descriptor} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Full description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className={inputClass} rows={4} />
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Product photos (first one is the main photo)</label>
          <input type="file" accept="image/*" multiple capture="environment" onChange={handleFiles} className={inputClass} />
          {images.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {images.map((img) => (
                <div key={img.name} className="relative w-16 h-16">
                  <Image src={img.dataUrl} alt="" fill className="object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(img.name)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-rust text-cream rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">
            Original price (optional, to show a discount — leave blank if none)
          </label>
          <input name="comparePrice" type="number" value={form.comparePrice} onChange={handleChange} className={inputClass} />
        </div>

        <div className="border-t border-line pt-5">
          <p className="font-display text-lg text-charcoal mb-3">Variants</p>

          <label className="text-xs font-sans text-charcoal/50 mb-1 block">
            Option name — e.g. "Size" or "Color" (leave blank if the product has only one version)
          </label>
          <input name="optionName" value={form.optionName} onChange={handleChange} className={inputClass} placeholder="Size" />

          <label className="text-xs font-sans text-charcoal/50 mb-1 mt-4 block">
            Variants — one per line, format: Value | Price | Stock
          </label>
          <textarea
            name="variants"
            value={form.variants}
            onChange={handleChange}
            className={inputClass}
            rows={4}
            placeholder={"Small | 999 | 20\nMedium | 999 | 15\nLarge | 1099 | 10"}
            required
          />
          <p className="text-xs text-charcoal/40 font-sans mt-1">
            If there's only one version, just write one line: Default | 999 | 20
          </p>
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Features — one per line</label>
          <textarea name="features" value={form.features} onChange={handleChange} className={inputClass} rows={3} />
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">
            Specifications — one per line, format: Label: Value
          </label>
          <textarea
            name="specifications"
            value={form.specifications}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder={"Material: Cotton\nWeight: 200g"}
          />
        </div>

        <div>
          <label className="text-xs font-sans text-charcoal/50 mb-1 block">Shipping note</label>
          <input name="shipping" value={form.shipping} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <p className="text-xs font-sans text-charcoal/50 mb-2">Badges</p>
          <div className="flex gap-4">
            {["new", "bestseller", "limited"].map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm font-sans capitalize">
                <input type="checkbox" checked={badges.includes(b)} onChange={() => toggleBadge(b)} className="accent-ink" />
                {b}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={status.type === "loading"}
          className="bg-ink text-cream font-sans py-3.5 rounded-full disabled:opacity-50"
        >
          {status.type === "loading" ? status.message || "Working…" : "Add product"}
        </button>

        {status.type === "success" && <p className="text-teel text-sm font-sans">{status.message}</p>}
        {status.type === "error" && <p className="text-rust text-sm font-sans">{status.message}</p>}
      </form>
    </div>
  );
}
