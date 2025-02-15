

'use client';
import React, { useState, useEffect } from 'react';

interface Guard {
    id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    phone: string;
    address: string;
    status: 'verified' | 'pending' | 'rejected';
    photo: string;
    documents: {
        type: string;
        url: string;
    }[];
}

const dummyData: Guard[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        gender: 'Male',
        phone: '123-456-7890',
        address: '123 Main St',
        status: 'pending',
        photo: 'https://example.com/photo.jpg',
        documents: [
            { type: 'ID Card', url: 'https://example.com/id.pdf' },
            { type: 'Police Clearance', url: 'https://example.com/police.pdf' }
        ]
    }
];

export default function VerificationPage() {
    const [guards, setGuards] = useState<Guard[]>([]);
    const [selectedGuard, setSelectedGuard] = useState<Guard | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // Simulate API call
        const dummyData: Guard[] = [
            {
                id: '1',
                name: 'Rajesh Kumar',
                email: 'rajesh.kumar@example.com',
                age: 32,
                gender: 'Male',
                phone: '9876543210',
                address: '123, MG Road, Bangalore',
                status: 'verified',
                photo: 'https://example.com/photo1.jpg',
                documents: [
                    { type: 'Aadhaar Card', url: 'https://example.com/aadhaar1.pdf' },
                    { type: 'Police Verification', url: 'https://example.com/police1.pdf' }
                ]
            },
            {
                id: '2',
                name: 'Priya Sharma',
                email: 'priya.s@example.com',
                age: 28,
                gender: 'Female',
                phone: '8765432109',
                address: '45, Sector 18, Noida',
                status: 'pending',
                photo: 'https://example.com/photo2.jpg',
                documents: [
                    { type: 'PAN Card', url: 'https://example.com/pan2.pdf' },
                    { type: 'Police Verification', url: 'https://example.com/police2.pdf' }
                ]
            },
            {
                id: '3',
                name: 'Suresh Patel',
                email: 'suresh.p@example.com',
                age: 35,
                gender: 'Male',
                phone: '7654321098',
                address: '78, Gandhi Nagar, Ahmedabad',
                status: 'rejected',
                photo: 'https://example.com/photo3.jpg',
                documents: [
                    { type: 'Aadhaar Card', url: 'https://example.com/aadhaar3.pdf' },
                    { type: 'Police Verification', url: 'https://example.com/police3.pdf' }
                ]
            },
            {
                id: '4',
                name: 'Anjali Verma',
                email: 'anjali.v@example.com',
                age: 30,
                gender: 'Female',
                phone: '6543210987',
                address: '234, Anna Nagar, Chennai',
                status: 'pending',
                photo: 'https://example.com/photo4.jpg',
                documents: [
                    { type: 'Voter ID', url: 'https://example.com/voter4.pdf' },
                    { type: 'Police Verification', url: 'https://example.com/police4.pdf' }
                ]
            },
            {
                id: '5',
                name: 'Mohammed Khan',
                email: 'mohammed.k@example.com',
                age: 33,
                gender: 'Male',
                phone: '9876543210',
                address: '56, Bandra West, Mumbai',
                status: 'verified',
                photo: 'https://example.com/photo5.jpg',
                documents: [
                    { type: 'Aadhaar Card', url: 'https://example.com/aadhaar5.pdf' },
                    { type: 'Police Verification', url: 'https://example.com/police5.pdf' }
                ]
            }
        ];

        setGuards(dummyData);   }, []);

    const getStatusBadge = (status: Guard['status']) => {
        const colors = {
            verified: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            rejected: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`${colors[status]} px-2 py-1 rounded-full text-sm font-medium`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

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
                        {guards.map((guard) => (
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
                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(guard.status)}</td>
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
                                                        <img src={selectedGuard.photo} alt={selectedGuard.name} className="w-full h-full object-cover" />
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
                                                        {selectedGuard.documents.map((doc, index) => (
                                                            <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                                <p className="font-medium">{doc.type}</p>
                                                                <a
                                                                    href={doc.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline text-sm"
                                                                >
                                                                    View Document
                                                                </a>
                                                            </div>
                                                        ))}
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
