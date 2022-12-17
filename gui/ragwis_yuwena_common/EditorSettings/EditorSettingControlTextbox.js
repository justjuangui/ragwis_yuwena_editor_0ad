/**
 * This class is implemented by editor settings that are controlled by a Input.
 */
class EditorSettingControlTextbox extends EditorSettingControl
{
	constructor(...args)
	{
		super(...args);

		this.isInGuiUpdate = false;
		if (this.onTextEdit)
			this.input.onTextEdit = this.onTextEdit.bind(this);
	}

	setControl(editorSettingControlManager)
	{
		let row = editorSettingControlManager.getNextRow("textboxSettingFrame");
		this.frame = Engine.GetGUIObjectByName("textboxSettingFrame[" + row + "]");
		this.input = Engine.GetGUIObjectByName("textboxSettingControl[" + row + "]");

		let labels = this.frame.children[0].children;
		this.title = labels[0];
		this.label = labels[1];
	}

	setControlTooltip(tooltip)
	{
		this.input.tooltip = tooltip;
	}

	setControlHidden(hidden)
	{
		this.input.hidden = hidden;
	}

	setValue(value)
	{
		this.isInGuiUpdate = true;
		this.input.caption = value || "";
		this.isInGuiUpdate = false;
	}
}
