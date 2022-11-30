EditorSettingControls.MapSelection = class MapSelection extends EditorSettingControlDropdown
{
	constructor(...args)
	{
		super(...args);

		this.values = undefined;

		this.randomItem = {
			"file": this.RandomMapId,
			"name": setStringTags(this.RandomMapCaption, this.RandomItemTags),
			"description": this.RandomMapDescription
		};

        g_GameSettings.editorData.watch(() => this.onEditorTypeChanged(), ["type"]);
	}

    onEditorTypeChanged()
    {
        this.setEnabled(g_GameSettings.editorData.type !== "new");
        this.updateMapList();
        this.render();
    }

	onSettingsLoaded()
	{
		if (this.editorSettingsController.guiData.lockSettings?.map)
		{
			if (!g_GameSettings.map)
			{
				error("Map setting locked but no map is selected");
				throw new Error();
			}

			this.setTitle(translate("Map"));
			this.setEnabled(false);

			// Watch only for map change.
			g_GameSettings.map.watch(() => this.render(), ["map"]);
		}
		else
		{
			g_GameSettings.map.watch(() => this.render(), ["map"]);
			g_GameSettings.map.watch(() => this.updateMapList(), ["type"]);
			this.editorSettingsController.guiData.mapFilter.watch(() => this.updateMapList(), ["filter"]);

			this.updateMapList();
		}

		this.render();
	}

	onHoverChange()
	{
		this.dropdown.tooltip = this.values.description[this.dropdown.hovered] || this.Tooltip;
	}

	render()
	{
		if (!this.enabled)
		{
			const mapName = this.mapCache.getTranslatableMapName(g_GameSettings.map.type, g_GameSettings.map.map);
			this.label.caption = g_GameSettings.mapName.value || this.mapCache.translateMapName(mapName);
			return;
		}

		if (!this.values)
			return;

		// We can end up with incorrect map selection when dependent settings change.
		if (this.values.file.indexOf(g_GameSettings.map.map) === -1)
		{
			g_GameSettings.map.selectMap(this.values.file[this.values.Default]);
			return;
		}

		this.setSelectedValue(g_GameSettings.map.map);
	}

	updateMapList()
	{
        if (g_GameSettings.editorData.type === "new" || !g_GameSettings.map.type)
            return;
		
        Engine.ProfileStart("updateMapSelectionList");
        
		{
			const values =
				this.mapFilters.getFilteredMaps(
					g_GameSettings.map.type,
					this.editorSettingsController.guiData.mapFilter.filter,
					false);

			if (!values.length)
				return;

			values.sort(sortNameIgnoreCase);

			if (g_GameSettings.map.type == "random")
				values.unshift(this.randomItem);

			this.values = prepareForDropdown(values);
		}

		this.dropdown.list = this.values.name;
		this.dropdown.list_data = this.values.file;

		g_GameSettings.map.setRandomOptions(this.values.file);

		// Reset the selected map.
		if (this.values.file.indexOf(g_GameSettings.map.map) === -1)
		{
			g_GameSettings.map.selectMap(this.values.file[this.values.Default]);
		}
		// The index may have changed: reset.
		this.setSelectedValue(g_GameSettings.map.map);

		Engine.ProfileStop();
	}

	onSelectionChange(itemIdx)
	{
		// The triggering that happens on map change can be just slow enough
		// that the next event happens before we're done when scrolling,
		// and then the scrolling is not smooth since it can take arbitrarily long to render.
		// To avoid that, run the change on the next GUI tick, and only do one increment.
		// TODO: the problem is mostly that updating visibility can relayout the gamesetting,
		// which takes a few ms, but this could only be done once per frame anyways.
		// NB: this technically makes it possible to start the game without the change going through
		// but it's essentially impossible to trigger accidentally.
		let call = () => {
			g_GameSettings.map.selectMap(this.values.file[itemIdx]);
			delete this.reRenderTimeout;
		};
		if (this.reRenderTimeout)
			setNewTimerFunction(this.reRenderTimeout, call);
		else
			this.reRenderTimeout = setTimeout(call, 0);
	}

	getAutocompleteEntries()
	{
		return this.values.name;
	}
};

EditorSettingControls.MapSelection.prototype.TitleCaption =
	translate("Select Map");

EditorSettingControls.MapSelection.prototype.Tooltip =
	translate("Select a map to play on.");

EditorSettingControls.MapSelection.prototype.RandomMapId =
	"random";

EditorSettingControls.MapSelection.prototype.RandomMapCaption =
	translateWithContext("map selection", "Random");

EditorSettingControls.MapSelection.prototype.RandomMapDescription =
	translate("Pick any of the given maps at random.");

EditorSettingControls.MapSelection.prototype.AutocompleteOrder = 0;
