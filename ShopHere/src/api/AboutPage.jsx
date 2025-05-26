import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa'; 
import ecomImage from '/images/ecom.webp'; 
import '../index.css';

function AboutPage() {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-w-full about-page px-4">
      {/* Back button with icon */}
      <button onClick={handleBack} className="flex items-center text-lg text-grey-200 mb-4">
        <FaArrowLeft className="mr-2" /> {/* Back arrow icon */}
      </button>
      
      <h1 className="text-2xl font-bold mb-2 text-center mt-0">About Us</h1>
      <div className="flex justify-center mb-4 p-8">
        <img 
          src={ecomImage} 
          alt="E-commerce" 
          className="min-w-full h-auto object-cover" 
        />
      </div>
      <p className="text-xl placeholder:text-center ml-14 mb-6">
        Welcome to our e-commerce platform! We provide a wide range of products
        to meet all your needs. Our mission is to offer the best shopping experience
        by delivering quality products and exceptional customer service.
      </p>
    </div>
  );
}

export default AboutPage;
