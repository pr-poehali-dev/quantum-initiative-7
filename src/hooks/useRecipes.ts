import { useState, useEffect, useMemo, useCallback } from "react";
import type { Recipe, Category } from "@/types/recipe";
import { DEFAULT_RECIPES } from "@/types/recipe";

const STORAGE_KEY = "recipe-encyclopedia";

function loadRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* empty */
  }
  return DEFAULT_RECIPES;
}

function saveRecipes(recipes: Recipe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(loadRecipes);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Все");

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  const addRecipe = useCallback((data: Omit<Recipe, "id" | "createdAt">) => {
    const recipe: Recipe = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setRecipes((prev) => [recipe, ...prev]);
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const filtered = useMemo(() => {
    let result = recipes;
    if (activeCategory !== "Все") {
      result = result.filter((r) => r.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }
    return result;
  }, [recipes, search, activeCategory]);

  const categoryCount = useMemo(() => {
    const map: Record<string, number> = { "Все": recipes.length };
    for (const r of recipes) {
      map[r.category] = (map[r.category] || 0) + 1;
    }
    return map;
  }, [recipes]);

  return {
    recipes: filtered,
    allCount: recipes.length,
    categoryCount,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    addRecipe,
    deleteRecipe,
  };
}
