import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.userAvatars}>
          <div className={styles.avatarGroup}>
            <div className={styles.avatar}>
              <span className={styles.avatarInitial}>J</span>
            </div>
            <div className={styles.avatar}>
              <span className={styles.avatarInitial}>M</span>
            </div>
            <div className={styles.avatar}>
              <span className={styles.avatarInitial}>S</span>
            </div>
          </div>
          <div className={styles.learnersBadge}>
            120,000+ happy learners
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleOrange}>Transform Your Career with</span>
            <br />
            <span className={styles.titleBlack}>Ofqual-Regulated Qualifications!</span>
          </h1>
          
          <p className={styles.description}>
            Join 120,000+ learners and earn accredited diplomas trusted by top<br />
            employers like Deloitte and NHS. Study online, at your pace.
          </p>

          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search for a course or a subject"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <Image 
              src="/hero.png" 
              alt="Students learning together" 
              width={550}
              height={400}
              className={styles.heroImage}
              priority
            />
            <div className={styles.categoryBadges}>
              <span className={styles.badge}>Business & Management</span>
              <span className={styles.badge}>Health & Social Care</span>
              <span className={styles.badge}>Information Technology</span>
              <span className={styles.badge}>Teaching & Education</span>
              <span className={styles.badge}>Accounting & Finance</span>
              <span className={styles.badge}>Accounting & Finance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className={styles.footer}>
        <p className={styles.footerText}>We&apos;re ready to lead you into the future:</p>
        <div className={styles.partnerLogos}>
          <div className={styles.logoPlaceholder}>Deloitte.</div>
          <div className={styles.logoPlaceholder}>Belfast<br/>City Council</div>
          <div className={styles.logoPlaceholder}>octopus<br/>energy</div>
          <div className={styles.logoPlaceholder}>NHS</div>
        </div>
      </div>
    </div>
  );
};

export default Featured;