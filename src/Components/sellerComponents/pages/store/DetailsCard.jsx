import React, { useState } from "react";
import countryList from "country-list";

const DetailsCard = ({
  title,
  setTitle,
  description,
  setDescription,
  country,
  setCountry,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const countries = countryList.getNames();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold">Listing details</h1>
          <p className="mt-2 text-gray-500">
            Tell the world all about your item and why they'll love it.
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-md font-bold">
                Product name
              </label>
              <p className="text-gray-500">
                Include keywords that buyers would use to search your item.
              </p>
              <textarea
                type="text"
                id="title"
                rows="1"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="mt-1 block w-full rounded-md border border-gray-100 resize-none shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="about" className="text-md font-bold">
                Description
              </label>
              <p className="text-gray-500">
                Write a short description about the item, include fun facts,
                where it was made, how it was made etc.
              </p>
              <textarea
                id="about"
                name="about"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="mt-2 block w-full rounded-md border border-gray-100 resize-none shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="country" className="text-md font-bold">
                Product country
              </label>
              <p className="text-gray-500">
                Tell your buyers where this item is from.
              </p>
              <select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="mt-2 block w-full rounded-md border border-gray-100 resize-none shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
