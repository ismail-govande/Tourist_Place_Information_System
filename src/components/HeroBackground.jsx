// HeroBackground: the cinematic landscape video behind the hero section.
// It is purely decorative, so it is hidden from screen readers (aria-hidden)
// and never receives clicks (pointer-events: none in App.css).
//
// Fallback: the static landscape photo is set as the CSS background of
// .hero-media, so it shows whenever the video is not rendered or cannot play.

// Decide once, when the page loads, whether the video should play at all.
// We skip it for people who ask for reduced motion or for data saving.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const prefersSavingData = navigator.connection?.saveData === true
const shouldPlayVideo = !prefersReducedMotion && !prefersSavingData

function HeroBackground() {
  return (
    <div className="hero-media" aria-hidden="true">
      {shouldPlayVideo && (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/wanderlust-hero-poster.jpg"
          tabIndex={-1}
          disablePictureInPicture
        >
          {/* The browser uses the first format it supports: WebM (smaller), then MP4 */}
          <source src="/videos/wanderlust-hero.webm" type="video/webm" />
          <source src="/videos/wanderlust-hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-overlay" />
    </div>
  )
}

export default HeroBackground
