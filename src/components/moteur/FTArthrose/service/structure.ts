import { arthroseCSS } from "../template/style.css";

/**
 * Service d'Accessibilité Arthrose
 * 
 * Fournit l'accessibilité motrice en agrandissant les zones cliquables pour les utilisateurs
 * souffrant d'arthrite ou d'autres difficultés motrices. S'assure que tous les éléments 
 * interactifs respectent les directives WCAG pour la taille minimale des zones tactiles (44px × 44px).
 */

// ============================================================================
// GESTION D'ÉTAT
// ============================================================================

/** Élément de style CSS injecté dans l'en-tête du document */
let arthroseStyleElement: HTMLStyleElement | null = null;

/** MutationObserver pour suivre le contenu dynamique */
let arthroseObserver: MutationObserver | null = null;

/** État actuel du mode arthrose */
let isArthroseActive = false;

// ============================================================================
// CONSTANTES
// ============================================================================

/** Taille minimale pour les zones tactiles accessibles (WCAG 2.1 AA) */
const MIN_TOUCH_TARGET_SIZE = 44;

/** Configuration des styles d'amélioration */
const ENHANCEMENT_STYLES = {
  padding: '12px',
  margin: '4px',
  borderWidth: '2px',
  borderColor: '#007bff',
  borderRadius: '6px',
  boxShadowColor: 'rgba(0, 123, 255, 0.2)',
  hoverBackgroundColor: 'rgba(0, 123, 255, 0.1)',
  hoverScale: '1.02',
  transitionDuration: '0.2s'
} as const;

/** Sélecteurs CSS pour les éléments cliquables (excluant les contrôles d'accessibilité) */
const CLICKABLE_SELECTORS = [
  'button:not(.toggle-btn):not(.control-btn)',
  'input[type="button"]:not(.toggle-btn):not(.control-btn)',
  'input[type="submit"]',
  'input[type="reset"]',
  'a:not([href="#"])', // Ignore les liens de substitution
  '[role="button"]:not(.toggle-btn):not(.control-btn)',
  '[onclick]',
  '.clickable'
] as const;

/** Classe CSS ajoutée aux éléments améliorés pour le suivi */
const ENHANCED_CLASS = 'ft-arthrose-enhanced';

/** Classe CSS pour les styles d'amélioration */
const ENHANCED_STYLE_CLASS = 'ft-arthrose-enhanced-style';

/** Sélecteurs de conteneurs à exclure de l'amélioration */
const EXCLUDED_CONTAINERS = [
  '.toggle-container',
  '#epilepsieContainer',
  '#dyslexieContainer',
  '#arthroseContainer'
] as const;

const SET_DEFAULT = ['min-width', 'min-height', 'padding', 'margin', 'border', 'border-radius', 'box-shadow', 'transition'];

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Vérifie si l'élément doit être exclu de l'amélioration
 */
function isExcludedElement(element: HTMLElement): boolean {
  // Ignorer si déjà amélioré
  if (element.classList.contains(ENHANCED_CLASS)) return true;
  
  // Ignorer les boutons des composants d'accessibilité
  if (element.classList.contains('toggle-btn') || element.classList.contains('control-btn')) {
    return true;
  }
  
  // Ignorer les éléments dans les conteneurs exclus
  return EXCLUDED_CONTAINERS.some(container => element.closest(container));
}

/**
 * Vérifie si l'élément est cliquable et doit être amélioré
 */
function isClickableElement(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  const type = element.getAttribute('type');
  
  return tagName === 'button' || 
         (tagName === 'input' && ['button', 'submit', 'reset'].includes(type || '')) ||
         tagName === 'a' ||
         element.getAttribute('role') === 'button' ||
         element.hasAttribute('onclick') ||
         element.classList.contains('clickable');
}

/**
 * Applique les améliorations d'accessibilité à un seul élément
 */
