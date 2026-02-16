import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ICONS } from "@/types/recipe";
import type { Category } from "@/types/recipe";
import Icon from "@/components/ui/icon";

interface CategoryFilterProps {
  active: Category;
  onChange: (c: Category) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        const count = counts[cat] || 0;
        return (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(cat)}
            className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-amber-500 text-neutral-900"
                : "bg-neutral-800/60 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
            }`}
          >
            <Icon name={CATEGORY_ICONS[cat] || "ChefHat"} fallback="ChefHat" size={16} />
            <span>{cat}</span>
            <span
              className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                isActive
                  ? "bg-neutral-900/20 text-neutral-900"
                  : "bg-neutral-700/60 text-neutral-500"
              }`}
            >
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
