import Image from 'next/image'

interface MenuCardProps {
  nombre: string
  descripcion: string
  imagen: string
  imagen_alt: string
}

export function MenuCard({ nombre, descripcion, imagen, imagen_alt }: MenuCardProps) {
  return (
    <article className="bg-[#141414] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[var(--brand-accent)] transition-colors duration-200 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imagen}
          alt={imagen_alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-3 font-sans font-bold text-base text-[#F5F5F5]">
          {nombre}
        </p>
      </div>
      <div className="p-4">
        <p className="font-body text-sm text-[#9A9A9A] leading-relaxed line-clamp-2">
          {descripcion}
        </p>
      </div>
    </article>
  )
}
