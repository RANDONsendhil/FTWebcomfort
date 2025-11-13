/* Add this CSS for reduce-motion */
export default /*css*/ `  
/* Reduce motion styles */
html.reduce-motion *,
html.reduce-motion *::before,
html.reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    animation-play-state: paused !important;
    scroll-behavior: auto !important;
}

/* Specifically target the box animation */
html.reduce-motion #box {
    animation: none !important;
    left: 0 !important;
}

/* Disable any keyframe animations */
html.reduce-motion [style*="animation"] {
    animation: none !important;
}

/* Mode Affichage component styles */
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

/* Radio group styles */
.radio-group {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-direction: column;
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
`;
