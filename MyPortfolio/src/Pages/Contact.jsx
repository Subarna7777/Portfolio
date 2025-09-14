import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from "react-icons/fa";
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
            message: "Message sent successfully! I'll get back to you soon.",
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
    <section className="contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's work together</h3>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to send me a message.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>subarna.khatiwada13@gmail.com</p>
                </div>
              </div>
              
              {/* Add more contact details if needed */}
            </div>
          </div>

          <div className="contact-form-container">
            {submitStatus.message && (
              <div className={`submit-status ${submitStatus.isError ? "error" : "success"}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="contact-form">
              <div className="form-group">
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Your Name"
                    className={formik.touched.name && formik.errors.name ? "input-error" : ""}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <div className="error-message">{formik.errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <div className="input-container">
                  <FaEnvelope className="input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Your Email"
                    className={formik.touched.email && formik.errors.email ? "input-error" : ""}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="error-message">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <div className="input-container textarea-container">
                  <FaComment className="input-icon" />
                  <textarea
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    placeholder="Your Message"
                    rows="5"
                    className={formik.touched.message && formik.errors.message ? "input-error" : ""}
                  />
                </div>
                {formik.touched.message && formik.errors.message && (
                  <div className="error-message">{formik.errors.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <>
                    <div className="button-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="button-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;