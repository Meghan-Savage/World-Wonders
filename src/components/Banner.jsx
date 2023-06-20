import React, { useState, useEffect } from "react";

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

const Banner = () => {
  const [imageList, setImageList] = useState(pictures);

  useEffect(() => {
    const interval = setInterval(infiniteScroll, 2000);
    return () => clearInterval(interval);
  }, []);

  const infiniteScroll = () => {
    setImageList((prevList) => {
      const updatedList = [...prevList];
      updatedList.push(updatedList.shift());
      return updatedList;
    });
  };

  return (
    <div className="flex h-20 animate-scrollBanner">
      {imageList.map((picture) => (
        <img
          key={picture}
          src={picture}
          alt="banner picture"
          className="object-cover flex-h-20"
        />
      ))}
    </div>
  );
};

export default Banner;
