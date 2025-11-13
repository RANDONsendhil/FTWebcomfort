/* CSS for Arthrose accessibility component */
export default /*css*/ `
  .arthrose-container {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 8px 0;
    background-color: #f9f9f9;
    width: 100%;
    box-sizing: border-box;
  }

  .status {
    margin-bottom: 16px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    box-sizing: border-box;
  }

  .controls-section {
    margin-top: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .controls-section h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 6px;
  }

  .control-group {
    margin-bottom: 12px;
    width: 100%;
    box-sizing: border-box;
  }

  .control-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--text-color);
  }

  /* Radio group styles */
  .radio-group {
    display: flex;
    flex-direction: column !important;
    gap: 6px;
    width: 100%;
    box-sizing: border-box;
  }

  .radio-option {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .radio-option:hover {
    border-color: var(--primary-color);
    background-color: #edf1ff;
  }

  .radio-option input[type="radio"] {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: var(--primary-color);
    flex-shrink: 0;
  }

  .radio-option input[type="radio"]:checked + span {
    font-weight: 600;
    color: var(--primary-color);
  }

  .radio-option span {
    font-size: 13px;
    color: var(--text-color);
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  .radio-option:has(input:checked) {
    border-color: var(--primary-color);
    background-color: #edf1ff;
  }

  .cursor-select {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .cursor-select:hover {
    border-color: var(--primary-color);
    background-color: #edf1ff;
  }

  .cursor-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(51, 51, 103, 0.1);
  }

  .cursor-preview-container {
    margin-bottom: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .cursor-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    min-height: 100px;
    transition: all 0.3s ease;
    position: relative;
  }

  #cursorSVG {
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  #cursorPath {
    transition: fill 0.3s ease;
  }

  .description {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }

  .description p {
    margin: 0;
  }
`;


export const arthroseCSS = `
  /* Increase clickable zone sizes for arthrose accessibility */
  button, 
  input[type="button"], 
  input[type="submit"], 
  input[type="reset"], 
  input[type="checkbox"], 
  input[type="radio"],
  select,
  a,
  [role="button"],
  [onclick],
  .clickable {
    min-width: 44px !important;
    min-height: 44px !important;
    padding: 12px 16px !important;
    margin: 4px !important;
    font-size: 16px !important;
    line-height: 1.5 !important;
    border-radius: 8px !important;
    cursor: pointer !important;
  }

  /* Specific adjustments for different input types */
  input[type="checkbox"], 
  input[type="radio"] {
    width: 20px !important;
    height: 20px !important;
    padding: 0 !important;
    margin: 8px !important;
  }

  /* Links need special handling */
  a {
    display: inline-block !important;
    text-decoration: underline !important;
  }

  /* Form elements */
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="number"],
  input[type="tel"],
  input[type="url"],
  textarea {
    min-height: 44px !important;
    padding: 12px !important;
    font-size: 16px !important;
    border: 2px solid #ccc !important;
    border-radius: 4px !important;
  }

  /* Select dropdowns */
  select {
    min-height: 44px !important;
    padding: 8px 12px !important;
    font-size: 16px !important;
  }

  /* Touch targets spacing */
  .ft-arthrose-active button + button,
  .ft-arthrose-active a + a,
  .ft-arthrose-active input + input {
    margin-left: 8px !important;
  }

  /* Enhanced style class applied dynamically */
  .ft-arthrose-enhanced-style {
    padding: var(--arthrose-padding, 12px) !important;
    margin: var(--arthrose-margin, 4px) !important;
    border: var(--arthrose-border-width, 2px) solid var(--arthrose-border-color, #007bff) !important;
    border-radius: var(--arthrose-border-radius, 6px) !important;
    box-shadow: 0 2px 4px var(--arthrose-shadow-color, rgba(0, 123, 255, 0.2)) !important;
    transition: all var(--arthrose-transition, 0.2s) ease !important;
  }

  .ft-arthrose-enhanced-style:hover {
    background-color: var(--arthrose-hover-bg, rgba(0, 123, 255, 0.1)) !important;
    transform: scale(var(--arthrose-hover-scale, 1.02)) !important;
  }
`;


