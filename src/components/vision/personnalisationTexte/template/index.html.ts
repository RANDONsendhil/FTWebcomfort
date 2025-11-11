import css from "./style.css";
 
export const template = /*html*/ `
<style>${css}</style>
		<!-- Contrôles intégrés -->
<div id="personnalisationControls">
	<div class="custom-dropdown compact">
		<label class="dropdown-label">Taille de police :</label>
		<div class="dropdown-button" data-dropdown="fontSize">
			<span class="dropdown-text">Normal (16px)</span>
		</div>
		<div class="dropdown-options">
			<div class="dropdown-option">
				<input type="radio" name="fontSize" id="fontSize-12" value="12px" />
				<label for="fontSize-12">Très petit (12px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontSize" id="fontSize-14" value="14px" />
				<label for="fontSize-14">Petit (14px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontSize" id="fontSize-16" value="16px" checked />
				<label for="fontSize-16">Normal (16px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontSize" id="fontSize-18" value="18px" />
				<label for="fontSize-18">Grand (18px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontSize" id="fontSize-20" value="20px" />
				<label for="fontSize-20">Très grand (20px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontSize" id="fontSize-24" value="24px" />
				<label for="fontSize-24">Extra grand (24px)</label>
			</div>
		</div>
	</div>

	<div class="custom-dropdown compact">
		<label class="dropdown-label">Police de caractères :</label>
		<div class="dropdown-button" data-dropdown="fontFamily">
			<span class="dropdown-text">Open Sans</span>
		</div>
		<div class="dropdown-options">
			<div class="dropdown-option">
				<input type="radio" name="fontFamily" id="font-opensans" value="'Open Sans', sans-serif" checked />
				<label for="font-opensans">Open Sans</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontFamily" id="font-arial" value="Arial, sans-serif" />
				<label for="font-arial">Arial</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontFamily" id="font-courier" value="'Courier New', monospace" />
				<label for="font-courier">Courier New</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontFamily" id="font-georgia" value="Georgia, serif" />
				<label for="font-georgia">Georgia</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontFamily" id="font-times" value="'Times New Roman', serif" />
				<label for="font-times">Times New Roman</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="fontFamily" id="font-verdana" value="Verdana, sans-serif" />
				<label for="font-verdana">Verdana</label>
			</div>
		</div>
	</div>

	<div class="custom-dropdown compact">
		<label class="dropdown-label">Espacement des lignes :</label>
		<div class="dropdown-button" data-dropdown="lineHeight">
			<span class="dropdown-text">Normal (1.6)</span>
		</div>
		<div class="dropdown-options">
			<div class="dropdown-option">
				<input type="radio" name="lineHeight" id="lineHeight-1.2" value="1.2" />
				<label for="lineHeight-1.2">Serré (1.2)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="lineHeight" id="lineHeight-1.4" value="1.4" />
				<label for="lineHeight-1.4">Compact (1.4)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="lineHeight" id="lineHeight-1.6" value="1.6" checked />
				<label for="lineHeight-1.6">Normal (1.6)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="lineHeight" id="lineHeight-1.8" value="1.8" />
				<label for="lineHeight-1.8">Aéré (1.8)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="lineHeight" id="lineHeight-2.0" value="2.0" />
				<label for="lineHeight-2.0">Très aéré (2.0)</label>
			</div>
		</div>
	</div>

	<div class="custom-dropdown compact">
		<label class="dropdown-label">Espacement des lettres :</label>
		<div class="dropdown-button" data-dropdown="letterSpacing">
			<span class="dropdown-text">Normal (0px)</span>
		</div>
		<div class="dropdown-options">
			<div class="dropdown-option">
				<input type="radio" name="letterSpacing" id="letterSpacing-0" value="0px" checked />
				<label for="letterSpacing-0">Normal (0px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="letterSpacing" id="letterSpacing-0.5" value="0.5px" />
				<label for="letterSpacing-0.5">Léger (0.5px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="letterSpacing" id="letterSpacing-1" value="1px" />
				<label for="letterSpacing-1">Modéré (1px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="letterSpacing" id="letterSpacing-1.5" value="1.5px" />
				<label for="letterSpacing-1.5">Aéré (1.5px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="letterSpacing" id="letterSpacing-2" value="2px" />
				<label for="letterSpacing-2">Très aéré (2px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="letterSpacing" id="letterSpacing-3" value="3px" />
				<label for="letterSpacing-3">Extra aéré (3px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="letterSpacing" id="letterSpacing-5" value="5px" />
				<label for="letterSpacing-5">Maximum (5px)</label>
			</div>
		</div>
	</div>

	<div class="custom-dropdown compact">
		<label class="dropdown-label">Espace entre les mots :</label>
		<div class="dropdown-button" data-dropdown="wordSpacing">
			<span class="dropdown-text">Normal (0px)</span>
		</div>
		<div class="dropdown-options">
			<div class="dropdown-option">
				<input type="radio" name="wordSpacing" id="wordSpacing-0" value="0px" checked />
				<label for="wordSpacing-0">Normal (0px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="wordSpacing" id="wordSpacing-2" value="2px" />
				<label for="wordSpacing-2">Léger (2px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="wordSpacing" id="wordSpacing-4" value="4px" />
				<label for="wordSpacing-4">Modéré (4px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="wordSpacing" id="wordSpacing-6" value="6px" />
				<label for="wordSpacing-6">Aéré (6px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="wordSpacing" id="wordSpacing-8" value="8px" />
				<label for="wordSpacing-8">Très aéré (8px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="wordSpacing" id="wordSpacing-10" value="10px" />
				<label for="wordSpacing-10">Extra aéré (10px)</label>
			</div>
			<div class="dropdown-option">
				<input type="radio" name="wordSpacing" id="wordSpacing-15" value="15px" />
				<label for="wordSpacing-15">Maximum (15px)</label>
			</div>
		</div>
	</div>
</div>

 
`;
