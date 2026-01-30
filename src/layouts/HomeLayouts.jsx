import React from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

function HomeLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default HomeLayout;
