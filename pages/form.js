import { useState, useContext } from "react";
import Link from 'next/link';
import AuthContext from "@/context/AuthContext";
export default function FormPage() {
  const {login}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "India",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required.";
        } else {
          delete newErrors.name;
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required.";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
          newErrors.email = "Invalid email format.";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(value)) {
          newErrors.phone = "Phone number must be 10 digits.";
        } else {
          delete newErrors.phone;
        }
        break;

      case "password":
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const strength = value.length < 8 ? "Too short" :
                         !value.match(/[a-z]/) ? "Add a lowercase letter" :
                         !value.match(/[A-Z]/) ? "Add an uppercase letter" :
                         !value.match(/\d/) ? "Add a digit" :
                         !value.match(/[@$!%*?&]/) ? "Add a special character" : "Strong";
        setPasswordStrength(strength);

        if (!value.trim()) {
          newErrors.password = "Password is required.";
        } else if (!passwordRegex.test(value)) {
          newErrors.password = "Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one digit, and one special character.";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match.";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedValue = value
        .replace(/\D/g, '') 
        .slice(0, 10) 
        .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3"); 
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    validateField(name, value);
  };

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; 

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful!");
      setFormData({ name: "", email: "", phone: "", country: "India", password: "", confirmPassword: "" ,role: "user"});
      setErrors({});
      setPasswordStrength("");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Country:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            {passwordStrength && <p className={`text-sm mt-1 ${passwordStrength === "Strong" ? "text-green-500" : "text-red-500"}`}>{passwordStrength}</p>}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Submit
          </button>

        </form>
        <p className="text-center mt-4">
          <Link href="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </p>
      </div>
    </div>
  );
}
