import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";

export const OTPVerificationPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds timer
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleBackToForgetPassword = () => {
    navigate("/forget-password");
  };

  const handleResendOTP = () => {
    if (canResend) {
      // Reset timer and OTP fields
      setTimeLeft(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);

      // Focus first input after resend
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);

      // Here you would call your API to resend OTP
      console.log("Resending OTP...");
    }
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      // Focus last input after paste
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join("");

    // Check if OTP is complete
    if (otpValue.length !== 6) {
      return;
    }

    setIsVerifying(true);

    // Simulate verification (replace with actual API call)
    setTimeout(() => {
      setIsVerifying(false);
      // For demo purposes, any 6-digit OTP is considered valid
      navigate("/create-new-password");
    }, 1500);
  };

  return (
    <div className="bg-white w-full h-screen">
      <div className="bg-white w-full h-screen relative overflow-hidden">
        <div className="relative h-full bg-[url(/rectangle.png)] bg-cover bg-center w-full">
          {/* Left panel with OTP form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              type: "spring",
              stiffness: 85,
              damping: 16,
              mass: 0.6,
            }}
            className="absolute w-[552px] h-full top-0 left-0 bg-[#1d1d20] overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="h-full [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 120,
              damping: 10,
            }}
            onClick={() => navigate("/")}
            className="absolute w-[324px] h-[76px] top-[5vh] left-0 [text-shadow:0px_4px_4px_#00000040] font-['Nunito',Helvetica] font-extrabold text-white text-[32px] text-center tracking-[1.92px] leading-normal cursor-pointer"
          >
            INTERVU&nbsp;&nbsp;ME
          </motion.div>

          {/* Back to Forget Password button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-[12vh] left-[46px] z-10"
          >
            <Button
              variant="link"
              onClick={handleBackToForgetPassword}
              className="font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[14px] tracking-[0.7px] p-0 h-auto flex items-center gap-1"
            >
              <motion.img
                src="/back.png"
                alt="Back"
                width={14}
                height={20}
                initial={{ x: -5 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2 }}
              />
              Back to Email
            </Button>
          </motion.div>

          {/* Heading */}
          <div className="absolute w-[378px] top-[32vh] left-[65px] font-['Nunito',Helvetica] font-extrabold text-[#e8eef2] text-[31px] tracking-[1.80px]">
            Verify Your Email
          </div>

          {/* Description */}
          <div className="absolute w-[380px] top-[calc(30vh+50px)] left-[68px] font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[12px] tracking-[0.78px] leading-normal mt-2">
            We've sent a 6-digit verification code to your email. Enter the code
            below to continue.
          </div>

          {/* OTP Input Fields */}
          <div className="absolute w-[422px] top-[calc(30vh+100px)] left-[61px] flex justify-between gap-2">
            {otp.map((digit, index) => (
              <Card
                key={index}
                className="mt-2 w-[60px] h-[60px] shadow-[0px_4px_4px_#00000040] border-0"
              >
                <CardContent className="p-0 flex items-center justify-center">
                  <Input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    maxLength={1}
                    className={`text-[#e8eef2] rounded-[15px] text-center font-['Nunito',Helvetica]
										 text-xl font-extrabold focus:ring-2 focus:ring-[#0667D0] focus:ring-opacity-50
										  shadow-[0px_4px_4px_#00000040] w-[60px] h-[60px] ${
                        digit ? "border-4 border-[#2B8EDE] bg-[#1D1D20] " : ""
                      }`}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timer and Resend */}
          <div className="absolute w-[422px] top-[calc(30vh+180px)] left-[61px] flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[12px] mt-2"
            >
              {!canResend ? `Resend code in ${timeLeft}s` : "Code expired"}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="link"
                onClick={handleResendOTP}
                disabled={!canResend}
                className={`font-['Nunito',Helvetica] font-bold text-[14px] tracking-[0.7px] p-0 h-auto ${
                  canResend
                    ? "text-[#0667D0] hover:text-[#054E9D]"
                    : "text-[#c7d3dd] opacity-50 cursor-not-allowed"
                }`}
              >
                Resend Code
              </Button>
            </motion.div>
          </div>

          {/* Verify Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 120,
              damping: 12,
              mass: 0.8,
            }}
          >
            <Button
              className="absolute w-[422px] top-[calc(30vh+240px)] left-[61px] h-[59px] rounded-[5px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 font-['Nunito',Helvetica] font-normal text-white text-[17px] tracking-[1.02px] flex items-center justify-center"
              onClick={handleVerifyOTP}
              disabled={otp.join("").length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : null}
              {isVerifying ? "Verifying..." : "Verify & Continue"}
            </Button>
          </motion.div>
        </div>

        {/* Right Side Image */}
        <motion.img
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 85,
            damping: 16,
            mass: 0.6,
          }}
          className="absolute w-[45vw] h-auto max-h-[80vh] top-[14vh] right-[9vw] transform -translate-y-1/2 object-contain"
          alt="OTP verification illustration"
          src="/Enter-OTP-bro.png"
        />
      </div>
    </div>
  );
};

export default OTPVerificationPage;
