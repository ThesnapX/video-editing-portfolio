import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Harry Creations",
    description: "Professional video editing services",
    url: "https://harry-creations.vercel.app",
    logo: "https://harry-creations.vercel.app/logo.png",
    sameAs: [
      "https://instagram.com/harrycreations",
      "https://twitter.com/harrycreations",
      "https://youtube.com/harrycreations",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    priceRange: "$$",
    telephone: "+91-XXXXXXXXXX",
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
