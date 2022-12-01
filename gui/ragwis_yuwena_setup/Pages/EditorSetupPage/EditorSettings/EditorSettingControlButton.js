/**
 * This class is implemented by editorsettings that are controlled by a button.
 */
class EditorSettingControlButton extends EditorSettingControl
{
	setControl(editorSettingControlManager)
	{
		let row = editorSettingControlManager.getNextRow("buttonSettingFrame");
		this.frame = Engine.GetGUIObjectByName("buttonSettingFrame[" + row + "]");
		this.button = Engine.GetGUIObjectByName("buttonSettingControl[" + row + "]");
		this.button.onPress = this.onPress.bind(this);
		if (this.Caption)
			this.button.caption = this.Caption;
	}

	setControlTooltip(tooltip)
	{
		this.button.tooltip = tooltip;
	}

	setControlHidden(hidden)
	{
		this.button.hidden = hidden;
	}
}
