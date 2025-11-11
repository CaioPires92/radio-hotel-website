type Props = {
  height?: number
  color?: string
  className?: string
}

export default function BandSeparator({ height = 12, color = '#b2ab70', className = '' }: Props) {
  const h = Math.max(4, Math.min(48, height))
  return (
    <div
      className={"w-full " + className}
      style={{ height: `${h}px`, backgroundColor: color }}
      aria-hidden
    />
  )
}

