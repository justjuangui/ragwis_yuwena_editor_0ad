EditorSettingControls.MapBrowser = class MapBrowser extends EditorSettingControlButton
{
	constructor(...args)
	{
		super(...args);

		this.button.tooltip = colorizeHotkey(this.HotkeyTooltip, this.HotkeyConfig);
		Engine.SetGlobalHotkey(this.HotkeyConfig, "Press", this.onPress.bind(this));
	}

	onSettingsLoaded()
	{
		if (this.editorSettingsController.guiData.lockSettings?.map)
		{
			this.setEnabled(false);
			this.setHidden(true);
			return;
		}
	}

	setControlHidden()
	{
		this.button.hidden = false;
	}

	onPress()
	{
		this.setupWindow.pages.MapBrowserPage.openPage();
	}
};

EditorSettingControls.MapBrowser.prototype.HotkeyConfig =
	"gamesetup.mapbrowser.open";

EditorSettingControls.MapBrowser.prototype.Caption =
	translate("Browse Maps");

EditorSettingControls.MapBrowser.prototype.HotkeyTooltip =
	translate("Press %(hotkey)s to view the list of available maps.");
