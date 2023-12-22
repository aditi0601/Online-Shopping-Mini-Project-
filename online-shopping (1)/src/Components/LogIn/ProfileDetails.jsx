import React from 'react'
import { useState, useEffect } from 'react'
import showToast from '../Toast/Toast';
import axios from 'axios';

function ProfileDetails() {

    const [curfirstName, setCurFirstName] = useState('');
    const [curlastName, setCurLastName] = useState('');
    const [curmobileNumber, setCurMobileNumber] = useState('');
    const [curuserName, setCurUserName] = useState('')

    const userId = localStorage.getItem("currentUser")
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api/users/${userId}`);
                const userData = await response.json();

                setCurFirstName(userData.userFirstName)
                setCurLastName(userData.userLastName)
                setCurMobileNumber(userData.userMobileNumber)
                setCurUserName(userData.userEmail)



            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();

    }, []);


    const updateUser = async () => {
        if (curfirstName.length === 0) {
            showToast("First Name is Empty", "error")
        }
        else if (curlastName.length === 0) {
            showToast("Last Name is Empty", "error")

        }
        else if (curmobileNumber.length !== 10) {
            showToast("Mobile Number is Invalid", "error")
        }
        else {
            try {
                const newUserDta = {
                    userFirstName: curfirstName ,
                    userLastName: curlastName,
                    userMobileNumber : curmobileNumber 
                };
                const updateUser = await axios.put(`http://localhost:9090/api/users/${userId}`, newUserDta);
                showToast('User data updated successfully', 'success');
            } catch (error) {
                console.error('Error updating user data:', error);
                showToast('Error updating user data', 'error');
            }
        }
    };

    const handleSave = () => {
        updateUser();
    };




    return (
        <div>
            <div className='mb-4'>EDIT PROFILE</div>

            <div className='border border-gray-200 p-6'>

                <label className="block text-sm font-medium text-gray-700">Email ID</label>
                <input
                    type="text"
                    className="mt-1 px-4 py-2 w-full border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
                    value={curuserName}
                    readOnly
                />

            </div>

            <div className='border border-gray-200 p-6'>
                <div className='mb-4'>Genral Information</div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
                        value={curfirstName}
                        onChange={(e) => setCurFirstName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
                        value={curlastName}
                        onChange={(e) => setCurLastName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                        type="text"
                        className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
                        value={curmobileNumber}
                        onChange={(e) => setCurMobileNumber(e.target.value)}
                    />
                </div>

                <hr className='my-5'></hr>

                <button
                    className="w-36 bg-teal-600 text-white px-4 py-2 hover:bg-teal-500"
                    onClick={handleSave}
                >
                    Save
                </button>



            </div>

        </div>
    )
}

export default ProfileDetails