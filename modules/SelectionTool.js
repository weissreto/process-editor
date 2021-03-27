import { Tool } from "./Tool.js";
import { NONE } from "./Bounds.js"

export class SelectionTool extends Tool
{
    constructor(model)
    {
        super(model);
    }

    onMouseDown(event)
    {        
        var menuItem = this.model.menuItemAt(event.offsetX, event.offsetY);
        if (menuItem != null)
        {
            var newTool =  menuItem.getTool(this.model, event.offsetX, event.offsetY);
            this.model.showMenuFor(null);
            return newTool;
        }

        this.handle = this.model.selection.handleAt(event.offsetX, event.offsetY);
        if (this.handle == NONE)
        {
            this.model.selection.clear();
        }
        var element = this.model.elementAt(event.offsetX, event.offsetY);
        if (element != null)
        {
            this.model.selection.add(element);
        }
        this.model.showMenuFor(element);
        this.x = event.offsetX;
        this.y = event.offsetY;
        this.mouseDown = true;
    }

    onMouseMove(event)
    {        
        if (this.mouseDown && this.handle != NONE)
        {
            this.model.selection.moveBy(this.handle, event.offsetX - this.x, event.offsetY - this.y);
            this.x = event.offsetX;
            this.y = event.offsetY;
        }
        else
        {
            this.model.highlightMenuItemAt(event.offsetX, event.offsetY);
        }

    }

    onMouseUp(event)
    {
        this.mouseDown = false;
    }
}