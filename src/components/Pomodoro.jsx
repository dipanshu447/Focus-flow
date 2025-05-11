import Header from "./Header.jsx";

export default function Pomodoro(){
    const stroke = 15;
    const radius = 180;
    // const normalizedRadius = 
    return (
        <>
            <div className="pomodoro">
                <Header />
                <svg width="500px" height="500px">
                    <circle 
                        cx='250'
                        cy='250'
                        r='180'
                        fill="transparent"
                        stroke="#b1b1b1"
                        strokeWidth='15'
                    />
                    <circle 
                        cx='250'
                        cy='250'
                        r='180'
                        fill="transparent"
                        stroke="black"
                        strokeWidth='15'
                    />
                </svg>
            </div>
        </>
    )
}