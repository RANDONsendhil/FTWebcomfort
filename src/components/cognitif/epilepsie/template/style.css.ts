export default /*css*/ `
.container {
    padding: 20px;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    font-family: Arial, sans-serif;
    max-width: 300px;
}
.container h3 {
    margin: 0 0 15px 0;
    color: #333;
    text-align: center;
}
.comp-container{
    display: flex;
    flex-direction: row;
}
.controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
}

.control-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.2s ease;
}

.control-btn:hover {
    background: #0056b3;
    transform: scale(1.1);
}

.label {
    font-weight: bold;
    color: #555;
}

.toggle-container {
    margin-bottom: 15px;
}

.toggle-btn {
       width: 58px;
    height: 28px;
    border: 2px solid #ddd;
    border-radius: 25px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
}

.toggle-btn.active {
    background: #28a745;
    border-color: #28a745;
}

.toggle-btn.inactive {
    background: #dc3545;
    border-color: #dc3545;
}

.toggle-indicator {
    width: 23px;
    height: 23px;
    border-radius: 46%;
    background: white;
    position: absolute;
    top: 0px;
    left: 4px;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 
}

.toggle-btn.active .toggle-indicator {
    left: 31px; /* Move to right side when active */
}

.toggle-btn.inactive .toggle-indicator {
    left: 0px; /* Stay on left side when inactive */
}

@keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
}

.status {
    text-align: center;
    padding: 10px;
    background: #e9ecef;
    border-radius: 5px;
    font-weight: bold;
}

#statusText {
    color: #495057;
}

html.reduce-motion *,
html.reduce-motion *::before,
html.reduce-motion *::after {
  /* Neutralise animations/transitions */
  animation: none !important;
  transition: none !important;
  animation-play-state: paused !important;
  scroll-behavior: auto !important;
  will-change: auto !important;
}
`;
