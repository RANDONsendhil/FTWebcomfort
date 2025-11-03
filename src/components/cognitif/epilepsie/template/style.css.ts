export default /*css*/ `
.epilepsie-container {
    padding: 20px;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    font-family: Arial, sans-serif;
    max-width: 300px;
}

.epilepsie-container h3 {
    margin: 0 0 15px 0;
    color: #333;
    text-align: center;
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
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 25px;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.toggle-btn.active {
    background: #28a745;
    border-color: #28a745;
    color: white;
}

.toggle-btn.inactive {
    background: #dc3545;
    border-color: #dc3545;
    color: white;
}

.toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.toggle-text {
    font-weight: bold;
    transition: all 0.3s ease;
}

.toggle-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: currentColor;
    transition: all 0.3s ease;
    opacity: 0.8;
}

.toggle-btn.active .toggle-indicator {
    animation: pulse 2s infinite;
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
