import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from '../assets/logo.svg';
import { googleLogin, loginUser, registerUser } from "../api/auth.ts";
import type { ResAuthUserObj } from "../types/AuthUserobj";
import type { ChangeEvent } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";
import { capitalizeWords } from "../utils/text.ts";

type modeT = "login" | "signup";

export default function SignUp() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<modeT>("login");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const modes: modeT[] = ["login", "signup"];

    const handleSubmit = async (e: ChangeEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (mode === "login") {
                const userData = { email, password };
                const data: ResAuthUserObj = await loginUser(userData);
                toast.success(data.user.name ? `Welcome back ${capitalizeWords(data.user.name)}!` : "Welcome back!");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                setTimeout(() => {
                    navigate("/app");
                }, 500);
            } else if (mode === "signup") {
                const userData = { name, email, password };
                const data: ResAuthUserObj = await registerUser(userData);
                toast.success("Account created successfully");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                setTimeout(() => {
                    navigate("/app");
                }, 500);
            }
        } catch (error) {
            if (mode === "login") toast.error("Invalid email or password");
            else if (mode === "signup") toast.error("Failed to create account");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGooglelogin = async (credentialResponse: CredentialResponse) => {
        try {
            const data = await googleLogin(credentialResponse);
            toast.success("Signed in with Google");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setTimeout(() => {
                navigate("/app");
            }, 500);
        } catch (error) {
            console.log(error);
            toast.error("Google sign in failed");
        }
    }

    const inputClass = "w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors duration-300 bg-neutral-200 dark:bg-[#111111] border border-black/5 dark:border-white/5 text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-neutral-500 focus:border-black/20 dark:focus:border-white/20 dark:focus:bg-[#161616]";

    return (
        <div className="min-h-screen w-full text-[#111] dark:text-[#e5e5e5] font-sans selection:bg-black/10 dark:selection:bg-white/20 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500">
            <div className="w-full max-w-90 px-6 relative z-10 flex flex-col items-center py-12 md:py-30">
                <div className="flex flex-col items-center mb-8 w-full text-center">
                    <Link to="/" className="flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
                        <div className="size-10 rounded-xl flex items-center justify-center bg-black dark:bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <img src={logo} alt="FocusFlow Logo" className="size-9 invert dark:invert-0" />
                        </div>
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black/90 dark:text-white/90 mb-2">
                        {mode === "login" ? "Welcome back." : "Start focusing."}
                    </h1>
                    <p className="text-sm font-light text-black/80 dark:text-white/50">
                        {mode === "login" ? "Sign in to your workspace." : "Create your account. No noise."}
                    </p>
                </div>
                <div className="flex p-1 rounded-xl mb-8 bg-black/5 dark:bg-white/5 w-full">
                    {modes.map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${mode === m
                                ? "bg-white text-black shadow-sm dark:bg-[#1a1a1a] dark:text-white"
                                : "text-black/80 hover:text-black/80 dark:text-white/40 dark:hover:text-white/80"
                                }`}>
                            {m === "login" ? "Login" : "Sign Up"}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {mode === "signup" && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Your name"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>
                    )}
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email address"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                            required />
                    </div>
                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            autoComplete={mode === "login" ? "current-password" : "new-password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputClass} pr-12`}
                            required />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-black/40 hover:text-black/80 dark:text-white/40 dark:hover:text-white/80 transition-colors focus:outline-none">
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>
                    {mode === "login" && (
                        <div className="flex justify-end mt-1">
                            <Link
                                to="/forgot-password"
                                className="text-xs font-medium text-black/40 hover:text-black/80 dark:text-white/40 dark:hover:text-white/80 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 mt-2 rounded-xl font-medium text-sm transition-all duration-300 bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-lg hover:shadow-xl active:scale-[0.98]">
                        {isLoading
                            ? mode === "login"
                                ? "Loging in..."
                                : "Creating account..."
                            : mode === "login"
                                ? "Log in"
                                : "Create account"}
                    </button>
                </form>
                <div className="flex items-center gap-3 w-full my-8">
                    <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
                    <span className="text-[10px] uppercase tracking-widest font-medium text-black/30 dark:text-white/30">
                        or
                    </span>
                    <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
                </div>
                <div className="w-full rounded-xl overflow-hidden grayscale dark:invert-0 invert hover:opacity-100 transition-all duration-300 flex justify-center [&>div]:w-full">
                    <GoogleLogin
                        theme="outline"
                        size="large"
                        text="continue_with"
                        logo_alignment="center"
                        width={320}
                        onSuccess={handleGooglelogin}
                        onError={() => {
                            console.log("Google Login Failed");
                        }} />
                </div>
                <p className="mt-8 text-center text-xs text-black/80 dark:text-white/50 font-light">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                        className="font-medium text-black dark:text-white hover:underline transition-all">
                        {mode === "login" ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}