import * as React from "react";

interface ServiceStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  currentMessage?: string;
}

export default function ServiceStatusModal({
  isOpen,
  onClose,
  onConfirm,
  currentMessage = "",
}: ServiceStatusModalProps) {
  const [message, setMessage] = React.useState(currentMessage);

  React.useEffect(() => {
    if (isOpen) {
      setMessage(currentMessage);
    }
  }, [isOpen, currentMessage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.4)] font-['Inter',sans-serif]">
      <div
        className="bg-[#F5F5F5] rounded-[20px] shadow-[0px_10px_40px_rgba(0,0,0,0.15)] w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in duration-200 p-6 border-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-5">
          {/* Title */}
          <h3 className="text-[16px] font-semibold text-black text-center">
            Messages
          </h3>

          {/* Textarea */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter unavailability message..."
            className="w-full h-[100px] p-3 border border-[#DADADA] rounded-[10px] text-[14px] text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
          />

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onConfirm(message)}
              disabled={!message.trim()}
              className="h-[40px] px-6 rounded-[10px] text-[14px] font-medium text-[#1B5E20] bg-[#C8E6C9] hover:opacity-90 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              Update Now
            </button>
            <button
              onClick={onClose}
              className="h-[40px] px-6 rounded-[10px] text-[14px] font-medium text-[#842029] bg-[#F8D7DA] hover:opacity-90 focus:outline-none transition-all flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
