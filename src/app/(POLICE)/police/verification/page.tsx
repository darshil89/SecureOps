

'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';


export default function VerificationPage() {
    const [guards, setGuards] = useState<User[]>([]);
    const [selectedGuard, setSelectedGuard] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // Simulate API call

        async function fetchGuards() {
            const response = await axios.get('/api/guard');
            setGuards(response.data.response);
        }

        fetchGuards();
    }, []);

    const getStatusBadge = (status: boolean) => {
        if (status === undefined) return null;
        const statusString = status ? 'verified' : 'pending';

        const colors = {
            verified: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            rejected: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`${colors[statusString]} px-2 py-1 rounded-full text-sm font-medium`}>
                {statusString.charAt(0).toUpperCase() + statusString.slice(1)}
            </span>
        );
    };

    console.log(guards);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Guard Verification Dashboard</h1>

            <div className="shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {guards?.map((guard) => (
                            <tr
                                key={guard.id}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => {
                                    setSelectedGuard(guard);
                                    setIsDialogOpen(true);
                                }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">{guard.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{guard.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{guard.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{guard.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(guard.verified)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal/Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsDialogOpen(false)}></div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            {selectedGuard && (
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Guard Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div className="w-32 h-32 rounded-full overflow-hidden">
                                                        <Image src={selectedGuard.image || ""} width={100} height={100} alt={selectedGuard.name || ""} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Personal Information</h3>
                                                        <p><span className="font-medium">Name:</span> {selectedGuard.name}</p>
                                                        <p><span className="font-medium">Email:</span> {selectedGuard.email}</p>
                                                        <p><span className="font-medium">Phone:</span> {selectedGuard.phone}</p>
                                                        <p><span className="font-medium">Age:</span> {selectedGuard.age}</p>
                                                        <p><span className="font-medium">Gender:</span> {selectedGuard.gender}</p>
                                                        <p><span className="font-medium">Address:</span> {selectedGuard.address}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-4">Documents</h3>
                                                    <div className="space-y-2">
                                                        <Image src={selectedGuard.adhar || ""} alt='adhar' width={200} height={200} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
