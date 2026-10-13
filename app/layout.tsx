import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bridesofkochi.com"),
  title: {
    default: "BridesOfKochi — Best Wedding Photographers & Makeup Artists in Kochi",
    template: "%s | BridesOfKochi"
  },
  description:
    "Verified list of top wedding photographers & bridal makeup artists in Kochi with price, portfolio & direct WhatsApp contact. Kakkanad, Fort Kochi, Edappally, Kaloor & more.",
  openGraph: {
    type: "website",
    siteName: "BridesOfKochi",
    title: "Find Best Wedding Photographers & Makeup Artists in Kochi",
    description: "Verified vendors with price, portfolio & direct WhatsApp contact."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BridesOfKochi",
              url: "https://bridesofkochi.com",
              description: "Hyper-local wedding vendor directory for Kochi, Kerala."
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
