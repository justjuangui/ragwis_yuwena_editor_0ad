EditorSettingControls.Biome = class Biome extends EditorSettingControlDropdown
{
	constructor(...args)
	{
		super(...args);

		g_GameSettings.biome.watch(() => this.render(), ["biome", "available"]);
		this.render();
	}

	onHoverChange()
	{
		if (!this.dropdown.list_data[this.dropdown.hovered])
			this.dropdown.tooltip = "";
		else if (this.dropdown.list_data[this.dropdown.hovered] == "random")
			this.dropdown.tooltip = this.RandomDescription;
		else
			this.dropdown.tooltip = g_GameSettings.biome.biomeData[
				this.dropdown.list_data[this.dropdown.hovered]
			].Description;
	}

	render()
	{
		this.setHidden(!g_GameSettings.biome.available.size);

		let values = prepareForDropdown([
			{
				"Title": setStringTags(this.RandomBiome, this.RandomItemTags),
				"Id": "random"
			},
			...g_GameSettings.biome.getAvailableBiomeData()
		]);

		this.dropdown.list = values.Title;
		this.dropdown.list_data = values.Id;

		this.setSelectedValue(g_GameSettings.biome.biome);
	}

	getAutocompleteEntries()
	{
		return g_GameSettings.biome.getAvailableBiomeData().map(biome => biome.Title);
	}

	onSelectionChange(itemIdx)
	{
		g_GameSettings.biome.setBiome(this.dropdown.list_data[itemIdx]);
	}
};

EditorSettingControls.Biome.prototype.TitleCaption =
	translate("Biome");

EditorSettingControls.Biome.prototype.RandomBiomeId =
	"random";

EditorSettingControls.Biome.prototype.Tooltip =
	translate("Select the flora and fauna.");

EditorSettingControls.Biome.prototype.RandomBiome =
	translateWithContext("biome", "Random");

EditorSettingControls.Biome.prototype.RandomDescription =
	translate("Pick a biome at random.");

EditorSettingControls.Biome.prototype.AutocompleteOrder = 0;
