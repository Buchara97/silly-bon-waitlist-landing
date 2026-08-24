import type { ReactNode } from 'react'

const socialBase = `${import.meta.env.BASE_URL}assets/social`

type SocialIconsProps = {
  instagramUrl?: string
  tiktokUrl?: string
  youtubeUrl?: string
}

function SocialLink({
  href,
  label,
  children,
}: {
  href?: string
  label: string
  children: ReactNode
}) {
  if (!href) {
    return (
      <span className="waitlist-page__social-link waitlist-page__social-link--disabled" aria-hidden="true">
        {children}
      </span>
    )
  }

  return (
    <a
      className="waitlist-page__social-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  )
}

export function SocialIcons({ instagramUrl, tiktokUrl, youtubeUrl }: SocialIconsProps) {
  return (
    <nav className="waitlist-page__social" aria-label="Social media">
      <SocialLink href={instagramUrl} label="Instagram">
        <img src={`${socialBase}/instagram.svg`} alt="" width={32} height={32} />
      </SocialLink>
      <SocialLink href={tiktokUrl} label="TikTok">
        <img src={`${socialBase}/tiktok.svg`} alt="" width={33} height={32} />
      </SocialLink>
      <SocialLink href={youtubeUrl} label="YouTube">
        <img src={`${socialBase}/youtube.svg`} alt="" width={32} height={32} />
      </SocialLink>
    </nav>
  )
}
