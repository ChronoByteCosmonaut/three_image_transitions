import Link from "next/link";
import React from "react";
import styles from "./navigation.module.scss";
import Image from "next/image";
function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.mainNav}>
        <Link href="/">
          <Image
            src={"/bd_logo.svg"}
            alt="Born Digital Logo"
            width={80}
            height={24}
            priority
          />
        </Link>
        {/* <div className={styles.links}>
          <Link className={styles.link} href="/experiments/images">
            Image transition
          </Link>
          <Link className={styles.link} href="/experiments/gallery">
            Gallery
          </Link>
          <Link className={styles.link} href="/experiments/physics">
            Physics
          </Link>
        </div> */}
      </div>
      <div className={styles.borderBottom} />
    </nav>
  );
}

export default Navigation;