function enhanceElement(element: HTMLElement): void {
  if (isExcludedElement(element)) return;
  if (!isClickableElement(element)) return;
  
  const tagName = element.tagName.toLowerCase();
  console.log(`Amélioration de l'élément ${tagName}`);
  
  // Marquer comme amélioré
  element.classList.add(ENHANCED_CLASS);
  console.log("***********************");
  console.log(element);
  console.log("***********************");

  
  // Obtenir les dimensions actuelles
  const computedStyle = window.getComputedStyle(element);
  const width = parseInt(computedStyle.width) || 0;
  const height = parseInt(computedStyle.height) || 0;
  
  // Appliquer les exigences de taille minimale
  if (width < MIN_TOUCH_TARGET_SIZE) {
    element.style.minWidth = `${MIN_TOUCH_TARGET_SIZE}px`;
  }
  if (height < MIN_TOUCH_TARGET_SIZE) {
    element.style.minHeight = `${MIN_TOUCH_TARGET_SIZE}px`;
  }
  
  // Appliquer la classe CSS pour le style d'accessibilité
  element.classList.add(ENHANCED_STYLE_CLASS);
  
  console.log(`✅ ${tagName} amélioré: ${width}x${height} → min ${MIN_TOUCH_TARGET_SIZE}x${MIN_TOUCH_TARGET_SIZE}`);
}

/**
 * Gère les nouveaux éléments DOM ajoutés via MutationObserver
 */
function enhanceNewElements(mutations: MutationRecord[]): void {
  if (!isArthroseActive) return;
  
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        
        // Améliorer l'élément lui-même
        enhanceElement(element);
        
        // Trouver et améliorer tous les enfants cliquables
        CLICKABLE_SELECTORS.forEach(selector => {
          const children = element.querySelectorAll(selector);
          children.forEach(child => enhanceElement(child as HTMLElement));
        });
      }
    });
  });
}

// ============================================================================
// FONCTIONS PRINCIPALES D'AMÉLIORATION
// ============================================================================

/**
 * Recherche et améliore les éléments cliquables dans une racine DOM
 */
function enhanceElementsInRoot(root: Document | ShadowRoot | Element): number {
  let enhancedCount = 0;
  
  CLICKABLE_SELECTORS.forEach(selector => {
    try {
      const elements = root.querySelectorAll(selector);
      console.log(`🔍 Trouvé ${elements.length} éléments pour le sélecteur "${selector}"`);
      
      elements.forEach(element => {
        enhanceElement(element as HTMLElement);
        enhancedCount++;
      });
    } catch (error) {
      console.warn(`Erreur avec le sélecteur "${selector}":`, error);
    }
  });
  
  return enhancedCount;
}

/**
 * Configure l'injection CSS et la surveillance DOM
 */
function setupArthroseInfrastructure(): void {
  // Injecter les styles CSS
  if (!arthroseStyleElement) {
    arthroseStyleElement = document.createElement('style');
    arthroseStyleElement.id = 'ft-arthrose-styles';
    arthroseStyleElement.textContent = arthroseCSS;
    document.head.appendChild(arthroseStyleElement);
    console.log('CSS injecté dans l\'en-tête du document');
  }
  
  // Ajouter la classe body pour les styles globaux
  document.body.classList.add('ft-arthrose-active');
  
  // Configurer l'observateur de mutation pour le contenu dynamique
  if (!arthroseObserver) {
    arthroseObserver = new MutationObserver(enhanceNewElements);
    arthroseObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    console.log('MutationObserver activé pour le contenu dynamique');
  }
}

// ============================================================================
// API PUBLIQUE
// ============================================================================

/**
 * Active le mode d'accessibilité arthrose
 * Agrandit toutes les zones cliquables pour respecter les normes d'accessibilité
 */
export function enableArthrose(): void {
  console.log('Activation du mode arthrose - agrandissement des zones cliquables');
  
  // Configurer l'infrastructure
  setupArthroseInfrastructure();
  
  // Activer le mode arthrose
  isArthroseActive = true;
  
  // Améliorer les éléments existants dans le document principal
  let totalEnhanced = enhanceElementsInRoot(document);
  
  // Améliorer les éléments dans toutes les racines shadow
  document.querySelectorAll('*').forEach(element => {
    if (element.shadowRoot) {
      console.log(`Traitement de la racine shadow dans: ${element.tagName}`);
      totalEnhanced += enhanceElementsInRoot(element.shadowRoot);
    }
  });
  
  console.log(`Mode arthrose activé - ${totalEnhanced} zones cliquables améliorées`);
}

/**
 * Supprime les améliorations des éléments dans une racine DOM
 */
function restoreElementsInRoot(root: Document | ShadowRoot | Element): number {
  const enhancedElements = root.querySelectorAll(`.${ENHANCED_CLASS}`);
  console.log(`Trouvé ${enhancedElements.length} éléments améliorés à restaurer`);
  
  enhancedElements.forEach(element => {
    const htmlElement = element as HTMLElement;
    
    // Supprimer les classes de suivi et de style
    htmlElement.classList.remove(ENHANCED_CLASS);
    htmlElement.classList.remove(ENHANCED_STYLE_CLASS);
    
    // Supprimer tous les styles d'amélioration inline
    
    SET_DEFAULT.forEach(style => htmlElement.style.removeProperty(style));
    
    console.log(`${htmlElement.tagName} restauré`);
  });
  
  return enhancedElements.length;
}

