class MapSettingsController
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.updateLayoutHandlers = new Set();
		this.settingsChangeHandlers = new Set();
		this.loadingChangeHandlers = new Set();
		this.settingsLoadedHandlers = new Set();

		setupWindow.registerLoadHandler(this.onLoad.bind(this));
		setupWindow.registerGetHotloadDataHandler(this.onGetHotloadData.bind(this));
	}

	registerUpdateLayoutHandler(handler)
	{
		this.updateLayoutHandlers.add(handler);
	}

	registerSettingsChangeHandler(handler)
	{
		this.settingsChangeHandlers.add(handler);
	}

	registerLoadingChangeHandler(handler)
	{
		this.loadingChangeHandlers.add(handler);
	}

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

	getSettings()
	{
		let ret = g_GameSettings.toInitAttributes();
		return ret;
	}

	parseSettings(settings)
	{
		if (settings.guiData)
			this.guiData.Deserialize(settings.guiData);
		g_GameSettings.fromInitAttributes(settings);
	}

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
}
