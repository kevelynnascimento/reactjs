import React from 'react';
import { Routes, Route } from "react-router-dom";
import CompaniesCreation from "../../pages/App/Companies/Creation";
import CompaniesDetail from '../../pages/App/Companies/Detail';
import CompaniesEdition from "../../pages/App/Companies/Edition";
import CompaniesListing from "../../pages/App/Companies/Listing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CompaniesListing />} />
      <Route path="/empresas" element={<CompaniesListing />} />
      <Route path="/empresas/criacao" element={<CompaniesCreation />} />
      <Route path="/empresas/edicao" element={<CompaniesEdition />} />
      <Route path="/empresas/detalhe" element={<CompaniesDetail />} />
    </Routes>
  );
}

export default AppRoutes;