/**
 * Controller for the GUI handling of gamesettings.
 */
class EditorSettingsController
{
	constructor(setupWindow, mapCache)
	{
		this.setupWindow = setupWindow;
		this.mapCache = mapCache;

		this.guiData = new EditorSettingsGuiData();

		this.updateLayoutHandlers = new Set();
		this.settingsChangeHandlers = new Set();
		this.loadingChangeHandlers = new Set();
		this.settingsLoadedHandlers = new Set();

		setupWindow.registerLoadHandler(this.onLoad.bind(this));
		setupWindow.registerGetHotloadDataHandler(this.onGetHotloadData.bind(this));
	}

	/**
	 * @param handler will be called when the layout needs to be updated.
	 */
	registerUpdateLayoutHandler(handler)
	{
		this.updateLayoutHandlers.add(handler);
	}

	/**
	 * @param handler will be called when any setting change.
	 * (this isn't exactly what happens but the behaviour should be similar).
	 */
	registerSettingsChangeHandler(handler)
	{
		this.settingsChangeHandlers.add(handler);
	}

	/**
	 * @param handler will be called when the 'loading' state change.
	 */
	registerLoadingChangeHandler(handler)
	{
		this.loadingChangeHandlers.add(handler);
	}

	/**
	 * @param handler will be called when the initial settings have been loaded.
	 */
	registerSettingsLoadedHandler(handler)
	{
		this.settingsLoadedHandlers.add(handler);
	}

	onLoad(initData, hotloadData)
	{
		if (hotloadData)
			this.parseSettings(hotloadData.initAttributes);

		for (const handler of this.settingsLoadedHandlers)
			handler();

		this.updateLayout();

	}

	onGetHotloadData(object)
	{
		object.initAttributes = this.getSettings();
	}

	/**
	 * Returns the InitAttributes, augmented by GUI-specific data.
	 */
	getSettings()
	{
		let ret = g_GameSettings.toInitAttributes();
		ret.guiData = this.guiData.Serialize();
		return ret;
	}

	/**
	 * Parse the following settings.
	 */
	parseSettings(settings)
	{
		if (settings.guiData)
			this.guiData.Deserialize(settings.guiData);
		g_GameSettings.fromInitAttributes(settings);
	}

	/**
	 * This should be called whenever the GUI layout needs to be updated.
	 * Triggers on the next GUI tick to avoid un-necessary layout.
	 */
	updateLayout()
	{
		if (this.layoutTimer)
			return;
		this.layoutTimer = setTimeout(() => {
			for (let handler of this.updateLayoutHandlers)
				handler();
			delete this.layoutTimer;
		}, 0);
	}

	launchGame()
	{
		g_GameSettings.pickRandomItems();
		// In the editor by default gameSpeed is 0
		// we are going to init the map with all default configuration
		// TODO: Missing randon maps
		const editorAttributes = {
			gameSpeed: 0,
			editorType: g_GameSettings.editorData.type,
			mapType: g_GameSettings.map.type,
			map: g_GameSettings.map.map
		}

		Engine.StartGame(editorAttributes, g_PlayerAssignments.local.player, false);

		// Switch to the loading page right away,
		// the GUI will otherwise show the unrandomised settings.
		this.switchToLoadingPage(editorAttributes);
	}

	switchToLoadingPage(attributes)
	{
		Engine.SwitchGuiPage("page_ragwis_yuwena_loading.xml", {
			"attribs": attributes,
			"playerAssignments": g_PlayerAssignments
		});
	}
}
