// ============================================================
// CONTACTFORM.JSX — Simple Contact Form (Day 3)
// ============================================================
// A standalone contact form component with form validation.
// This is a simpler alternative to the ContactSection's
// inline form — used for learning form basics.
//
// WHAT YOU WILL LEARN:
// - useState for managing form data (object state)
// - Controlled inputs (value + onChange pattern)
// - Form submission with e.preventDefault()
// - Conditional rendering for validation messages
// - Dynamic className for error styling
// - Async functions and try/catch/finally
//
// CONCEPTS COVERED:
// - Object destructuring in event handlers
// - Spread operator for updating state: { ...prev, [name]: value }
// - Ternary expressions in className
// - Conditional rendering with && operator
//
// ============================================================

// STEP 1: Import useState from "react"

/* --- YOUR IMPORTS GO HERE --- */
import { useState } from "react";

// STEP 2: Create and export the ContactForm component
// export default function ContactForm() { ... }
//
// STEP 3: State variables (4 total)
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", email: "", message: ""
//   });
//
// STEP 4: Event handlers
//
//   handleChange — updates formData when user types
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
//     DISCUSSION: What does { ...prev, [name]: value } do?
//     It creates a copy of the previous state and updates
//     only the field that changed (computed property name).
//
//   handleSubmit — validates and "sends" the form
//     - Call e.preventDefault() to stop page reload
//     - Set submitted to true (shows validation errors)
//     - Check if all fields are filled
//     - Set loading to true, simulate sending, show success/error
//
//   sendEmail — simulates an API call
//     const sendEmail = async (data) => {
//       console.log("Email would be sent with:", data);
//       return new Promise((resolve) => setTimeout(resolve, 1000));
//     };
//
// STEP 5: Build the JSX
//   <form onSubmit={handleSubmit} className="...">
//     - <h2> title
//     - Message display (success or error)
//     - Input fields: firstName, lastName (2-column grid)
//     - Input field: email (full width, col-span-2)
//     - Textarea: message (full width, col-span-2)
//     - Submit button (disabled when loading)
//
//   Each input should be a CONTROLLED INPUT:
//     <input
//       type="text"
//       name="firstName"
//       value={formData.firstName}
//       onChange={handleChange}
//       className={`... ${submitted && !formData.firstName ? "border-red" : "border-normal"}`}
//     />
//
//   Show validation error below each input:
//     {submitted && !formData.firstName && (
//       <p className="text-red-700 text-sm">First name is required</p>
//     )}

/* --- YOUR COMPONENT CODE GOES HERE --- */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (data) => {
    console.log("Email would be sent with:", data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await sendEmail(formData);
      setMessage("Thanks! Your message has been sent.");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setSubmitted(false);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto my-16 grid max-w-2xl grid-cols-2 gap-4 rounded-2xl bg-[var(--cream)] p-8 shadow-lg"
    >
      <h2 className="col-span-2 text-3xl font-bold text-[var(--brown-900)]">
        Get in Touch
      </h2>

      {message && (
        <p
          className={`col-span-2 text-sm font-semibold ${
            submitted ? "text-red-700" : "text-green-700"
          }`}
        >
          {message}
        </p>
      )}

      <div>
        <label
          htmlFor="firstName"
          className="mb-1 block text-sm font-semibold text-[var(--brown-700)]"
        >
          First name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-[var(--brown-900)] ${
            submitted && !formData.firstName
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {submitted && !formData.firstName && (
          <p className="mt-1 text-sm text-red-700">First name is required</p>
        )}
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="mb-1 block text-sm font-semibold text-[var(--brown-700)]"
        >
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-[var(--brown-900)] ${
            submitted && !formData.lastName
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {submitted && !formData.lastName && (
          <p className="mt-1 text-sm text-red-700">Last name is required</p>
        )}
      </div>

      <div className="col-span-2">
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-semibold text-[var(--brown-700)]"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-[var(--brown-900)] ${
            submitted && !formData.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {submitted && !formData.email && (
          <p className="mt-1 text-sm text-red-700">Email is required</p>
        )}
      </div>

      <div className="col-span-2">
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-semibold text-[var(--brown-700)]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-[var(--brown-900)] ${
            submitted && !formData.message
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {submitted && !formData.message && (
          <p className="mt-1 text-sm text-red-700">Message is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="col-span-2 rounded-full bg-[var(--brown-700)] px-6 py-3 font-semibold text-[var(--cream)] transition hover:bg-[var(--brown-600)] disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
