"use client"
import { registerGuard } from '@/helpers/backendConnect';
import { Registration } from '@/types/register';
import { Gender } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useDropzone } from "react-dropzone";


const Register = () => {
    const [formData, setFormData] = useState<Registration>({
        age: '',
        gender: Gender.MALE,
        phone: '',
        address: '',
        adhar: ''
    });
    const { data, status } = useSession();

    const [file, setFile] = useState<File[]>([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        multiple: true,
        onDrop: (acceptedFiles) => {
            setFile([...file, ...acceptedFiles]);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log("age = ", data?.user.age);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSend = { ...formData, adhar: '' };
        for (const f of file) {
            const fData = new FormData();
            fData.append("file", f);
            fData.append("upload_preset", "jx3jfkqs");
            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: fData,
                }
            );
            const uploadImageData = await uploadResponse.json();
            dataToSend.adhar = uploadImageData.secure_url;

        }

        const response = await registerGuard({ data: dataToSend });

        console.log(response);
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 relative">
            {(data?.user.age != null && data?.user.verified == false) && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-5 flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Your application is under review</h2>
                        <p className="text-gray-500 mt-2">Please wait for verification to complete.</p>
                    </div>
                </div>
            )}

            <div className={`max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 transition-all ${data?.user.age != null && data?.user.verified == false ? "blur-md pointer-events-none" : ""}`}>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Verification Form - verified {data?.user?.verified ? '✅' : '❌'}
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

                    <div className=" md:col-span-2 dropzone p-5 border-2 border-dashed border-gray-500 rounded-md text-center bg-gray-100 text-gray-400 cursor-pointer hover:bg-gray-200" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {file.length > 0 ? (
                            <div>
                                {file.map((f, index) => (
                                    <div key={f.name} className="file_container flex items-center">
                                        <p style={{ marginRight: "10px" }}>{f.name}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent file input from being clicked
                                                const newFiles = file.filter((_, i) => i !== index);
                                                setFile(newFiles); // Assume setFile is your state setter function
                                            }}
                                            style={{ color: "#000000" }} // Add this line
                                        >
                                            &#x2715;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Drag and drop some files here, or click to select files</p>
                        )}
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
    );

}

export default Register