/**
 * This class choses the title of the loading screen page.
 */
class TitleDisplay
{
	constructor(data)
	{
		let loadingMapName = Engine.GetGUIObjectByName("loadingMapName");
		loadingMapName.caption = sprintf(
			data.attribs.mapType == "random" ? this.Generating : this.Loading,
			{ "map": data.attribs.map });
	}
}

TitleDisplay.prototype.Generating = translate("Generating ā%(map)sā");

TitleDisplay.prototype.Loading = translate("Loading ā%(map)sā");
