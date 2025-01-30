import React, { useEffect, useRef } from 'react';
import ImageCarousel from './ImageCarousel';

interface GalleryProps {
  images: {
    url: string;
    alt: string;
  }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('active');
              }, index * 150);
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Version mobile : Carrousel */}
      <div className="md:hidden">
        <ImageCarousel images={images} />
      </div>

      {/* Version desktop : Grille */}
      <div ref={galleryRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div
            key={image.url}
            className="gallery-item aspect-[4/5] group relative overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;