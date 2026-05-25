import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import api from '../service/api.ts';
import { toast } from "sonner";

type FormResObj = {
    name: string
    email: string
    message: string
}

export default function Contact() {
    const [formData, setFormData] = useState<FormResObj>({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact', formData);
            setStatus('success');
            toast.success("Message sent successfully");
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Submission failed:");
            setStatus('error');
            toast.error("Failed to send message");
        } finally {
            setStatus('idle');
        }
    }

    return (
        <div className="relative z-2 flex flex-col w-full transition-colors duration-500 overflow-hidden min-h-screen grayscale">
            <div className="relative pt-32 md:pt-40 pb-16 md:pb-24 flex flex-col px-6 md:px-12 lg:px-24 w-full">
                <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-4">
                    Contact
                </span>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black my-4 tracking-tight leading-[1.1] text-black/90 dark:text-white/90 text-left">
                    Let's talk.
                </h1>
                <p className="mt-4 text-base md:text-lg font-light text-black/60 dark:text-white/60 leading-relaxed">
                    A question, a thought, or just a hello.<br className="hidden md:block" />
                    We read every message.
                </p>
            </div>
            <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 border-y border-black/10 dark:border-white/10 w-full mb-20">
                <div className="flex flex-col w-full lg:w-1/2">
                    <div className="flex flex-col border-b border-black/5 dark:border-white/5 pb-10 md:pb-12">
                        <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs">
                            Reach us directly
                        </span>
                        <a
                            href="mailto:teamfocusfloow@gmail.com"
                            className="text-black/90 dark:text-white/90 hover:text-black/60 dark:hover:text-white/60 mt-4 md:mt-6 font-semibold text-2xl sm:text-3xl transition-colors duration-300 ease-in-out">
                            teamfocusfloow@gmail.com
                        </a>
                    </div>
                    <div className="flex flex-col border-b border-black/5 dark:border-white/5 py-10 md:py-12">
                        <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-4 md:mb-6">
                            Response time
                        </span>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-start gap-3 text-sm md:text-base font-light text-black/60 dark:text-white/60">
                                We typically respond within 24-48 hours.
                            </li>
                            <li className="flex items-start gap-3 text-sm md:text-base font-light text-black/60 dark:text-white/60">
                                No auto-responders. A real human reads your message.
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col border-b border-black/5 dark:border-white/5 py-10 md:py-12">
                        <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-4 md:mb-6">
                            Topics
                        </span>
                        <ul className="flex flex-col gap-4">
                            {["General questions", "Feature suggestions", "Bug reports", "Press & partnerships"].map((topic, i) => (
                                <li key={i} className="flex items-center gap-4 text-sm md:text-base font-light text-black/60 dark:text-white/60">
                                    <div className="p-1.5 rounded-full bg-black/5 dark:bg-white/5 shrink-0">
                                        <FaArrowRight className="w-3 h-3 text-black/40 dark:text-white/40" />
                                    </div>
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/2 mt-8 lg:mt-0 ">
                    <span className="uppercase text-black/40 dark:text-white/40 tracking-[0.2em] font-medium text-[10px] md:text-xs mb-6">
                        Send a message
                    </span>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                        <input
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className="w-full px-5 py-4 rounded-2xl bg-neutral-200 dark:bg-neutral-900 text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-white/40 border border-transparent focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-colors duration-300"
                            required />
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="Email address"
                            className="w-full px-5 py-4 rounded-2xl bg-neutral-200 dark:bg-neutral-900 text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-white/40 border border-transparent focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-colors duration-300"
                            required />
                        <textarea
                            value={formData.message}
                            onChange={handleChange}
                            name="message"
                            placeholder="Your message"
                            className="w-full px-5 py-4 rounded-2xl bg-neutral-200 dark:bg-neutral-900 text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-white/40 border border-transparent focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-colors duration-300 resize-y min-h-40"
                            required />

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full mt-4 px-6 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed font-medium transition-all duration-300 shadow-xl hover:-translate-y-0.5 cursor-pointer">
                            {status === 'loading' ? 'Sending...' : 'Send message'}
                        </button>
                        <div className="min-h-6 mt-2">
                            {status === 'success' && (
                                <p className="text-green-600 dark:text-green-400 text-sm font-medium text-center">
                                    Message sent successfully! We will get back to you soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-600 dark:text-red-400 text-sm font-medium text-center">
                                    Something went wrong. Please try again later.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}