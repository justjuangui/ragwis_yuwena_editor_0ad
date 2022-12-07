class TopToolbarButtons
{
}

EditorWindowPages.TopToolBar = class
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;

		this.topToolbarButtonsPanel = Engine.GetGUIObjectByName("topToolbarButtonsPanel");
		let topToolbarButtons = this.topToolbarButtonsPanel.children;
		this.margin = topToolbarButtons[0].size.top;
		this.buttonWidth = topToolbarButtons[0].size.right;

		// Tooolbar buttons will be sorting base on constant ORDER
		// if this Constant isnt define it set to -1
		let handlerTopToolbarButtons = Object.keys(TopToolbarButtons.prototype).sort(
			(a, b) => (TopToolbarButtons.prototype[a].ORDER || -1) - (TopToolbarButtons.prototype[b].ORDER || -1)
		);

		if (handlerTopToolbarButtons.length > topToolbarButtons.length)
			throw new Error(
				"There are " + handlerTopToolbarButtons.length + " top toolbar buttons defined, " +
				"but only " + topToolbarButtons.length  + " objects!"
			);

		this.toogleIndex = 0;
		this.buttons = handlerTopToolbarButtons.map((handlerName, i) => {
			this.toogleIndex = TopToolbarButtons.prototype[handlerName].DEFAULT === true ? i : this.toogleIndex;
			let icon = Engine.GetGUIObjectByName(`topToolbarButtonIcon[${i}]`);
			let selection = Engine.GetGUIObjectByName(`topToolbarButtonSelection[${i}]`);
			let handler = new TopToolbarButtons.prototype[handlerName](this, topToolbarButtons[i], icon);
			this.initButton(handler, topToolbarButtons[i], i);
			return {
				handler,
				icon,
				selection
			};
		});

		this.setupWindow.registerLoadHandler(()=> {
			//set by default
			this.buttons[this.toogleIndex].handler.onToogle(true);
			this.buttons[this.toogleIndex].selection.hidden = false;
		});
	}

	initButton(handler, button, i)
	{
		button.onPress = () => {
			if (i !== this.toogleIndex)
			{
				if (this.buttons[this.toogleIndex])
				{
					this.buttons[this.toogleIndex].handler.onToogle(false);
					this.buttons[this.toogleIndex].selection.hidden = true;
				}
				handler.onToogle(true);
				this.buttons[i].selection.hidden = false;
				this.toogleIndex = i;
			}
		};

		let size = button.size;
		size.left = this.buttonWidth * (i) + this.margin;
		size.right = this.buttonWidth * (i + 1);
		button.size = size;

		button.hidden = false;
	}
};
