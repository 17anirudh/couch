import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google";
import "@styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import RootProvider from "@/context/RootProvider";

const robotoSlabSerif = Roboto_Slab({ subsets: ['latin'], variable: '--font-serif' });
const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Couch",
  description: "Deterministic AI platform to tailor resumes",
  icons: [
    {
      url: "/logo.png",
      sizes: "64x64",
      type: "image/png"
    }
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${geistSans.variable} ${geistMono.variable} ${robotoSlabSerif.variable}`} suppressHydrationWarning>
      <body className="min-h-screen w-screen flex flex-col gap-3 overflow-hidden relative">
        <RootProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}