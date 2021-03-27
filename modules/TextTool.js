import { Tool } from "./Tool.js";
import { Text } from "./Text.js";
import { SelectionTool } from "./SelectionTool.js"

export class TextTool extends Tool
{
    constructor (model)
    {
        super(model)
        this.element = model.menu.element;
        this.text = this.element.text;
        if (this.text == null)
        {
            this.text = new Text(this.element.bounds)
            this.model.addText(this.element, this.text);
        }
        this.text.startEdit();
    }

    onMouseDown()
    {
        this.text.stopEdit();
        return new SelectionTool(this.model);
    }

    onKeyDown(event)
    {
        console.log("Key "+event.keyCode+" "+event.key);
        if (event.key.length > 1)
        {
            if (event.key == "Backspace")        
            {
                this.text.removeLeft();
            }
            if (event.key == "ArrowLeft")
            {
                this.text.cursorLeft();
            }
            if (event.key == "ArrowRight")
            {
                this.text.cursorRight();
            }
            if (event.key == "Delete")
            {
                this.text.removeRight();
            }
        }
        else
        {
            this.text.add(event.key)
        }
    }


}