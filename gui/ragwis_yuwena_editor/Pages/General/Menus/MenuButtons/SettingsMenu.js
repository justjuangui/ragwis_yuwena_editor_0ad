MenuButtons.prototype.SettingsMenuButton = class
{
	constructor(menu, button)
	{
		this.button = button;
		this.button.caption = this.Caption;
		this.setupWindow = menu.setupWindow;
	}

	onPress()
	{
		this.setupWindow.controls["guiController"].mapSettingsIsOpen = true
	}
}

MenuButtons.prototype.SettingsMenuButton.ORDER = 1;
MenuButtons.prototype.SettingsMenuButton.prototype.Caption = translate("Settings");
