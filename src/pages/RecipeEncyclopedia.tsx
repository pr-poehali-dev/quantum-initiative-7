import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";
import { SearchBar } from "@/components/recipe/SearchBar";
import { CategoryFilter } from "@/components/recipe/CategoryFilter";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { AddRecipeModal } from "@/components/recipe/AddRecipeModal";
import { useRecipes } from "@/hooks/useRecipes";

export function RecipeEncyclopedia() {
  const {
    recipes,
    allCount,
    categoryCount,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    addRecipe,
    deleteRecipe,
  } = useRecipes();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#212121]">
      <header className="sticky top-0 z-30 border-b border-neutral-800/60 bg-[#212121]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15">
              <Icon name="BookOpen" size={20} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-neutral-100">
                Энциклопедия рецептов
              </h1>
              <p className="text-xs text-neutral-500">
                {allCount} {allCount === 1 ? "рецепт" : allCount < 5 ? "рецепта" : "рецептов"}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
          >
            <Icon name="Plus" size={16} />
            <span className="hidden sm:inline">Добавить рецепт</span>
          </motion.button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="space-y-5">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
            counts={categoryCount}
          />

          <AnimatePresence mode="popLayout">
            {recipes.length > 0 ? (
              <motion.div layout className="space-y-3">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onDelete={deleteRecipe}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-20 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/60">
                  <Icon name="SearchX" size={28} className="text-neutral-600" />
                </div>
                <p className="text-lg font-semibold text-neutral-400">Рецепты не найдены</p>
                <p className="mt-1 text-sm text-neutral-600">
                  {search
                    ? "Попробуйте изменить поиск или категорию"
                    : "Добавьте первый рецепт, нажав кнопку выше"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AddRecipeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addRecipe}
      />
    </div>
  );
}

export default RecipeEncyclopedia;
