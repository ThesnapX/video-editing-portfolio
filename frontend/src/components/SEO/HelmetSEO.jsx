import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetSEO = ({
  title,
  description,
  keywords,
  url,
  image,
  author = "Harry Creations",
}) => {
  const siteTitle = title
    ? `${title} | Harry Creations`
    : "Harry Creations - Professional Video Editor";
  const siteDescription =
    description ||
    "Professional video editing services. Transform your ideas into stunning visual stories with Harry Creations. Expert video editor with 1+ year experience.";
  const siteKeywords =
    keywords ||
    "video editing, video editor, motion graphics, video production, YouTube editing, commercial editing, music video editing";
  const siteUrl = url || "https://harry-creations.vercel.app";
  const siteImage = image || "https://harry-creations.vercel.app/og-image.jpg";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default HelmetSEO;
