import React from "react";
import "normalize.css/normalize.css";
import "react-mdl/extra/css/material.cyan-red.min.css";
import Navbar from "../Navbar/NavbarComponent";
import Footer from "../Footer/FooterContainer";
import styles from "./App.scss";

export default function App() {
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.greeting}>
        <h1 className={styles.sawasdee}>Vitor's Crud</h1>
      </div>
      <div className={styles.content}>Crud</div>
      <Footer />
    </div>
  );
}
