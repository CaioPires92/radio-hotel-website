type Props = {
  flip?: boolean
  color?: string
  className?: string
  variant?: 'line' | 'solid'
  height?: number // px
  strokeOpacity?: number
  strokeWidth?: number
}

export default function WaveDivider({
  flip = false,
  color = '#b2ab70',
  className = '',
  variant = 'line',
  height = 56,
  strokeOpacity = 0.35,
  strokeWidth = 2,
}: Props) {
  const baseClass = `w-full ${flip ? 'rotate-180' : ''}`
  const h = Math.max(24, Math.min(140, height))
  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`${baseClass}`}
        style={{ height: `${h}px` }}
      >
        {variant === 'solid' ? (
          <path
            d="M0,64 C240,96 480,32 720,48 C960,64 1200,96 1440,80 L1440,0 L0,0 Z"
            fill={color}
            fillOpacity="0.8"
          />
        ) : (
          <>
            <path
              d="M0,64 C240,92 480,36 720,50 C960,64 1200,92 1440,78"
              fill="none"
              stroke={color}
              strokeOpacity={strokeOpacity}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
            <path
              d="M0,76 C240,100 480,48 720,60 C960,72 1200,104 1440,90"
              fill="none"
              stroke={color}
              strokeOpacity={strokeOpacity * 0.6}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
          </>
        )}
      </svg>
    </div>
  )
}
