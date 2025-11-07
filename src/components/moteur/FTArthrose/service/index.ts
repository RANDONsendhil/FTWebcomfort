import { arthroseCSS } from "../template/style.css";

// CSS styles to increase clickable zone sizes for arthrose accessibility


let arthroseStyleElement: HTMLStyleElement | null = null;
let arthroseObserver: MutationObserver | null = null;
let isArthroseActive = false;

// Function to enhance newly added elements
function enhanceNewElements(mutations: MutationRecord[]) {
  if (!isArthroseActive) return;
  
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        enhanceElement(element);
        
        // Also check child elements
        const clickableChildren = element.querySelectorAll('button, input[type="button"], input[type="submit"], input[type="reset"], a, [role="button"], [onclick], .clickable');
        clickableChildren.forEach(child => enhanceElement(child as HTMLElement));
      }
    });
  });
}

// Function to enhance a single element
function enhanceElement(element: HTMLElement) {
  if (element.classList.contains('ft-arthrose-enhanced')) return;
  
  // Skip accessibility component buttons - they should not be enhanced
  if (element.classList.contains('toggle-btn') || 
      element.classList.contains('control-btn') ||
      element.closest('.toggle-container') ||
      element.closest('#epilepsieContainer') ||
      element.closest('#dyslexieContainer') ||
      element.closest('#arthroseContainer')) {
    console.log('Skipping accessibility component button');
    return;
  }
  
  const tagName = element.tagName.toLowerCase();
  const type = element.getAttribute('type');
  
  console.log(`Checking element: ${tagName}${type ? `[type="${type}"]` : ''}`);
  
  if (tagName === 'button' || 
      (tagName === 'input' && ['button', 'submit', 'reset'].includes(type || '')) ||
      tagName === 'a' ||
      element.getAttribute('role') === 'button' ||
      element.hasAttribute('onclick') ||
      element.classList.contains('clickable')) {
    
    console.log(`Enhancing clickable element: ${tagName}`);
    element.classList.add('ft-arthrose-enhanced');
    
    const computedStyle = window.getComputedStyle(element);
    const width = parseInt(computedStyle.width);
    const height = parseInt(computedStyle.height);
    
    console.log(`Original size: ${width}x${height}`);
    
    if (width < 44) {
      element.style.minWidth = '44px';
      console.log('Applied minWidth: 44px');
    }
    if (height < 44) {
      element.style.minHeight = '44px';
      console.log('Applied minHeight: 44px');
    }
    
    // Force additional styling to make sure it's visible
    element.style.padding = '12px';
    element.style.margin = '4px';
    element.style.border = '2px solid red'; // Temporary debug border
    
    console.log(`Enhanced element:`, element);
  } else {
    console.log(`Skipped non-clickable element: ${tagName}`);
  }
}

export function enableArthrose() {
  console.log("Enabling arthrose mode - increasing clickable zones");
  console.log("CSS content:", arthroseCSS);
  
  // Create and inject CSS if it doesn't exist
  if (!arthroseStyleElement) {
    arthroseStyleElement = document.createElement('style');
    arthroseStyleElement.id = 'ft-arthrose-styles';
    arthroseStyleElement.textContent = arthroseCSS;
    document.head.appendChild(arthroseStyleElement);
    console.log("CSS injected into head");
  }
  
  // Add class to body to enable specific styles
  document.body.classList.add('ft-arthrose-active');
  console.log("Added ft-arthrose-active class to body");
  
  // Find and enhance all clickable elements (excluding accessibility component buttons)
  const clickableSelectors = [
    'button:not(.toggle-btn):not(.control-btn)',
    'input[type="button"]:not(.toggle-btn):not(.control-btn)',
    'input[type="submit"]',
    'input[type="reset"]',
    'a:not([href="#"])', // Skip placeholder links
    '[role="button"]:not(.toggle-btn):not(.control-btn)',
    '[onclick]',
    '.clickable'
  ];
  
  console.log("Searching for clickable elements...");
  let totalFound = 0;
  
  // Function to search within a root element (document or shadow root)
  function searchInRoot(root: Document | ShadowRoot | Element) {
    clickableSelectors.forEach(selector => {
      const elements = root.querySelectorAll(selector);
      console.log(`Found ${elements.length} elements for selector "${selector}" in:`, root);
      totalFound += elements.length;
      
      elements.forEach((element: Element) => {
        enhanceElement(element as HTMLElement);
      });
    });
  }
  
  // Search in main document
  searchInRoot(document);
  
  // Search in all shadow roots
  document.querySelectorAll('*').forEach(element => {
    if (element.shadowRoot) {
      console.log('Found shadow root in:', element.tagName);
      searchInRoot(element.shadowRoot);
    }
  });
  
  console.log(`Total clickable elements found: ${totalFound}`);
  
  // Set up mutation observer to handle dynamically added elements
  isArthroseActive = true;
  if (!arthroseObserver) {
    arthroseObserver = new MutationObserver(enhanceNewElements);
    arthroseObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  console.log("Arthrose mode enabled - all clickable zones enlarged and observer active");
}

export function disableArthrose() {
  console.log("Disabling arthrose mode - restoring normal clickable zones");
  
  isArthroseActive = false;
  
  // Disconnect mutation observer
  if (arthroseObserver) {
    arthroseObserver.disconnect();
    arthroseObserver = null;
  }
  
  // Remove the CSS styles
  if (arthroseStyleElement) {
    arthroseStyleElement.remove();
    arthroseStyleElement = null;
  }
  
  // Remove body class
  document.body.classList.remove('ft-arthrose-active');
  
  // Remove enhanced classes and reset inline styles from all locations
  function removeEnhancementsFromRoot(root: Document | ShadowRoot | Element) {
    const enhancedElements = root.querySelectorAll('.ft-arthrose-enhanced');
    console.log(`Found ${enhancedElements.length} enhanced elements to restore in:`, root);
    
    enhancedElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.classList.remove('ft-arthrose-enhanced');
      
      // Remove all inline styles that were added
      htmlElement.style.removeProperty('min-width');
      htmlElement.style.removeProperty('min-height');
      htmlElement.style.removeProperty('padding');
      htmlElement.style.removeProperty('margin');
      htmlElement.style.removeProperty('border');
      
      console.log(`Restored element: ${htmlElement.tagName}`);
    });
  }
  
  // Remove from main document
  removeEnhancementsFromRoot(document);
  
  // Remove from all shadow roots
  document.querySelectorAll('*').forEach(element => {
    if (element.shadowRoot) {
      console.log('Restoring shadow root in:', element.tagName);
      removeEnhancementsFromRoot(element.shadowRoot);
    }
  });
  
  console.log("Arthrose mode disabled - clickable zones restored and observer disconnected");
}
