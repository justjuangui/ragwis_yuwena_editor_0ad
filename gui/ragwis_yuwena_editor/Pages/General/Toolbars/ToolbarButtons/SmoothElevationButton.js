TopToolbarButtons.prototype.SmoothElevationButton = class
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

TopToolbarButtons.prototype.SmoothElevationButton.ORDER = 3;
TopToolbarButtons.prototype.SmoothElevationButton.prototype.IconSprite = "stretched:editor/toolbar/smoothelevation.png";
TopToolbarButtons.prototype.SmoothElevationButton.prototype.Tooltip = translate("Smooth terrain elevation");
