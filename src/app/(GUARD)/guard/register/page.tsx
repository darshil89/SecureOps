"use client"
import { Gender } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'


const Register = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        phone: '',
        address: '',
        adhar: ''
    });
    const { data, status } = useSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Verification Form
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Pre-filled Fields */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data?.user?.name || ''}
                            disabled
                            className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data?.user?.email || ''}  
                            disabled
                            className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
                        />
                    </div>

                    {/* Interactive Fields */}
                    <div className="p-4 rounded-lg">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full border-2 border-indigo-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                        />
                    </div>

                    <div className="p-4 rounded-lg">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border-2 border-indigo-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                        >
                            <option value="">Select Gender</option>
                            {Object.values(Gender).map(gender => (
                                <option key={gender} value={gender}>{gender}</option>
                            ))}
                        </select>
                    </div>

                    <div className="p-4 rounded-lg">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border-2 border-indigo-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                        />
                    </div>

                    <div className="p-4 rounded-lg">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border-2 border-indigo-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                        />
                    </div>

                    <div className="p-4 rounded-lg md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Aadhar Number</label>
                        <input
                            type="text"
                            name="adhar"
                            value={formData.adhar}
                            onChange={handleChange}
                            className="w-full border-2 border-indigo-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                        />
                    </div>

                    <div className="md:col-span-2 p-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register