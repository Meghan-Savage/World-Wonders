import React from "react";
import { Link } from "react-router-dom";
import { RiLinkedinFill, RiPhoneFill, RiMailFill } from "react-icons/ri";

export default function BottomPage() {
  const linkedinProfileUrls = [
    "https://www.linkedin.com/in/dominic-anyanga-2a5b3527b/",
    "https://www.linkedin.com/in/profile2",
    "https://www.linkedin.com/in/profile3"
  ];

  return (
    <footer>
      <div className="w-full bg-gray-900 text-gray-500 px-10">
        <div className="max-w-7xl flex-col sm:flex-row py-4 mx-auto justify-between items-center">
          <div className="text-center">
            <div className="text-orange-200">© World-Wonders Inc. 2023</div>
            <div className="flex items-center justify-center mt-2">
            <Link to="/contact" className="ml-4">
              <RiPhoneFill size={20} className="mr-1 text-orange-200 hover:text-orange-500" />
              </Link>
              <span>+1403-111-2222</span>
              <Link to="/contact" className="ml-4">
                <RiMailFill size={20} className="text-orange-200 hover:text-gray-400" />
              </Link>
              <span>w-wonders@gmail.com</span>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Link to={linkedinProfileUrls[0]} target="_blank" rel="noopener noreferrer">
                <div className="rounded-full bg-orange-500 p-1 hover:bg-blue-700">
                  <RiLinkedinFill size={20} className="text-white" />
                </div>
              </Link>
              <Link to={linkedinProfileUrls[1]} target="_blank" rel="noopener noreferrer">
                <div className="rounded-full bg-orange-500 p-1 mx-4 hover:bg-blue-700">
                  <RiLinkedinFill size={20} className="text-white" />
                </div>
              </Link>
              <Link to={linkedinProfileUrls[2]} target="_blank" rel="noopener noreferrer">
                <div className="rounded-full bg-orange-500 p-1 hover:bg-blue-700">
                  <RiLinkedinFill size={20} className="text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
