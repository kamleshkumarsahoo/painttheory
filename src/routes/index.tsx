import { createFileRoute, Link } from "@tanstack/react-router";
import { useHomeArtworks } from "@/hooks/useHomeArtworks";

import { HomeHero } from "@/components/home/HomeHero";
import { OnTheWall } from "@/components/home/OnTheWall";
import { Testimonials } from "@/components/home/Testimonials";
import { JournalPreview } from "@/components/home/JournalPreview";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { WhatHappensHere } from "@/components/home/WhatHappensHere";
import { ArtistTeaser } from "@/components/home/ArtistTeaser";
import { CommissionCTA } from "@/components/home/CommissionCTA";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const { artworks, selected } = useHomeArtworks();
  return <>
    <HomeHero />
    <OnTheWall artworks={artworks} />
    <SelectedWorks artworks={selected} />
    <WhatHappensHere />
    <ArtistTeaser/ >
    <Testimonials />
    <JournalPreview />
    <CommissionCTA />
  </>;
}
