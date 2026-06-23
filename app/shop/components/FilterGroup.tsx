interface FilterGroupProps {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function FilterGroup({
  title,
  options,
  selectedValue,
  onSelect,
}: FilterGroupProps) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-3 tracking-wide uppercase">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`text-left text-sm transition-colors duration-200 cursor-pointer ${
              selectedValue === option
                ? "text-primary font-bold underline decoration-2 underline-offset-4"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
