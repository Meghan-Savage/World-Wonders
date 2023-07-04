import { useStepperContext } from "../../../context/StepperContext/StepperContext";

function Payment() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <form>
      <div className="rounded p-8">
        <h1 className="text-gray-600 text-xl">Select Payment Method</h1>

        <div className="mt-4">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="Enter card number"
            value={userData["cardNumber"] || ""}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="expirationMonth">Expiration Month</label>
            <input
              type="text"
              name="expirationMonth"
              id="expirationMonth"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="MM"
              value={userData["expirationMonth"] || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="expirationYear">Expiration Year</label>
            <input
              type="text"
              name="expirationYear"
              id="expirationYear"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="YYYY"
              value={userData["expirationYear"] || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            name="cvv"
            id="cvv"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="CVV"
            value={userData["cvv"] || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            id="cardholderName"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="Enter cardholder name"
            value={userData["cardholderName"] || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

export default Payment;
