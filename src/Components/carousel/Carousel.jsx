import React, { useState } from "react";

function Carousel({ images, video }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allItems = [...images, video].filter((item) => item);
  const hasVideo = video !== null && video !== undefined;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMainItemClick = () => {
    handleNext();
  };

  const selectedItem = allItems[currentIndex];

  return (
    <div className="flex flex-col lg:flex-column items-center">
      <div className="relative group">
        {hasVideo && selectedItem.type === "video" ? (
          <video
            src={selectedItem}
            width={300}
            height={150}
            className="main-item cursor-pointer transform transition"
            onClick={handleMainItemClick}
            controls
          />
        ) : (
          <img
            src={selectedItem}
            alt="Selected"
            width={410}
            height={200}
            className="main-item cursor-pointer transform transition"
            onClick={handleMainItemClick}
          />
        )}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer z-10"
          onClick={handlePrevious}
        >
          {/* Previous SVG */}
        </div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer z-10"
          onClick={handleNext}
        >
          {/* Next SVG */}
        </div>
      </div>
      <div className="flex gap-10 mt-4">
        {allItems.map((item, index) => (
          <img
            key={index}
            width={100}
            height={75}
            src={item}
            alt={`Item ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`preview-item cursor-pointer transform transition duration-300 hover:scale-150 ${
              index === currentIndex ? "border-4 border-orange-300" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
