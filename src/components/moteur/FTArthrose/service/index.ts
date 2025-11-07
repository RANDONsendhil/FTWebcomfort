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
