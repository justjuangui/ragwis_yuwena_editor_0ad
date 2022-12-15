/**
 * This class owns all handlers of the editr setup page, excluding controllers that apply to all subpages and handlers for specific subpages.
 */
EditorSetupWindowPages.EditorSetupPage = class
{
	constructor(setupWindow)
	{
		Engine.ProfileStart("EditorSetupPage");

		// This class instance owns all editor setting GUI controls such as dropdowns and checkboxes visible in this page.
		this.editorSettingControlManager = new EditorSettingControlManager(setupWindow);

		// These classes manage GUI buttons.
		{
			this.panelButtons = {
				"cancelButton": new CancelButton(setupWindow),
				"startEditorButton": new StartEditorButton(setupWindow)
			};
		}

		// These classes manage GUI Objects.
		{
			this.panels = {
				"mapPreview": new MapPreview(setupWindow),
				"editorDescription": new EditorDescription(setupWindow),
				"editorSettingsPanel": new EditorSettingsPanel(setupWindow, this.editorSettingControlManager)
			}
		}

		Engine.ProfileStop();
	}
};
