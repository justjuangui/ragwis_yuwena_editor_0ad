class CancelButton
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.cancelButton = Engine.GetGUIObjectByName("cancelButton");
		this.cancelButton.caption = this.Caption;
		this.cancelButton.tooltip = this.TooltipMenu;
		this.cancelButton.onPress = setupWindow.closePage.bind(setupWindow);
    }
}

CancelButton.prototype.Caption =
	translate("Back");

CancelButton.prototype.TooltipMenu =
	translate("Return to the main menu.");

CancelButton.prototype.Margin = 0;
