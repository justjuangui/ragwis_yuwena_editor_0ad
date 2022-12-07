TopToolbarButtons.prototype.TransformButton = class
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

TopToolbarButtons.prototype.TransformButton.ORDER = 1;
TopToolbarButtons.prototype.TransformButton.prototype.IconSprite = "stretched:editor/toolbar/moveobject.png";
