/* Add this CSS for reduce-motion */
export default /*css*/ `
/* Loupe component styles - based on guide de lecture */
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

.controls-section h4 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 8px;
}

.control-group {
    margin-bottom: 16px;
}

.control-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-color);
}

/* Button group for loupe types */
.button-group {
    display: flex;
    gap: 8px;
    width: 100%;
}

.loupe-type-btn {
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

.loupe-type-btn:hover {
    border-color: var(--primary-color);
    background-color: #edf1ff;
}

.loupe-type-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    font-weight: 600;
}

.loupe-type-btn:active {
    transform: scale(0.98);
}

/* Zoom slider */
#zoomSlider {
    flex: 1;
    height: 6px;
    background: #e0e0e0;
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
    width: 100%;
    cursor: pointer;
}

#zoomSlider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: 2px solid var(--white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background 0.2s ease;
}

#zoomSlider::-webkit-slider-thumb:hover {
    background: var(--primary-color-dark, #0056b3);
}

#zoomSlider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: 2px solid var(--white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background 0.2s ease;
}

#zoomSlider::-moz-range-thumb:hover {
    background: var(--primary-color-dark, #0056b3);
}

#zoomDisplay {
    min-width: 40px;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary-color);
    text-align: center;
}
`;

