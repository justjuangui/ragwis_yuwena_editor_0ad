EditorSettingControls.MapBrowser = class MapBrowser extends EditorSettingControlButton
{
	constructor(...args)
	{
		super(...args);

		g_GameSettings.editorData.watch(() => this.onEditorTypeChanged(), ["type"]);
	}

	onEditorTypeChanged()
	{
		this.setHidden(g_GameSettings.editorData.type === "new");
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

EditorSettingControls.MapBrowser.prototype.Caption =
	translate("Browse Maps");

EditorSettingControls.MapBrowser.prototype.HotkeyTooltip =
	translate("Press %(hotkey)s to view the list of available maps.");
