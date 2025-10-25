"use client";

import { useEffect, useState } from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SinglePage = ({ params }) => {
  const { slug } = params;
  const router = useRouter();
  const { data: session } = useSession();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", level: "", desc: "" });

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
        setForm({ title: data.title, level: data.level, desc: data.desc });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!post) return <div className={styles.error}>Post not found</div>;

  const isAuthor = session?.user?.email === post?.userEmail;

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update post");
      const updated = await res.json();
      setPost(updated);
      setEditing(false);
      alert(" Post updated successfully!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(" Error updating post");
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      alert(" Post deleted successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert(" Error deleting post");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          {editing ? (
  
            // UPDATE FORM
            
            <form onSubmit={handleUpdate} className={styles.form}>
              <h2 className={styles.formTitle}> Edit Course Details</h2>

              <label className={styles.label}>Course Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={styles.input}
                placeholder="Enter course title"
              />

              {/* <label className={styles.label}>Difficulty Level</label>
              <input
                type="text"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className={styles.input}
                placeholder="Beginner / Intermediate / Advanced"
              /> */}
              <label className={styles.label}>Difficulty Level</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className={styles.select}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <label className={styles.label}>Description</label>
              <textarea
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className={styles.textarea}
                placeholder="Write detailed course description..."
                rows={8}
              />

              <div className={styles.buttonRow}>
                <button type="submit" className={styles.saveBtn}>
                   Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className={styles.cancelBtn}
                >
                  ✖ Cancel
                </button>
              </div>
            </form>
          ) : (

            // NORMAL VIEW
            <>
              <h1 className={styles.title}>{post.title}</h1>
              <h3 className={styles.level}>{post.level}</h3>

              <div className={styles.user}>
                {post?.user?.image && (
                  <div className={styles.userImageContainer}>
                    <Image
                      src={post.user.image}
                      alt={post.user.name || "User"}
                      fill
                      className={styles.avatar}
                    />
                  </div>
                )}
                <div className={styles.userTextContainer}>
                  <span className={styles.username}>{post.user?.name}</span>
                  <span className={styles.date}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Show buttons only for the author */}
              {isAuthor && (
                <div className={styles.actionButtons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditing(true)}
                  >
                     Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={handleDelete}>
                     Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {post.img && (
          <div className={styles.imageContainer}>
            <Image src={post.img} alt={post.title} fill className={styles.image} />
          </div>
        )}
      </div>

      {!editing && (
        <div className={styles.content}>
          <div className={styles.post}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: post.desc }}
            />
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
