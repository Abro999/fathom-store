"use client";

import { Category, ProductFilters } from "@/lib/types";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onClear: () => void;
}

export function FilterDrawer({ isOpen, onClose, categories, filters, onChange, onClear }: FilterDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      side="bottom"
      title="Filter"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" size="md" className="flex-1" onClick={onClear}>
            Clear all
          </Button>
          <Button variant="primary" size="md" className="flex-1" onClick={onClose}>
            Show results
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-sans text-sm text-charcoal/50 mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  onChange({ ...filters, category: filters.category === c.slug ? undefined : c.slug })
                }
                className={`px-4 py-2 text-sm font-sans border rounded-full transition-colors ${
                  filters.category === c.slug ? "bg-ink text-cream border-ink" : "border-line text-charcoal"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-sans text-sm text-charcoal/50 mb-3">Price</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Under $75", min: 0, max: 75 },
              { label: "$75 – $150", min: 75, max: 150 },
              { label: "$150+", min: 150, max: undefined },
            ].map((range) => {
              const active = filters.minPrice === range.min && filters.maxPrice === range.max;
              return (
                <button
                  key={range.label}
                  onClick={() =>
                    onChange({
                      ...filters,
                      minPrice: active ? undefined : range.min,
                      maxPrice: active ? undefined : range.max,
                    })
                  }
                  className={`px-4 py-2 text-sm font-sans border rounded-full transition-colors ${
                    active ? "bg-ink text-cream border-ink" : "border-line text-charcoal"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-sans text-sm text-charcoal/50 mb-3">Rating</h3>
          <div className="flex flex-wrap gap-2">
            {[4.5, 4, 3.5].map((r) => (
              <button
                key={r}
                onClick={() => onChange({ ...filters, minRating: filters.minRating === r ? undefined : r })}
                className={`px-4 py-2 text-sm font-sans border rounded-full transition-colors ${
                  filters.minRating === r ? "bg-ink text-cream border-ink" : "border-line text-charcoal"
                }`}
              >
                {r}+ stars
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 font-sans text-sm text-charcoal">
            <input
              type="checkbox"
              checked={!!filters.inStockOnly}
              onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
              className="w-4 h-4 accent-ink"
            />
            In stock only
          </label>
          <label className="flex items-center gap-3 font-sans text-sm text-charcoal">
            <input
              type="checkbox"
              checked={!!filters.onSaleOnly}
              onChange={(e) => onChange({ ...filters, onSaleOnly: e.target.checked })}
              className="w-4 h-4 accent-ink"
            />
            On sale
          </label>
        </div>
      </div>
    </Drawer>
  );
}
