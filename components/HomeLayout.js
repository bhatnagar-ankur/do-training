import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaTachometerAlt, FaUser, FaCog, FaClipboardList } from "react-icons/fa";
import { useRouter } from "next/router";
import withAuth from "./hoc/withAuth";
import UserDropdown from "./UserDropdown";
import NotificationsDropdown from "./NotificationsDropdown";

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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <nav className="border-b border-gray-700 bg-gray-800 w-full p-4 flex items-center justify-between shadow-md fixed top-0 z-50">
        <h1 className="text-2xl font-semibold text-white">NEXTAPP</h1>
        <div className="flex space-x-6">
          <NotificationsDropdown />
          <UserDropdown user={user} handleLogout={handleLogout} />
        </div>
      </nav>

      <div className="flex flex-1 pt-16">

        <aside className="bg-gray-800 text-white w-64 p-4 shadow-lg fixed top-16 bottom-0 h-screen">
          <ul>
            <li className="flex items-center mb-4">
              <FaTachometerAlt className="mr-3" />
              <Link href="/home/dashboard" className="hover:text-gray-300">Dashboard</Link>
            </li>
            <li className="flex items-center mb-4">
              <FaUser className="mr-3" />
              <Link href="/home/profile" className="hover:text-gray-300">Profile</Link>
            </li>
            <li className="flex items-center mb-4">
              <FaClipboardList className="mr-3" />
              <Link href="/home/todo" className="hover:text-gray-300">Tasks</Link>
            </li>
            {user.role === "admin" && (
              <li className="flex items-center mb-4">
                <FaCog className="mr-3" />
                <Link href="/home/settings" className="hover:text-gray-300">Settings</Link>
              </li>
            )}
          </ul>
        </aside>

       
        <main className="flex-grow bg-gray-100 ml-64 p-6 overflow-auto h-screen pt-16">
          {children} 
        </main>
      </div>
    </div>
  );
};

export default withAuth(HomeLayout);
