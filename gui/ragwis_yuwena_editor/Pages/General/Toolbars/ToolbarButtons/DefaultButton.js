TopToolbarButtons.prototype.DefaultButton = class
{
	constructor(toolbar, button, icon)
	{
		this.button = button;
		this.setupWindow = toolbar.setupWindow;
		icon.sprite = "stretched:editor/toolbar/default.png";
	}

	onToogle(isToogle)
	{
		warn(`${this.button.name} ${isToogle}`);
	}
}
