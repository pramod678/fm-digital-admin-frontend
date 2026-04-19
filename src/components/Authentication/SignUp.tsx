import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import cogoToast from "@successtar/cogo-toast";
import { RegisterWithMailApi } from "../../lib/endpoint";
import { FiArrowLeft } from "react-icons/fi";

type FormValues = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  referralCode: string;
  // Payment details
  beneficiaryName: string;
  bankName: string;
  ibanAccount: string;
  ifscCode: string;
  swiftCode: string;
  // Social media
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  userType: string;
  secretKey: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<Partial<FormValues>>({});
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Register Api Call
  const { mutate: RegisterWithMail, isLoading: isLoadingRegisterWithMail } =
    RegisterWithMailApi(reset, navigate);

  const steps = [
    {
      title: "Create an account",
      fields: ["fname", "lname", "referralCode"],
    },
    {
      title: "Set up your Contact details",
      fields: ["email", "country", "phone"],
    },
    {
      title: "Set up your Payment",
      fields: [
        "beneficiaryName",
        "bankName",
        "ibanAccount",
        "ifscCode",
        "swiftCode",
      ],
    },
    {
      title: "Set up your Social Media",
      fields: ["facebook", "instagram", "youtube", "linkedin"],
    },
  ];

  const handleNext = () => {
    console.log("currentStep", currentStep);
    console.log("steps:", steps.length - 1);
    if (currentStep < steps.length - 1) {
      // Save current step data
      const currentData = getValues();
      setFormData((prev) => ({ ...prev, ...currentData }));
      setCurrentStep(currentStep + 1);
    }
    // if (currentStep < steps.length - 2) {
    //     // Save current step data
    //     const currentData = getValues();
    //     setFormData(prev => ({ ...prev, ...currentData }));
    //     setCurrentStep(currentStep + 1);
    // }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // Save current step data before going back
      const currentData = getValues();
      setFormData((prev) => ({ ...prev, ...currentData }));
      setCurrentStep(currentStep - 1);
    }
  };

  // Load form data when step changes - only for current step fields
  React.useEffect(() => {
    // Get current step fields
    const currentStepFields = steps[currentStep].fields;

    // Clear all form fields first
    const emptyFormData: Partial<FormValues> = {};

    // Initialize only current step fields with their saved values or empty strings
    currentStepFields.forEach((fieldName) => {
      const savedValue = formData[fieldName as keyof FormValues];
      if (
        savedValue !== undefined &&
        savedValue !== null &&
        savedValue !== ""
      ) {
        emptyFormData[fieldName as keyof FormValues] = savedValue;
      } else {
        emptyFormData[fieldName as keyof FormValues] = "";
      }
    });

    // Reset form with only current step data
    reset(emptyFormData);
    setIsInitialized(true);
  }, [currentStep]); // Only depend on currentStep, not formData

  const onSubmit = handleSubmit((data: FormValues) => {
    console.log("📝 SignUp form submitted");
    console.log("Current form data:", data);
    console.log("Saved form data:", formData);

    const finalData = { ...formData, ...data };
    console.log("Final merged data:", finalData);

    const objdata: any = {
      fname: finalData.fname || "",
      lname: finalData.lname || "",
      email: finalData.email?.toLowerCase() || "",
      password: "defaultPassword123", // You might want to add a password field
      userType: "User",
    };

    console.log("🚀 About to call RegisterWithMail with:", objdata);

    // if (!objdata.fname || !objdata.lname || !objdata.email) {
    //     console.error('❌ Missing required fields!');
    //     console.error('Missing:', {
    //         fname: !objdata.fname,
    //         lname: !objdata.lname,
    //         email: !objdata.email
    //     });
    //     cogoToast.error('Please fill in all required fields');
    //     return;
    // }

    try {
      RegisterWithMail(objdata);
      console.log("✅ RegisterWithMail called successfully");
    } catch (error) {
      console.error("❌ Error calling RegisterWithMail:", error);
    }
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                What is your First name?
              </label>
              <input
                type="text"
                {...register("fname", { required: "First name is required" })}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
              {errors.fname && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.fname.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                What is your Last name?
              </label>
              <input
                type="text"
                {...register("lname", { required: "Last name is required" })}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
              {errors.lname && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.lname.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Referral Code/ Referred By
              </label>
              <input
                type="text"
                {...register("referralCode")}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Country
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value="+91"
                  disabled
                  className="w-20 px-3 py-3 bg-gray-400 text-white rounded-lg"
                />
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="flex-1 min-w-[120px] px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500"
                  placeholder=""
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Beneficiary Name
              </label>
              <input
                type="text"
                {...register("beneficiaryName")}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  {...register("bankName")}
                  className="w-full px-1 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  IBAN/Account Number
                </label>
                <input
                  type="text"
                  {...register("ibanAccount")}
                  className="w-full px-1 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  {...register("ifscCode")}
                  className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Swift Code
                </label>
                <input
                  type="text"
                  {...register("swiftCode")}
                  className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Facebook
              </label>
              <input
                type="url"
                {...register("facebook")}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  {...register("instagram")}
                  className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Youtube
                </label>
                <input
                  type="url"
                  {...register("youtube")}
                  className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Linkedin
              </label>
              <input
                type="url"
                {...register("linkedin")}
                className="w-1/2 px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen  flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/fm-logo/bg.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}

        {currentStep === 0 && (
          <div className="text-center">
            <img
              src="/images/fm-logo/footer-and-header.svg"
              alt="FM DIGITAL"
              className="h-28 mx-auto w-30 -mb-8 -mt-2"
            />
          </div>
        )}

        {/* Step indicator */}
        {currentStep > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-4 ">
              <button
                onClick={handlePrevious}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FiArrowLeft size={22} />
              </button>
            </div>
            {/* <div className="text-center">
                            <h2 className="text-white text-xl font-semibold mb-2">Mandatory</h2>
                        </div> */}
          </div>
        )}

        {/* Form Card */}
        <div className="backdrop-blur-sm rounded-2xl pl-1 pr-1 pb-8">
          <h2 className="text-white text-lg font-medium mb-2 text-center">
            {steps[currentStep].title}
          </h2>

          {/* Horizontal line */}
          <hr className="border-gray-500 mb-6" />

          <form onSubmit={onSubmit}>
            {renderStepContent()}

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              {currentStep < steps.length - 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Continue
                </button>
              ) : currentStep === steps.length - 2 ? (
                <div className="flex items-center justify-between w-full space-x-2 ">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-teal-800 to-gray-900 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full space-x-2 ">
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="w-full bg-gradient-to-r from-teal-800 to-gray-900 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {/* <div className="mt-8 space-y-4">
                            {currentStep < steps.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                                >
                                    Continue
                                </button>
                            ) : (
                                <div className="flex items-center justify-between w-full space-x-1 ">
    <button onClick={handleNext} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200">Skip</button>
    <button className="w-full bg-green-600 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200">Continue</button>
</div>

                            )}
                        </div> */}

            {/* Footer Links */}
            <div className="mt-6 text-left">
              <p className="text-gray-400 text-sm mb-1">
                Already have an account?
              </p>
              <Link
                to="/sign-in"
                className="text-gray-300 hover:text-white text-sm underline transition-colors"
              >
                Go to your dashboard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
