import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import cogoToast from "@successtar/cogo-toast";
import { RegisterWithMailApi } from "../../api/authV2";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

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
    trigger,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<Partial<FormValues>>({});
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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
      fields: ["email", "password", "phone"],
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

  const handleNext = async () => {
    const fields = steps[currentStep].fields as (keyof FormValues)[];
    const isValid = await trigger(fields);

    if (isValid) {
      const currentData = getValues();
      setFormData((prev) => ({ ...prev, ...currentData }));
      setCurrentStep(currentStep + 1);
    }
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

    // Initialize only current step fields with their saved values or empty strings
    const stepData: Partial<FormValues> = {};
    currentStepFields.forEach((fieldName) => {
      const savedValue = formData[fieldName as keyof FormValues];
      if (savedValue !== undefined && savedValue !== null && savedValue !== "") {
        stepData[fieldName as keyof FormValues] = savedValue;
      } else {
        stepData[fieldName as keyof FormValues] = "";
      }
    });

    // We don't want to reset the whole form because it clears other fields in formData
    // Instead, we just set the values for the current step
    Object.keys(stepData).forEach((key) => {
      const fieldKey = key as keyof FormValues;
      const value = stepData[fieldKey] ?? "";
      setValue(fieldKey, value as any);
    });

    setIsInitialized(true);
  }, [currentStep]);

  const onSubmit = handleSubmit((data: FormValues) => {
    const finalData = { ...formData, ...data };

    const objdata: any = {
      fname: finalData.fname || "",
      lname: finalData.lname || "",
      email: finalData.email?.toLowerCase() || "",
      password: finalData.password || "",
      phone: finalData.phone || "",
      userType: "User",
    };

    RegisterWithMail(objdata);
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-3 pr-10 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
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
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number (10 digits required)",
                    },
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
                {...register("facebook", {
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/i,
                    message: "Invalid Facebook URL",
                  },
                })}
                className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
              {errors.facebook && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.facebook.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  {...register("instagram", {
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?instagram\.com\/.*$/i,
                      message: "Invalid Instagram URL",
                    },
                  })}
                  className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
                {errors.instagram && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.instagram.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Youtube
                </label>
                <input
                  type="url"
                  {...register("youtube", {
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?youtube\.com\/.*$/i,
                      message: "Invalid Youtube URL",
                    },
                  })}
                  className="w-full px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                  placeholder=""
                />
                {errors.youtube && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.youtube.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Linkedin
              </label>
              <input
                type="url"
                {...register("linkedin", {
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i,
                    message: "Invalid Linkedin URL",
                  },
                })}
                className="w-1/2 px-4 py-3 bg-gray-400 text-gray-800 rounded-lg focus:outline-none focus:ring-2  placeholder-gray-500"
                placeholder=""
              />
              {errors.linkedin && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.linkedin.message}
                </p>
              )}
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
                type="button"
                onClick={handlePrevious}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FiArrowLeft size={22} />
              </button>
            </div>
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
                    onClick={() => setCurrentStep(currentStep + 1)}
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
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-800 to-gray-900 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    {isLoadingRegisterWithMail ? (
                      <ClipLoader color="white" size={20} />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              )}
            </div>

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
