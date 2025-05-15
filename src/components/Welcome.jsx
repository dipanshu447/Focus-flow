export default function Welcome({ startFocus, style }) {
    return (
        <div className="welcome" style={style}>
            <h1>Welcome to <span>FocusFlow!</span></h1>

            <p> FocusFlow is a minimalistic productivity tool designed to help you truly focus on what matters your work, your study, your growth. In a world full of distractions and bloated features, FocusFlow keeps it simple and purposeful.</p>

            <ul className="welcome-features">
                <li><strong>To-Do List</strong> to plan your tasks</li>
                <li><strong>Pomodoro Timer</strong> with sessions and breaks</li>
                <li><strong>Real-time progress tracking</strong> for your accomplishments</li>
                <li><strong>Daily study log</strong> to track your focus hours</li>
            </ul>

            <p>
                This app is built with intention no clutter, no distractions, just the tools you need to stay on track.
                More features are on the way, but for now, just breathe, focus, and flow.
            </p>

            <div className="welcome-quote">
                “Focus on being productive instead of busy.”<br /> — Tim Ferriss
            </div>

            <button onClick={() => startFocus("Pomodoro")} className="start-button">
                Start Focusing
            </button>
        </div>
    )
}