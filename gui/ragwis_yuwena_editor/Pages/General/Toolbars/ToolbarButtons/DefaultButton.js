TopToolbarButtons.prototype.DefaultButton = class
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

TopToolbarButtons.prototype.DefaultButton.prototype.IconSprite = "stretched:editor/toolbar/default.png";
TopToolbarButtons.prototype.DefaultButton.prototype.Tooltip = translate("Default");
