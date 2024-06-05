import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const PasswordCode = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };
    const emailLS= localStorage.getItem("email");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/validate-code', {
                email: emailLS,
                code: code,
            });
            if (response.status === 200) {
                // Handle successful validation
                console.log('Code validated successfully');
                navigate('/Reset')
            } else {
                
                console.error('Invalid code');
            }
        } catch (error) {
            alert("Invalid Code");
            console.error('Error:', error);
        }
    };



    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Enter code
                    </label>
                    <input
                        id="code"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={code}
                        onChange={handleCodeChange}
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Validate Code
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordCode;
