TopToolbarButtons.prototype.TransformButton = class
{
	constructor(toolbar, button, icon)
	{
		this.button = button;
		this.setupWindow = toolbar.setupWindow;
		icon.sprite = "stretched:editor/toolbar/moveobject.png";
	}

	onToogle(isToogle)
	{
		warn(`${this.button.name} ${isToogle}`);
	}
}

TopToolbarButtons.prototype.TransformButton.ORDER = 1;
