
import { createContext, useState } from "react";
import { useRouter } from "next/router";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === username && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setUser(user);
            router.push({
                pathname: "/home",
              
            });
        } else {
            alert("Invalid credentials");
        }
    };

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
