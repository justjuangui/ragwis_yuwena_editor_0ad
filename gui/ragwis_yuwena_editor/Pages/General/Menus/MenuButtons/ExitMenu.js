MenuButtons.prototype.QuitMenuButton = class
{
	constructor(menu, button)
	{
		this.button = button;
		this.button.caption = this.Caption;
		this.setupWindow = menu.setupWindow;
	}

	onPress()
	{
		this.setupWindow.closePage();
	}
}

MenuButtons.prototype.QuitMenuButton.ORDER = 1000;
MenuButtons.prototype.QuitMenuButton.prototype.Caption = translate("Exit");
