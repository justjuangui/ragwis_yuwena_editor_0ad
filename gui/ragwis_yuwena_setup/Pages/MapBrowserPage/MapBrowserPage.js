EditorSetupWindowPages.MapBrowserPage = class extends MapBrowser
{
	constructor(setupWindow)
	{
		super(setupWindow.controls.mapCache, setupWindow.controls.mapFilters, setupWindow);
		this.mapBrowserPage.hidden = true;

		this.editorSettingsController = setupWindow.controls.editorSettingsController;
	}

	onSubmitMapSelection(map, type, filter)
	{
		if (type)
			g_GameSettings.map.setType(type);

		if (filter)
			this.editorSettingsController.guiData.mapFilter.filter = filter;

		if (map)
			g_GameSettings.map.selectMap(map);
	}

	openPage()
	{
		super.openPage();

		this.controls.MapFiltering.select(
			this.editorSettingsController.guiData.mapFilter.filter,
			g_GameSettings.map.type || g_MapTypes.Name[g_MapTypes.Default]
		);
		if (g_GameSettings.map.map)
			this.gridBrowser.select(g_GameSettings.map.map);

		this.mapBrowserPage.hidden = false;
	}

	closePage()
	{
		super.closePage();

		this.mapBrowserPage.hidden = true;
	}
};
