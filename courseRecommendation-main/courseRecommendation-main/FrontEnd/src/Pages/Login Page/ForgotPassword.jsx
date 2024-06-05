import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [redirectToEnterCode, setRedirectToEnterCode] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/forgot-password', {
                email: email, // Include the email in the request body
            });
            if (response.status === 200) {
                localStorage.setItem("email", email);
                setRedirectToEnterCode(true);
            } else {
                console.error('Failed to generate code');
            }
        } catch (error) {
            alert("Email not Registered");
            console.error('Error:', error);
        }
    }
    if (redirectToEnterCode) {
        navigate('/Enter-Code')
        
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Send Code
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