/**
 * Nettoie l'infrastructure arthrose
 */
function cleanupArthroseInfrastructure(): void {
  // Déconnecter l'observateur de mutation
  if (arthroseObserver) {
    arthroseObserver.disconnect();
    arthroseObserver = null;
    console.log('MutationObserver déconnecté');
  }
  
  // Supprimer les styles CSS
  if (arthroseStyleElement) {
    arthroseStyleElement.remove();
    arthroseStyleElement = null;
    console.log('Styles CSS supprimés');
  }
  
  // Supprimer la classe body
  document.body.classList.remove('ft-arthrose-active');
}

/**
 * Désactive le mode d'accessibilité arthrose
 * Restaure toutes les zones cliquables à leur état d'origine
 */
export function disableArthrose(): void {
  console.log('Désactivation du mode arthrose - restauration des zones cliquables normales');
  
  // Désactiver le mode arthrose
  isArthroseActive = false;
  
  // Nettoyer l'infrastructure
  cleanupArthroseInfrastructure();
  
  // Restaurer les éléments dans le document principal
  let totalRestored = restoreElementsInRoot(document);
  
  // Restaurer les éléments dans toutes les racines shadow
  document.querySelectorAll('*').forEach(element => {
    if (element.shadowRoot) {
      console.log(`Traitement de la racine shadow dans: ${element.tagName}`);
      totalRestored += restoreElementsInRoot(element.shadowRoot);
    }
  });
  
  console.log(`Mode arthrose désactivé - ${totalRestored} éléments restaurés`);
}

// ============================================================================
// CURSOR CUSTOMIZATION
// ============================================================================

let cursorStyleElement: HTMLStyleElement | null = null;
const CURSOR_STYLE_ID = 'ft-arthrose-cursor-styles';

/**
 * Generate SVG cursor data URI
 */
