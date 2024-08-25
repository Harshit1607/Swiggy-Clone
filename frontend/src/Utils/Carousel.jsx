import React ,{ useRef } from 'react'

const Carousel = ({children, length}) => {
  const carouselRef = useRef(null);
  const slidesToShow = length;

  const nextSlide = () => {
    if (carouselRef.current) {
        const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
      if (carouselRef.current) {
          const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
  };

  return (
    <div className='carousel-container'>
      <button onClick={prevSlide} className='carousel-button-left'>&lt;</button>
      <button onClick={nextSlide} className='carousel-button-right'>&gt;</button>
      <div className='carousel' ref={carouselRef}>
        {children}
      </div>
    </div>
  )
}

export default Carousel