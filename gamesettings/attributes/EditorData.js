GameSettings.prototype.Attributes.EditorData = class EditorData extends GameSetting
{
	init()
	{
		this.type = undefined;
	}

	toInitAttributes(attribs)
	{
		attribs.editorType = this.type;
	}

	fromInitAttributes(attribs)
	{
		if (attribs.editorType)
			this.setType(attribs.editorType);
	}

	setType(type)
	{
		this.type = type;
	}
};
