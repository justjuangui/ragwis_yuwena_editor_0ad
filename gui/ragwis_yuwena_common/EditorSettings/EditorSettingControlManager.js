/**
 * Each property of this class is a class that inherits EditorSettingControl and is
 * instantiated by the EditorSettingControlManager.
 */
class EditorSettingControls
{
}

/**
 * The EditorSettingControlManager owns all GUI controls.
 */
class EditorSettingControlManager
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.rows = {};
		this.editorSettingControls = {};

		for (let name in EditorSettingControls)
			this.editorSettingControls[name] =
				new EditorSettingControls[name](this);
	}

	getNextRow(name)
	{
		if (this.rows[name] === undefined)
			this.rows[name] = 0;
		else
			++this.rows[name];

		return this.rows[name];
	}

	updateSettingVisibility()
	{
		for (let name in this.editorSettingControls)
			this.editorSettingControls[name].updateVisibility();
	}

	addAutocompleteEntries(entries)
	{
		for (let name in this.editorSettingControls)
			this.editorSettingControls[name].addAutocompleteEntries(name, entries);
	}
}
