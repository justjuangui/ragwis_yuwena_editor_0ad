class EditorDescription
{
	constructor(setupWindow)
	{
		this.mapCache = setupWindow.controls.mapCache;

		this.editorDescription = Engine.GetGUIObjectByName("editorDescription");

		this.registerWatchers();
		this.updateEditorDescription();
	}

	registerWatchers()
	{
		let update = () => this.updateEditorDescription();
		g_GameSettings.biome.watch(update, ["biome"]);
		g_GameSettings.map.watch(update, ["map", "type"]);
		g_GameSettings.nomad.watch(update, ["enabled"]);
		g_GameSettings.mapSize.watch(update, ["size"]);
	}

	updateEditorDescription()
	{
		if (this.timer)
			clearTimeout(this.timer);
		// Update the description on the next GUI tick.
		// (multiple settings can change at once)
		let updateCaption = () => { this.editorDescription.caption = getEditorDescription(g_GameSettings.toInitAttributes(), this.mapCache); };
		this.timer = setTimeout(updateCaption, 0);
	}
}
