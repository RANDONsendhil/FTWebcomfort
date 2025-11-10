export default `
/* Additional styles for text personalization component */
/* Override global styles to prevent overlapping */
     :root {
      --primary-color: #333367;
      --secondary-color: #333367;
      --text-color: #333333;
      --background-color: #f8f9fa;
      --white: #ffffff;
      --light-gray: #e9ecef;
      --border-color: #dee2e6;
      --success-color: #28a745;
      --warning-color: #ffc107;
      --danger-color: #dc3545;
      --fog-color: #dce3ff;
      --athens-grey: #e9e8f1;
    }
.component-card {
  background: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: visible !important; /* Allow dropdowns to extend beyond card */
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1; /* Prevent overlapping with other cards */
}

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

.component-header {
      padding: 15px;
      background: linear-gradient(135deg, var(--athens-grey), #e9ecef);
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
.component-content {
  padding: 15px;
  display: none;
  overflow: visible !important; /* Allow dropdowns to be visible */
  position: relative;
}

.component-content.show {
  display: block;
  overflow: visible !important;
}

    .component-description {
      font-size: 13px;
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    /* Text personalization specific styles */
    #personnalisationControls {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
      padding-bottom: 20px; /* Space for dropdowns */
    }

    /* Custom dropdown styles */
    .custom-dropdown {
      position: relative;
      margin-bottom: 15px;
      z-index: 10;
      /* Prevent overlapping with adjacent dropdowns */
      isolation: isolate;
    }

    .custom-dropdown.compact {
      margin-bottom: 10px;
    }

    /* Increase z-index when dropdown is open to prevent overlapping */
    .custom-dropdown:has(.dropdown-options.show) {
      z-index: 100;
    }

    .dropdown-label {
      display: block;
      font-weight: 600;
      margin-bottom: 5px;
      color: var(--text-color);
      font-size: 13px;
    }

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

    .dropdown-options {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--white);
      border: 1px solid var(--border-color);
      border-top: none;
      border-radius: 0 0 4px 4px;
      max-height: 300px;
      overflow-y: auto;
      z-index: 9999 !important; /* Very high z-index to appear above everything */
      display: none;
 
      min-width: 100%;
      width: auto;
    }
 .dropdown-options.show {
      display: block;
    }

    /* Ajustement pour les dropdowns en bas de card */
    .custom-dropdown:last-child .dropdown-options {
      bottom: 100%;
      top: auto;
      border-radius: 4px 4px 0 0;
      border-top: 1px solid var(--border-color);
      border-bottom: none;
    }

    .dropdown-option {
      display: block;
    }

    .dropdown-option input[type="radio"] {
      display: none;
    }

    .dropdown-option label {
      display: block;
      padding: 8px 10px;
      cursor: pointer;
      font-size: 13px;
      transition: background-color 0.2s ease;
      border-bottom: 1px solid #f0f0f0;
    }

    .dropdown-option label:hover {
      background-color: #f8f9fa;
    }
 

    .dropdown-option:last-child label {
      border-bottom: none;
    }

 
 

    `;
