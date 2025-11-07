/* CSS for Arthrose accessibility component */
export default /*css*/ `
  .arthrose-container {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 8px 0;
    background-color: #f9f9f9;
  }

  .status {
    font-weight: bold;
    color: #2c5aa0;
    margin-bottom: 8px;
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
`;
