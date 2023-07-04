import { useState } from "react";
import Stepper from "../../Components/stepper/Stepper.jsx";
import StepperControl from "../../Components/stepperControl/StepperControl.jsx";
import { UseContextProvider } from "../../context/StepperContext/StepperContext.jsx";
import Delivery from "../../Components/Steps/Delivery/Delivery";
import Payment from "../../Components/Steps/Payment/Payment";
import Review from "../../Components/Steps/Review/Review";

function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Delivery", "Payment", "Review"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Delivery />;
      case 2:
        return <Payment />;
      case 3:
        return <Review />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="w-full h-full justify-center items-center flex">
      <div className="mx-auto rounded-2xl pb-2">
        {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10 ">
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>

        {/* navigation button */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;
