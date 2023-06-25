import React from "react";
import Marquee from "react-marquee-slider";

const Banner = () => {
  const pictures = [
    "pictures/uicxyv.webp",
    "pictures/History-and-Culture-of-Myanmar’s-Diverse-Peoples.jpg",
    "pictures/kenya_culture_people_credit_pulselive.co_.ke_NEW.webp",
    "pictures/coastal-first-nations-dance-festival.webp",
    "pictures/cultural-condierations.webp",
    "pictures/kyrgyzstan-culture.jpg",
    "pictures/istockphoto-479836094-612x612.jpg",
    "pictures/turkmenistan-culture.jpg",
    "pictures/ww1.webp",
    "pictures/ww6.jpeg",
    "pictures/Samburu-culture.jpg",
    "pictures/ww2.jpg",
    "pictures/IMG_6379.webp",
    "pictures/ww3.jpg",
    "pictures/5d910838-de30-44c2-bef3-77f67f302944_16x9_600x338.webp",
    "pictures/masai-maasai-kenya-africa-traditional-culture.jpg",
    "pictures/ww4.jpg",
    "pictures/ww5.jpg",
    "pictures/ww7.jpg",
    "pictures/ww8.jpg",
    "pictures/ww9.jpg",
  ];

  return (
    <div className="h-20 w-screen overflow-hidden">
      <Marquee velocity={20} direction="rtl" className="w-full h-full">
        {pictures.map((picture, index) => (
          <div key={index} className="h-full flex items-center">
            <img
              src={picture}
              alt={`banner picture ${index}`}
              className="h-20 object-cover"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Banner;
