/* Add this CSS for reduce-motion */
export default /*css*/ `  
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
	    }`;
