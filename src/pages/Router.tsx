import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import ManageInvoice from "./ManageInvoice";
import ListStudentByParent from "./ListStudentByParent";
import PrintInvoice from "./PrintInvoice";

const PageRouter: React.FC = () => {
  return (
    <Router basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage" element={<ManageInvoice />} />
        <Route path="/manage/students" element={<ListStudentByParent />} />
        <Route path="/print-invoice" element={<PrintInvoice />} />
      </Routes>
    </Router>
  );
};

export default PageRouter;
