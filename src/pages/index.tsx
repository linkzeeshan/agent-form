/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import styles from "@/src/styles/components/AgentRegistration.module.scss";
import { Button, Image, Form, Modal, InputGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";

// --- Interfaces ---
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  crCode: string;
  iqama: string;
  telephone: string;
}

// --- Validation Schema ---
const simplifiedRegistrationValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim() 
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim() 
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  crCode: Yup.string(),
    // .required("CR code is required"),
  iqama: Yup.string()
    .required("Iqama/ National Identity is required"),
  telephone: Yup.string()
  .required("Telephone is required")
  .matches(/^[0-9]+$/, 'Must contain only numbers'),
});

// --- Form Component ---
interface SimplifiedRegisterFormProps {
  formik: FormikProps<FormData>;
  loading: boolean;
}

const SimplifiedRegisterForm: React.FC<SimplifiedRegisterFormProps> = ({ formik, loading }) => {
  return (
    <div className={styles.AgentRegisterRight}>
      <div className={styles.AgentRegisterForm}>
        <div className={styles.AuthForm}>
          <h3>Agent Registration</h3>
          <p>Please fill in the details below to register.</p>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CR Code</Form.Label>
              <Form.Control
                type="text"
                name="crCode"
                placeholder="Enter your CR code"
                value={formik.values.crCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.crCode && !!formik.errors.crCode}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.crCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Iqama/ National Identity</Form.Label>
              <Form.Control
                type="text"
                name="iqama"
                placeholder="Enter your Iqama"
                value={formik.values.iqama}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.iqama && !!formik.errors.iqama}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.iqama}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telephone</Form.Label>
              <InputGroup hasValidation dir="ltr">
                <InputGroup.Text>+966</InputGroup.Text>
                <Form.Control
                  type="tel"
                  name="telephone"
                  placeholder="5xxxxxxxx"
                  value={formik.values.telephone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.telephone && !!formik.errors.telephone}
                  disabled={loading}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" style={{ display: formik.touched.telephone && formik.errors.telephone ? 'block' : 'none' }}>
                {formik.errors.telephone}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100 mt-3">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};


// --- Page Component ---
const AgentRegistrationPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    document.body.classList.add("agent-registration-page");
    return () => {
      document.body.classList.remove("agent-registration-page");
    };
  }, []);

  const handleRegister = async (values: FormData, { resetForm }: any) => {
    console.log("=== SIMPLIFIED REGISTRATION STARTED ===");
    console.log("Form values:", values);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const payload = { ...values, telephone: `+966${values.telephone}` };
      const response = await fetch('/api/save-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save registration data');
      }

      console.log("Registration payload:", values);
      
      // showNotification(
      //   "success",
      //   "Registration successful! We will get back to you shortly.",
      // );
      resetForm();
      setShowSuccessPopup(true);
      
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMessage =
        err?.message || err?.error || "Registration failed. Please try again.";
      // showNotification("error", errorMessage);
    } finally {
        setLoading(false);
    }
  };

  const formik = useFormik<FormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      crCode: "",
      iqama: "",
      telephone: "",
    },
    validationSchema: simplifiedRegistrationValidationSchema,
    onSubmit: handleRegister,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className={styles.AgentRegistrationPage} style={{ display: "flex" }}>
      <div className={styles.AgentRegisterLeft}>
        <div className={styles.AgentRegisterLeftInst}>
          <div className={styles.AgentRegisterLeftText}>
            <span className={styles.AgentSmallHd}>
              Grow Your <span>Business</span> with
            </span>
            <h1>Exclusive Travel Deals</h1>
            <p>
              Join our trusted network of travel professionals and unlock
              exclusive fares, commissions, and tools designed to grow your
              business.
            </p>
          </div>
          <div className={styles.AgentRegisterImg}>
            <Image src="/assets/registration-img.png" alt="registration" />
          </div>
        </div>
      </div>
      <SimplifiedRegisterForm
        formik={formik}
        loading={loading}
      />
      <Modal show={showSuccessPopup} onHide={() => setShowSuccessPopup(false)} centered className={styles.SuccessModal} backdropClassName={styles.SuccessModalBackdrop}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Submitted successfully
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AgentRegistrationPage;