class MapSettingsController
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.updateLayoutHandlers = new Set();
		this.settingsChangeHandlers = new Set();
		this.loadingChangeHandlers = new Set();
		this.settingsLoadedHandlers = new Set();
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

	loadMapSettings()
	{
		let currentSettings = Engine.GetMapSettings();
		warn(JSON.stringify(currentSettings));
		this.parseSettings({
			editorType: "maps",
			settings: currentSettings
		});

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
		let ret = this.setupWindow.controls["gameSettings"].toInitAttributes();
		return ret;
	}

	parseSettings(settings)
	{
		this.setupWindow.controls["gameSettings"].fromInitAttributes(settings);
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
