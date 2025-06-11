// Loader2.jsx
import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <Loader
      className="animate-spin"
      size={24}
      color="#22c55e"  // green color, adjust as you want
      strokeWidth={2}
    />
  );
};

export default Loading;
