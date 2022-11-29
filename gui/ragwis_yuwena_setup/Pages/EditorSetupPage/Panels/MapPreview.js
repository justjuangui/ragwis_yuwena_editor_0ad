class MapPreview
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;
		this.mapCache = setupWindow.controls.mapCache;

		this.mapInfoName = Engine.GetGUIObjectByName("mapInfoName");
		this.mapPreview = Engine.GetGUIObjectByName("mapPreview");

		g_GameSettings.map.watch(() => this.renderName(), ["map"]);
		g_GameSettings.mapPreview.watch(() => this.renderPreview(), ["value"]);

        setupWindow.registerLoadHandler(this.onLoad.bind(this));
	}

    onLoad()
    {
        this.renderName();
        this.renderPreview();
    }

	renderName()
	{
		if (!g_GameSettings.map.map)
		{
			this.mapInfoName.caption = translate("No selected map");
			return;
		}

		this.mapInfoName.caption = this.mapCache.translateMapName(
			this.mapCache.getTranslatableMapName(g_GameSettings.map.type, g_GameSettings.map.map));
	}

	renderPreview()
	{
		if (!g_GameSettings.mapPreview.value)
		{
			this.mapPreview.sprite = this.mapCache.getMapPreview();
			return;
		}
		this.mapPreview.sprite = g_GameSettings.mapPreview.value;
	}
}
