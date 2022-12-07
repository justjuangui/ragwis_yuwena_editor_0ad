class MenuButtons
{
}

EditorWindowPages.Menus = class
{
	constructor(setupWindow)
	{
		this.setupWindow = setupWindow;
		this.menuButton = Engine.GetGUIObjectByName("menuButton");
		this.menuButton.onPress = this.toogle.bind(this);

		this.isOpen = false;
		this.lastTick = undefined;

		this.menuButtonPanel = Engine.GetGUIObjectByName("menuButtonPanel");
		let menuButtons = this.menuButtonPanel.children;
		this.margin = menuButtons[0].size.top;
		this.buttonHeight = menuButtons[0].size.bottom;

		// Menus will be sorting base on constant ORDER
		// if this Constant isnt define it set to -1
		let handlerMenuButtons = Object.keys(MenuButtons.prototype).sort(
			(a, b) => (MenuButtons.prototype[a].ORDER || -1) - (MenuButtons.prototype[b].ORDER || -1)
		);

		if (handlerMenuButtons.length > menuButtons.length)
			throw new Error(
				"There are " + handlerNames.length + " menu buttons defined, " +
				"but only " + menuButtons.length  + " objects!"
			);

		this.buttons = handlerMenuButtons.map((handlerName, i) => {
			let handler = new MenuButtons.prototype[handlerName](this, menuButtons[i]);
			this.initButton(handler, menuButtons[i], i);
			return handler;
		});

		this.endPosition = this.margin + this.buttonHeight * (1 + handlerMenuButtons.length);
		let size = this.menuButtonPanel.size;
		size.top = -this.endPosition;
		size.bottom = 0;
		this.menuButtonPanel.size = size;

		this.setupWindow.registerHandleInputBeforeGuiHandler(this.onHandleInputBeforeGui.bind(this));
	}

	onHandleInputBeforeGui(ev, hoveredObject)
	{
		if (!hoveredObject &&
			(ev.type === SDLConstans.GUI_MAPPINGS_EVENTS.SDL_MOUSEBUTTONUP || ev.type === SDLConstans.GUI_MAPPINGS_EVENTS.SDL_MOUSEBUTTONDOWN) &&
			(ev.button === SDLConstans.SDL_MOUSE_BUTTONS.SDL_BUTTON_LEFT || ev.button === SDLConstans.SDL_MOUSE_BUTTONS.SDL_BUTTON_RIGHT))
		{
			this.close();
		}
	}

	toogle()
	{
		this.isOpen = !this.isOpen;
		this.startAnimation();
	}

	startAnimation()
	{
		this.lastTick = Date.now();
		this.menuButtonPanel.onTick = this.onTick.bind(this);
	}

	close()
	{
		this.isOpen = false;
		this.startAnimation();
	}

	initButton(handler, button, i)
	{
		button.onPress = () => {
			this.close();
			handler.onPress();
		};

		let size = button.size;
		size.top = this.buttonHeight * (i + 1) + this.margin;
		size.bottom = this.buttonHeight * (i + 2);
		button.size = size;

		button.hidden = false;
	}

	onTick()
	{
		let ticketLength = Date.now() - this.lastTick;
		this.lastTick = Date.now();

		let maxOffset =
			this.endPosition + (
				this.isOpen ? -this.menuButtonPanel.size.bottom : +this.menuButtonPanel.size.top
			);

		if (maxOffset <= 0)
		{
			delete this.menuButtonPanel.onTick;
			return;
		}

		let offset = Math.min(this.Speed * ticketLength, maxOffset) * (this.isOpen ? +1 : -1);
		let size = this.menuButtonPanel.size;
		size.top += offset;
		size.bottom += offset;
		this.menuButtonPanel.size = size;

	}
};

EditorWindowPages.Menus.prototype.Speed = 1.2;
