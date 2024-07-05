import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts";
import { SearchLibrary, AddLibrary, RequestRecord } from "../pages/Web";
import { Error } from "../pages/Error";
import { Login } from "../pages/Auth";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="*" element={loadLayout(MainLayout, Error)} />
      <Route path="/" element={loadLayout(MainLayout, SearchLibrary)} />
      <Route
        path="/request-record"
        element={loadLayout(MainLayout, RequestRecord)}
      />
      <Route path="/add-library" element={loadLayout(MainLayout, AddLibrary)} />
      <Route path="/signin" element={loadLayout(MainLayout, Login)} />
    </Routes>
  );
}
