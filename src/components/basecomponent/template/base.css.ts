export default /*css*/ `
      
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
    
        .component-content {
      padding: 15px;
      display: none;
    }

    .component-content.show {
      display: block;
    }

    .component-description {
      font-size: 13px;
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
    }
 
   .content-area {
      flex: 1;
      margin-left: 320px;
      padding: 30px;
      min-height: 100vh;
      transition: margin-left 0.3s ease;
    }
`;
