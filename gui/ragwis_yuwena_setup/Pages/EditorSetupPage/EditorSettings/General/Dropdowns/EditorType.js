EditorSettingControls.EditorType = class EditorType extends EditorSettingControlDropdown
{
	constructor(...args)
	{
		super(...args);

		this.dropdown.list = g_EditorTypes.Name;
		this.dropdown.list_data = g_EditorTypes.Type;

		this.editorMapDefault = "maps/scenarios/_default.xml";
		this.editorMapTypeDefault = "scenario"
		this.mapEditorData = this.mapCache.getMapData(this.editorMapTypeDefault, this.editorMapDefault);
	}

	updatedEditorTypeSettings()
	{
		if (g_GameSettings.editorData.type === "new")
		{
			g_GameSettings.map.setType(this.editorMapTypeDefault);
			g_GameSettings.map.selectMap(this.editorMapDefault);
		} else {
			g_GameSettings.map.setType(this.editorMapTypeDefault);
			g_GameSettings.map.selectMap("");
		}
	}

	onSettingsLoaded()
	{
		// Select a default editor type if none are currently chosen.
		// This in cascade will select a default filter and a default map.

		if (!g_GameSettings.editorData.type)
			g_GameSettings.editorData.setType(g_EditorTypes.Type[g_EditorTypes.Default]);

		this.updatedEditorTypeSettings();
		this.render();
	}

	onHoverChange()
	{
		this.dropdown.tooltip = g_EditorTypes.Tooltip[this.dropdown.hovered] || this.Tooltip;
	}

	render()
	{
		if (!this.enabled)
		{
			if (!this.hidden)
				this.setHidden(true);
			return;
		}

		this.setSelectedValue(g_GameSettings.editorData.type);
	}

	getAutocompleteEntries()
	{
		return g_EditorTypes.Name;
	}

	onSelectionChange(itemIdx)
	{
		g_GameSettings.editorData.setType(g_EditorTypes.Type[itemIdx]);

		this.updatedEditorTypeSettings();
	}
};

EditorSettingControls.EditorType.prototype.TitleCaption =
	translate("Editor Type");

EditorSettingControls.EditorType.prototype.Tooltip =
	translate("Select a option.");

EditorSettingControls.EditorType.prototype.AutocompleteOrder = 0;
