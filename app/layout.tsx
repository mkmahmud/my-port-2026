import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mkmahmud.dev"
  ),
  title: {
    default: "Mahmudul Hasan — Full Stack Developer & AI Engineer",
    template: "%s | Mahmudul Hasan",
  },
  description:
    "Full Stack Developer & AI Engineer based in Dhaka, Bangladesh. Specializing in Next.js, React, Node.js, Python, and AI/ML integrations. Building intelligent systems from database to deployment.",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "LangChain",
    "Node.js",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: "Mahmudul Hasan", url: "https://mkmahmud.dev" }],
  creator: "Mahmudul Hasan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mkmahmud.dev",
    siteName: "Mahmudul Hasan — Portfolio",
    title: "Mahmudul Hasan — Full Stack Developer & AI Engineer",
    description:
      "Building intelligent systems from database to deployment. Full Stack Developer & AI Engineer specializing in React, Next.js, Python, and AI/ML.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahmudul Hasan — Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmudul Hasan — Full Stack Developer & AI Engineer",
    description:
      "Building intelligent systems from database to deployment.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mahmudul Hasan",
    alternateName: "MK",
    url: "https://mkmahmud.dev",
    jobTitle: "Full Stack Developer & AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Codexmine",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [
      "https://github.com/mkmahmud",
      "https://linkedin.com/in/mkmahmud",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "FastAPI",
      "LangChain",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "AWS",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-base text-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
