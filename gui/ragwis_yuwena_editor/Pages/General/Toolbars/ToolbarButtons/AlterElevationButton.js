TopToolbarButtons.prototype.AlterElevationButton = class
{
	constructor(toolbar, button, icon)
	{
		this.button = button;
		this.setupWindow = toolbar.setupWindow;
		this.button.tooltip = this.Tooltip;
		icon.sprite = this.IconSprite;
	}

	onToogle(isToogle)
	{
		warn(`${this.button.name} ${isToogle}`);
	}
}

TopToolbarButtons.prototype.AlterElevationButton.ORDER = 2;
TopToolbarButtons.prototype.AlterElevationButton.prototype.IconSprite = "stretched:editor/toolbar/alterelevation.png";
TopToolbarButtons.prototype.AlterElevationButton.prototype.Tooltip = translate("Alter terrain elevation");
