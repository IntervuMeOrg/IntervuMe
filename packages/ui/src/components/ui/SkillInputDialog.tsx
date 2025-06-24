/**
 * SkillInputDialog component for adding new skills
 */
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { motion, AnimatePresence } from "framer-motion";

interface SkillInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (skill: string) => void;
}

const SkillInputDialog = ({
  isOpen,
  onClose,
  onAdd,
}: SkillInputDialogProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      onAdd(inputValue.trim());
      setInputValue("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-[1000]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
            >
              <h3 className="font-['Nunito',Helvetica] font-bold text-[20px] text-[#1d1d20] mb-4">
                Add New Skill
              </h3>

              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter skill name"
                className="mb-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                  if (e.key === "Escape") onClose();
                }}
                autoFocus
              />

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-[#1d1d20] text-[#1d1d20]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] text-white hover:opacity-90"
                  disabled={inputValue.trim() === ""}
                >
                  Add Skill
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export { SkillInputDialog };
