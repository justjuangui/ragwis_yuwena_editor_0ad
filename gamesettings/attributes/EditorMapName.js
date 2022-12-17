GameSettings.prototype.Attributes.EditorMapName = class EditorMapName extends GameSetting
{
	init()
	{
		this.name = undefined;
	}

	toInitAttributes(attribs)
	{
		if (attribs.editorType)
			attribs.settings.Name = this.name;
	}

	fromInitAttributes(attribs)
	{
		if (attribs.editorType)
			this.setName(attribs.settings.Name);
	}

	setName(name)
	{
		this.name = name;
	}
};
