/**
 * This instance owns all handlers that control
 * the two synchronized states g_GameSettings and g_PlayerAssignments.
 */
var g_SetupWindow;

function init(initData, hotloadData)
{
    g_SetupWindow = new SetupWindow(initData, hotloadData);
}

function getHotloadData()
{
	return g_SetupWindow.getHotloadData();
}

