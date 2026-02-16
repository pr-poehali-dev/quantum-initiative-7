import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";
import { CATEGORIES } from "@/types/recipe";
import type { Recipe } from "@/types/recipe";

interface AddRecipeModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: Omit<Recipe, "id" | "createdAt">) => void;
}

const EDITABLE_CATEGORIES = CATEGORIES.filter((c) => c !== "Все");

const emptyForm = {
  title: "",
  description: "",
  category: EDITABLE_CATEGORIES[0],
  ingredientsText: "",
  stepsText: "",
  cookTime: "",
  servings: "",
};

export function AddRecipeModal({ open, onClose, onAdd }: AddRecipeModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Введите название";
    if (!form.description.trim()) e.description = "Введите описание";
    if (!form.ingredientsText.trim()) e.ingredientsText = "Добавьте ингредиенты";
    if (!form.stepsText.trim()) e.stepsText = "Опишите шаги";
    if (!form.cookTime || +form.cookTime <= 0) e.cookTime = "Укажите время";
    if (!form.servings || +form.servings <= 0) e.servings = "Укажите порции";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      ingredients: form.ingredientsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      steps: form.stepsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      cookTime: +form.cookTime,
      servings: +form.servings,
    });
    setForm(emptyForm);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setForm(emptyForm);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[5vh] backdrop-blur-sm sm:items-center sm:pt-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-neutral-700/50 bg-neutral-900 p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-100">Новый рецепт</h2>
              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <Field
                label="Название"
                error={errors.title}
                value={form.title}
                onChange={(v) => set("title", v)}
                placeholder="Например: Борщ по-домашнему"
              />

              <Field
                label="Описание"
                error={errors.description}
                value={form.description}
                onChange={(v) => set("description", v)}
                placeholder="Коротко о блюде"
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                  Категория
                </label>
                <div className="flex flex-wrap gap-2">
                  {EDITABLE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => set("category", cat)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        form.category === cat
                          ? "bg-amber-500 text-neutral-900"
                          : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Время (мин)"
                  error={errors.cookTime}
                  value={form.cookTime}
                  onChange={(v) => set("cookTime", v)}
                  placeholder="30"
                  type="number"
                />
                <Field
                  label="Порции"
                  error={errors.servings}
                  value={form.servings}
                  onChange={(v) => set("servings", v)}
                  placeholder="4"
                  type="number"
                />
              </div>

              <TextAreaField
                label="Ингредиенты"
                hint="Каждый с новой строки"
                error={errors.ingredientsText}
                value={form.ingredientsText}
                onChange={(v) => set("ingredientsText", v)}
                placeholder={"200 г муки\n3 яйца\n100 мл молока"}
                rows={4}
              />

              <TextAreaField
                label="Шаги приготовления"
                hint="Каждый шаг с новой строки"
                error={errors.stepsText}
                value={form.stepsText}
                onChange={(v) => set("stepsText", v)}
                placeholder={"Смешать сухие ингредиенты\nДобавить молоко\nВымесить тесто"}
                rows={4}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 rounded-xl bg-neutral-800 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-neutral-200"
              >
                Отмена
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-amber-400"
              >
                <Icon name="Plus" size={16} />
                Добавить
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-neutral-800/60 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-all focus:bg-neutral-800 focus:ring-1 ${
          error
            ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
            : "border-neutral-700/50 focus:border-amber-500/50 focus:ring-amber-500/20"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  hint,
  error,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  hint: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
        {label}
        <span className="ml-2 text-xs font-normal text-neutral-600">{hint}</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full resize-none rounded-xl border bg-neutral-800/60 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-all focus:bg-neutral-800 focus:ring-1 ${
          error
            ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
            : "border-neutral-700/50 focus:border-amber-500/50 focus:ring-amber-500/20"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
