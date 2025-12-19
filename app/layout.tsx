import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vivek Keshava",
  description:
    "Vivek Keshava's personal portfolio showcasing work experience, technical skills, projects, and publications in software engineering and cloud architecture.",
  keywords: [
    "Vivek Keshava",
    "Software Engineer",
    "Full-Stack Developer",
    "Cloud Architect",
    "Portfolio",
    "Credit Acceptance",
    "Microservices",
    "AWS",
    "Kubernetes",
    "GraphQL",
    "React",
    "Java",
  ],
  openGraph: {
    title: "Vivek Keshava",
    description:
      "Vivek Keshava's personal portfolio showcasing work experience, technical skills, projects, and publications.",
    url: "https://vivekkeshava.com", // Replace with your actual deployed URL
    siteName: "Vivek Keshava",
    images: [
      {
        url: "/images/vivek-profile.png", // Ensure this path is correct and image exists
        width: 800,
        height: 600,
        alt: "Vivek Keshava Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Keshava - Software Engineer Portfolio",
    description:
      "Vivek Keshava's personal portfolio showcasing work experience, technical skills, projects, and publications.",
    images: ["/images/vivek-profile.png"], // Ensure this path is correct and image exists
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
