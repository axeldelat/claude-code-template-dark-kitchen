import Image from 'next/image'

interface MenuCardProps {
  nombre: string
  descripcion: string
  imagen: string
  imagen_alt: string
}

export function MenuCard({ nombre, descripcion, imagen, imagen_alt }: MenuCardProps) {
  return (
    <article className="bg-surface border border-border rounded-lg overflow-hidden hover:border-[var(--brand-accent)] hover:shadow-lg transition-all duration-200 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imagen}
          alt={imagen_alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-3 font-sans font-bold text-base text-white">
          {nombre}
        </p>
      </div>
      <div className="p-4">
        <p className="font-body text-sm text-muted leading-relaxed line-clamp-2">
          {descripcion}
        </p>
      </div>
    </article>
  )
}
