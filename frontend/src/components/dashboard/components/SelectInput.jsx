import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
const SelectInput = ({ label, placeholder, options = [], value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  const displayText = value || label || placeholder || "Select";
  const isGrouped = typeof options[0] === "object";
  return (
    <div className={`input-wrap select-input ${value ? "not-empty" : ""}`}>
      <div
        className="selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayText}
        <MdArrowDropDown className="icon" />
      </div>
      {isOpen && (
        <div className="options-selected">
          <div className="options-container">
            {!isGrouped &&
              options.map((opt, idx) => (
                <div key={idx} className="option" onClick={() => handleSelect(opt)}>
                  {opt}
                </div>
              ))}
            {isGrouped &&
              options.map((group, idx) => (
                <div key={idx} className="option-group">
                  <div className="group-label">{group.label}</div>
                  {group.items.map((item, i) => (
                    <div key={i} className="option" onClick={() => handleSelect(item)}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
