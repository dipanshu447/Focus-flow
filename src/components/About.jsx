import { useState } from 'react';
export default function About() {
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFAQ = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqs = [
        {
            question: 'What is FocusFlow?',
            answer: 'FocusFlow is a minimalist productivity tool designed to help you focus on your tasks, study, and personal growth by removing distractions and offering only the tools you need.'
        },
        {
            question: 'Why did you build FocusFlow?',
            answer: 'I built FocusFlow as part of my 100 Days of React journey to challenge myself, improve my frontend skills, and build something meaningful for students and self-learners like me.'
        },
        {
            question: 'Will this tool stay free?',
            answer: 'Yes, FocusFlow is completely free to use. I built it to help others, and I plan to keep it open and accessible.'
        }
    ];

    return (
        <div className="about">
            <div className="about-container">
                <h1>About FocusFlow</h1>
                <p>
                    FocusFlow is a minimalistic productivity tool designed to help you truly focus on what matters your work, your study, your growth.
                    It includes a To-Do List, a Pomodoro Timer, a daily study time tracker that resets at midnight, and a task completion progress tracker that shows how much of your to-do list you've completed.
                    Built with purpose and simplicity, it’s free and focused on intentional productivity.
                </p>
                <h2>About the Creator</h2>
                <p>
                    Hi! I’m <strong>Dipanshu Sahu</strong>, a passionate and self-driven Computer Science student with a deep interest in web and Android development.
                    I'm currently learning React as part of my <em>100 Days of Code</em> journey, exploring how to build meaningful and clean user interfaces.
                    <br />FocusFlow is one of the projects I built during this challenge a minimalist productivity tool crafted to help students and self-learners like me stay focused and intentional.
                </p>

                <p>
                    You can check out more of my work or connect with me on GitHub:
                    <br />
                    <a
                        href="https://github.com/dipanshu447"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        github.com/dipanshu447
                    </a>
                </p>

                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
                            <div className="faq-question">{faq.question}</div>
                            {faqOpen === index && <div className="faq-answer">{faq.answer}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};