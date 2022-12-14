EditorSettingControls.Nomad = class Nomad extends EditorSettingControlCheckbox
{
	constructor(...args)
	{
		super(...args);
		g_GameSettings.nomad.watch(() => this.render(), ["enabled"]);
		g_GameSettings.map.watch(() => this.render(), ["type"]);
		this.render();
	}

	render()
	{
		this.setHidden(g_GameSettings.map.type != "random");
		this.setChecked(g_GameSettings.nomad.enabled);
	}

	onPress(checked)
	{
		g_GameSettings.nomad.setEnabled(checked);
	}
};

EditorSettingControls.Nomad.prototype.TitleCaption =
	translate("Nomad");

EditorSettingControls.Nomad.prototype.Tooltip =
	translate("In Nomad mode, players start with only few units and have to find a suitable place to build their city. Ceasefire is recommended.");
