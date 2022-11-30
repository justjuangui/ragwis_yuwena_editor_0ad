/**
 * This class stores the GameSetupPage and every subpage that is shown in the game setup.
 */
class EditorSetupWindowPages
{
}

/**
 * The EditorSetupWindow is the root class owning all other class instances.
 * The class shall be ineligible to perform any GUI object logic and shall defer that task to owned classes.
 */
class EditorSetupWindow
{
    constructor(initData, hotloadData)
	{
		if (!g_Settings)
			return;

        Engine.ProfileStart("EditorSetupWindow");

        this.loadHandlers = new Set();
		this.closePageHandlers = new Set();
		this.getHotloadDataHandlers = new Set();

		if (initData?.backPage)
			this.backPage = initData.backPage;

		const mapCache = new MapCache();
		g_GameSettings = new GameSettings().init(mapCache);

        // These class instances control central data and do not manage any GUI Object.
        this.controls = {
			"editorSettingsController": new EditorSettingsController(this, mapCache),
			"mapCache": mapCache,
			"mapFilters": new MapFilters(mapCache)
		};

        // These are the pages within the setup window that may use the controls defined above
		this.pages = {};
		for (let name in EditorSetupWindowPages)
			this.pages[name] = new EditorSetupWindowPages[name](this);

        Engine.GetGUIObjectByName("setupWindow").onTick = () => this.onTick();

        // This event is triggered after all classes have been instantiated and subscribed to each others events
		for (let handler of this.loadHandlers)
        handler(initData, hotloadData);

        Engine.ProfileStop();
    }

	registerLoadHandler(handler)
	{
		this.loadHandlers.add(handler);
	}

	unregisterLoadHandler(handler)
	{
		this.loadHandlers.delete(handler);
	}

	registerClosePageHandler(handler)
	{
		this.closePageHandlers.add(handler);
	}

	unregisterClosePageHandler(handler)
	{
		this.closePageHandlers.delete(handler);
	}

	registerGetHotloadDataHandler(handler)
	{
		this.getHotloadDataHandlers.add(handler);
	}

	unregisterGetHotloadDataHandler(handler)
	{
		this.getHotloadDataHandlers.delete(handler);
	}

	getHotloadData()
	{
		let object = {};
		for (let handler of this.getHotloadDataHandlers)
			handler(object);
		return object;
	}

	onTick()
	{
		updateTimers();
	}

	closePage()
	{
		for (let handler of this.closePageHandlers)
			handler();

		if (this.backPage)
			Engine.SwitchGuiPage(this.backPage.page, this.backPage?.data);

		Engine.SwitchGuiPage("page_pregame.xml");
	}
}
