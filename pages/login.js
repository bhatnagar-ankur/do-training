import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === username && user.password === password);

        if (user) {
            
            localStorage.setItem("loggedInUser", JSON.stringify(user));

           
            router.push({
                pathname: "/home",
                query: { role: user.role },
            });
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login Page</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    <Link href="/form" className="text-blue-500 hover:underline">
                        Don’t have an account? Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
