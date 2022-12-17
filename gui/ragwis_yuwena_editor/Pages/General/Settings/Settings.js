EditorWindowPages.Settings = class
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.gui = Engine.GetGUIObjectByName("settingsWindow");
		this.title = Engine.GetGUIObjectByName("settigsWindowTitle");
		this.save = Engine.GetGUIObjectByName("settingsWindowSaveButton");
		this.cancel = Engine.GetGUIObjectByName("settingsWindowCancelButton");

		// set default titles
		this.title.caption = this.TitleCaption;
		this.save.caption = this.SaveCaption;
		this.save.tooltip = this.SaveTooltip;
		this.cancel.caption = this.CancelCaption;
		this.cancel.tooltip = this.CancelTooltip;

		this.setupWindow.controls["guiController"].watch(() => this.onMapSettingsIsOpenChange(), ["mapSettingsIsOpen"])
		this.cancel.onPress = () => {
			this.setupWindow.controls["guiController"].mapSettingsIsOpen = false;
		}
	}

	onMapSettingsIsOpenChange()
	{
		const newValue = this.setupWindow.controls["guiController"].mapSettingsIsOpen;;
		if (this.gui.hidden && newValue) {
			// we need to load map settings here
		}

		this.gui.hidden = !newValue;
	}
}

EditorWindowPages.Settings.prototype.SaveCaption = translate("Save");
EditorWindowPages.Settings.prototype.SaveTooltip = translate("Save");

EditorWindowPages.Settings.prototype.CancelCaption = translate("Cancel");
EditorWindowPages.Settings.prototype.CancelTooltip = translate("Cancel");

EditorWindowPages.Settings.prototype.TitleCaption = translate("Map Settings");
