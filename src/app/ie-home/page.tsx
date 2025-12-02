import HomePage from '@/components/HomePage'

export default function IeHomePage() {
  // Envolve a Home em um wrapper .win7-preview para simular,
  // em navegadores modernos, o visual aproximado de IE/Windows 7.
  return (
    <div className="win7-preview">
      <HomePage />
    </div>
  )
}

