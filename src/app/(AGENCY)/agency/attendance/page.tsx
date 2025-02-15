"use client";
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  UserCircle, 
  Calendar, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ClipboardCheck
} from 'lucide-react';

interface GuardData {
    id: string;
    name: string;
    shift: string;
    checkInTime?: string;
}

interface AttendanceRecord {
    date: string;
    status: 'Present' | 'Absent';
    shift: string;
    checkInTime?: string;
}

const AttendancePage = () => {
    const [guardData, setGuardData] = useState<GuardData>({
        id: "G001",
        name: "Rajesh Kumar",
        shift: "Morning Shift (6 AM - 2 PM)",
    });
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const currentDate = format(new Date(), 'dd MMMM yyyy');
    const currentTime = format(new Date(), 'HH:mm:ss');

    // Dummy data for fallback
    const dummyAttendanceHistory: AttendanceRecord[] = [
        {
            date: '9 February 2025',
            status: 'Present',
            shift: 'Morning Shift (6 AM - 2 PM)',
            checkInTime: '05:55:00'
        },
        {
            date: '10 February 2025',
            status: 'Present',
            shift: 'Morning Shift (6 AM - 2 PM)',
            checkInTime: '06:02:00'
        },
        {
            date: '11 February 2025',
            status: 'Absent',
            shift: 'Morning Shift (6 AM - 2 PM)'
        },
        {
            date: '12 February 2025',
            status: 'Present',
            shift: 'Morning Shift (6 AM - 2 PM)',
            checkInTime: '05:58:00'
        },
        {
            date: '13 February 2025',
            status: 'Present',
            shift: 'Morning Shift (6 AM - 2 PM)',
            checkInTime: '06:05:00'
        },
        {
            date: '14 February 2025',
            status: 'Present',
            shift: 'Morning Shift (6 AM - 2 PM)',
            checkInTime: '05:59:00'
        },
        {
            date: '15 February 2025',
            status: 'Present',
            shift: 'Morning Shift (6 AM - 2 PM)',
            checkInTime: '06:01:00'
        }
    ];

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                // First attempt to fetch from backend API
                const response = await fetch('/api/attendance/history');
                if (!response.ok) {
                    throw new Error('Failed to fetch attendance data');
                }
                const data = await response.json();
                setAttendanceHistory(data);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                // Fallback to dummy data if API call fails
                setAttendanceHistory(dummyAttendanceHistory);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAttendanceData();
    }, []);

    const handleCheckIn = async () => {
        try {
            setIsCheckedIn(true);
        } catch (error) {
            console.error('Error during check-in:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <ClipboardCheck className="w-8 h-8 text-blue-600" />
                            Guard Attendance Portal
                        </h1>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {currentTime}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Guard Info Card */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-4">
                                <UserCircle className="w-12 h-12 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Guard Name</p>
                                    <p className="font-semibold text-lg text-gray-800">{guardData.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">{guardData.id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Shift Info Card */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-4">
                                <Calendar className="w-12 h-12 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Current Shift</p>
                                    <p className="font-semibold text-gray-800">{guardData.shift}</p>
                                    <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Check-in Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleCheckIn}
                            disabled={isCheckedIn}
                            className={`
                                flex items-center gap-2 px-8 py-3 rounded-lg text-white font-medium
                                transform transition-all duration-200
                                ${isCheckedIn 
                                    ? 'bg-green-500 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
                                }
                                shadow-lg hover:shadow-xl
                            `}
                        >
                            {isCheckedIn ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Checked In Successfully
                                </>
                            ) : (
                                <>
                                    <Clock className="w-5 h-5" />
                                    Check In Now
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Attendance History Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        This Week's Attendance History
                    </h2>
                    
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {attendanceHistory.map((record, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`
                                                    px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-medium rounded-full
                                                    ${record.status === 'Present' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                    }
                                                `}>
                                                    {record.status === 'Present' ? (
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    ) : (
                                                        <AlertCircle className="w-3 h-3" />
                                                    )}
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.shift}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.checkInTime || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;