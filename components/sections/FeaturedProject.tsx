import Image from "next/image";

export default function FeaturedProject() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 sm:px-8 lg:px-0 py-10">
      <div className="grid grid-cols-12 grid-rows-6 gap-3 items-center">
        {/* IMAGEM (fica atrás no mobile e sobreposta no desktop) */}
        <div
          className="
            group relative col-span-12 row-start-1 row-end-7
            md:col-start-6 md:col-end-13
            overflow-hidden rounded-sm
            bg-gradient-to-br from-[#64ffda] to-[#64ff8d]
            min-h-[260px] md:min-h-[360px]
            transform-gpu
            transition-transform duration-700 ease-out
            md:hover:scale-[1.02]
          "
        >
          {/* base gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda] to-[#64ff8d]" />

          {/* imagem */}
          <Image
            src="/projects/featured.png"
            alt="Imagem do projeto em destaque"
            fill
            priority
            className="
              object-cover transform-gpu
              transition duration-700 ease-out
              mix-blend-multiply grayscale contrast-125
              group-hover:scale-[1.06] group-active:scale-[1.06]
              group-hover:grayscale-0 group-active:grayscale-0
              group-hover:contrast-100 group-active:contrast-100
              group-hover:mix-blend-normal group-active:mix-blend-normal
            "
            sizes="(min-width: 1024px) 640px, (min-width: 768px) 520px, 100vw"
          />

          {/* overlay “screen” por cima (sai no hover/toque) */}
          <div
            className="
              absolute inset-0
              bg-[#0a192f] mix-blend-screen
              opacity-70
              transition-opacity duration-700 ease-out
              group-hover:opacity-0 group-active:opacity-0
            "
          />
        </div>

        {/* CONTEÚDO */}
        <div
          className="
            relative z-20 col-span-12 row-start-1 row-end-7
            md:col-start-1 md:col-end-7
            p-6 sm:p-8 md:p-0
          "
        >
          <div className="text-accent font-mono text-sm">Game of Thrones</div>

          <h4 className="mt-2 mb-6 text-3xl md:text-4xl font-semibold text-text">
            A Clash of Kings
          </h4>

          <div className="text-[15px] leading-relaxed text-muted">
            <p
              className="
                rounded-sm
                bg-[#252525] px-6 py-5
                md:bg-[#252525]
              "
            >
              Lorem ipsum dolor amet you probably haven&apos;t heard of them
              bitters selvage listicle heirloom. Locavore kombucha street art
              ennui 90&apos;s, organic food truck hell of seitan skateboard
              literally hexagon fixie next level. Lomo salvia yuccie hella roof
              party echo park vegan four dollar toast cred.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-muted">
              <li>Shadow</li>
              <li>Demon</li>
              <li>Baby</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}