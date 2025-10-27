import React, { useState, useEffect } from "react";
import moment from "moment";

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    currentAddress: "",
    accessibilityNeeds: "",
    email: "",
    birthday: "",
    phoneNumber: ""
  });

  const decodeToken = async (token) => {
    try {
      const response = await fetch("https://museuma.onrender.com/decodeToken", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const decodedToken = await response.json();
        const { user_id, table_name } = decodedToken;
        
        // Log the values for verification
        console.log("User ID:", user_id);
        console.log("Table Name:", table_name);
  
        // Return user_id and table_name
        return { user_id, table_name };
      } else {
        console.error("Failed to decode token:", response.statusText);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  
    // If there's an error or response is not ok, return null or handle the error as needed
    return null;
  };

  const fetchUserData = async (user_id1, table_name1) => {
    try {
      console.log("fetching..." + user_id1 + " " + table_name1);
      let call;
      if (table_name1 === 'customers') {
        call = `https://museuma.onrender.com/customer/${user_id1}`;
      }
      else if (table_name1 === 'employees') {
        call = `https://museuma.onrender.com/employeeInfo/${user_id1}`;
      }
      else if (table_name1 === 'branch_directors') {
        call = `https://museuma.onrender.com/adminInfo/${user_id1}`;
        console.log(call);
      }
      else {
        console.error("Invalid table name:", table_name1);
        return;
      }
  
      const response = await fetch(call);
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
  
        // Map the fetched user data to userDetails object
        const updatedUserDetails = {
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          gender: userData.gender || "",
          contactNumber: userData.phone_number || "",
          currentAddress: userData.address || "",
          accessibilityNeeds: userData.accessibility_needs || "",
          email: userData.email || "",
          birthday: userData.date_of_birth || "",
          phoneNumber: userData.phone_number || "" // Assuming phone number is used for both contactNumber and phoneNumber
        };
  
        setUserDetails(updatedUserDetails);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
  
        if (token) {
          const { user_id, table_name } = await decodeToken(token); // Decode the token and get user_id
          if (user_id) {
            await fetchUserData(user_id, table_name); // Fetch user data using user_id
          } else {
            console.error("User ID not found in decoded token.");
          }
        } else {
          console.error("Token not found in cookie.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Submit the updated user details if required
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
  
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      if (token) {
        const { user_id, table_name } = await decodeToken(token); // Reuse the existing decodeToken function
        console.log(user_id, table_name);
  
        // Fetch user details and update information here
        const userDetailsToSend = {
          first_name: userDetails.firstName || null,
          last_name: userDetails.lastName || null,
          gender: userDetails.gender || null,
          phone_number: userDetails.phoneNumber || null,
          address: userDetails.currentAddress || null,
          accessibility_needs: userDetails.accessibilityNeeds || null,
          email: userDetails.email || null,
          date_of_birth: userDetails.birthday || null
        };
        let call;

        if (table_name === 'customers') {
          call = `https://museuma.onrender.com/editCustomerInfo/${user_id}`;
        }
        else if (table_name === 'employees') {
          call = `https://museuma.onrender.com/editEmployeeInfo/${user_id}`;
        }
        else if (table_name === 'branch_directors') {
          call = `https://museuma.onrender.com/editAdminInfo/${user_id}`;
          console.log(call);
        }
        else {
          console.error("Invalid table name:", table_name);
          return;
        }

        const updateUserResponse = await fetch(call, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetailsToSend),
        });
  
        if (updateUserResponse.ok) {
          alert("User details updated successfully!");
        } else {
          console.error("Failed to update user details:", updateUserResponse.statusText);
        }
      } else {
        console.error("Token not found in cookie.");
      }
    } catch (error) {
      console.error("Error handling update submit:", error);
    }
  };

  const { firstName, lastName, gender, contactNumber, currentAddress, accessibilityNeeds, email, birthday, phoneNumber } = userDetails;

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="flex flex-col w-full items-center mt-24">
        <h1 className="text-4xl mb-4 items-start text-left w-9/12">Your Profile:</h1>
        <div className="w-full md:w-9/12 mx-2 h-64 rounded-xl">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              {isEditing ? (
                <form onSubmit={handleUpdateSubmit} className="space-y-4 grid grid-cols-2 gap-4">
                  <div className="flex flex-col justify-center mt-3">
                    <label className="font-bold text-[#313639]">First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Email:</label>
                    <input type="email" value={email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Phone Number:</label>
                    <input type="tel" value={phoneNumber} onChange={(e) => setUserDetails({...userDetails, phoneNumber: e.target.value})} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Gender:</label>
                    <select value={gender} onChange={(e) => setUserDetails({...userDetails, gender: e.target.value})} className="p-2 border border-[#313639] rounded">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Current Address:</label>
                    <input type="text" value={currentAddress} onChange={(e) => setUserDetails({...userDetails, currentAddress: e.target.value})} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Accessibility Needs:</label>
                    <input type="text" value={accessibilityNeeds} onChange={(e) => setUserDetails({...userDetails, accessibilityNeeds: e.target.value})} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Birthday:</label>
                    <input
  type="date"
  id="birthday"
  className="p-2 border border-[#313639] rounded"
  value={birthday}
  onChange={(e) => setUserDetails({...userDetails, birthday: e.target.value})}
  max={new Date().toISOString().split('T')[0]}
/>
                                      </div>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{firstName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{lastName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Phone No.</div>
                    <div className="px-4 py-2">{phoneNumber}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Current Address</div>
                    <div className="px-4 py-2">{currentAddress}</div>
                    </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Accessibility Needs</div>
                    <div className="px-4 py-2">{accessibilityNeeds}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" href={`mailto:${email}`}>{email}</a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">{moment(birthday).format('MM/DD/YYYY')}</div>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={isEditing ? handleUpdateSubmit : () => setIsEditing(!isEditing)}
              className="bg-[#313639] hover:bg-[#C0BAA4] hover:text-[#313639] text-white p-2 rounded mt-4 w-full"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditProfile;