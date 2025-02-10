import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaTachometerAlt, FaUser, FaCog, FaBell, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import withAuth from "./hoc/withAuth";

const HomeLayout = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser) {
            router.push("/login"); 
        } else {
            setUser(loggedInUser);
        }
    }, []);

   
    if (!user) return null;

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("loggedInUser");
        router.push("/login");
    };

    return (
        <div className="flex flex-col min-h-screen">
           
            <nav className="border-b border-gray-700 bg-gray-800 w-full p-4 flex items-center justify-between shadow-md">
                <h1 className="text-2xl font-semibold text-white">NEXTAPP</h1>
                <div className="flex space-x-6">
                    <FaBell className="text-white text-2xl cursor-pointer hover:text-gray-400" />
                    <FaSignOutAlt
                        onClick={handleLogout}
                        className="text-red-400 text-2xl cursor-pointer hover:text-red-600"
                    />
                </div>
            </nav>

            <div className="flex flex-1">
             
                <aside className="bg-gray-800 text-white w-64 p-4 shadow-lg min-h-screen">
                    <ul>
                        <li className="flex items-center mb-4">
                            <FaTachometerAlt className="mr-3" />
                            <Link href="/home/dashboard" className="hover:text-gray-300">
                                Dashboard
                            </Link>
                        </li>
                        <li className="flex items-center mb-4">
                            <FaUser className="mr-3" />
                            <Link href="/home/profile" className="hover:text-gray-300">
                                Profile
                            </Link>
                        </li>
                       
                        {user.role === "admin" && (
                            <li className="flex items-center mb-4">
                                <FaCog className="mr-3" />
                                <Link href="/home/settings" className="hover:text-gray-300">
                                    Settings
                                </Link>
                            </li>
                        )}
                    </ul>
                </aside>

             
                <main className="p-6 flex-grow bg-gray-100">{children}</main>
            </div>
        </div>
    );
};

export default withAuth(HomeLayout);
