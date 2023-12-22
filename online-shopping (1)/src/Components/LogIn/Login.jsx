import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import showToast from '../Toast/Toast';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'
import ProfileDetails from './ProfileDetails'
import MyOrder from './MyOrder'
import AddProduct from './AddProduct'
import AllOrders from './AllOrders';
import DeleteProduct from './DeleteProduct';



function Login() {



    const { currentUser, login, logout } = useAuth();

    const userId = localStorage.getItem("currentUser");

    const [tab, setTab] = useState('login');
    const handleTabChange = (selectedTab) => {
        setTab(selectedTab);
    };

    const getTitle = () => {
        return tab === 'login' ? 'Login with The Shopping-Bag' : 'Register with The Shopping-Bag';
    };

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [emailId, setemailId] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [gender, setGender] = useState('')


    const [selectedOption, setSelectedOption] = useState('myOrders');



    const handleLogIn = async (e) => {
        e.preventDefault()
        if (!username) {
            showToast("Username is Required", "error")
        }
        else if (!password) {
            showToast("Password is Required", "error")
        }
        else {
            try {
                // Check if user with the given email already exists
                const userExistsResponse = await axios.get(`http://localhost:9090/api/users/username/${username}`);
                if (userExistsResponse.status === 200) {
                    if (userExistsResponse.data.userPassword === password) {

                        const Loggeduser = userExistsResponse.data.userId;
                        login(Loggeduser)

                    }
                    else {
                        showToast("Invalid Credentials!!!", "error")
                    }
                }
            } catch (error) {
                showToast("User Not Exist", "error");
            }



        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!firstname) {
            showToast("First Name is Required", "error");
            return;
        }
        else if (!lastname) {
            showToast("Last Name is Required", "error");
            return;
        }
        else if (!newPassword) {
            showToast("Password is Required", "error");
            return;
        }
        else if (!confirmPassword) {
            showToast("Password is Required", "error");
            return;
        }
        else if (!emailId) {
            showToast("Email-ID is Required", "error");
            return;
        }
        else if (mobileNumber.length != 10) {
            showToast("Mobile Number is Invalid", "error");
            return;
        }
        else if (!gender) {
            showToast("Gener is Required", "error");
            return;
        }
        else if (confirmPassword !== newPassword) {
            showToast("Password and Confirm Password Must Match", "error")
            return;
        }
        else {
            try {
                // Check if user with the given email already exists
                const userExistsResponse = await axios.get(`http://localhost:9090/api/users/username/${emailId}`);

                if (userExistsResponse.status === 200) {
                    // User with the email already exists, show an error toast
                    showToast("User with this email already exists. Please use a different email.", "error");
                }
            } catch (error) {
                const userData = {
                    userEmail: emailId,
                    userFirstName: firstname,
                    userGender: gender,
                    userLastName: lastname,
                    userMobileNumber: mobileNumber,
                    userPassword: newPassword,
                }

                try {
                    const response = await axios.post('http://localhost:9090/api/users/', userData)
                    if (response.status === 201) {

                        showToast("User Registered Successfully", "success");

                        setFirstname("");
                        setLastname("");
                        setemailId("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setMobileNumber("");
                        setGender("");

                        document.querySelectorAll('input[type="radio"][name="gender"]').forEach((radio) => {
                            radio.checked = false;
                        });
                    } else {
                        showToast(response.data.message || "Registration Failed", "error");
                    }

                } catch (error) {
                    showToast("Registration Failed. Please try again later.", "error");
                }

            }

        }


    }

    



    const handleLogOut = (e) => {
        e.preventDefault();
        logout();

    }


    const renderContent = () => {
        switch (selectedOption) {
            case 'profileDetails':
                return <ProfileDetails />;
            case 'myOrders':
                return <AllOrders />
            case 'addProduct':
                return <AddProduct />;
            default:
                return null;
        }
    };

    let isAdmin = false;
    if(localStorage.getItem("currentUser")=='1')
    {
        isAdmin = true;
    }


    const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:9090/api/users/${userId}`);
          showToast('Account deleted successfully', 'success');
        } catch (error) {
          console.error('Error deleting account:', error);
          showToast('Error deleting account', 'error');
        }
      };

      const confirmDelete = () => {
        const userConfirmed = window.confirm('Are you sure you want to delete your account?');
    
        if (userConfirmed) {
          handleDelete();
          logout();
        }
      };









    if (!localStorage.getItem("currentUser")) {

        return (
            <>
                <div className="min-h-screen mx-auto p-20 bg-gray-200">
                    <div className="max-w-md mx-auto p-10 bg-white shadow-md">
                        <div className='flex items-center justify-center'>
                            <div className="mx-auto text-base text-gray-600 font-bold mb-4">{getTitle()}</div>
                        </div>
                        <div className="flex mb-4">
                            <button
                                className={`w-1/2 py-2 focus:outline-none border border-gray-300 ${tab === 'login' ? 'bg-teal-600 text-white' : 'bg-white'
                                    }`}
                                onClick={() => handleTabChange('login')}
                            >
                                Login
                            </button>
                            <button
                                className={`w-1/2 py-2 focus:outline-none border border-gray-300 ${tab === 'register' ? 'bg-teal-600 text-white' : 'bg-white'
                                    }`}
                                onClick={() => handleTabChange('register')}
                            >
                                Register
                            </button>
                        </div>

                        {tab === 'login' ? (
                            <form className='border border-gray-300 p-4 bg-gray-200'>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                                    onClick={handleLogIn}
                                >
                                    Login
                                </button>
                            </form>
                        ) : (
                            <div>
                                <form className='border border-gray-300 p-4 bg-gray-200'>
                                    {/* Add fields for registration (First name, Last name, Email, Password, Confirm Password, Mobile, Gender) */}
                                    {/* Example for the first name field */}
                                    <div className="mb-4 space-y-2">
                                        <div className='flex space-x-2'>
                                            <input
                                                type="text"
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                className="w-full p-2 border rounded-xl"
                                                placeholder="first name"
                                            />

                                            <input
                                                type="text"
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                                className="w-full p-2 border rounded-xl"
                                                placeholder="Last name"
                                            />
                                        </div>

                                        <input
                                            type="email"
                                            value={emailId}
                                            onChange={(e) => setemailId(e.target.value)}
                                            className="w-full p-2 border rounded-xl"
                                            placeholder="Email ID"
                                        />

                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full p-2 border rounded-xl"
                                            placeholder="Choose New Password"
                                        />

                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full p-2 border rounded-xl"
                                            placeholder="Confirm Password"
                                        />

                                        <input
                                            type="text"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            className="w-full p-2 border rounded-xl"
                                            placeholder="Mobile Number(For Order Status Update)"
                                        />

                                        <div className="mb-4">
                                            <label className="block text-gray-500 font-bold">Gender</label>
                                            <div>
                                                <label className="inline-flex items-center">
                                                    <input type="radio" className="form-radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                                                    <span className="ml-2">Male</span>
                                                </label>
                                                <label className="inline-flex items-center ml-6">
                                                    <input type="radio" className="form-radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                                                    <span className="ml-2">Female</span>
                                                </label>
                                                <label className="inline-flex items-center ml-6">
                                                    <input type="radio" className="form-radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)} />
                                                    <span className="ml-2">Other</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add other registration fields here */}

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </button>

                                    <p className="text-gray-700 text-center font-semibold mt-4">
                                        Already a Customer?{' '}
                                        <span
                                            className="text-red-500 underline cursor-pointer"
                                            onClick={() => handleTabChange('login')}
                                        >
                                            Login
                                        </span>
                                    </p>

                                </form>
                            </div>
                        )}
                    </div>
                </div>

                <ToastContainer />
            </>
        );
    }
    else {



        return (
            <>



                <div className="pt-10 mb-10">
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

                        <div className="mt-6 h-full bg-white md:mt-0 md:w-1/4">
                            <table className="w-full border">
                                <tbody>
                                    <tr>
                                        <td className="border py-1.5 text-center">
                                            <button className="w-full text-gray-600" onClick={() => setSelectedOption('profileDetails')}>
                                                Profile Details
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border py-1.5 text-center">
                                            <button className="w-full text-gray-600" onClick={() => setSelectedOption('myOrders')}>
                                                My Orders
                                            </button>
                                        </td>
                                    </tr>
                                    {isAdmin && (
                                        
                                        <tr>
                                            <td className="border py-1.5 text-center" onClick={() => setSelectedOption('addProduct')}>
                                                <button className="w-full text-gray-600">
                                                    Create New Product
                                                </button>
                                            </td>
                                        </tr>

                                        
                                        
                                    )}

                                </tbody>
                            </table>

                            <button onClick={handleLogOut} className="mt-4 w-full text-sm  py-1.5 text-red-500 border border-red-500">
                                LOGOUT
                            </button>

                            <button onClick={confirmDelete} className="mt-4 w-full text-sm  py-1.5 text-red-500 border border-red-500">
                                DELETE MY ACCOUNT
                            </button>


                        </div>

                        <div className="md:w-3/4">
                            {renderContent()}
                        </div>

                    </div>
                </div>

                <ToastContainer />

            </>


        )
    }
};

export default Login