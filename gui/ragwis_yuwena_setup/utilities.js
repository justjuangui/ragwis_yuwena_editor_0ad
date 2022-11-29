function getEditorDescription(initAttributes, mapCache)
{
    let titles = [];
    if (initAttributes.map == "random")
		titles.push({
			"label": translateWithContext("Map Selection", "Random Map"),
			"value": translate("Randomly select a map from the list.")
		});
	else
	{
		titles.push({
			"label": translate("Map Name"),
			"value": mapCache.translateMapName(
				mapCache.getTranslatableMapName(initAttributes.mapType, initAttributes.map, initAttributes))
		});

		titles.push({
			"label": translate("Map Description"),
			"value": mapCache.getTranslatedMapDescription(initAttributes.mapType, initAttributes.map)
		});
	}

	titles.push({
		"label": translate("Map Type"),
		"value": g_MapTypes.Title[g_MapTypes.Name.indexOf(initAttributes.mapType)]
	});

	if (initAttributes.mapType == "random")
	{
		let mapSize = g_MapSizes.Name[g_MapSizes.Tiles.indexOf(initAttributes.settings.Size)];
		if (mapSize)
			titles.push({
				"label": translate("Map Size"),
				"value": mapSize
			});
	}

	if (initAttributes.settings.Biome)
	{
		let biome = g_Settings.Biomes.find(b => b.Id == initAttributes.settings.Biome);
		titles.push({
			"label": biome ? biome.Title : translateWithContext("biome", "Random Biome"),
			"value": biome ? biome.Description : translate("Randomly select a biome from the list.")
		});
	}

    if (initAttributes.settings.Nomad !== undefined)
		titles.push({
			"label": initAttributes.settings.Nomad ? translate("Nomad Mode") : translate("Civic Centers"),
			"value":
				initAttributes.settings.Nomad ?
					translate("Players start with only few units and have to find a suitable place to build their city.") :
					translate("Players start with a Civic Center.")
		});

    return titles.map(title => sprintf(translate("%(label)s %(details)s"), {
        "label": coloredText(title.label, g_DescriptionHighlight),
        "details":
            title.value === true ? translateWithContext("game setup option", "enabled") :
                title.value || translateWithContext("game setup option", "disabled")
    })).join("\n");
}
