interface FilterGroupProps {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function FilterBlock({
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
      <div className="grid md:grid-cols-5 gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`min-w-10 min-h-10 border rounded items-center justify-center flex text-center hover:text-primary cursor-pointer mt-5 transition-all ${
              selectedValue === option
                ? "text-primary font-bold decoration-2 underline-offset-4 border-primary/50"
                : "text-zinc-400 hover:text-white hover:border-primary/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
