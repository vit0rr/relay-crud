import React from "react";
import { Footer as MDLFooter, FooterSection } from "react-mdl";
import styles from "./Footer.scss";

export default function Footer() {
  return (
    <MDLFooter className={styles.root} size="mini">
      <FooterSection type="middle"></FooterSection>
    </MDLFooter>
  );
}
