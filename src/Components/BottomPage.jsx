import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiTwitterFill, RiFacebookFill, RiLinkedinFill, RiMapPinLine, RiPhoneFill, RiMailFill} from "react-icons/ri";

export default function BottomPage() {

  return (
    <footer>
      <div className="p-0 bg-gray-800 text-orange-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mb-5">
              <h3 className="text-2xl pb-4 ml-8 mt-6">World-Wonders Inc</h3>
              <p className="text-gray-500 ml-8">
              <RiMapPinLine className="inline-block align-middle mr-2" style={{ color: "orange" }} />
                123 3rd Street SE, <br />
                Calgary, AB T2X 7Y9.<br />
                Canada <br />
                <strong>
                  <RiPhoneFill className="inline-block align-middle mr-2" style={{ color: "orange"}} />
                </strong>{" "}
                +1403-111-2222 <br />
                <strong>
                  <RiMailFill className="inline-block align-middle mr-2" style={{ color: "orange" }} />
                </strong>{" "}
                w-wonders@gmail.com
              </p>
            </div>
            <div className="mb-5">
              <h3 className="text-2xl pb-4 ml-8 mt-6">Our Company</h3>
              <ul className="text-gray-500">
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200 ml-8">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">Home</span>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200 ml-8">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">About Us</span>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200 ml-8">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">Our Policies</span>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200 ml-8">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">FAQs</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h3 className="text-2xl pb-4 mt-6">Useful Links</h3>
              <ul className="text-gray-500">
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">Pricing</span>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">Selling Policy</span>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">Complaints</span>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200">
                    <RiArrowRightSLine className="text-orange-200 inline-block align-middle" />
                    <span className="ml-2">Ratings</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h3 className="text-2xl pb-4 mt-6">Connect with us</h3>
              <ul className="text-white">
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200">
                    <RiTwitterFill style={{ fontSize: "24px" }}/>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200">
                    <RiFacebookFill style={{ fontSize: "24px" }}/>
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-orange-200">
                    <RiLinkedinFill style={{ fontSize: "24px" }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-900 text-gray-500 px-10">
        <div className="max-w-7xl flex-col sm:flex-row py-4 mx-auto justify-between items-center">
          <div className="text-center">
          <div className="text-orange-200">
              © World-wonders Inc. 2023 
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
