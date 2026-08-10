import { useState } from "react";

/*
 * ============================================================
 * VALIDATION PATTERNS
 * ============================================================
 */

/*
 * EMAIL VALIDATION
 *
 * Allows common and valid email domain extensions.
 *
 * Examples:
 * monik@gmail.com       ✅
 * monik@gmail.in        ✅
 * monik@yahoo.com       ✅
 * monik@outlook.com     ✅
 * monik@hotmail.com     ✅
 * monik@company.org     ✅
 * monik@college.edu     ✅
 * monik@company.co.in   ✅
 * monik@gmail.commm     ❌
 * monik@gmail           ❌
 * monik@company.xyz     ❌
 */
const EMAIL_PATTERN =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org|net|edu|gov|mil|int|co|io|ai|app|dev|me|tv|info|biz|name|pro|xyz|online|site|tech|store|shop|cloud|digital|agency|solutions|services|company|uk|us|ca|au|nz|de|fr|jp|cn|sg|ae|sa|ie|nl|ch|es|it|br|mx|za|eu|asia|co\.in|co\.uk|co\.au|com\.au|com\.br|com\.cn|com\.sg|com\.ae|org\.uk|net\.uk|gov\.uk)$/i;

/*
 * PASSWORD VALIDATION
 *
 * Signup password must contain:
 * - At least 8 characters
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 *
 * Example of valid password:
 *   Sipnow123!
 */
const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

/*
 * NAME VALIDATION
 *
 * Name can contain:
 * - English letters
 * - Spaces
 *
 * Minimum: 2 characters
 * Maximum: 50 characters
 *
 * Valid:
 *   Monik
 *   Monik Kumar
 *
 * Invalid:
 *   Monik123
 *   Monik@123
 *   12345
 */
const NAME_PATTERN = /^[A-Za-z ]{2,50}$/;

/*
 * ============================================================
 * REUSABLE FORM FIELD
 * ============================================================
 *
 * This component is used for:
 * - Name
 * - Mobile
 * - Email
 * - Password
 * - Confirm password
 *
 * The "required" prop controls whether the red * is displayed.
 */
function Field({ error, icon, label, required = false, ...inputProps }) {
  return (
    <label className="block">
      {/* Field label */}
      <span className="mb-2 block text-sm font-medium text-gray-200">
        {label}

        {/* Red asterisk for mandatory fields */}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </span>

      {/* Input container */}
      <span
        className={`flex items-center overflow-hidden rounded-xl border bg-[#1a171c] ${
          error ? "border-red-500" : "border-primary/20"
        }`}
      >
        {/* Input icon */}
        <span className="material-symbols-outlined px-4 text-[19px] text-primary">
          {icon}
        </span>

        {/* Input */}
        <input
          className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3.5 text-white placeholder:text-gray-500 focus:ring-0"
          aria-invalid={Boolean(error)}
          aria-required={required}
          {...inputProps}
        />
      </span>

      {/* Field-specific error message */}
      {error && (
        <span className="mt-1 block text-xs text-red-400">{error}</span>
      )}
    </label>
  );
}

/*
 * ============================================================
 * READ REGISTERED USER
 * ============================================================
 *
 * The current application stores the demo user in localStorage.
 *
 * If localStorage contains invalid data, return null instead
 * of crashing the application.
 */
function readUser() {
  try {
    return JSON.parse(window.localStorage.getItem("sipnow-user"));
  } catch {
    return null;
  }
}

/*
 * ============================================================
 * AUTH COMPONENT
 * ============================================================
 */

