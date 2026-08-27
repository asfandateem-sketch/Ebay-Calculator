import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

export const HeroVideo: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // 2. Mobile-first bandwidth preservation: do not download 2.65MB video on mobile screens
    const isMobileViewport = window.innerWidth < 768;
    if (isMobileViewport) {
      return;
    }

    // 3. Respect Data Saver if enabled in browser/OS
    const nav = navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } };
    if (nav.connection?.saveData || nav.connection?.effectiveType === '2g' || nav.connection?.effectiveType === 'slow-2g') {
      return;
    }

    // 4. Desktop Deferred Loading: Load video only after critical rendering path has finished
    const loadVideoDeferred = () => {
      setVideoSrc(VIDEO_URL);
    };

    if ('requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(loadVideoDeferred, { timeout: 2000 });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(loadVideoDeferred, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="hero-video-container" aria-hidden="true">
      {/* High-fidelity static poster backdrop (always present for 0 CLS and instant LCP) */}
      <div
        className="hero-video-poster"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, #f7f7f9 0%, #ffffff 75%)',
          zIndex: 0,
        }}
      />

      {videoSrc && !hasError && (
        <motion.video
          id="hero-background-video"
          className="hero-video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => setHasError(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoReady ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        />
      )}

      <div className="hero-video-overlay" style={{ zIndex: 2 }} />
    </div>
  );
};

