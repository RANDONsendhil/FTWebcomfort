export default /*css*/ `
      

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