export default function Auth({ mode, onAuthenticated, onSwitch }) {
  /*
   * mode is either:
   *   "signup"
   *   "login"
   */
  const isSignup = mode === "signup";

  /*
   * Store all form values in one object.
   */
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /*
   * Stores individual field validation errors.
   *
   * Example:
   *
   * {
   *   email: "Email address is required.",
   *   password: "Password is required."
   * }
   */
  const [errors, setErrors] = useState({});

  /*
   * General authentication message.
   *
   * Used mainly when login credentials are incorrect.
   */
  const [message, setMessage] = useState("");

  /*
   * ==========================================================
   * HANDLE INPUT CHANGES
   * ==========================================================
   */

  const updateValue = (event) => {
    const { name, value } = event.target;

    /*
     * NAME SANITIZATION
     *
     * If the current field is "name", remove everything
     * except English letters and spaces.
     *
     * Example:
     *
     * User enters:
     *   Monik123@#
     *
     * Input becomes:
     *   Monik
     *
     * This improves the user experience because invalid
     * characters don't remain inside the field.
     */

    /*
     * MOBILE SANITIZATION
     *
     * If the current field is "mobile", allow numbers only
     * and limit the input to 9 digits.
     *
     * Example:
     *
     * User enters:
     *   98765abc@12
     *
     * Input becomes:
     *   9876512
     *
     * Letters, spaces and special characters are removed.
     * More than 9 digits are not allowed.
     */
    let cleanedValue = value;

    if (name === "name") {
      cleanedValue = value.replace(/[^A-Za-z ]/g, "");
    }

    if (name === "mobile") {
      cleanedValue = value.replace(/\D/g, "").slice(0, 9);
    }

    /*
     * Update only the changed field while keeping
     * the other form values.
     */
    setValues((current) => ({
      ...current,
      [name]: cleanedValue,
    }));

    /*
     * If the user starts correcting a field, remove
     * its previous error.
     *
     * The complete validation will still happen when
     * the user submits the form.
     */
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }

    /*
     * Clear the general login message when the user
     * starts changing their input.
     */
    if (message) {
      setMessage("");
    }
  };
  /*
   * ==========================================================
   * VALIDATE FORM
   * ==========================================================
   *
   * This is the main validation function.
   *
   * It performs two types of checks:
   *
   * 1. Required-field validation
   * 2. Format/content validation
   *
   * Example:
   *
   * Empty email:
   *   "Email address is required."
   *
   * Incorrect email:
   *   "Enter a valid email address."
   */

  const validate = () => {
    const nextErrors = {};

    /*
     * ========================================================
     * SIGNUP-ONLY VALIDATION
     * ========================================================
     *
     * Name and mobile are only shown and required
     * during account creation.
     */

    if (isSignup) {
      /*
       * ------------------------------------------------------
       * NAME
       * ------------------------------------------------------
       */

      if (!values.name.trim()) {
        /*
         * Empty field.
         */
        nextErrors.name = "Full name is required.";
      } else if (!NAME_PATTERN.test(values.name.trim())) {
        /*
         * Field has a value, but the value is invalid.
         */
        nextErrors.name = "Name can contain letters and spaces only.";
      }

      /*
       * ------------------------------------------------------
       * MOBILE NUMBER
       * ------------------------------------------------------
       */

      /*
       * Remove spaces before validating.
       *
       * Example:
       * 98765 43210
       *
       * becomes:
       * 9876543210
       */
      const mobile = values.mobile.replace(/\s/g, "");

      if (!mobile) {
        /*
         * Empty mobile field.
         */
        nextErrors.mobile = "Mobile number is required.";
      } else if (!/^[6-9]\d{8}$/.test(mobile)) {
        /*
         * Mobile exists but isn't a valid Indian
         * 9-digit mobile number.
         */
        nextErrors.mobile = "Enter a valid 9-digit mobile number.";
      }
    }

    /*
     * ========================================================
     * EMAIL
     * ========================================================
     */

    if (!values.email.trim()) {
      /*
       * Empty email.
       */
      nextErrors.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      /*
       * Email has a value but does not match
       * the expected email format.
       */
      nextErrors.email = "Enter a valid email address.";
    }

    /*
     * ========================================================
     * PASSWORD
     * ========================================================
     */

    if (!values.password) {
      /*
       * Password is mandatory for both login and signup.
       */
      nextErrors.password = "Password is required.";
    } else if (isSignup && !PASSWORD_PATTERN.test(values.password)) {
      /*
       * During signup, the password must satisfy
       * the complete password-strength requirements.
       */
      nextErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, a number and a special character.";
    }

    /*
     * ========================================================
     * CONFIRM PASSWORD
     * ========================================================
     *
     * This field exists only during signup.
     */

    if (isSignup) {
      if (!values.confirmPassword) {
        /*
         * Confirm password is empty.
         */
        nextErrors.confirmPassword = "Please confirm your password.";
      } else if (values.password !== values.confirmPassword) {
        /*
         * Both passwords exist but don't match.
         */
        nextErrors.confirmPassword = "Passwords do not match.";
      }
    }

    /*
     * Store all validation errors in React state.
     */
    setErrors(nextErrors);

    /*
     * If the object is empty, there are no errors.
     *
     * Example:
     *
     * {} -> true
     *
     * { email: "..." } -> false
     */
    return Object.keys(nextErrors).length === 0;
  };

  /*
   * ==========================================================
   * FORM SUBMISSION
   * ==========================================================
   */

  const handleSubmit = (event) => {
    /*
     * Prevent normal HTML form submission.
     * Otherwise the browser would refresh the page.
     */
    event.preventDefault();

    /*
     * Clear previous general message.
     */
    setMessage("");

    /*
     * Run all validation rules.
     *
     * If validation fails, stop the function.
     */
    if (!validate()) return;

    /*
     * ========================================================
     * SIGNUP
     * ========================================================
     */

    if (isSignup) {
      /*
       * Create the new user object.
       */
      const user = {
        name: values.name.trim(),

        mobile: values.mobile.replace(/\s/g, ""),

        email: values.email.trim().toLowerCase(),

        password: values.password,
      };

      /*
       * Save the user in localStorage.
       *
       * IMPORTANT:
       *
       * This is suitable only for the current frontend/demo
       * implementation.
       *
       * A production application should NOT store plain-text
       * passwords in localStorage.
       */
      window.localStorage.setItem("sipnow-user", JSON.stringify(user));

      /*
       * Create the active session.
       *
       * Password is intentionally not stored in the session.
       */
      window.localStorage.setItem(
        "sipnow-session",
        JSON.stringify({
          name: user.name,
          email: user.email,
        })
      );

      /*
       * Tell App.jsx that authentication was successful.
       */
      onAuthenticated(user);

      return;
    }

    /*
     * ========================================================
     * LOGIN
     * ========================================================
     */

    /*
     * Retrieve the previously registered user.
     */
    const user = readUser();

    /*
     * Compare:
     *
     * 1. Does a user exist?
     * 2. Does the email match?
     * 3. Does the password match?
     */
    if (
      !user ||
      user.email !== values.email.trim().toLowerCase() ||
      user.password !== values.password
    ) {
      /*
       * Don't tell the user which specific credential
       * was incorrect.
       */
      setMessage(
        "Your email or password is incorrect. Create an account if you are new to SipNow."
      );

      return;
    }

    /*
     * ========================================================
     * LOGIN SUCCESS
     * ========================================================
     */

    /*
     * Save the active session.
     */
    window.localStorage.setItem(
      "sipnow-session",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    /*
     * Notify App.jsx that login succeeded.
     */
    onAuthenticated(user);
  };

  /*
   * ==========================================================
   * UI
   * ==========================================================
   */

  return (
    /*
     * Dark authentication page.
     */
    <div className="min-h-screen bg-[#09080a] px-5 py-10 text-white sm:py-16">
      <main className="mx-auto max-w-xl rounded-[2rem] border border-primary/30 bg-[#100e11] p-7 text-white shadow-2xl shadow-black/50 sm:p-12">
        {/* ==================================================
            BRAND
            ================================================== */}

        <p className="font-headline-md text-3xl tracking-wide text-primary">
          SIPNOW
        </p>

        {/* ==================================================
            PAGE TYPE
            ================================================== */}

        <p className="mt-12 text-sm font-bold uppercase tracking-[0.16em] text-primary">
          {isSignup ? "Join the club" : "Welcome back"}
        </p>

        {/* ==================================================
            PAGE TITLE
            ================================================== */}

        <h1 className="mt-7 font-headline-md text-4xl sm:text-5xl">
          {isSignup ? "Create your account" : "Sign in to SipNow"}
        </h1>

        {/* ==================================================
            DESCRIPTION
            ================================================== */}

        <p className="mt-5 text-gray-400">
          {isSignup
            ? "Enjoy faster checkout and save the drinks you love."
            : "Access your saved favourites and orders."}
        </p>

        {/* ==================================================
            AUTH FORM
            ================================================== */}

        <form className="mt-12 space-y-5" noValidate onSubmit={handleSubmit}>
          {/* =================================================
              SIGNUP FIELDS
              ================================================= */}

          {isSignup && (
            <>
              {/* Full Name */}
              <Field
                autoComplete="name"
                error={errors.name}
                icon="person"
                label="Name"
                name="name"
                onChange={updateValue}
                placeholder="Your full name"
                required
                value={values.name}
              />

              {/* Mobile Number */}
              <Field
                autoComplete="tel"
                error={errors.mobile}
                icon="phone"
                inputMode="numeric"
                label="Mobile number"
                name="mobile"
                onChange={updateValue}
                placeholder="9-digit mobile number"
                required
                value={values.mobile}
              />
            </>
          )}

          {/* =================================================
              EMAIL
              ================================================= */}

          <Field
            autoComplete="email"
            error={errors.email}
            icon="mail"
            label="Email address"
            name="email"
            onChange={updateValue}
            placeholder="you@example.com"
            required
            type="email"
            value={values.email}
          />

          {/* =================================================
              PASSWORD
              ================================================= */}

          <Field
            autoComplete={isSignup ? "new-password" : "current-password"}
            error={errors.password}
            icon="lock"
            label="Password"
            name="password"
            onChange={updateValue}
            placeholder="Your password"
            required
            type="password"
            value={values.password}
          />

          {/* =================================================
              SIGNUP PASSWORD INFORMATION
              ================================================= */}

          {isSignup && (
            <>
              <p className="-mt-3 text-xs text-gray-400">
                Use uppercase, lowercase, a number and a special character.
              </p>

              {/* =================================================
                  CONFIRM PASSWORD
                  ================================================= */}

              <Field
                autoComplete="new-password"
                error={errors.confirmPassword}
                icon="lock"
                label="Confirm password"
                name="confirmPassword"
                onChange={updateValue}
                placeholder="Repeat your password"
                required
                type="password"
                value={values.confirmPassword}
              />
            </>
          )}

          {/* =================================================
              GENERAL LOGIN ERROR
              ================================================= */}

          {message && <p className="text-sm text-red-400">{message}</p>}

          {/* =================================================
              SUBMIT BUTTON
              =================================================
              
              Uses the existing primary-gradient so the button
              matches the Proceed to Checkout button.
              */}

          <button
            className="w-full rounded-full py-4 font-bold text-white primary-gradient"
            type="submit"
          >
            {isSignup ? "Create account" : "Login"}
          </button>
        </form>

        {/* ==================================================
            SWITCH BETWEEN LOGIN AND SIGNUP
            ================================================== */}

        <p className="mt-7 text-center text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "New to SipNow?"}{" "}
          <button
            className="font-semibold text-primary hover:underline"
            onClick={() => onSwitch(isSignup ? "login" : "signup")}
            type="button"
          >
            {isSignup ? "Login" : "Create an account"}
          </button>
        </p>
      </main>
    </div>
  );
}
