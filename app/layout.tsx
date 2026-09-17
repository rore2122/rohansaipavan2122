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

      <body>{children}</body>
    </html>
  );
}
