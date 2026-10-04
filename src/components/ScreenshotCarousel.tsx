import { useEffect, useState } from 'react'

type ScreenshotCarouselProps = {
  images: readonly string[]
}

export function ScreenshotCarousel({ images }: ScreenshotCarouselProps) {
  const [index, setIndex] = useState(0)
  const count = images.length

  useEffect(() => {
    if (count < 2) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, 4200)
    return () => window.clearInterval(id)
  }, [count])

  if (count === 0) return null

  const go = (delta: number) => {
    setIndex((current) => (current + delta + count) % count)
  }

  const stack = [
    { offset: 0, src: images[index], active: true },
    { offset: 1, src: images[(index + 1) % count], active: false },
    { offset: 2, src: images[(index + 2) % count], active: false },
  ]

  return (
    <div className="screenshot-carousel" aria-roledescription="carousel" aria-label="App screenshots">
      <div className="screenshot-carousel__stage">
        <button
          type="button"
          className="screenshot-carousel__arrow screenshot-carousel__arrow--prev"
          aria-label="Previous screenshots"
          onClick={() => go(-1)}
        >
          ‹
        </button>

        <div className="screenshot-carousel__stack">
          {stack
            .slice()
            .reverse()
            .map((card) => (
              <div
                key={`${card.offset}-${card.src}`}
                className={
                  card.active
                    ? 'screenshot-carousel__card screenshot-carousel__card--active'
                    : `screenshot-carousel__card screenshot-carousel__card--depth-${card.offset}`
                }
                aria-hidden={!card.active}
              >
                <img
                  className="screenshot-carousel__image"
                  src={card.src}
                  alt={card.active ? `Silly Bon screenshot ${index + 1}` : ''}
                  width={280}
                  height={560}
                  decoding="async"
                />
              </div>
            ))}
        </div>

        <button
          type="button"
          className="screenshot-carousel__arrow screenshot-carousel__arrow--next"
          aria-label="Next screenshots"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>

      <div className="screenshot-carousel__dots" role="tablist" aria-label="Screenshot slides">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to screenshot ${i + 1}`}
            className={
              i === index
                ? 'screenshot-carousel__dot screenshot-carousel__dot--active'
                : 'screenshot-carousel__dot'
            }
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
