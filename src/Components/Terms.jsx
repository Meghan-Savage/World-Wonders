import React from "react";

const Terms = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 ">
      <h1 className="text-2xl text-orange-400 font-bold underline mb-4 text-center">
        Terms Of Use
      </h1>
      <p className="mb-4">
        By using and accessing World Wonders.Inc, you acknowledge and agree to
        be bound by the following terms and conditions. Please read these terms
        carefully before selling any items on the Store.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-200 shadow-lg p-6 transition-shadow hover:shadow-orange-200 rounded-lg ">
          <h2 className="text-lg font-bold text-orange-500 underline mb-2 p-6 hover:shadow-outline-orange">
            1. Eligibility and Store Guidelines
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              a. You must be at least 18 years old or have the legal capacity to
              enter into a binding agreement.
            </li>
            <li>
              b. Sellers must comply with the Store's guidelines, which include
              but are not limited to respecting and promoting cultural
              diversity, fostering inclusivity, and promoting fair trade
              practices.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 shadow-lg transition-shadow hover:shadow-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-orange-500 underline mb-2">
            2. Authenticity and Prohibited Items
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              a. Sellers must ensure that all items listed for sale on the Store
              are authentic and accurately described.
            </li>
            <li>
              b. The sale of counterfeit, replica, or unauthorized items is
              strictly prohibited.
            </li>
            <li>
              c. The Store reserves the right to remove any listings or suspend
              the account of sellers found to be selling counterfeit or
              unauthorized items.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 shadow-lg transition-shadow hover:shadow-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-orange-500 underline mb-2">
            3. Acknowledgement of Traditional Custodians - Alberta, Canada
          </h2>
          <p className="mb-4">
            We acknowledge the Traditional Custodians of the land on which our
            online store operates in the province of Alberta, Canada. We pay our
            respects to the Indigenous peoples of this region, including the
            First Nations, Métis, and Inuit, and their ancestors, past, present,
            and emerging. We recognize their enduring connection to this land,
            waters, and community.
          </p>
          <p className="mb-4">
            We acknowledge the diverse cultures, languages, and traditions that
            have been and continue to be practised by the Indigenous peoples of
            Alberta. We honor their wisdom, knowledge, and contributions to the
            heritage of this land.
          </p>
          <p className="mb-4">
            We acknowledge that the province of Alberta and the traditional
            territories within it were created through treaties, agreements, and
            occupation. We commit to learning from and supporting Indigenous
            peoples in their pursuit of self-determination, sovereignty, and the
            protection of their land, resources, and culture.
          </p>
        </div>

        <div className="bg-gray-200 shadow-lg transition-shadow hover:shadow-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-orange-500 underline mb-2">
            4. Intellectual Property
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              a. Sellers must ensure that they have the necessary rights,
              licenses, or permissions to use any intellectual property
              (including trademarks, copyrights, or designs) related to their
              products.
            </li>
            <li>
              b. The Store respects the intellectual property rights of others
              and expects sellers to do the same.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 shadow-lg transition-shadow hover:shadow-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-orange-500 underline mb-2">
            5. Seller Responsibilities
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              a. Sellers are responsible for the accuracy and completeness of
              their product listings, including descriptions, prices, and
              images.
            </li>
            <li>
              b. Sellers must promptly fulfill orders, maintain clear
              communication with buyers, and provide excellent customer service.
            </li>
            <li>
              c. Sellers should promptly address any issues, concerns, or
              disputes raised by buyers or the Store.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 shadow-lg rounded-lg p-6 transition-shadow hover:shadow-orange-200">
          <h2 className="text-lg font-bold text-orange-500 underline mb-2">
            6. Store's Rights and Liabilities
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              a. The Store reserves the right to modify, suspend, or terminate
              any seller's account or access to the platform for violating these
              terms or engaging in fraudulent, illegal, or inappropriate
              activities.
            </li>
            <li>
              b. The Store shall not be liable for any damages, losses, or
              liabilities arising from the use of the Store, including but not
              limited to lost profits, indirect or consequential damages.
            </li>
          </ul>
        </div>

        <div className="bg-gray-200 shadow-lg rounded-lg p-6 transition-shadow hover:shadow-orange-200">
          <h2 className="text-lg font-bold text-orange-500 underline mb-2">
            7. Termination Agreement
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              a. Both the seller and the Store have the right to terminate this
              agreement at any time by providing written notice to the other
              party.
            </li>
            <li>
              b. Upon termination, the seller's access to the Store and their
              account will be disabled, and their listings will be removed.
            </li>
            <li>
              c. The seller remains responsible for fulfilling any pending
              orders or resolving any ongoing issues with buyers.
            </li>
          </ul>
        </div>
      </div>
      <div className="gad-6">
        <p className="mb-4 font-bold text-md gad-6 text-black">
          <span className="text-red-700 text-lg">NOTE:</span> by using this
          Site, you acknowledge that you have read, understood, and agreed to
          abide by these terms and conditions.
          <br />
          <span className="text-black hover:text-red-700">
            IF YOU DO NOT AGREE WITH THE TERMS AND CONDITIONS OF THE AGREEMENT,
            YOU MAY NOT USE THIS SITE.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Terms;
