import * as React from "react";
import { ChevronDown } from "lucide-react";

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
}

const REASONS = [
  "Copyright Infringement",
  "Low Audio/Video Quality",
  "Incomplete Metadata",
  "Explicit Content Violation",
  "Duplicate Submission",
  "Other",
];

export default function RejectionModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: RejectionModalProps) {
  const [selectedReason, setSelectedReason] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setSelectedReason("");
      setDescription("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const fullReason = selectedReason === "Other" 
      ? description 
      : `${selectedReason} - ${description}`;
    onConfirm(fullReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.4)] backdrop-blur-none font-['Inter',sans-serif]">
      <div 
        className="bg-[#F5F5F5] rounded-[20px] shadow-[0px_10px_40px_rgba(0,0,0,0.15)] w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in duration-200 p-6 border-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-4">
            {/* Reason Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-medium text-black">Reason</label>
              <div className="relative">
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full h-[40px] px-3 pr-10 border border-[#DADADA] rounded-[10px] text-[14px] text-black appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="" disabled>Select Reason</option>
                  {REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className="h-5 w-px bg-[#DADADA] mr-2"></div>
                  <div className="text-black">
                    <ChevronDown size={18} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-medium text-black">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[60px] p-2.5 border border-[#DADADA] rounded-[10px] text-[14px] text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
              />
            </div>
          </div>

          {/* Text Block & Actions */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[18px] font-semibold text-black">Are you sure you want to Reject Release ?</h3>
              <p className="text-[13px] text-black text-opacity-80">Please confirm the action before proceeding.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleConfirm}
                disabled={!selectedReason || !description.trim() || isLoading}
                className="h-[40px] px-6 rounded-[10px] text-[14px] font-medium text-[#1B5E20] bg-[#C8E6C9] hover:opacity-90 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                {isLoading ? "Processing..." : "Yes, proceed"}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="h-[40px] px-6 rounded-[10px] text-[14px] font-medium text-[#842029] bg-[#F8D7DA] hover:opacity-90 focus:outline-none transition-all disabled:opacity-50 flex-1"
              >
                No, cancel
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
