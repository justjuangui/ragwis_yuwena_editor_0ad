TopToolbarButtons.prototype.PaintTerrainButton = class
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

TopToolbarButtons.prototype.PaintTerrainButton.ORDER = 5;
TopToolbarButtons.prototype.PaintTerrainButton.prototype.IconSprite = "stretched:editor/toolbar/paintterrain.png";
TopToolbarButtons.prototype.PaintTerrainButton.prototype.Tooltip = translate("Paint terrain texture");
