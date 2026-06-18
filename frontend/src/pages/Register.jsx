import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("BUYER");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    shopName: "",
    description: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role,
      };

      if (role === "SELLER") {
        payload.shopName = formData.shopName;
        payload.description = formData.description;
        payload.logo = formData.logo;
      }

      await registerUser(payload);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Role */}
        <div>
          <label className="mr-4">
            <input
              type="radio"
              value="BUYER"
              checked={role === "BUYER"}
              onChange={(e) =>
                setRole(e.target.value)
              }
            />

            <span className="ml-2">
              Buyer
            </span>
          </label>

          <label>
            <input
              type="radio"
              value="SELLER"
              checked={role === "SELLER"}
              onChange={(e) =>
                setRole(e.target.value)
              }
            />

            <span className="ml-2">
              Seller
            </span>
          </label>
        </div>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3"
          onChange={handleChange}
        />

        {role === "SELLER" && (
          <>
            <input
              name="shopName"
              placeholder="Shop Name"
              className="w-full border p-3"
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Shop Description"
              className="w-full border p-3"
              onChange={handleChange}
            />

            <input
              name="logo"
              placeholder="Logo URL"
              className="w-full border p-3"
              onChange={handleChange}
            />
          </>
        )}

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;