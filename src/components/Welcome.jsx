import { useState } from "react";

export default function Welcome({ startFocus, style, editName }) {
    const [showEditName, setshowEditName] = useState(false);
    const toggleShowEditName = () => setshowEditName(prev => !prev);

    function handleEditName(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newName = formData.get('NewName');
        editName(newName);
        localStorage.setItem("UserName", newName);
        toggleShowEditName();
    }

    return (
        <div className="welcome-container">
            <div className="welcome" style={Object.keys(style).length === 0 && showEditName ? { filter: "blur(10px) brightness(0.9)" } : style}>
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
                <div className="options EditName">
                    <button className='newTask' onClick={toggleShowEditName}>
                        <img src="https://img.icons8.com/?size=100&id=86373&format=png&color=ffffff" alt="editIcon" />
                        Edit name
                    </button>
                </div>
            </div>
            {showEditName && <form className="taskDialogBox" onSubmit={handleEditName}>
                <label>Edit your name</label>
                <input type="text" name='NewName' required />
                <div className="btns">
                    <button type='button' onClick={toggleShowEditName}>Back</button>
                    <button type='submit'>Save</button>
                </div>
            </form>}
        </div>
    )
}