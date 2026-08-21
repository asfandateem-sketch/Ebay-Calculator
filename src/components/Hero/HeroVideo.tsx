import React, { useState } from 'react';
import { motion } from 'motion/react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

export const HeroVideo: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="hero-video-container" aria-hidden="true">
      {!hasError ? (
        <motion.video
          id="hero-background-video"
          className="hero-video"
          src={VIDEO_URL}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onError={() => setHasError(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : (
        /* Clean fallback if network fails */
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, #f4f4f6 0%, #ffffff 70%)',
          }}
        />
      )}
      <div className="hero-video-overlay" />
    </div>
  );
};
