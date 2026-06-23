const TEXTS = [
  "NEW COLLECTION",
  "★",
  "LIMITED EDITION",
  "★",
  "STREETWEAR CULTURE",
  "★",
  "HYPENOISE EXCLUSIVE",
  "★",
  "FREE SHIPPING WORLDWIDE",
  "★",
];

export default function Marquee() {
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-primary py-8 select-none">
      <div className="animate-[marquee_40s_linear_infinite] whitespace-nowrap flex">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex items-center">
            {TEXTS.map((text, i) => (
              <span
                key={i}
                className="mx-10 font-bebas text-4xl text-primary-foreground tracking-widest"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
