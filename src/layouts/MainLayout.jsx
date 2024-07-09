import React from "react";
import { Footer } from "../components";
import { TopBar } from "../components/Web";

export function MainLayout(props) {
  const { children } = props;

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <TopBar />
      <div className="w-full flex-1 mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}
