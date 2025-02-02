"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import styles from "./writePage.module.css";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading file...");
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("File uploaded successfully:", result);

        // Store the uploaded image and insertion point
        setUploadedImages((prev) => [
          ...prev,
          `/uploads/${file.name.replaceAll(" ", "_")}`,
        ]);
        alert("File uploaded successfully!");
      } else {
        console.error("Upload failed:", result);
        alert("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred during the upload. Please try again.");
    } finally {
      setFile(null);
    }
  };

  const handleInsertImage = (index) => {
    const imageToInsert = uploadedImages[index];
    console.log(imageToInsert);

    const updatedContent = `${value}<div class="inserted-image-container">
      <img src="${imageToInsert}" alt="Uploaded Image" class="inserted-image" />
    </div>`;

    setValue(updatedContent);
    setUploadedImages((prev) => prev.filter((_, i) => i !== index)); // Remove the inserted image
  };

  const handleSubmit = async () => {
    console.log("Submitting post...");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        desc: value,
        img: uploadedImages[0] || "", // First image as the main thumbnail
        slug: title.toLowerCase().replace(/ /g, "-"),
        catSlug: catSlug || "style",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Post created successfully:", data);
      if(data.slug!=undefined)router.push(`/posts/${data.slug}`);
      else alert(data.message);
    } else {
      alert("Failed to create post. Please try again.");
    }
  };

  if (status === "loading")
    return <div className={styles.loading}>Loading...</div>;
  if (status === "unauthenticated") router.push("/");

  return (
    <div className={styles.container}>
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Category Selection */}
      <select
        className={styles.select}
        value={catSlug}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">Tech</option>
        <option value="fashion">Coding</option>
        <option value="food">Travel</option>
      </select>

      {/* Editor and File Upload */}
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="Add" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            {/* File Input */}
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
              accept="image/*"
            />
            <label htmlFor="image" className={styles.addButton}>
              <Image src="/image.png" alt="Image" width={16} height={16} />
            </label>
            <button className={styles.uploadButton} onClick={handleFileUpload}>
              Upload
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>

      {/* Insert Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className={styles.uploadedImages}>
          <h4>Uploaded Images:</h4>
          {uploadedImages.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <img
                src={image}
                alt={`Uploaded-${index}`}
                style={{ maxWidth: "100px" }}
              />
              <button
                className={styles.insertButton}
                onClick={() => handleInsertImage(index)}
              >
                Insert
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Publish Button */}
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
