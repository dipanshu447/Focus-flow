const menuItem = [
    {
        lable: "Welcome",
        icon: "https://img.icons8.com/?size=100&id=37965&format=png&color=202020"
    },
    {
        lable: "ToDolist",
        icon: "https://img.icons8.com/?size=100&id=f9MbZqpEUKcQ&format=png&color=202020"
    },
    {
        lable: "Pomodoro",
        icon: "https://img.icons8.com/?size=100&id=ggkq7ZKoggie&format=png&color=202020"
    },
    {
        lable: "Coming Soon",
        icon: "https://img.icons8.com/?size=100&id=ytYtK65QNJyO&format=png&color=202020"
    }
]

let menuOptions = menuItem.map((item, index) => (
    <li key={index}>
        <img src={item.icon} alt={item.lable + " option"} />
        {item.lable}
    </li>
))

export default function Menu() {
    return (
        <div className="menu">
            <div className="heading">
                <span>FocusFlow</span>
            </div>
            <div className="menu-options">
                <ul>
                    {menuOptions}
                </ul>
            </div>
        </div>
    )
}