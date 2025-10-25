import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { Star } from "lucide-react"; // optional, for star icon

const Card = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={item.img}
          alt={item.title}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <Star size={16} color="#f5b50a" />
            <span>{item.rating || "4.5"} (star)</span>
          </div>
          <div className={styles.detailItem}>
            <span>⏱ {item.duration || "1 Year"}</span>
          </div>
          <div className={styles.detailItem}>
            <span>🎓 {item.credits || "42 Credits"}</span>
          </div>
        </div>

        <Link href={`/posts/${item.slug}`} className={styles.button}>
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default Card;
