import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";
import type { Recipe } from "@/types/recipe";
import { CATEGORY_ICONS } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

export function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(recipe.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group rounded-2xl border border-neutral-700/40 bg-neutral-800/50 backdrop-blur-sm transition-colors hover:border-neutral-600/60 hover:bg-neutral-800/70"
    >
      <div
        className="cursor-pointer p-5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-700/50 px-2 py-1 text-[11px] font-medium text-neutral-400">
                <Icon
                  name={CATEGORY_ICONS[recipe.category] || "ChefHat"}
                  fallback="ChefHat"
                  size={12}
                />
                {recipe.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-100 transition-colors group-hover:text-amber-400">
              {recipe.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              {recipe.description}
            </p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 shrink-0 text-neutral-600"
          >
            <Icon name="ChevronDown" size={20} />
          </motion.div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Icon name="Clock" size={13} />
            {recipe.cookTime} мин
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Users" size={13} />
            {recipe.servings} {recipe.servings === 1 ? "порция" : recipe.servings < 5 ? "порции" : "порций"}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="ListChecks" size={13} />
            {recipe.ingredients.length} ингредиентов
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-700/30 px-5 pb-5 pt-4">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-300">
                    <Icon name="ShoppingBasket" size={15} className="text-amber-500" />
                    Ингредиенты
                  </h4>
                  <ul className="space-y-1.5">
                    {recipe.ingredients.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-neutral-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-300">
                    <Icon name="CookingPot" size={15} className="text-amber-500" />
                    Приготовление
                  </h4>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-neutral-400">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-[11px] font-bold text-amber-500">
                          {i + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    confirmDelete
                      ? "bg-red-500/20 text-red-400"
                      : "bg-neutral-700/40 text-neutral-500 hover:bg-red-500/10 hover:text-red-400"
                  }`}
                >
                  <Icon name="Trash2" size={14} />
                  {confirmDelete ? "Нажмите ещё раз" : "Удалить"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
