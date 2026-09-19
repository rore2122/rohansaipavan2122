import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://rohansaipavan.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Rohan Sai Pavan | Data Analyst | AI & Data Science",
    template: "%s | Rohan Sai Pavan",
  },

  description:
    "Official portfolio of Rohan Sai Pavan — Data Analyst specializing in Business Analytics, Data Analytics, Business Intelligence, AI, forecasting, Power BI, Tableau, Python, SQL, SAS and AML/KYC analytics.",

  keywords: [
    "Rohan Sai Pavan",
    "Rohan Sai Pavan Portfolio",
    "Rohan Sai Pavan Data Analyst",
    "Data Analyst",
    "Business Analyst",
    "Business Analytics",
    "Data Analytics",
    "Business Intelligence",
    "AI and Data Science",
    "Artificial Intelligence and Data Science",
    "Power BI",
    "Tableau",
    "Python",
    "SQL",
    "SAS",
    "Data Visualization",
    "Predictive Analytics",
    "Forecasting",
    "AML KYC Analytics",
  ],

  authors: [
    {
      name: "Rohan Sai Pavan",
      url: siteUrl,
    },
  ],

  creator: "Rohan Sai Pavan",
  publisher: "Rohan Sai Pavan",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Rohan Sai Pavan | Data Analyst | AI & Data Science",
    description:
      "Portfolio of Rohan Sai Pavan — Data Analyst specializing in Business Analytics, Data Analytics, Business Intelligence, AI, forecasting and AML/KYC analytics.",
    siteName: "Rohan Sai Pavan",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rohan Sai Pavan | Data Analyst | AI & Data Science",
    description:
      "Data Analyst portfolio featuring Business Analytics, Business Intelligence, AI, forecasting, Power BI, Tableau, Python, SQL and SAS projects.",
  },

  category: "technology",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohan Sai Pavan",
  url: siteUrl,
  jobTitle: "Data Analyst",
  description:
    "Data Analyst specializing in Business Analytics, Data Analytics, Business Intelligence, AI and Data Science.",
  knowsAbout: [
    "Data Analytics",
    "Business Analytics",
    "Business Intelligence",
    "Artificial Intelligence",
    "Data Science",
    "Power BI",
    "Tableau",
    "Python",
    "SQL",
    "SAS",
    "Predictive Analytics",
    "Forecasting",
    "AML/KYC Analytics",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "SRM Institute of Science and Technology",
    },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body>
        <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <defs>
            <filter id="lg-lens" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.009 0.012" numOctaves="2" seed="7" result="lg-noise" />
              <feGaussianBlur in="lg-noise" stdDeviation="3" result="lg-noise-soft" />
              <feDisplacementMap in="SourceGraphic" in2="lg-noise-soft" scale="16" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
