
import { useState, useEffect } from "react";
import HomeLayout from "@/components/HomeLayout"; 

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-wrap justify-center mt-8">
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full lg:w-1/3 m-4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name:</label>
              <p className="text-gray-700 text-lg">{user.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email:</label>
              <p className="text-gray-700 text-lg">{user.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Phone:</label>
              <p className="text-gray-700 text-lg">{user.phone}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Country:</label>
              <p className="text-gray-700 text-lg">{user.country}</p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default MyProfile;
