import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import ShippingFrom from "./steps/shippingFrom";
import ShippingTo from "./steps/ShippingTo";
import ParcelForm from "./steps/ParcelForm";

const steps = [ShippingFrom, ShippingTo, ParcelForm];

const Shipped = () => {
  const [activeStep, setActiveStep] = useState(0);
  console.log("activeStep", activeStep);

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const handlePrev = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  const handleNext = () => {
    setActiveStep(Math.min(activeStep + 1, steps.length - 1));
  };

  const onSubmit = (values, formikBag) => {
    const { setSubmitting } = formikBag;

    if (!isLastStep()) {
      setSubmitting(false);
      handleNext();
      return;
    }

    console.log(values);

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  const initialValues = steps.reduce(
    (values, { initialValues }) => ({
      ...values,
      ...initialValues,
    }),
    {}
  );
  console.log("initialValues", initialValues);
  const ActiveStep = steps[activeStep];
  const validationSchema = ActiveStep.validationSchema;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <div>
          <Form>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{steps[index].label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && <ShippingFrom />}
            {activeStep === 1 && <ShippingTo />}
            {activeStep === 2 && <ParcelForm />}
            <div>
              <Button
                disabled={activeStep === 0 || isSubmitting}
                onClick={handlePrev}
              >
                Previous
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isLastStep() ? "Submit" : "Next"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Shipped;
