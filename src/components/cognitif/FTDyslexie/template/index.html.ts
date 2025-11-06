import cssDropDown from "./style.css";

export const template = /*html*/ `
<style>${cssDropDown}</style>

<div class="status">
  <span id="statusText">Dysle: Activée</span>
</div>
<div id="dropdown-container"></div>
`;

export const dropDown = /*html*/ `
<div class="dropdown">
			<select name="dys" id="fontDys">
				<option value="bold">Gras</option>
				<option value="regular">Normal</option>
				<option value="italic">Italique</option>
				<option value="bold_italic">Gras Italique</option>
				<option value="alta_bold">Alta Gras</option>
				<option value="alta_italic">Alta Italique</option>
				<option value="alta_bold_italic">Alta Gras Italique</option>
				<option value="alta_normal">Alta Normal</option>
				<option value="mono_regular">Mono Regular</option>
			</select>
		</div>
 
`;
