import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

import BuyerRegisterForm from "../components/BuyerRegisterForm";
import SellerRegisterForm from "../components/SellerRegisterForm";
import { useAuth } from "../hooks/useAuth";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [role, setRole] = useState("BUYER");

  const [showPassword, setShowPassword] = useState(false);

  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",

    shopName: "",
    description: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        ...formData,
        role,
      });

      alert(
        role === "SELLER"
          ? "Seller application submitted successfully."
          : "Registration successful."
      );

      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-lg">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* Header */}

          <div className="text-center mb-8">

            <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-3xl mx-auto mb-4">
              🛍️
            </div>

            <h1 className="text-3xl font-bold">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join our marketplace today.
            </p>

          </div>

          {/* Role */}

          <div className="grid grid-cols-2 gap-3 mb-6">

            <button
              type="button"
              onClick={() => setRole("BUYER")}
              className={`py-3 rounded-xl font-semibold transition ${
                role === "BUYER"
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              Buyer
            </button>

            <button
              type="button"
              onClick={() => setRole("SELLER")}
              className={`py-3 rounded-xl font-semibold transition ${
                role === "SELLER"
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              Seller
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {role === "BUYER" ? (
              <BuyerRegisterForm
                formData={formData}
                handleChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ) : (
              <SellerRegisterForm
                formData={formData}
                handleChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleLogoChange={handleLogoChange}
              />
            )}

            {/* Terms */}

            <div className="flex items-start gap-3">

              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-1 ${
                  agreed
                    ? "bg-black border-black text-white"
                    : "border-gray-300"
                }`}
              >
                {agreed && <Check size={14} />}
              </button>

              <span className="text-sm text-gray-500">
                I agree to the Terms and Privacy Policy.
              </span>

            </div>

            <button
              disabled={!agreed}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                agreed
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Create Account

              <ArrowRight size={18} />

            </button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-sm text-gray-500">
              Already have an account?

              <Link
                to="/signin"
                className="ml-2 font-semibold text-black hover:underline"
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;