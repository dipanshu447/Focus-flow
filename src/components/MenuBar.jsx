const menuItem = [
    {
        lable: "Welcome",
        icon: "https://img.icons8.com/?size=100&id=82786&format=png&color=4f46e5"
    },
    {
        lable: "Pomodoro",
        icon: "https://img.icons8.com/?size=100&id=x0i026nook2H&format=png&color=4f46e5"
    },
    {
        lable: "ToDolist",
        icon: "https://img.icons8.com/?size=100&id=kGOa1reHyAdz&format=png&color=4f46e5"
    },
    {
        lable: "About",
        icon: "https://img.icons8.com/?size=100&id=3156&format=png&color=4f46e5"
    }
]


export default function Menu({setPage, style}) {
    let menuOptions = menuItem.map((item, index) => (
        <li key={index} onClick={() => setPage(menuItem[index].lable)}>
            <img src={item.icon} alt={item.lable + " option"} />
            {item.lable}
        </li>
    ))

    return (
        <div className="menu" style={style}>
            <div className="heading">
                <span>FocusFlow</span>
                <img src="https://img.icons8.com/?size=100&id=HbCR7y4bJB52&format=png&color=000000" alt="collapseIcon" />
            </div>
            <div className="menu-options">
                <ul>
                    {menuOptions}
                </ul>
            </div>
        </div>
    )
}