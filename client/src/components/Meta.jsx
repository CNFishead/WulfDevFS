import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
      </Helmet>
    </HelmetProvider>
  );
};

Meta.defaultProps = {
  title: "Wulf Developments",
  description: "Junior Software Engineer with a passion for code",
  keywords:
    "Software Engineering, developer, freelance, Software Developer, coding, personal portfolio",
};

export default Meta;
