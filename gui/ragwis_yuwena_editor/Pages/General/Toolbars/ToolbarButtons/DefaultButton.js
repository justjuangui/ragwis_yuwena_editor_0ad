TopToolbarButtons.prototype.DefaultButton = class
{
	constructor(toolbar, button, icon)
	{
		this.button = button;
		this.setupWindow = toolbar.setupWindow;
		icon.sprite = this.IconSprite;
	}

	onToogle(isToogle)
	{
		warn(`${this.button.name} ${isToogle}`);
	}
}

TopToolbarButtons.prototype.DefaultButton.prototype.IconSprite = "stretched:editor/toolbar/default.png";
