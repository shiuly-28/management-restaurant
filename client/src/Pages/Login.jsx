import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Lottie from 'lottie-react';
import loginLottie from '../../src/assets/lottees/login.json';
import clickLotte from '../../src/assets/lottees/click.json';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const { darkMode } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        signIn(email, password)
            .then((result) => {
                console.log(result);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGooglogin = () => {
        googleSignIn()
            .then((result) => {
                console.log(result);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-8 px-4 py-10 ">
            <Helmet>
                <title>Management Resturent || Login</title>
            </Helmet>
            {/* Lottie Animation */}
            <div className="w-full lg:w-1/2 flex justify-center">
                <Lottie className="max-w-xs sm:max-w-md md:max-w-lg" animationData={loginLottie} />
            </div>

            {/* Login Form */}
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 sm:p-8">
                <h2 className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl font-semibold text-center`}>Login Your Account</h2>

                <div className="flex justify-center items-center mb-4">
                    <Lottie className="w-24" animationData={clickLotte} />
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className={`${darkMode ? "text-gray-300" : "text-black"} text-lg font-semibold text-center`}>Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input input-bordered w-full rounded-3xl"
                            placeholder="Email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className={`${darkMode ? "text-gray-300" : "text-black"} text-lg font-semibold text-center`}>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="input input-bordered w-full rounded-3xl"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-neutral w-full rounded-3xl">Login</button>

                    <div className={`${darkMode ? "text-gray-300" : "text-black"} text-lg font-semibold text-center`}>OR</div>

                    {/* Google Login */}
                    <button
                        onClick={handleGooglogin}
                        type="button"
                        className="btn btn-outline btn-secondary w-full flex items-center justify-center rounded-3xl gap-2"
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </g>
                        </svg>
                        Login with Google
                    </button>

                    {/* Register Link */}
                    <p className={`${darkMode ? "text-gray-300" : "text-black"} `}>
                        Don't have an account?{' '}
                        <Link to="/register" className="text-green-700 font-medium">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
