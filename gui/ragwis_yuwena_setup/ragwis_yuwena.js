const g_MapSizes = prepareForDropdown(g_Settings && g_Settings.MapSizes);
const g_MapTypes = prepareForDropdown(g_Settings && g_Settings.MapTypes);
const g_PopulationCapacities = prepareForDropdown(g_Settings && g_Settings.PopulationCapacities);
const g_WorldPopulationCapacities = prepareForDropdown(g_Settings && g_Settings.WorldPopulationCapacities);
const g_StartingResources = prepareForDropdown(g_Settings && g_Settings.StartingResources);
const g_VictoryConditions = g_Settings && g_Settings.VictoryConditions;
const g_EditorTypes = prepareForDropdown(loadSettingValuesFile("editor_types.json"));

/**
 * Remembers which clients are assigned to which player slots and whether they are ready.
 * The keys are GUIDs or "local" in single-player.
 */
var g_PlayerAssignments = {};

/**
 * Is this user in control of game settings (i.e. is a network server, or offline player).
 */
const g_IsController = true;

/**
 * Holds the actual settings & related logic.
 * Global out of convenience in GUI controls.
 */
var g_GameSettings;

/**
 * This instance owns all handlers that control
 * the two synchronized states g_GameSettings and g_PlayerAssignments.
 */
var g_SetupWindow;

function init(initData, hotloadData)
{
    // Editor only use local players from now
    let name = singleplayerName();

    // Replace empty player name when entering a single-player match for the first time.
    Engine.ConfigDB_CreateAndSaveValue("user", "playername.singleplayer", name);

    // By default, assign the player to the first slot.
    g_PlayerAssignments = {
        "local": {
            "name": name,
            "player": 1
        }
    };

    g_SetupWindow = new SetupWindow(initData, hotloadData);
}

function getHotloadData()
{
	return g_SetupWindow.getHotloadData();
}
