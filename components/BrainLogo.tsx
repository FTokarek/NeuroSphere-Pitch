import Image from 'next/image'

export default function BrainLogo() {
  return (
    <div className="brain-logo-container">
      <Image
        src="/neurosphere-logo.png"
        alt="NeuroSphere Brain Logo"
        width={60}
        height={60}
        className="brain-logo-image"
        priority
      />
    </div>
  )
}
