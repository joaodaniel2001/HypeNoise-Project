interface TitleProps {
  StartTitle: string;
  EndTitle: string;
  Needed?: boolean;
  Size?: string;
}

export default function Title({
  StartTitle,
  EndTitle,
  Needed = true,
  Size = "",
}: TitleProps) {
  return (
    <div className="flex flex-col mb-12">
      <h2
        className={`font-bebas mb-1 leading-none uppercase text-white ${Size && `text-${Size}xl`}`}
      >
        {StartTitle} <span className="text-primary glow">{EndTitle}</span>
      </h2>
      {Needed && <div className="w-32 h-1.5 bg-primary glow" />}
    </div>
  );
}
