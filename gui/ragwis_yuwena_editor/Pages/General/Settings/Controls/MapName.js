EditorSettingControls.EditorMapName = class EditorMapName extends EditorSettingControlTextbox
{
	constructor(...args)
	{
		super(...args);

		this.setupWindow.controls["gameSettings"].editorMapName.watch(() => this.render(), ["name"]);
		this.render();
	}

	render()
	{
		this.setValue(this.setupWindow.controls["gameSettings"].editorMapName.name);
	}

	getAutocompleteEntries()
	{
		return [];
	}

	onTextEdit()
	{
		if (!this.isInGuiUpdate)
			this.setupWindow.controls["gameSettings"].editorMapName.setName(this.input.caption);
	}
};

EditorSettingControls.EditorMapName.prototype.TitleCaption =
	translate("Map Name");

EditorSettingControls.EditorMapName.prototype.Tooltip =
	translate("Select the flora and fauna.");

EditorSettingControls.EditorMapName.prototype.AutocompleteOrder = 0;
