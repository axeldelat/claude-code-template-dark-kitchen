import Image from 'next/image'

interface GalleryGridProps {
  fotos: { src: string; alt: string }[]
}

export function GalleryGrid({ fotos }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {fotos.map((foto, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-lg group"
        >
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />
        </div>
      ))}
    </div>
  )
}
