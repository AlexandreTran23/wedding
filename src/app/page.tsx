'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import InvitationReveal from '@/components/InvitationReveal';

export default function Home() {
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  return (
    <main className="relative chinese-pattern">
      <InvitationReveal onOpen={() => setStartHeroAnimation(true)}>
        <HeroSection startAnimation={startHeroAnimation} />
      </InvitationReveal>
    </main>
  );
}
