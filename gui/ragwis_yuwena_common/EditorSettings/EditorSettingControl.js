/**
 * The EditorSettingControl is an abstract class that is inherited by game-setting control classes specific to a GUI-object type,
 * such as the EditorSettingControlCheckbox or EditorSettingControlDropdown.
 *
 * The purpose of these classes is to control one logical game setting.
 * The base classes allow implementing that while avoiding duplication.
 *
 * EditorSettingControl classes watch for g_GameSettings property changes,
 * and re-render accordingly. They also trigger changes in g_GameSettings.
 *
 * The EditorSettingControl classes are responsible for triggering network synchronisation,
 * and for updating the whole gamesetup layout when necessary.
 */
class EditorSettingControl /* extends Profilable /* Uncomment to profile controls without hassle. */
{
	constructor(editorSettingControlManager)
	{
		// Store arguments
		{
			this.setupWindow = editorSettingControlManager.setupWindow;
			this.editorSettingsController = this.setupWindow.controls.editorSettingsController;
			this.mapCache = this.setupWindow.controls.mapCache;
			this.mapFilters = this.setupWindow.controls.mapFilters;
		}

		// enabled and hidden should only be modified through their setters or
		// by calling updateVisibility after modification.
		this.enabled = true;
		this.hidden = false;

		if (this.setControl)
			this.setControl(editorSettingControlManager);

		// This variable also used for autocompleting chat.
		this.autocompleteTitle = undefined;

		if (this.title && this.TitleCaption)
			this.setTitle(this.TitleCaption);

		if (this.Tooltip)
			this.setTooltip(this.Tooltip);

		this.setHidden(false);

		if (this.onLoad)
			this.setupWindow.registerLoadHandler(this.onLoad.bind(this));

		if (this.onSettingsLoaded)
			this.editorSettingsController.registerSettingsLoadedHandler(this.onSettingsLoaded.bind(this));
	}

	setTitle(titleCaption)
	{
		this.autocompleteTitle = titleCaption;
		this.title.caption = sprintf(this.TitleCaptionFormat, {
			"setting": titleCaption
		});
	}

	setTooltip(tooltip)
	{
		if (this.title)
			this.title.tooltip = tooltip;

		if (this.label)
			this.label.tooltip = tooltip;

		if (this.setControlTooltip)
			this.setControlTooltip(tooltip);
	}

	setEnabled(enabled)
	{
		this.enabled = enabled;
		this.updateVisibility();
	}

	setHidden(hidden)
	{
		this.hidden = hidden;
		// Trigger a layout update to reposition items.
		this.editorSettingsController.updateLayout();
	}

	updateVisibility()
	{
		let hidden = this.hidden

		if (this.frame)
			this.frame.hidden = hidden;

		if (hidden)
			return;

		let enabled = this.enabled;

		if (this.setControlHidden)
			this.setControlHidden(!enabled);

		if (this.label)
			this.label.hidden = !!enabled;
	}

	/**
	 * Returns whether the control specifies an order but didn't implement the function.
	 */
	addAutocompleteEntries(name, autocomplete)
	{
		if (this.autocompleteTitle)
			autocomplete[0].push(this.autocompleteTitle);

		if (!Number.isInteger(this.AutocompleteOrder))
			return;

		if (!this.getAutocompleteEntries)
		{
			error(name + " specifies AutocompleteOrder but didn't implement getAutocompleteEntries");
			return;
		}

		let newEntries = this.getAutocompleteEntries();
		if (newEntries)
			autocomplete[this.AutocompleteOrder] =
				(autocomplete[this.AutocompleteOrder] || []).concat(newEntries);
	}
}

EditorSettingControl.prototype.TitleCaptionFormat =
	translateWithContext("Title for specific setting", "%(setting)s:");

/**
 * Derived classes can set this to a number to enable chat autocompleting of setting values.
 * Higher numbers are autocompleted first.
 */
EditorSettingControl.prototype.AutocompleteOrder = undefined;
