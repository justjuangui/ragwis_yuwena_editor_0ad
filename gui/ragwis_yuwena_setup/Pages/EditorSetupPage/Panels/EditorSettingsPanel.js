class EditorSettingsPanel
{
	constructor(setupWindow, editorSettingControlManager)
	{
		this.settingsPanelFrame = Engine.GetGUIObjectByName("settingsPanelFrame");

		this.editorSettingControlManager = editorSettingControlManager;
		this.EditorSettingsPanelResizeHandlers = new Set();

		this.editorSetupPage = Engine.GetGUIObjectByName("editorSetupPage");
		this.editorSetupPage.onWindowResized = this.onWindowResized.bind(this);

		this.settingsPanel = Engine.GetGUIObjectByName("settingsPanel");

		setupWindow.controls.editorSettingsController.registerUpdateLayoutHandler(this.updateSize.bind(this));
		setupWindow.registerLoadHandler(this.triggerResizeHandlers.bind(this));
	}

	registerEditorSettingsPanelResizeHandler(handler)
	{
		this.EditorSettingsPanelResizeHandlers.add(handler);
	}

	triggerResizeHandlers()
	{
		for (let handler of this.EditorSettingsPanelResizeHandlers)
			handler(this.settingsPanelFrame);
	}

	onWindowResized()
	{
		this.updateSize();
		this.triggerResizeHandlers();
	}

	updateSize()
	{
		this.editorSettingControlManager.updateSettingVisibility();
		this.positionSettings();
	}

	/**
	 * Distribute the currently visible settings over the settings panel.
	 * First calculate the number of columns required, then place the setting frames.
	 */
	positionSettings()
	{
		let editorSetupPageSize = this.editorSetupPage.getComputedSize();

		let columnWidth = Math.min(
			this.MaxColumnWidth,
			(editorSetupPageSize.right - editorSetupPageSize.left) / 2);

		let settingsPerColumn;
		{
			let settingPanelSize = this.settingsPanel.getComputedSize();
			let maxSettingsPerColumn = Math.floor((settingPanelSize.bottom - settingPanelSize.top) / this.SettingHeight);
			let settingCount = this.settingsPanel.children.filter(child => !child.children[0].hidden).length;
			settingsPerColumn = settingCount / Math.ceil(settingCount / maxSettingsPerColumn);
		}

		let yPos = this.SettingMarginBottom;
		let column = 0;
		let settingsThisColumn = 0;

		for (let name of g_EditorSettingsLayout)
		{
			let settingFrame = this.editorSettingControlManager.editorSettingControls[name].frame;
			if (settingFrame.hidden)
				continue;

			if (settingsThisColumn >= settingsPerColumn)
			{
				yPos = this.SettingMarginBottom;
				++column;
				settingsThisColumn = 0;
			}

			settingFrame.size = new GUISize(
				columnWidth * column,
				yPos,
				columnWidth * (column + 1) - this.SettingMarginRight,
				yPos + this.SettingHeight - this.SettingMarginBottom);

			yPos += this.SettingHeight;
			++settingsThisColumn;
		}
	}
}

/**
 * Maximum width of a column in the settings panel.
 */
EditorSettingsPanel.prototype.MaxColumnWidth = 470;

/**
 * Vertical size of a setting frame.
 */
EditorSettingsPanel.prototype.SettingHeight = 36;

/**
 * Horizontal space between two setting frames.
 */
EditorSettingsPanel.prototype.SettingMarginRight = 10;

/**
 * Vertical space between two setting frames.
 */
EditorSettingsPanel.prototype.SettingMarginBottom = 2;
