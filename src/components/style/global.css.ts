export default /*css*/ `
.container {
    padding: 12px;
    border: 0.3px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    font-family: system-ui;
    font-synthesis-weight: inherit;
    max-width: 270px;
}

.container h3 {
    margin: 0 0 15px 0;
    color: #333;
    text-align: center;
}
.comp-container{
   display: flex;
    flex-direction: row;
    justify-content: space-around;
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
 
    width: 42px;
    height: 21px;
    border: 2px solid #ddd;
    border-radius: 25px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    margin: 0;
}

.toggle-btn.active {
    background: #4cb2e5ff;
    border-color: #4cb2e5ff;
}

.toggle-btn.inactive {
        background: #c3b4b6;
    border-color: #c3b4b6;
}

.toggle-indicator {
    width: 17px;
    height: 17px;
    border-radius: 46%;
    background: white;
    position: absolute;
    top: 0px;
    left: 4px;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 
}

.toggle-btn.active .toggle-indicator {
    left: 21px; /* Move to right side when active */
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
`;
