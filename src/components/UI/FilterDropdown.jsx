import React, { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterDropdown({ filterStatus, setFilterStatus, isDark }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "all", label: "All Messages" },
    { value: "unread", label: "Unread" },
    { value: "starred", label: "Starred" },
    { value: "high", label: "High Priority" },
  ];

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setFilterStatus(value); // ✅ keeps your filter logic
    setOpen(false);
  };

  return (
    <div className="relative w-56" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full pl-10 pr-3 py-2 rounded-lg border transition-colors duration-200 ${
          isDark
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <span>
          {options.find((o) => o.value === filterStatus)?.label || "Select"}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Icon inside */}
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`absolute z-20 mt-1 w-full rounded-lg shadow-lg overflow-hidden border ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-600 hover:text-white transition ${
                  filterStatus === opt.value
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
