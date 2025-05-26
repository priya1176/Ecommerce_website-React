import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 


function Categories() {
    const navigate = useNavigate(); 

    const handleBack = () => {
      navigate(-1);
    };
  
  return (
    <div className="min-w-full about-page px-4 py-8">
        <button onClick={handleBack} className="flex items-center text-lg text-grey-200 mb-4">
        <FaArrowLeft className="mr-2" /> {/* Back arrow icon */}
      </button>

      <h2 className="text-lg font-semibold mb-2 text-center mt-2">Categories</h2>
        
    </div>
  )
}

export default Categories