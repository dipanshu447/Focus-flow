import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type FormResObj = {
    name: string
    email: string
    message: string
}

export default function Contact() {
    const [formData, setFormData] = useState<FormResObj>({ name: '', email: '', message: '' });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="relative z-2 flex flex-col w-full mb-20">
            <div className="relative my-20 dark:text-white pt-20 pb-20 flex flex-col px-20 w-5xl">
                <span className="uppercase text-neutral-500 tracking-wider text-sm">Contact</span>
                <h1 className="text-9xl font-black my-10 tracking-tight leading-25 text-black dark:text-white text-left">Let's talk.</h1>
                <p className="mt-2 w-xl text-neutral-400 leading-7">A question, a thought, or just a hello.<br />We read every message.</p>
            </div>
            <div className="px-20 py-20 flex border-t border-t-neutral-800 flex-col">
                <div className="text-black dark:text-white flex flex-col border-b border-b-neutral-800 pb-15">
                    <span className="uppercase text-neutral-500 tracking-wider text-sm">Reach us directly</span>
                    <a href="mailto:hello@focusflow.app" className='text-black dark:text-neutral-300 dark:hover:text-white mt-6 font-semibold text-4xl transition-all duration-200 ease'>hello@focusflow.app</a>
                </div>
                <div className="text-black dark:text-white flex flex-col border-b border-b-neutral-800 py-15">
                    <span className="uppercase text-neutral-500 tracking-wider text-sm">Response time</span>
                    <li className="flex items-center gap-3 text-sm text-neutral-300 mt-6">We typically respond within 24–48 hours.</li>
                    <li className="mt-1 flex items-center gap-3 text-sm text-neutral-300">No auto-responders. A real human reads your message.</li>
                </div>
                <div className="text-black dark:text-white flex flex-col border-b border-b-neutral-800 w-full py-10">
                    <span className="uppercase text-neutral-500 tracking-wider text-sm">Topics</span>
                    <ul className="text-black dark:text-white mt-3 flex flex-col gap-1.5 mb-10">
                        <li className="mt-1 flex items-center gap-3 text-sm text-neutral-400">
                            <FaArrowRight className="size-3 fill-neutral-600" />
                            General questions
                        </li>
                        <li className="mt-1 flex items-center gap-3 text-sm text-neutral-400">
                            <FaArrowRight className="size-3 fill-neutral-600" />
                            Feature suggestions
                        </li>
                        <li className="mt-1 flex items-center gap-3 text-sm text-neutral-400">
                            <FaArrowRight className="size-3 fill-neutral-600" />
                            Bug reports
                        </li>
                        <li className="mt-1 flex items-center gap-3 text-sm text-neutral-400">
                            <FaArrowRight className="size-3 fill-neutral-600" />
                            Press & partnerships
                        </li>
                    </ul>
                </div>
                <span className="text-neutral-500 text-sm mt-10">"We built FocusFlow because we were tired of tools that promised productivity but delivered distraction."</span>
            </div>
            <div className="px-20 pt-10 pb-20 flex flex-col border-b-neutral-800 border-b">
                <span className="uppercase text-neutral-500 tracking-wider text-sm">Send a message</span>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} name="name" type="text" placeholder="Your name" className="w-full mt-8 px-4 py-3 rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-neutral-500" />
                    <input onChange={handleChange} name="email" type="text" placeholder="Email address" className="w-full mt-5 px-4 py-3 rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-neutral-500" />
                    <textarea onChange={handleChange} name="message" placeholder="Your message" className="w-full mt-5 px-4 py-3 rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-neutral-500" rows={4} cols={4} />
                    <button type="submit" className="w-full mt-8 px-4 py-3 rounded-xl bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer transition-all duration-200 ease text-sm">Send message</button>
                </form>
            </div>
        </div>
    )
}