/**
 * This instance owns all handlers that control
 * the two synchronized states g_GameSettings and g_PlayerAssignments.
 */
var g_SetupWindow;

function init(initData, hotloadData)
{
	// disabled constraint in camera
	Engine.GameView_SetConstrainCameraEnabled(false);
    g_SetupWindow = new EditorWindow(initData, hotloadData);
}

function getHotloadData()
{
	return g_SetupWindow.getHotloadData();
}