function generateCursorSVG(size: number, color: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M 2,2 L 2,28 L 10,20 L 14,28 L 18,26 L 14,18 L 22,18 Z" 
            fill="${color}" 
            stroke="#000" 
            stroke-width="1.5" 
            filter="url(#glow)"/>
      <path d="M 2,2 L 2,28 L 10,20 L 14,28 L 18,26 L 14,18 L 22,18 Z" 
            fill="${color}" 
            stroke="#fff" 
            stroke-width="0.5"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Get cursor color hex value
 */
function getCursorColor(color: string): string {
  const colors: Record<string, string> = {
    'default': '#000000',
    'green': '#00ff00',
    'yellow': '#ffff00',
    'red': '#ff0000'
  };
  return colors[color] || colors['default'];
}

/**
 * Get cursor size in pixels
 */
function getCursorSize(size: string): number {
  const sizes: Record<string, number> = {
    'normal': 32,
    'moyen': 48,
    'grand': 64
  };
  return sizes[size] || sizes['normal'];
}

/**
 * Apply custom cursor
 */
export function applyCursor(size: string, color: string): void {
  // Remove existing cursor styles
  removeCursor();
  
  // If size is normal and color is default, don't apply custom cursor (use system default)
  if (size === 'normal' && color === 'default') {
    console.log('Using system default cursor');
    return;
  }
  
  const cursorSize = getCursorSize(size);
  const cursorColor = getCursorColor(color);
  const cursorURL = generateCursorSVG(cursorSize, cursorColor);
  
  cursorStyleElement = document.createElement('style');
  cursorStyleElement.id = CURSOR_STYLE_ID;
  cursorStyleElement.textContent = `
    /* Default cursor - highest priority */
    html, html * {
      cursor: url('${cursorURL}') 0 0, auto !important;
    }
    
    /* Pointer cursor (clickable elements) - override with pointer fallback */
    a, a *, 
    button, button *,
    input[type="button"], 
    input[type="submit"], 
    input[type="reset"],
    input[type="checkbox"],
    input[type="radio"],
    [role="button"], [role="button"] *,
    .clickable, .clickable *,
    summary, label[for],
    select, option, 
    [onclick], [onclick] *,
    [role="link"], [role="menuitem"],
    [tabindex]:not([tabindex="-1"]),
    .pointer, .pointer *,
    [style*="cursor: pointer"],
    [style*="cursor:pointer"] {
      cursor: url('${cursorURL}') 0 0, pointer !important;
    }
    
    /* Text cursor */
    input[type="text"], input[type="email"], input[type="password"], 
    input[type="search"], input[type="tel"], input[type="url"],
    textarea, [contenteditable="true"] {
      cursor: url('${cursorURL}') 0 0, text !important;
    }
    
    /* Move cursor */
    [draggable="true"], .draggable {
      cursor: url('${cursorURL}') 0 0, move !important;
    }
    
    /* Grab cursor */
    .grab {
      cursor: url('${cursorURL}') 0 0, grab !important;
    }
    
    /* Grabbing cursor */
    .grabbing {
      cursor: url('${cursorURL}') 0 0, grabbing !important;
    }
    
    /* Resize cursors */
    .resize-n, [style*="resize: vertical"] {
      cursor: url('${cursorURL}') 0 0, n-resize !important;
    }
    .resize-s {
      cursor: url('${cursorURL}') 0 0, s-resize !important;
    }
    .resize-e, [style*="resize: horizontal"] {
      cursor: url('${cursorURL}') 0 0, e-resize !important;
    }
    .resize-w {
      cursor: url('${cursorURL}') 0 0, w-resize !important;
    }
    .resize-ne {
      cursor: url('${cursorURL}') 0 0, ne-resize !important;
    }
    .resize-nw {
      cursor: url('${cursorURL}') 0 0, nw-resize !important;
    }
    .resize-se, [style*="resize: both"] {
      cursor: url('${cursorURL}') 0 0, se-resize !important;
    }
    .resize-sw {
      cursor: url('${cursorURL}') 0 0, sw-resize !important;
    }
    .resize-ew {
      cursor: url('${cursorURL}') 0 0, ew-resize !important;
    }
    .resize-ns {
      cursor: url('${cursorURL}') 0 0, ns-resize !important;
    }
    .resize-nesw {
      cursor: url('${cursorURL}') 0 0, nesw-resize !important;
    }
    .resize-nwse {
      cursor: url('${cursorURL}') 0 0, nwse-resize !important;
    }
    .resize-col {
      cursor: url('${cursorURL}') 0 0, col-resize !important;
    }
    .resize-row {
      cursor: url('${cursorURL}') 0 0, row-resize !important;
    }
    
    /* Help cursor */
    [title]:hover, .help {
      cursor: url('${cursorURL}') 0 0, help !important;
    }
    
    /* Wait/Progress cursor */
    .wait, [aria-busy="true"] {
      cursor: url('${cursorURL}') 0 0, wait !important;
    }
    .progress {
      cursor: url('${cursorURL}') 0 0, progress !important;
    }
    
    /* Not allowed cursor */
    [disabled], .disabled, [aria-disabled="true"] {
      cursor: url('${cursorURL}') 0 0, not-allowed !important;
    }
    .no-drop {
      cursor: url('${cursorURL}') 0 0, no-drop !important;
    }
    
    /* Zoom cursors */
    .zoom-in {
      cursor: url('${cursorURL}') 0 0, zoom-in !important;
    }
    .zoom-out {
      cursor: url('${cursorURL}') 0 0, zoom-out !important;
    }
    
    /* Copy cursor */
    .copy {
      cursor: url('${cursorURL}') 0 0, copy !important;
    }
    
    /* Crosshair cursor */
    .crosshair, canvas {
      cursor: url('${cursorURL}') 0 0, crosshair !important;
    }
    
    /* Cell cursor */
    .cell, td, th {
      cursor: url('${cursorURL}') 0 0, cell !important;
    }
    
    /* Context menu cursor */
    .context-menu {
      cursor: url('${cursorURL}') 0 0, context-menu !important;
    }
    
    /* All scroll cursor */
    .all-scroll {
      cursor: url('${cursorURL}') 0 0, all-scroll !important;
    }
    
    /* None cursor */
    .cursor-none {
      cursor: url('${cursorURL}') 0 0, none !important;
    }
  `;
  
  document.head.appendChild(cursorStyleElement);
  console.log(`Cursor applied: size=${size}, color=${color}`);
}

/**
 * Remove custom cursor
 */
export function removeCursor(): void {
  if (cursorStyleElement) {
    cursorStyleElement.remove();
    cursorStyleElement = null;
  }
  
  const existingStyle = document.getElementById(CURSOR_STYLE_ID);
  if (existingStyle) {
    existingStyle.remove();
  }
}

