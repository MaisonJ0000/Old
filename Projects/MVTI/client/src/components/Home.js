import React from 'react';
import ReviewInputSection from './sections/ReviewInputSection';
import MoviesSection from './sections/MoviesSection';
import KeyVisualSection from './sections/KeyVisualSection';

export default function Home() {
  return (
    <div className="Home__wrapper">
      <KeyVisualSection />
      <MoviesSection />
      <ReviewInputSection />
    </div>
  );
}
