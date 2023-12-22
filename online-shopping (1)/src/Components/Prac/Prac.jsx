import React from 'react'
import { useState } from 'react';

function Prac() {
    const [curfirstName, setCurFirstName] = useState('');
    const [curlastName, setCurLastName] = useState('');
    const [curmobileNumber, setCurMobileNumber] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    const renderContent = () => {
        switch (selectedOption) {
            case 'profileDetails':
                return <div>Profile Details content goes here</div>;
            case 'myOrders':
                return <div>My Orders content goes here</div>;
            case 'addProduct':
                return <div>Add Product content goes here</div>;
            default:
                return null;
        }
    };

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
                                <tr>
                                    <td className="border py-1.5 text-center" onClick={() => setSelectedOption('addProduct')}>
                                        <button className="w-full text-gray-600">
                                            Add Product
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <button className="mt-4 w-full text-sm  py-1.5 text-red-500 border border-red-500">
                            LOGOUT
                        </button>

                        <button className="mt-4 w-full text-sm  py-1.5 text-red-500 border border-red-500">
                            DELETE MY ACCOUNT
                        </button>


                    </div>

                    <div className="md:w-3/4">                 
                        {renderContent()}


                        
                       



   
                    </div>

                </div>
            </div>

        </>

    )
}

export default Prac





 


