TopToolbarButtons.prototype.TransformPathButton = class
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

TopToolbarButtons.prototype.TransformPathButton.ORDER = 6;
TopToolbarButtons.prototype.TransformPathButton.prototype.IconSprite = "stretched:editor/toolbar/movepath.png";
TopToolbarButtons.prototype.TransformPathButton.prototype.Tooltip = translate("Move cinema path nodes");
