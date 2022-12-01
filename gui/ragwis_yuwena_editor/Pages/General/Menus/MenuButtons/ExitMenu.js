MenuButtons.prototype.QuitMenuButton = class
{
	constructor(menu, button)
	{
		this.button = button;
		this.button.caption = translate("Exit");
		this.setupWindow = menu.setupWindow;
	}

	onPress()
	{
		this.setupWindow.closePage();
	}
}

MenuButtons.prototype.QuitMenuButton.ORDER = 1000;
