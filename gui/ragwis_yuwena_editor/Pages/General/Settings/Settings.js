EditorWindowPages.Settings = class
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.editorSettingControlManager = new EditorSettingControlManager(setupWindow);

		this.gui = Engine.GetGUIObjectByName("settingsWindow");
		this.title = Engine.GetGUIObjectByName("settigsWindowTitle");
		this.save = Engine.GetGUIObjectByName("settingsWindowSaveButton");
		this.cancel = Engine.GetGUIObjectByName("settingsWindowCancelButton");
		this.settingsControls = Engine.GetGUIObjectByName("settingsWindowControls");

		this.tabSelectedIndex = -1;

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

		this.settingsControls.onWindowResized = this.repositionSettings.bind(this);

		this.setupSettingsUI();
	}

	setupSettingsUI()
	{
		for (const settingOptionIndex in this.SettingsOptions)
		{
			let button = Engine.GetGUIObjectByName("settingsWindowTabButton[" + settingOptionIndex + "]");
			if (!button)
			{
				warn("Too few tab-buttons!");
				break;
			}

			button.hidden = false;

			let size = button.size;
			size.top = settingOptionIndex * (this.TabButtonSize + this.TabButtonSpacing) + this.TabButtonSpacing / 2;
			size.bottom = size.top + this.TabButtonSize;
			size.rbottom = 0;

			button.size = size;
			button.onPress = () => this.onTabSelected(settingOptionIndex);
			Engine.GetGUIObjectByName("settingsWindowTabButtonText[" + settingOptionIndex + "]").caption = this.SettingsOptions[settingOptionIndex].label;
		}
		this.onTabSelected(0)
	}

	onTabSelected(newTabSelectedIndex) {
		if (newTabSelectedIndex != this.tabSelectedIndex)
		{
			if (this.tabSelectedIndex >= 0)
				Engine.GetGUIObjectByName("settingsWindowTabButton[" + this.tabSelectedIndex + "]").sprite = "ModernTabVerticalBackground";
			Engine.GetGUIObjectByName("settingsWindowTabButton[" + newTabSelectedIndex + "]").sprite = "ModernTabVerticalForeground";
			this.tabSelectedIndex = newTabSelectedIndex;

			this.updateVisibilitySettings();
		}
	}

	updateVisibilitySettings()
	{
		const settings = this.SettingsOptions[this.tabSelectedIndex].settings;
		this.editorSettingControlManager.hideSettingByName((settingName)=> !settings.includes(settingName));
		this.repositionSettings();
	}

	repositionSettings()
	{
		const settings = this.SettingsOptions[this.tabSelectedIndex].settings;
		const size = this.settingsControls.getComputedSize();

		let yPos = this.SettingSpacing;

		for (let settingName of settings)
		{
			let frame = this.editorSettingControlManager.editorSettingControls[settingName].frame;
			if (frame.hidden)
				continue;

			frame.size = new GUISize(
				16,
				yPos,
				(size.right - size.left) - 16,
				yPos + this.SettingHeight
			);

			yPos = yPos + this.SettingHeight + this.SettingSpacing;
		}
	}

	onMapSettingsIsOpenChange()
	{
		const newValue = this.setupWindow.controls["guiController"].mapSettingsIsOpen;;
		if (this.gui.hidden && newValue)
			this.setupWindow.controls["editorSettingsController"].loadMapSettings();

		this.gui.hidden = !newValue;
	}
}

EditorWindowPages.Settings.prototype.SaveCaption = translate("Save");
EditorWindowPages.Settings.prototype.SaveTooltip = translate("Save");

EditorWindowPages.Settings.prototype.CancelCaption = translate("Cancel");
EditorWindowPages.Settings.prototype.CancelTooltip = translate("Cancel");

EditorWindowPages.Settings.prototype.TitleCaption = translate("Map Settings");

EditorWindowPages.Settings.prototype.TabButtonSize = 36;
EditorWindowPages.Settings.prototype.TabButtonSpacing = 4;

EditorWindowPages.Settings.prototype.SettingHeight = 34;
EditorWindowPages.Settings.prototype.SettingSpacing = 4;
