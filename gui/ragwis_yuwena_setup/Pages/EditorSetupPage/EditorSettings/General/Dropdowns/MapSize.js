EditorSettingControls.MapSize = class MapSize extends EditorSettingControlDropdown
{
	constructor(...args)
	{
		super(...args);

		this.dropdown.list = g_MapSizes.Name;
		this.dropdown.list_data = g_MapSizes.Tiles;

		g_GameSettings.mapSize.watch(() => this.render(), ["size", "available"]);
		this.render();
	}

	onHoverChange()
	{
		this.dropdown.tooltip = g_MapSizes.Tooltip[this.dropdown.hovered] || this.Tooltip;
	}

	render()
	{
		this.setHidden(!g_GameSettings.mapSize.available);
		this.setSelectedValue(g_GameSettings.mapSize.size);
		// TODO: select first entry.
	}

	getAutocompleteEntries()
	{
		return g_MapSizes.Name;
	}

	onSelectionChange(itemIdx)
	{
		g_GameSettings.mapSize.setSize(g_MapSizes.Tiles[itemIdx]);
	}
};

EditorSettingControls.MapSize.prototype.TitleCaption =
	translate("Map Size");

EditorSettingControls.MapSize.prototype.Tooltip =
	translate("Select map size. (Larger sizes may reduce performance.)");

EditorSettingControls.MapSize.prototype.AutocompleteOrder = 0;
