import React from "react";
import PagePort from "./components/PageManagement";

const GestionPortfolio = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <PagePort />
      </div>
    </div>
  );
};

export default GestionPortfolio;