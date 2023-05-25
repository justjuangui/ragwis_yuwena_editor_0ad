// we are going chance the atlas menu and use in different way this is only useful in Public mod

const currentAtlasLegacyMenu = g_MainMenuItems[g_MainMenuItems.length - 3];

g_MainMenuItems[g_MainMenuItems.length - 3] = {
	"caption": translate("Editors"),
	"tooltip": translate('Create / Edit maps with legacy Atlas or with Ragwis Yuwena editor alpha version'),
	"submenu" : [
		currentAtlasLegacyMenu,
		{
			"caption": translate("Scenario Editor (Alpha)"),
			"tooltip": translate('Ragwis Yuwena editor alpha version'),
			"onPress": () => {
				Engine.SwitchGuiPage("page_editorsetup.xml");
			}
		}
	]
}
