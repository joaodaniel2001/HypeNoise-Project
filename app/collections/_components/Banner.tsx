import Image from "next/image";

export default function Banner() {
  return (
    <div className="group relative mt-20">
      <div className="relative aspect-square md:aspect-video w-full max-h-120 bg-zinc-900 overflow-hidden">
        <Image
          src="/content-banner.jpg"
          alt="Collections banner"
          fill
          className="object-cover object-bottom"
        />
      </div>
      <h3 className="absolute bottom-50 text-primary-foreground px-6 py-2 font-mono z-20 whitespace-nowrap flex flex-col items-center rounded-sm transition-all font-bold">
        Classic & Iconic
      </h3>
    </div>
  );
}
