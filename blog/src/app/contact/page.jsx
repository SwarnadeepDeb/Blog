import React from "react";
import styles from "./contact.module.css";

const ContactUs = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get in Touch</h1>
      <p className={styles.description}>
        Feel free to reach out for collaborations or just a friendly chat. We’d love to hear from you!
      </p>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="Your Name" className={styles.input} />
          <input type="email" placeholder="Your Email" className={styles.input} />
        </div>
        <textarea
          placeholder="Your Message"
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
