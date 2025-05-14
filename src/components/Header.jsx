import { useState, useEffect } from 'react';

export default function Header({username}) {
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
                <h1>{greeting}, {username}!</h1>
                <p>Today, {`${formattedDate} ${date.getFullYear()}`}</p>
            </div>
            <button className="header-menu"><img src="https://img.icons8.com/?size=100&id=120374&format=png&color=000000" alt="menu" /></button>
        </header>
    )
}