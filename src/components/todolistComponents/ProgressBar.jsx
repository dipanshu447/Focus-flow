export default function ProgressBar({ strokeSize, CircleSize, progress, children }) {
    const stroke = strokeSize;
    const radius = (CircleSize - stroke) / 2;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const offSet = circumference - (progress / 100) * circumference;
    const center = CircleSize / 2;
    return (
        <div style={{ 
            position: "relative", 
            width: CircleSize, 
            height: CircleSize,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
         }}>
            <svg className="progressBar" width={CircleSize} height={CircleSize}>
                <circle
                    cx={center}
                    cy={center}
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    stroke='#b1b1b1'
                    fill='transparent'
                />
                <circle
                    cx={center}
                    cy={center}
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    stroke='#202020'
                    fill='transparent'
                    strokeDasharray={circumference}
                    strokeDashoffset={offSet}
                    style={{ transition: '0.5s all cubic-bezier(0.47, 0.54, 0, 1.14)' }}
                />
            </svg>
            {children && <div style={{
                position: 'absolute',
                width: CircleSize,
                height: CircleSize,
                fontSize:"3rem"
            }}>
                {children}
            </div>}
        </div>
    )
}