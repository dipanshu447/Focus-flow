import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from '../assets/logo.svg';
import type { ChangeEvent } from "react";
import { googleLogin, loginUser, registerUser } from "../api/auth.ts";
import type { ResAuthUserObj } from "../types/AuthUserobj";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

type modeT = "login" | "signup";

export default function SignUp() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<modeT>("login");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const modes: modeT[] = ["login", "signup"];

    const handleSubmit = async (e: ChangeEvent) => {
        e.preventDefault();
        try {
            if (mode === "login") {
                const userData = { email, password };
                const data: ResAuthUserObj = await loginUser(userData);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                navigate("/app");
            } else if (mode === "signup") {
                const userData = { name, email, password };
                const data: ResAuthUserObj = await registerUser(userData);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                navigate("/app");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGooglelogin = async (credentialResponse: CredentialResponse) => {
        try {
            const data = await googleLogin(credentialResponse);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/app");
        } catch (error) {
            console.log(error);
        }
    }

    const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white placeholder-neutral-500 focus:border-neutral-300 dark:focus:border-white/25 focus:bg-neutral-200 dark:focus:bg-neutral-800";

    return (
        <div className="flex flex-col items-center justify-center px-6 w-full py-30 relative z-1">
            <div className="w-full max-w-sm relative z-10">
                <div className="flex flex-col items-center mb-10">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <div className="size-9 rounded-xl flex items-center justify-center bg-black dark:bg-white">
                            <img src={logo} className="text-white dark:text-black" />
                        </div>
                    </Link>
                    <h1 className="text-2xl font-black tracking-tight text-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                        {mode === "login" ? "Welcome back." : "Start focusing."}
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        {mode === "login" ? "Sign in to your workspace." : "Create your account. No noise."}
                    </p>
                </div>
                <div className="flex p-1 rounded-xl mb-6 bg-neutral-100 dark:bg-neutral-900">
                    {modes.map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${mode === m
                                ? "bg-white text-black shadow-sm dark:bg-white dark:text-black"
                                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                                }`}>
                            {m === "login" ? "Login" : "Sign Up"}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {mode === "signup" && (
                        <input
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClass}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputClass} pr-12`}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                        >
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>

                    {mode === "login" && (
                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 mt-2 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                    >
                        {mode === "login" ? "Sign in" : "Create account"}
                    </button>
                </form>
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-neutral-200 dark:bg-white/10" />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">or</span>
                    <div className="flex-1 h-px bg-neutral-200 dark:bg-white/10" />
                </div>
                <div className="rounded-xl overflow-hidden grayscale dark:invert-0 invert">
                    <GoogleLogin
                        theme="outline"
                        size="large"
                        text="continue_with"
                        logo_alignment="center"
                        onSuccess={handleGooglelogin}
                        onError={() => {
                            console.log("Google Login Failed");
                        }}
                    />
                </div>
                <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                        className="underline text-black dark:text-white"
                    >
                        {mode === "login" ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}