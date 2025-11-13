export default `
.component-title {
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
}

.component-toggle {
  width: 40px;
  height: 20px;
  background: #ccc;
  border-radius: 10px;
  position: relative;
  transition: background 0.2s ease;
}

.component-toggle.active {
  background: var(--success-color);
}

.component-toggle::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--white);
  top: 2px;
  left: 2px;
  transition: transform 0.2s ease;
}

.component-toggle.active::after {
  transform: translateX(20px);
}
  
.dropdown-option label {
  display: block;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
  user-select: none;
}

.dropdown-option label:hover {
  background-color: #f8f9fa;
  color: var(--primary-color);
}

.dropdown-option input[type="radio"]:checked + label {
  background-color: #edf1ff;
  color: var(--primary-color);
}

.dropdown-option:last-child label {
  border-bottom: none;
}

/* Guide de lecture styles */
.guide-lecture-container {
  padding: 16px;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status {
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.controls-section h4, h5, h6 {
  margin: 0 0 16px 0;
  
  font-weight: 600;
  color: var(--text-color);
  border-bottom: 2px solid var(--primary-color);
}

.control-group {
  margin-bottom: 16px;
}

.radio-group{
      display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-color);
}
 

/* Button group for guide types  */
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--text-color);
    font-size: 13px;
   



.button-group {
  display: flex;
  gap: 8px;
  width: 100%;
}

.guide-type-button {
  flex: 1;
  max-width: 50%;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color);
  background-color: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  white-space: nowrap;
  text-align: center;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
}

.guide-type-button:hover {
  border-color: var(--primary-color);
  background-color: #edf1ff;
}

.guide-type-button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  font-weight: 600;
}

.guide-type-button:active {
  transform: scale(0.98);
}

/* Radio buttons (kept for backward compatibility) */
.radio-group {
display: flex;
    align-items: flex-start;
    gap: 12px;
    flex-direction: column;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.radio-item:hover {
  border-color: var(--primary-color);
  background-color: #f8f9fa;
}

.radio-item input[type="radio"] {
  margin-right: 8px;
  accent-color: var(--primary-color);
}

.radio-item input[type="radio"]:checked + .radio-text {
  color: var(--primary-color);
  font-weight: 600;
}

.radio-item:has(input:checked) {
  border-color: var(--primary-color);
  background-color: #edf1ff;
}

/* Color picker */
.color-input-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-picker {
  width: 50px;
  height: 35px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.color-picker:hover {
  border-color: var(--primary-color);
}

.color-preview {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  background-color: #201e1eff;
}

/* Size slider */
.size-control,
.opacity-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.size-slider,
.opacity-slider {
  flex: 1;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
}

.size-slider::-webkit-slider-thumb,
.opacity-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  border: 2px solid var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.size-slider::-moz-range-thumb,
.opacity-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  border: 2px solid var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.size-value,
.opacity-value {
  min-width: 40px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color);
  text-align: center;
}
`;
