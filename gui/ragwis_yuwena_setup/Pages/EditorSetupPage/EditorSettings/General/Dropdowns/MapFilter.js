EditorSettingControls.MapFilter = class MapFilter extends EditorSettingControlDropdown
{
	constructor(...args)
	{
		super(...args);

		this.values = undefined;
        
        g_GameSettings.editorData.watch(() => this.onEditorTypeChanged(), ["type"]);
	}

    onEditorTypeChanged()
    {
        this.setEnabled(g_GameSettings.editorData.type !== "new");
        this.render();
    }

	onSettingsLoaded()
	{
		if (this.editorSettingsController.guiData.lockSettings?.map)
			this.setEnabled(false);
		else
		{
			this.editorSettingsController.guiData.mapFilter.watch(() => this.render(), ["filter"]);
			g_GameSettings.map.watch(() => this.checkMapTypeChange(), ["type"]);
			this.checkMapTypeChange();
		}
		this.render();
	}

	onHoverChange()
	{
		this.dropdown.tooltip = this.values.Description[this.dropdown.hovered] || this.Tooltip;
	}

	checkMapTypeChange()
	{
		if (!g_GameSettings.map.type)
			return;

		let values = prepareForDropdown(
			this.mapFilters.getAvailableMapFilters(
				g_GameSettings.map.type));

		if (values.Name.length)
		{
			this.dropdown.list = values.Title;
			this.dropdown.list_data = values.Name;
			this.values = values;
		}
		else
			this.values = undefined;

		if (this.values && this.values.Name.indexOf(this.editorSettingsController.guiData.mapFilter.filter) === -1)
		{
			this.editorSettingsController.guiData.mapFilter.filter = this.values.Name[this.values.Default];
		}
		this.render();
	}

	render()
	{
		if (!this.enabled)
		{
			if (!this.hidden)
				this.setHidden(true);
			return;
		}

		// Index may have changed, reset.
		this.setSelectedValue(this.editorSettingsController.guiData.mapFilter.filter);
		this.setHidden(!this.values);
	}

	getAutocompleteEntries()
	{
		return this.values && this.values.Title;
	}

	onSelectionChange(itemIdx)
	{
		this.editorSettingsController.guiData.mapFilter.filter = this.values.Name[itemIdx];
	}
};

EditorSettingControls.MapFilter.prototype.TitleCaption =
	translate("Map Filter");

EditorSettingControls.MapFilter.prototype.Tooltip =
	translate("Select a map filter.");

EditorSettingControls.MapFilter.prototype.AutocompleteOrder = 0;
