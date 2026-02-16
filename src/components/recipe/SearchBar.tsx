import Icon from "@/components/ui/icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Icon
        name="Search"
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
      />
      <input
        type="text"
        placeholder="Поиск рецептов..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-700/50 bg-neutral-800/60 py-3 pl-11 pr-4 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:border-amber-500/50 focus:bg-neutral-800 focus:ring-1 focus:ring-amber-500/20"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-700 hover:text-neutral-300"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
}
