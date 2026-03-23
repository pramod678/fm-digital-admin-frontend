import * as React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "text" | "circular" | "rectangular" | "rounded";
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  width, 
  height, 
  variant = "rounded" 
}) => {
  const style = {
    width,
    height,
  };

  const baseClasses = "animate-pulse bg-gray-200";
  
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-md",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
