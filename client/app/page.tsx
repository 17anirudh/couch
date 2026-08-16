import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function () {
  return (
    <>
      <video 
        src="/background.mp4" 
        autoPlay 
        loop 
        muted 
        className="absolute inset-0 w-screen h-screen object-cover -z-50"
      />
      <main className="flex-1 flex flex-col w-full min-h-screen gap-5 items-center justify-center z-10 text-white">
        <Image 
          src="/logo.webp"
          alt="Logo"
          width={150}
          height={150}
          priority
          className="rounded-xl w-auto h-auto hover:scale-110 active:scale-90 transition-transform duration-200"
        />
        <h1 className="text-6xl font-bold font-serif text-white">Couch</h1>
        <h2 className="text-2xl font-serif">Deterministic AI platform to tailor and track applications</h2>
        <section id="cta" className="flex gap-4">
          <Button variant="default" className="rounded-xl p-5 hover:scale-110 active:scale-90 transition-transform duration-200" render={
            <Link href="/auth/register">Get Started</Link>
          } />
          <Button variant="secondary" className="rounded-xl p-5 hover:scale-110 active:scale-90 transition-transform duration-200">Learn More</Button>
        </section>
      </main>      
    </>
  );
}
