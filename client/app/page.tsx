import Image from "next/image";
import GradientWaves from "@/components/gradient-waves";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-provider";

{/* <a href="https://www.flaticon.com/free-icons/sofa" title="sofa icons">Sofa icons created by Magnific - Flaticon</a> */}

export default function () {
  return (
    <>
    <ModeToggle className="absolute top-4 right-4" />
      <GradientWaves />
      <main className="flex-1 flex flex-col w-full min-h-screen gap-5 items-center justify-center z-10">
        <Image 
          src="/logo.png"
          alt="Logo"
          width={81}
          height={81}
          priority
        />
        <h1 className="text-6xl font-bold font-serif">Couch</h1>
        <h2 className="text-2xl font-serif">Deterministic AI platform to tailor resumes</h2>
        <section id="cta" className="flex gap-4">
          <Button variant="default" className="rounded-xl p-5">Get Started</Button>
          <Button variant="secondary" className="rounded-xl p-5">Learn More</Button>
        </section>
      </main>      
    </>
  );
}
