"use client";

import { MdOutlineLogin, MdVerified } from "react-icons/md";
import { FaUser, FaEnvelope, FaFingerprint, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { useGetMeQuery } from "@/store/api/authApi";
import { deleteCookie, getCookie } from "@/lib/cookies";
import { errorMessage, successMessage } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
    const router = useRouter();
    const token = typeof window !== "undefined" ? getCookie("token") : "";
    const { data, error, isLoading } = useGetMeQuery(undefined, {
        skip: !token,
    });

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (data) {
            const activeUser = (data?.uuid || data?.email) ? data : (data.data?.user || data.user);
            setUser(activeUser);
        }
    }, [data]);

    const date = new Date();

    // Log out
    const HandleLogout = () => {
        deleteCookie("token");
        successMessage("Logged out", "top-center", "dark");
        router.push("/");
        router.refresh();
    };

    // If loading, render a gorgeous loading skeleton
    if (isLoading) {
        return (
            <div className="py-[120px] mt-[10vh] bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center font-montserrat text-lg text-gray-500 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-btn border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading premium profile...</span>
                </div>
            </div>
        );
    }

    const displayName = user?.display_name || `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User Profile";
    const firstLetter = displayName[0]?.toUpperCase() || "U";
    const profileImg = user?.profile_picture;

    return (
        <div className="py-[100px] mt-[12vh] bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* Header Welcome Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-10 gap-4">
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-prh2 capitalize flex items-center gap-2">
                            Welcome Back, {user?.first_name || "Guest"}
                            {user?.is_verified && <MdVerified className="text-blue-500 text-2xl" title="Verified Account" />}
                        </h1>
                        <p className="text-sm font-montserrat font-medium text-gray-500 mt-2 flex items-center gap-2">
                            <FaCalendarAlt className="text-btn" /> Today is {date?.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <button
                        onClick={HandleLogout}
                        className="bg-btn hover:bg-red-700 text-white rounded-full py-2.5 px-6 font-montserrat font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer self-start md:self-auto"
                    >
                        Log out <MdOutlineLogin className="text-lg" />
                    </button>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Premium Profile Card */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-center text-center self-start">
                        <div className="relative mb-6">
                            {profileImg ? (
                                <img 
                                    src={profileImg} 
                                    alt={displayName} 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-btn text-white text-4xl font-serif font-bold rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                                    {firstLetter}
                                </div>
                            )}
                            {user?.is_verified && (
                                <span className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white shadow-md">
                                    <MdVerified className="text-sm" />
                                </span>
                            )}
                        </div>

                        <h2 className="font-montserrat font-bold text-xl text-gray-800 capitalize mb-1">
                            {displayName}
                        </h2>
                        <p className="text-xs font-montserrat font-bold tracking-wider text-btn bg-red-50 py-1 px-3 rounded-full mb-6 uppercase">
                            {user?.user_type || "Customer"}
                        </p>

                        <div className="w-full border-t border-gray-100 pt-6 flex flex-col gap-4 text-left">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FaEnvelope className="text-btn w-5 shrink-0" />
                                <span className="truncate">{user?.email || "No email linked"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FaShieldAlt className="text-btn w-5 shrink-0" />
                                <span>Status: {user?.is_active ? "Active Member" : "Inactive"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Information Sheet */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                        <h3 className="font-serif font-bold text-2xl text-gray-800 border-b border-gray-100 pb-4 mb-8">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label className="font-montserrat font-semibold text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                    <FaUser className="text-btn" /> Full Name
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-montserrat text-sm text-gray-700 capitalize">
                                    {displayName}
                                </div>
                            </div>

                            {/* UUID */}
                            <div className="flex flex-col gap-2">
                                <label className="font-montserrat font-semibold text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                    <FaFingerprint className="text-btn" /> User Identity (UUID)
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-xs text-gray-600 truncate" title={user?.uuid || user?.id}>
                                    {user?.uuid || user?.id || "N/A"}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-2">
                                <label className="font-montserrat font-semibold text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                    <FaPhone className="text-btn" /> Phone Number
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-montserrat text-sm text-gray-700">
                                    {user?.phone || "No phone number added"}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col gap-2">
                                <label className="font-montserrat font-semibold text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                    <FaUser className="text-btn" /> Gender
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-montserrat text-sm text-gray-700 capitalize">
                                    {user?.gender?.toLowerCase() || "Not Specified"}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="font-montserrat font-semibold text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                    <FaMapMarkerAlt className="text-btn" /> Delivery Address
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-montserrat text-sm text-gray-700 min-h-[60px] capitalize">
                                    {user?.address || "No delivery address saved yet"}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;