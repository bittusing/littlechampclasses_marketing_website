import { CTABand } from "@/components/home/CTABand";
import { CuriousHero } from "@/components/home/CuriousHero";
import { FAQ } from "@/components/home/FAQ";
import { FeaturedPrograms } from "@/components/home/FeaturedPrograms";
import { Features } from "@/components/home/Features";
import { HeroFeatureBar } from "@/components/home/HeroFeatureBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Programs } from "@/components/home/Programs";

export default function Home() {
  return (
    <>
      <CuriousHero />
      <HeroFeatureBar />
      <FeaturedPrograms />
      <div className="pt-10 sm:pt-14">
        <Features />
        <Programs />
        <HowItWorks />
        <FAQ />
        <CTABand />
      </div>
    </>
  );
}

