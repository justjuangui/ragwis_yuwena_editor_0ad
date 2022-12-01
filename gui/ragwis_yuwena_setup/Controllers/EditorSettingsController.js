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
		// In the editor the map is reveales for all
		g_GameSettings.mapExploration.setRevealed(true);

		// In the editor by default gameSpeed is 0
		g_GameSettings.gameSpeed.setSpeed(0);

		// This will resolve random settings & send game start messages.
		// TODO: this will trigger observers, which is somewhat wasteful.
		g_GameSettings.launchGame(g_PlayerAssignments, false);

		// Switch to the loading page right away,
		// the GUI will otherwise show the unrandomised settings.
		this.switchToLoadingPage();
	}

    switchToLoadingPage(attributes)
	{
		Engine.SwitchGuiPage("page_ragwis_yuwena_loading.xml", {
			"attribs": attributes?.initAttributes || g_GameSettings.finalizedAttributes,
			"playerAssignments": g_PlayerAssignments
		});
	}
}
