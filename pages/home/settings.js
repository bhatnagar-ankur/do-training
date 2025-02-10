import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HomeLayout from "@/components/HomeLayout";

export default function Settings() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

        if (!loggedInUser || loggedInUser.role !== "admin") {
            router.replace("/home");  
        } else {
            setUser(loggedInUser);
        }
    }, []);

    if (!user) return null; 

    return (
        <HomeLayout>
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Settings</h1>

             
                <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">User Information</h2>
                    <div className="space-y-2">
                        <div>
                            <label className="block text-gray-700 font-medium">Name:</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                                
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                               
                            />
                        </div>
                    </div>
                </div>

               
                <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">Account Settings</h2>
                    <div className="space-y-2">
                        <div>
                            <label className="block text-gray-700 font-medium">Password:</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md">
                        Save Changes
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
}
