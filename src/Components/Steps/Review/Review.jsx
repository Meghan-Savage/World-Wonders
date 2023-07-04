import React, { useContext } from "react";

function Review() {
  const { next, previous } = useContext(MultiStepContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary form validation or data processing here
    // Call 'next' to proceed to the next step
    next();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded shadow-lg p-8">
        <h1 className="text-gray-600 text-xl">Review Your Order</h1>
        {/* Display the order details or summary here */}
        <div className="mt-8">
          <button
            type="button"
            onClick={previous}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
}

export default Review;
