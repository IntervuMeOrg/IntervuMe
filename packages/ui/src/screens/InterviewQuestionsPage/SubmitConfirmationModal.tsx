import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { CheckCircleIcon } from "lucide-react";

type Notification = {
  visible: boolean;
  message: string;
  type: "success" | "error" | "info";
};

type SubmitConfirmationModalProps = {
  setSubmitConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setNotification: React.Dispatch<React.SetStateAction<Notification>>;
  notification: Notification;
  onSubmit?: () => void;
  isSubmitting?: boolean;
};

export const SubmitConfirmationModal = ({
  setSubmitConfirmation,
  setNotification,
  notification,
  onSubmit,
  isSubmitting = false,
}: SubmitConfirmationModalProps) => {
  const handleSubmitInterview = () => {
    if (onSubmit) {
      onSubmit();
      setSubmitConfirmation(false);
    } else {
      setSubmitConfirmation(false);
      setNotification({
        visible: true,
        message: "Interview submitted successfully!", 
        type: "success",
      });
      setTimeout(() => {
        setNotification({ ...notification, visible: false });
      }, 2000);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
      />

      <div className="fixed inset-0 flex items-center justify-center z-[1000]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="bg-[#1d1d20] border border-gray-700 px-8 py-6 rounded-xl shadow-2xl max-w-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full">
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
            
            <h3 className="text-xl font-semibold text-center text-white mb-2">
              Submit Interview?
            </h3>
            
            <p className="text-gray-300 text-center mb-6">
              Are you sure you want to submit this interview? Once submitted, you cannot make any changes.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setSubmitConfirmation(false)}
                disabled={isSubmitting}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
              
              <Button
                onClick={handleSubmitInterview}
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                )}
                {isSubmitting ? "Submitting..." : "Submit Interview"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
