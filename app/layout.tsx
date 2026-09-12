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
    default: "Mahmudul Hasan — Full Stack DevOps Engineer",
    template: "%s | Mahmudul Hasan",
  },
  description:
    "Full Stack DevOps Engineer based in Dhaka, Bangladesh. Specializing in Next.js, React, TypeScript, Python, FastAPI, NestJS, Docker, and AWS Cloud CI/CD. Building resilient systems from architecture to zero-downtime deployment.",
  keywords: [
    "Full Stack DevOps Engineer",
    "Mahmudul Hasan",
    "MK Mahmud",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "NestJS",
    "Docker",
    "AWS",
    "CI/CD",
    "PostgreSQL",
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
    title: "Mahmudul Hasan — Full Stack DevOps Engineer",
    description:
      "Full Stack DevOps Engineer specializing in Next.js, FastAPI, PostgreSQL, Docker, and AWS Cloud CI/CD pipelines.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahmudul Hasan — Full Stack DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmudul Hasan — Full Stack DevOps Engineer",
    description:
      "Full Stack DevOps Engineer specializing in Next.js, FastAPI, Docker, and AWS Cloud CI/CD.",
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
    jobTitle: "Full Stack DevOps Engineer",
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
      "Python",
      "FastAPI",
      "NestJS",
      "Docker",
      "AWS",
      "CI/CD Pipelines",
      "GitHub Actions",
      "PostgreSQL",
      "Redis",
      "LangChain",
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
