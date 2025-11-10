import cssDropDown from "./style.css";

export const template = /*html*/ `
<style>${cssDropDown}</style>

<div class="status">
  <span id="statusText">Dysle: Activée</span>
</div>
<div id="dyslexie-controls">
  <div class="custom-dropdown compact">
    <label class="dropdown-label">Police dyslexie :</label>
    <div class="dropdown-button" data-dropdown="fontDys">
      <span class="dropdown-text">Normal</span>
    </div>
    <div class="dropdown-options">
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-bold" value="bold" />
        <label for="dys-bold">Gras</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-regular" value="regular" checked />
        <label for="dys-regular">Normal</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-italic" value="italic" />
        <label for="dys-italic">Italique</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-bold-italic" value="bold_italic" />
        <label for="dys-bold-italic">Gras Italique</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-alta-bold" value="alta_bold" />
        <label for="dys-alta-bold">Alta Gras</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-alta-italic" value="alta_italic" />
        <label for="dys-alta-italic">Alta Italique</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-alta-bold-italic" value="alta_bold_italic" />
        <label for="dys-alta-bold-italic">Alta Gras Italique</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-alta-normal" value="alta_normal" />
        <label for="dys-alta-normal">Alta Normal</label>
      </div>
      <div class="dropdown-option">
        <input type="radio" name="fontDys" id="dys-mono-regular" value="mono_regular" />
        <label for="dys-mono-regular">Mono Regular</label>
      </div>
    </div>
  </div>
</div>
`;

export const dropDown = /*html*/ `
<!-- Legacy dropdown for backward compatibility - now handled in main template -->
`;
