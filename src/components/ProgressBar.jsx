export default function ProgressBar({progress}) {
    const stroke = 5;
    const radius = 14;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const offSet = circumference - (progress / 100) * circumference;
    return (
        <svg width='35px' height='35px'>
            <circle
                cx='20'
                cy='20'
                strokeWidth={stroke}
                r={normalizedRadius}
                stroke='#b1b1b1'
                fill='transparent'
                />
            <circle
                cx='20'
                cy='20'
                strokeWidth={stroke}
                r={normalizedRadius}
                stroke='#202020'
                fill='transparent'
                strokeDasharray={circumference}
                strokeDashoffset={offSet}
                style={{transition: '0.5s all cubic-bezier(0.47, 0.54, 0, 1.14)'}}
            />
        </svg>
    )
}