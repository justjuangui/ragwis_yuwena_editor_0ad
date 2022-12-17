/**
 * Holds the actual settings & related logic.
 * Global out of convenience in GUI controls.
 */
var g_GameSettings;

/**
 * This instance owns all handlers that control
 * the two synchronized states g_EditorSettings and g_PlayerAssignments.
 */
var g_SetupWindow;

function init(initData, hotloadData)
{
	// In the editor the map is reveales for all
	// we use here because preventing change settings from the map
	Engine.RevealMap();

	// disabled constraint in camera
	Engine.GameView_SetConstrainCameraEnabled(false);

	g_SetupWindow = new EditorWindow(initData, hotloadData);
}

function getHotloadData()
{
	return g_SetupWindow.getHotloadData();
}

function handleInputBeforeGui(ev, hoveredObject)
{
	return g_SetupWindow.onHandleInputBeforeGui(ev, hoveredObject);
}

function handleInputAfterGui(ev)
{
	return g_SetupWindow.onHandleInputAfterGui(ev);
}
