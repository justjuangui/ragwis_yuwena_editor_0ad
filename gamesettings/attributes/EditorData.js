GameSettings.prototype.Attributes.EditorData = class EditorData extends GameSetting
{
	init()
	{
		this.type = undefined;
	}

	toInitAttributes(attribs)
	{
		attribs.settings.EditorType = this.type;
	}

	fromInitAttributes(attribs)
	{
		if (!!this.getLegacySetting(attribs, "EditorType"))
			this.setType(this.getLegacySetting(attribs, "EditorType"));
	}

	setType(type)
	{
		this.type = type;
	}
};
