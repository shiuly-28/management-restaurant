import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

import registersLotte from '../../src/assets/lottees/registers.json';
import birdLottie from '../../src/assets/lottees/bird.json';
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";

const Register = () => {
    const { createUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const { darkMode } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const photo = formData.get("photo");
        const email = formData.get("email");
        const password = formData.get("password");

        // password validation
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !hasMinLength) {
            toast.error("Password must have uppercase, lowercase & at least 6 characters");
            return;
        }

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                });
            })
            .then(() => {
                toast.success("Registration successful!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                toast.success("Google Registration successful!");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 py-12 ">
            <Helmet>
                <title>Management Resturent || Register</title>
            </Helmet>
            {/* Lottie */}
            <div className="w-full md:w-1/2">
                <Lottie animationData={registersLotte} loop className="w-full max-w-sm mx-auto" />
            </div>

            {/* Form */}
            <div className="w-full max-w-md bg-white md:p-8 rounded-xl shadow-xl">
                <h2 className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl font-semibold text-center`}>Create an Account Register</h2>

                <div className="flex justify-center mb-4">
                    <Lottie animationData={birdLottie} loop className="w-20" />
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            className="input input-bordered  w-full rounded-3xl "
                        />
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            required
                            placeholder="Your photo URL"
                            className="input input-bordered w-full rounded-3xl"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Your email"
                            className="input input-bordered w-full rounded-3xl"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            className="input input-bordered w-full rounded-3xl"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must be at least 6 characters, include one uppercase and one lowercase.
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full text-white rounded-3xl"
                    >
                        Register
                    </button>
                </form>

                <div className={`${darkMode ? "text-gray-300" : "text-black"} text-lg font-semibold text-center`}>OR</div>

                {/* Google Sign In */}
                <button
                    onClick={handleGoogleLogin}
                    className={`${darkMode ? "text-gray-300" : "text-black"} text-lg font-semibold text-center btn btn-outline w-full flex items-center rounded-3xl gap-2`}
                >
                    <svg
                        aria-label="Google logo"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Register with Google
                </button>

                {/* Login Link */}
                <p className={`${darkMode ? "text-gray-300" : "text-black"} `}>
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
