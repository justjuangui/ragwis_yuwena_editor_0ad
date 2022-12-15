class StartEditorButton
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.startEditorButton = Engine.GetGUIObjectByName("startEditorButton");
		this.startEditorButton.caption = this.Caption;
		this.startEditorButton.onPress = this.onPress.bind(this);
		this.startEditorButton.tooltip = this.Tooltip;
	}

	onPress()
	{
		this.setupWindow.controls.editorSettingsController.launchGame();
	}
}

StartEditorButton.prototype.Caption =
	translate("Start Editor!");

StartEditorButton.prototype.Tooltip =
	translate("Start a new editor with the current settings.");
