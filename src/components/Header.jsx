import { useState, useEffect } from 'react';

export default function Header({ username }) {
    let [date, setDate] = useState(() => new Date());
    let formattedDate = date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
    })

    useEffect(() => {
        const minInterval = setInterval(() => setDate(new Date()), 60 * 1000);
        return () => clearInterval(minInterval);
    }, [])

    let hour = date.getHours();
    let greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

    return (
        <header>
            <div className="head">
                <h1>{greeting}, <span>{username}!</span></h1>
                <p>Today, {`${formattedDate} ${date.getFullYear()}`}</p>
            </div>
            {/* <label class="switch">
                <input type="checkbox" />
                <span class="slider"></span>
            </label> */}
        </header>
    )
}