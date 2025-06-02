import "./Carousel.css";


function Carousel({ data }) {
  const slides = [...data, ...data];

  return (
    <div className="carousel-wrapper">
      <div className="carousel-slide">
        {slides.map((item, idx) => (
          <img
            key={idx}
            src={item.src}
            alt={`slide-${idx}`}
            className="carousel-image"
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
