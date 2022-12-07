TopToolbarButtons.prototype.FlattenElevationButton = class
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

TopToolbarButtons.prototype.FlattenElevationButton.ORDER = 4;
TopToolbarButtons.prototype.FlattenElevationButton.prototype.IconSprite = "stretched:editor/toolbar/flattenelevation.png";
TopToolbarButtons.prototype.FlattenElevationButton.prototype.Tooltip = translate("Flatten terrain elevation");
