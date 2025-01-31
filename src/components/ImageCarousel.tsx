import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ImageCarouselProps {
  images: { url: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div style={{ height: "500px" }}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
        showThumbs={false}
        showArrows={true}
        onClickNext={nextSlide}
        onClickPrev={prevSlide}
        emulateTouch
        dynamicHeight={false}
      >
        {images.map((image, index) => (
          <div
            style={{
              height: "500px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <img
              src={image.url}
              alt={image.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
