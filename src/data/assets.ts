const base = import.meta.env.BASE_URL

export const waitlistAssets = {
  icon: `${base}assets/app_icon.png`,
  mascotLeft: `${base}assets/bon_boy.gif`,
  mascotRight: `${base}assets/bon_girl.gif`,
} as const

export const socialLinks = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/sillybondog/',
  tiktok: import.meta.env.VITE_TIKTOK_URL || 'https://www.tiktok.com/@sillybondog',
  youtube: import.meta.env.VITE_YOUTUBE_URL || 'https://www.youtube.com/@sillybondog',
} as const
