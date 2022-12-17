class GuiController extends Observable
{
	constructor(setupWindow)
	{
		super();
		this.setupWindow = setupWindow;

		this.mapSettingsIsOpen = false;
	}
}
