import React from "react";

const Toast = ({ show, type = "success", title, message, isDark }) =>
{
  if (!show) return null;

  const styles = {
    success: isDark
      ? "bg-[#3D220E]/95 border-[#8B6B4A]/40 text-white shadow-[#3D220E]/40"
      : "bg-white border-[#E8D9C2] text-[#3D220E] shadow-[#8B6B4A]/20",
    error: isDark
      ? "bg-red-900/95 border-red-500/40 text-white shadow-red-900/40"
      : "bg-white border-red-200 text-red-700 shadow-red-200/50",
    warning: isDark
      ? "bg-[#3D220E]/95 border-yellow-500/40 text-white shadow-[#3D220E]/40"
      : "bg-white border-yellow-200 text-yellow-700 shadow-yellow-200/50",
  };

  const iconStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "!",
  };

  const toastType = styles[type] ? type : "success";

  return (
    <div className="fixed top-24 right-6 z-[9999] animate-in slide-in-from-right duration-300">
      <div
        className={`px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3 ${styles[toastType]}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${iconStyles[toastType]}`}
        >
          {icons[toastType]}
        </div>

        <div>
          <p className="font-semibold text-[15px]">{title}</p>
          <p className="text-sm opacity-80">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
