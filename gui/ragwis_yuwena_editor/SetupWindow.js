/**
 * This class stores the GameSetupPage and every subpage that is shown in the game setup.
 */
class EditorWindowPages
{
}

/**
 * The EditorWindow is the root class owning all other class instances.
 * The class shall be ineligible to perform any GUI object logic and shall defer that task to owned classes.
 */
class EditorWindow
{
    constructor(initData, hotloadData)
	{
        Engine.ProfileStart("EditorWindow");

        this.loadHandlers = new Set();
		this.closePageHandlers = new Set();
		this.getHotloadDataHandlers = new Set();
		this.handleInputBeforeGuiHandlers = new Set();
		this.handleInputAfterGuiHandlers = new Set();

		if (initData?.backPage)
			this.backPage = initData.backPage;

        // These class instances control central data and do not manage any GUI Object.
        this.controls = {
		};

        // These are the pages within the setup window that may use the controls defined above
		this.pages = {};
		for (let name in EditorWindowPages)
			this.pages[name] = new EditorWindowPages[name](this);

        Engine.GetGUIObjectByName("setupWindow").onTick = () => this.onTick();

        // This event is triggered after all classes have been instantiated and subscribed to each others events
		for (let handler of this.loadHandlers)
        handler(initData, hotloadData);

        Engine.ProfileStop();
    }

	onHandleInputBeforeGui(ev, hoveredObject)
	{
		for (let handler of this.handleInputBeforeGuiHandlers)
		{
			if (handler(ev, hoveredObject) === true)
			{
				return true;
			}
		}

		return false;
	}

	onHandleInputAfterGui(ev)
	{
		for (let handler of this.handleInputAfterGuiHandlers)
		{
			if (handler(ev) === true)
			{
				return true;
			}
		}

		return false;
	}

	registerHandleInputBeforeGuiHandler(handler)
	{
		this.handleInputBeforeGuiHandlers.add(handler);
	}

	unregisterHandleInputBeforeGuiHandler(handler)
	{
		this.handleInputBeforeGuiHandlers.delete(handler);
	}

	registerHandleInputAfterGuiHandler(handler)
	{
		this.handleInputAfterGuiHandlers.add(handler);
	}

	unregisterHandleInputAfterGuiHandler(handler)
	{
		this.handleInputAfterGuiHandlers.delete(handler);
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

        // TODO: Validate if we can close the ditor (saveMap and different things)
        Engine.EndGame();

		if (this.backPage)
			Engine.SwitchGuiPage(this.backPage.page, this.backPage?.data);

		Engine.SwitchGuiPage("page_pregame.xml");
	}
}
