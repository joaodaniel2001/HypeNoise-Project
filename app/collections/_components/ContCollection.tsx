import Image from "next/image";

interface Banner {
  image_url: string;
  title: string;
  subtitle: string;
  where: string;
}

interface Box {
  title: string;
}

export const Banner = ({ image_url, title, subtitle, where }: Banner) => {
  return (
    <section className="group relative mt-20">
      <div className="relative aspect-square md:aspect-video w-full max-h-120 bg-zinc-900 overflow-hidden">
        <Image
          src={image_url}
          alt={title}
          fill
          className={`object-cover object-${where}`}
        />
      </div>
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-12 md:px-20 text-primary-foreground font-mono whitespace-nowrap transition-all font-bold">
        <h2 className="italic text-4xl md:text-6xl uppercase leading-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm md:text-base">{subtitle}</p>
      </div>
    </section>
  );
};

export const ContCollection = ({ title }: Box) => {
  return (
    <section>
      <div>
        <h3>{title}</h3>
      </div>
    </section>
  );
};
