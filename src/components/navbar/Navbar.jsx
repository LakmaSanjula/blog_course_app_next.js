"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import { FiSearch, FiPhone, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <Image src="/Logo.png" alt="Company Logo" width={120} height={40} />
        </div>

        {/* Desktop Links */}
        <div className={`${styles.links} ${menuOpen ? styles.showMenu : ""}`}>
          <Link href="/" className={styles.link}>About us</Link>
          <Link href="/" className={styles.link}>
            Browse all courses <span className={styles.arrow}>›</span>
          </Link>
          <Link href="/" className={styles.link}>Webinar</Link>
          <Link href="/" className={styles.link}>Contact us</Link>

          {/* Mobile-only Auth Section */}
          <div className={styles.mobileActions}>
            <FiSearch className={styles.icon} />
            <button className={styles.callBtn}>
              <FiPhone className={styles.btnIcon} />
              Book a call
            </button>
            <AuthLinks />
          </div>
        </div>

        {/* Right Actions (Desktop Only) */}
        <div className={styles.actions}>
          <FiSearch className={styles.icon} />
          <button className={styles.callBtn}>
            <FiPhone className={styles.btnIcon} />
            Book a call
          </button>
          <AuthLinks />
        </div>

        {/* Mobile Menu Toggle */}
        <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
