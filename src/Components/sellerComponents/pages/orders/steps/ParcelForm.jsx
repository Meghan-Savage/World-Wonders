import React, { useState } from "react";

const ParcelForm = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [distance_unit, setDistanceUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [mass_unit, setMassUnit] = useState("g");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call the API endpoint with the form data
    console.log({ length, width, height, distance_unit, weight, mass_unit });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Create a Parcel
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-3 sm:col-span-1">
              <label
                htmlFor="length"
                className="block text-sm font-medium text-gray-700"
              >
                Length
              </label>
              <input
                id="length"
                type="number"
                min="0"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <label
                htmlFor="width"
                className="block text-sm font-medium text-gray-700"
              >
                Width
              </label>
              <input
                id="width"
                type="number"
                min="0"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-
2 px-
3 focus:outline-none focus:ring-blue-
500 focus:border-blue-
500"
              />
            </div>
            <div
              className="
col-
span-
3 sm:col-
span-
1"
            >
              <label
                htmlFor="
height"
                className="
block text-
sm font-
medium text-
gray-
700"
              >
                Height
              </label>
              <input
                id="
height"
                type="
number"
                min="
0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={`
mt-
1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
          </div>
          <div
            className="
mb-
4 grid grid-cols-2 gap-4"
          >
            <div
              className="
col-
span-
2 sm:col-
span-
1"
            >
              <label
                htmlFor="
distance_unit"
                className="
block text-sm font-medium text-gray-700"
              >
                Distance Unit
              </label>
              <select
                id="
distance_unit"
                value={distance_unit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className={`
mt-
1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option
                  value="
cm"
                >
                  Centimeters
                </option>
                <option
                  value="
in"
                >
                  Inches
                </option>
              </select>
            </div>
            <div
              className="
col-
span-
2 sm:col-
span-
1"
            >
              <label
                htmlFor="
weight"
                className="
block text-sm font-medium text-gray-700"
              >
                Weight
              </label>
              <input
                id="
weight"
                type="
number"
                min="
0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={`
mt-
1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            <div
              className="
col-
span-
2 sm:col-
span-
1"
            >
              <label
                htmlFor="
mass_unit"
                className="
block text-sm font-medium text-gray-700"
              >
                Mass Unit
              </label>
              <select
                id="
mass_unit"
                value={mass_unit}
                onChange={(e) => setMassUnit(e.target.value)}
                className={`
mt-
1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option
                  value="
g"
                >
                  Grams
                </option>
                <option
                  value="
oz"
                >
                  Ounces
                </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
          >
            Create Parcel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParcelForm;
