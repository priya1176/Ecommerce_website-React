import React, { useState, useEffect } from 'react';
import itemDetails from './itemDetails.json'; // Import the JSON file

const ProfilForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Prity',
    lastName: 'Priyadershini',
    gender: 'Female',
    email: 'pritypriya@gmail.com',
    mobile: '+918799813478',
  });

  const [address, setAddress] = useState({
    address: 'Samastipur, Bihar - 848504',
  });

  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Profile');
  const [orderDetails, setOrderDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [addressList, setAddressList] = useState([
    { address: 'Samastipur, Bihar - 848504' }, // Sample initial address
  ]);
  const [newAddress, setNewAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  
  // Add a new address
  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddressList([...addressList, { address: newAddress }]);
      setNewAddress(''); // Reset input field
    }
  };
  
  // Edit an existing address
  const handleEditAddress = (index) => {
    setNewAddress(addressList[index].address);
    setIsEditing(true);
    setEditingIndex(index);
  };
  
  // Save edited address
  const handleSaveEdit = () => {
    const updatedAddresses = [...addressList];
    updatedAddresses[editingIndex].address = newAddress;
    setAddressList(updatedAddresses);
    setNewAddress(''); // Reset input field
    setIsEditing(false);
    setEditingIndex(null);
  };
  
  // Delete an address
  const handleDeleteAddress = (index) => {
    const updatedAddresses = addressList.filter((_, i) => i !== index);
    setAddressList(updatedAddresses);
  };
  
  // Load data from the JSON file when the component mounts
  useEffect(() => {
    setOrderDetails(itemDetails.orderDetails);
    setPaymentDetails(itemDetails.paymentDetails);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'Profile':
        return (
          <div className="p-10">
            <h2 className="text-xl font-semibold mb-4 mt-0 ">Profile Information</h2>
            <div className="space-y-4 mr-16">
              <div className="">
                <label className="block mb-1 font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isAddressEditable}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  disabled={!isAddressEditable}
                />
              </div>
              <div>
              <div>
                <label className="block mb-1 font-medium">Gender</label>
                <select
                type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isAddressEditable}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isAddressEditable}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  disabled={!isAddressEditable}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>

              <button
                onClick={() => setIsAddressEditable((prev) => !prev)}
                style={{
                  background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
                }}
                className="text-white px-4 py-2 rounded-md mt-4 hover:bg-opacity-80"
              >
                {isAddressEditable ? 'Save' : 'Edit Profile'}
              </button>
            </div>
          </div>
        );
  
        case 'Address Management':
          return (
            <div className="p-10">
              <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>
        
              {/* List existing addresses */}
              <div className="space-y-4 mr-48">
                {addressList.length > 0 ? (
                  addressList.map((addr, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-md flex justify-between items-center">
                      <p>{addr.address}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditAddress(index)}
                          className="text-white  px-4 py-2 rounded-md"                  style={{
                            background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
                          }}
        
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(index)}
                          className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
                        >
                          <i className="fas fa-trash text-black"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No addresses added yet.</p>
                )}
              </div>
        
              {/* Add new address */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
                <div className="flex items-center">
                <input
  type="text"
  value={newAddress}
  onChange={(e) => setNewAddress(e.target.value)}
  className="w-full border border-gray-200 px-2 py-2 rounded-md mb-4 mr-24"
  placeholder="Enter new address"
/>

</div>

                <button
                  onClick={handleAddAddress}
                  style={{
                    background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
                  }}
                  className="text-white px-4 py-2 rounded-md mt-4 hover:bg-opacity-80"
                >
                  Add Address
                </button>
              </div>
            </div>
          );
        

        case 'Orders & Returns':
            return (
              <div className="flex flex-col min-h-screen p-4">
                <h2 className="text-xl font-semibold mb-4 text-center mt-2">Orders & Returns</h2> 
                {orderDetails.items ? (
                  <div className="flex flex-col">
                    {/* Display ordered items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {orderDetails.items.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
                          <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 mb-2" />
                          <p className="font-medium">{item.productName}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹{item.price}</p>
          
                          {/* Add Delivered with green dot */}
                          <div className="flex items-center mt-2">
                            <span className={`w-3 h-3 rounded-full mr-2 ${item.isDelivered ? 'bg-green-500' : 'bg-green-400'}`}></span>
                            <p className={`font-semibold ${item.isDelivered ? 'text-gray-600' : 'text-gray-600'}`}>
                              {item.isDelivered ? 'Delivered' : ' Delivered'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
          
                    {/* Display summary details */}
                    <div className="border-t mt-4 pt-4">
                      <p className="font-semibold">Total Amount: ₹{orderDetails.totalAmount}</p>
                      <p>Payment Method: {orderDetails.paymentMethod}</p>
                      <p>Shipping Status: {orderDetails.shippingStatus}</p>
                      <p>Estimated Delivery: {orderDetails.estimatedDelivery}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center mt-5">You have not ordered anything yet.</p>
                )}
              </div>
            );
                case 'Saved Cards':
        return (
            <div className="mr-12">
            <h2 className="text-xl font-semibold mb-4 text-center mt-5 ">Saved Cards</h2>
            {paymentDetails.savedCards ? (
              paymentDetails.savedCards.map((card, index) => (
                <div key={index} className="p-4 border rounded-lg mb-4 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white hover:bg-gray-100">
                  <p className="text-lg font-medium">Card Holder Name: <span className="font-normal">{card.cardHolderName}</span></p>
                  <p className="text-md">Card Number: <span className="font-normal">{card.cardNumber}</span></p>
                  <p className="text-md">Expiry Date: <span className="font-normal">{card.expiryDate}</span></p>
                  <p className="text-md">Card Type: <span className="font-normal">{card.cardType}</span></p>
                  <button 
        onClick={() => handleEdit(card)}
        style={{
            background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
          }}
          className="text-white px-4 py-2 rounded-md mt-4 hover:bg-opacity-80"
>
        Edit
      </button>

                </div>
              ))
            ) : (
              <p className="text-center mt-5">No Card Information saved yet.</p>
            )}
          </div>
          
        );

      case 'Saved UPI':
        return (
          <div className="mr-16">
          <h2 className="text-xl font-semibold mb-4 text-center mt-5">Saved UPI</h2>
                {paymentDetails.savedUPI ? (
                paymentDetails.savedUPI.map((upi, index) => (
                    <div key={index} className="p-4 border rounded-lg mb-4 shadow-lg hover:shadow-xl transition-shadow duration-200 ml-16 bg-white hover:bg-gray-100">
                    <p className="text-lg font-medium">UPI ID: <span className="font-normal">{upi.upiId}</span></p>
                    <p className="text-md text-gray-600">UPI Provider: <span className="font-normal">{upi.upiProvider}</span></p>
                    <button 
        onClick={() => handleEdit(card)}
        style={{
            background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
          }}
          className="text-white px-4 py-2 rounded-md mt-4 hover:bg-opacity-80"
>
        Edit
      </button>

                    </div>
                ))
                ) : (
                <p className="text-center mt-5">No UPI Information saved yet.</p>
                )}

          </div>
        );

      case 'Privacy':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center mt-5">Privacy Policy</h2>
            <p className="text-center mt-5">
              We value the trust you place in us and recognize Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eum ducimus iure unde aliquid reprehenderit veniam. Magni, iure ipsum! Nihil labore minus in ipsum. Eligendi tenetur deserunt veritatis cumque recusandae.
            </p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quibusdam, earum nulla esse asperiores vero ad totam ducimus error sunt libero perspiciatis dicta aperiam nesciunt dignissimos expedita incidunt doloribus? Quis.</p>
          </div>
        );

      case 'Terms':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center mt-5">Terms of Use</h2>
            <p className="text-center mt-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quibusdam, earum nulla esse asperiores vero ad totam ducimus error sunt libero perspiciatis dicta aperiam nesciunt dignissimos expedita incidunt doloribus? Quis.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="flex justify-center  text-white px-4 py-2" 
      style={{
              background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
              color: 'white',
              marginRight: '0px', 
              '&:hover': {
                background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
              },
            }}>
        <h1 className="text-xl font-semibold ">My Account</h1>
      </nav>

      <div className="flex min-h-screen">
      <aside className="w-1/4 ml-8 p-16">
          <ul>
            <li onClick={() => setActiveMenu('Profile')} className="cursor-pointer mb-6 ">
              Profile
            </li>
            <li onClick={() => setActiveMenu('Address Management')} className="cursor-pointer mb-6">
            Address</li>

            <li onClick={() => setActiveMenu('Orders & Returns')} className="cursor-pointer mb-6">
              Orders & Returns
            </li>
            <li onClick={() => setActiveMenu('Saved Cards')} className="cursor-pointer mb-6">
              Saved Cards
            </li>
            <li onClick={() => setActiveMenu('Saved UPI')} className="cursor-pointer mb-6">
              Saved UPI
            </li>
            <li onClick={() => setActiveMenu('Privacy')} className="cursor-pointer mb-6">
              Privacy Policy
            </li>
            <li onClick={() => setActiveMenu('Terms')} className="cursor-pointer mb-4">
              Terms of Use
            </li>
          </ul>
        </aside>

        <main className="w-3/4 p-4">{renderContent()}</main>
      </div>
    </div>
  );
};

export default ProfilForm;
