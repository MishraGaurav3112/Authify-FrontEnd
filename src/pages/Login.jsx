import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/asset.js";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

function Login() {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { backendUrl, setIsLoggedIn, setUserData, getUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);

        try {
            if (isCreateAccount) {
                // Register API
                const response = await axios.post(`${backendUrl}/register`, {
                    name,
                    email,
                    password,
                });

                if (response.status === 201) {
                    toast.success("Account created successfully.");
                    navigate("/");
                } else {
                    toast.error("Email already exists");
                }
            } else {
                // Login API
                const response = await axios.post(`${backendUrl}/login`, {
                    email,
                    password,
                });

                if (response.status === 200) {
                    setIsLoggedIn(true);
                    await getUserData(); // ✅ fetch profile immediately after login
                    navigate("/");
                }
                else {
                    toast.error("Email or password incorrect");
                }
            }
        } catch (e) {
            if (e.response?.data?.message) {
                toast.error(e.response.data.message);
            } else {
                toast.error(e.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                background: "linear-gradient(90deg, #6a5af9, #8268f9)",
                border: "none",
            }}
        >
            {/* Logo */}
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                        textDecoration: "none",
                    }}
                >
                    <img src={assets.logo} alt="logo" height={32} width={32} />
                    <span className="fw-bold fs-4 text-light">Authify</span>
                </Link>
            </div>

            {/* Card */}
            <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">
                    {isCreateAccount ? "Create account" : "Login"}
                </h2>

                <form onSubmit={onSubmitHandler}>
                    {/* Full Name field (only for Sign Up) */}
                    {isCreateAccount && (
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="form-control"
                                placeholder="Enter Full Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Id
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email Id"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="**********"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="d-flex justify-content-center mb-3">
                        <Link to="/reset-password" className="text-decoration-none">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : isCreateAccount
                                ? "Sign Up"
                                : "Login"}
                    </button>
                </form>

                {/* Toggle between Login and Sign Up */}
                <div className="text-center mt-3">
                    <p className="mb-0">
                        {isCreateAccount ? (
                            <>
                                Already have an account?{" "}
                                <span
                                    onClick={() => setIsCreateAccount(false)}
                                    className="text-decoration-underline"
                                    style={{ cursor: "pointer" }}
                                >
                  Login here!
                </span>
                            </>
                        ) : (
                            <>
                                Don&apos;t have an account?{" "}
                                <span
                                    onClick={() => setIsCreateAccount(true)}
                                    className="text-decoration-underline"
                                    style={{ cursor: "pointer" }}
                                >
                  Sign Up
                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
