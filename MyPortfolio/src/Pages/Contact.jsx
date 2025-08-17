import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "../Style/Contact.css";

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch("http://localhost:8000/api/contact/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitStatus({
            message: "Message sent successfully!",
            isError: false,
          });
          resetForm();
        } else {
          const errorMessage = typeof data.errors === "string"
            ? data.errors
            : Object.values(data.errors).join(" ");
          setSubmitStatus({
            message: errorMessage || "Failed to send message.",
            isError: true,
          });
        }
      } catch (error) {
        setSubmitStatus({
          message: "Network error. Please try again later.",
          isError: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="contact-container" id="contact">
      <h2 className="contact-title">Contact</h2>

      {submitStatus.message && (
        <div className={`submit-status ${submitStatus.isError ? "error" : "success"}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? "input-error" : ""}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? "input-error" : ""}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={formik.touched.message && formik.errors.message ? "input-error" : ""}
          />
          {formik.touched.message && formik.errors.message && (
            <div className="error-message">{formik.errors.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
