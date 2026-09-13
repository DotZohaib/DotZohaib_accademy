import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/components/ProgressBarProvider";

// Font Setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DotZohaib EduTech | Learn Programming Languages & All Courses Online",
  description: "DotZohaib EduTech offers comprehensive courses in Next.js, JavaScript, Python, C++, and more. From beginner to advanced, our expert-led tutorials, hands-on projects, and interactive lessons help you master coding skills and excel in tech. Start your development journey today with our up-to-date resources across all major languages and frameworks.",
  keywords: "programming courses, learn coding, web development, Next.js tutorial, JavaScript course, Python programming, C++ learning, coding bootcamp, programming for beginners, full-stack development, software engineering, tech skills, coding certification, online programming classes, learn to code",
  openGraph: {
    title: "DotZohaib EduTech | Master Programming Languages With Expert-Led Courses",
    description: "Transform your career with our comprehensive programming courses. Learn Next.js, JavaScript, Python, C++ and more through practical, project-based tutorials designed for all skill levels.",
    images: [{ url: "/images/WhatsApp Image 2025-02-17 at 22.31.24_129f5135.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
    url: "https://dotzohaibedutech.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "DotZohaib EduTech | Expert Programming Courses Online",
    description: "Learn coding from scratch or advance your skills with our comprehensive courses in Next.js, JavaScript, Python, C++ and more.",
    images: ["/images/WhatsApp Image 2025-02-17 at 22.31.24_129f5135.jpg"],
    creator: "@dotzohaibedutech",
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
  authors: [{ name: "Zohaib Ali Dayo" }],
  category: "Education",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  metadataBase: new URL("https://dotzohaibedutech.vercel.app/"),
};

// RootLayout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
