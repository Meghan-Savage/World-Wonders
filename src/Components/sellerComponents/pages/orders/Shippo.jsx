import React, { useState } from "react";
import Modal from "react-modal"; // Import a modal component library

// This is a functional component that renders a modal with the design requirements
function Shippo(props) {
  // This is the state that stores the modal visibility and the shipping options
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [signature, setSignature] = useState(false);
  const [returnLabel, setReturnLabel] = useState(false);
  const [carrier, setCarrier] = useState("UPS");

  // This is a function that handles the modal opening
  function openModal() {
    setModalIsOpen(true);
  }

  // This is a function that handles the modal closing
  function closeModal() {
    setModalIsOpen(false);
  }

  // This is a function that handles the shipping options change
  function handleOptionChange(event) {
    const { name, value } = event.target;
    if (name === "signature") {
      setSignature((prevValue) => !prevValue);
    } else if (name === "returnLabel") {
      setReturnLabel((prevValue) => !prevValue);
    } else if (name === "carrier") {
      setCarrier(value);
    }
  }

  // This is a function that handles the label purchase event and calls the Shippo.labelPurchase method with the order data
  function handleLabelPurchase() {
    // Create a shipment object that contains the details of the order and the addresses
    const shipment = {
      address_from: props.order.sellerAddress,
      address_to: props.order.customerAddress,
      parcels: [props.order.parcel],
      // You can add any optional parameters here, such as:
      // customs_declaration: props.order.customsDeclaration,
      // insurance_amount: props.order.insuranceAmount,
      // insurance_currency: props.order.insuranceCurrency,
      // metadata: props.order.orderId,
      extra: {
        signature_confirmation: signature,
        return_label: returnLabel,
      },
    };

    // Trigger the label purchase flow using the Shippo.labelPurchase method
    Shippo.labelPurchase(shipment);
    // Close the modal
    closeModal();
  }

  // This is the JSX that renders the modal using Tailwind CSS classes
  return (
    <div>
      {/* This is a button element that triggers the modal opening */}
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ship Order
      </button>

      {/* This is the modal element that renders the shipping interface */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="max-w-lg mx-auto p-4 bg-white rounded"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        ariaHideApp={false}
      >
        {/* This is the header element with gray-900 background and title and order number */}
        <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t">
          <h1 className="text-xl font-bold text-white">Shipping Label</h1>
          <p className="text-sm font-medium text-white">
            Order #{props.order.orderId}
          </p>
        </div>

        {/* This is the body element with five rows of information */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Item row */}
          <div className="col-span-2">
            <label htmlFor="item" className="block text-sm font-medium">
              Item
            </label>
            <input
              type="text"
              id="item"
              name="item"
              value={props.order.itemTitle}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          {/* Address row */}
          <div className="col-span-2">
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={`${props.order.customerName} (${props.order.customerAddress})`}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          {/* Package details row */}
          <div className="col-span-2">
            <label htmlFor="package" className="block text-sm font-medium">
              Package Details
            </label>
            <input
              type="text"
              id="package"
              name="package"
              value={`${props.order.parcel.length} x ${props.order.parcel.width} x ${props.order.parcel.height} in, ${props.order.parcel.weight} oz`}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          {/* Shipment date row */}
          <div className="col-span-1">
            <label htmlFor="date" className="block text-sm font-medium">
              Shipment Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={props.order.shipmentDate}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          {/* Payment method row */}
          <div className="col-span-1">
            <label htmlFor="payment" className="block text-sm font-medium">
              Payment Method
            </label>
            <input
              type="text"
              id="payment"
              name="payment"
              value={props.order.paymentMethod}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        {/* This is the footer element with shipping options and buy label button */}
        <div className="mt-4">
          {/* Shipping options row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="signature"
                name="signature"
                checked={signature}
                onChange={handleOptionChange}
                className="border border-gray-300 rounded mr-2"
              />
              <label htmlFor="signature" className="text-sm font-medium">
                Add Signature Confirmation
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="returnLabel"
                name="returnLabel"
                checked={returnLabel}
                onChange={handleOptionChange}
                className="border border-gray-300 rounded mr-2"
              />
              <label htmlFor="returnLabel" className="text-sm font-medium">
                Create Return Label
              </label>
            </div>
          </div>
          {/* Carrier rates row */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm font-medium">Carrier Rates</p>
            <div className="flex items-center">
              <input
                type="radio"
                id="ups"
                name="carrier"
                value="UPS"
                checked={carrier === "UPS"}
                onChange={handleOptionChange}
                className="border border-gray-300 rounded mr-2"
              />
              <label htmlFor="ups" className="text-sm font-medium mr-4">
                UPS
              </label>
              <input
                type="radio"
                id="canadaPost"
                name="carrier"
                value="Canada Post"
                checked={carrier === "Canada Post"}
                onChange={handleOptionChange}
                className="border border-gray-300 rounded mr-2"
              />
              <label htmlFor="canadaPost" className="text-sm font-medium">
                Canada Post
              </label>
            </div>
          </div>
          {/* Buy label button */}
          <button
            onClick={handleLabelPurchase}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 w-full"
          >
            Buy Label
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Shippo;
