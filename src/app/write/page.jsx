"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState("/demo.jpg");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [level, setLevel] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMedia(data.url);
      } else {
        alert("Image upload failed. Using default image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed. Using default image.");
    } finally {
      setUploading(false);
    }
  };

  if (status === "loading") return <div className={styles.loading}>Loading...</div>;
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
        level: level || "Beginner",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formCard}>
        <h1 className={styles.formTitle}>Add a New Course</h1>

        {/* Title */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Enter course title"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Accounting">Account</option>
            <option value="Science">Science</option>
            <option value="Coding">Coding</option>
            <option value="Technology">Technology</option>
            <option value="Health Care">Health Care</option>
            <option value="Art">Art</option>
          </select>
        </div>

        {/* Level */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Level</label>
          <select className={styles.select} onChange={(e) => setLevel(e.target.value)}>
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <div className={styles.editor}>
            <button className={styles.button} onClick={() => setOpen(!open)}>
              <Image src="/plus.png" alt="" width={16} height={16} />
            </button>
            {open && (
              <div className={styles.add}>
                <input
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <button className={styles.addButton} disabled={uploading}>
                  <label htmlFor="image" style={{ cursor: uploading ? "not-allowed" : "pointer" }}>
                    <Image src="/image.png" alt="" width={16} height={16} />
                  </label>
                </button>
              </div>
            )}
            {uploading && <p>Uploading image...</p>}
            <ReactQuill
              className={styles.textArea}
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Write your course description here..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className={styles.publish} onClick={handleSubmit}>
          Add New Course
        </button>
      </div>
    </div>
  );
};

export default WritePage;
