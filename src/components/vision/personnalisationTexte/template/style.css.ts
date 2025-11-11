export default `
/* ============================================
   TEXT PERSONALIZATION COMPONENT STYLES
   ============================================ */

/* CSS Variables */

.component-title {
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
}

/* ============================================
   TOGGLE SWITCH
   ============================================ */

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

/* ============================================
   TEXT PERSONALIZATION CONTROLS
   ============================================ */

#personnalisationControls {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  padding-bottom: 20px;
}

/* ============================================
   CUSTOM DROPDOWN STYLES
   ============================================ */

/* Dropdown Container */
.custom-dropdown {
  position: relative;
  margin-bottom: 20px;
  z-index: 1;
}

.custom-dropdown.compact {
  margin-bottom: 15px;
}

.custom-dropdown.open {
  z-index: 1000;
}

/* Dropdown Label */
.dropdown-label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--text-color);
  font-size: 13px;
}

/* Dropdown Button */
.dropdown-button {
  padding: 8px 30px 8px 10px;
  background: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  transition: border-color 0.2s ease;
  position: relative;
}

.dropdown-button:hover {
  border-color: var(--primary-color);
}

.dropdown-button::after {
  content: "▼";
  font-size: 10px;
  color: #666;
  position: absolute;
  right: 10px;
  transition: transform 0.2s ease;
}

.dropdown-button.open::after {
  transform: rotate(180deg);
}

.dropdown-text {
  flex: 1;
  text-align: left;
}

/* Dropdown Options Container */
.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--white);
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 10000;
  display: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 100%;
}

.dropdown-options.show {
  display: block;
}

/* Bottom Dropdown Adjustment */
.custom-dropdown:last-child .dropdown-options {
  bottom: 100%;
  top: auto;
  border-radius: 4px 4px 0 0;
  border-top: 1px solid var(--border-color);
  border-bottom: none;
}

/* ============================================
   DROPDOWN OPTIONS
   ============================================ */

.dropdown-option {
  display: block;
}

.dropdown-option input[type="radio"] {
  display: none;
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
  background-color: var(--primary-color);
  color: white;
}

.dropdown-option:last-child label {
  border-bottom: none;
}
`;
