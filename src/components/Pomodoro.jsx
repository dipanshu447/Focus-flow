import Header from "./Header.jsx";
import ProgressBar from "./todolistComponents/ProgressBar.jsx";

export default function Pomodoro() {
    const stroke = 15;
    const radius = 180;
    // const normalizedRadius = 
    return (
        <>
            <div className="pomodoro">
                <Header />
                <div className="timer">
                    <ProgressBar strokeSize='15' CircleSize='350' progress={50}>
                        25:00
                    </ProgressBar>
                </div>
            </div>
        </>
    )
}