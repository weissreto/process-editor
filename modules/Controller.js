import { SelectionTool } from "./SelectionTool.js";

export class Controller
{
    constructor(canvas, model)
    {
        canvas.onmousedown = (event) => this.onMouseDown(event);
        canvas.onmouseup = (event) => this.onMouseUp(event);
        canvas.onmousemove = (event) => this.onMouseMove(event);
        this.model = model;
        this.tool = new SelectionTool(model);
    }

    onMouseDown(event)
    {
        var newTool = this.tool.onMouseDown(event);
        if (newTool != null)
        {
            this.tool = newTool;
        }
    }

    onMouseMove(event)
    {
        var newTool = this.tool.onMouseMove(event);
        if (newTool != null)
        {
            this.tool = newTool;
        }
    }

    onMouseUp(event)
    {
        var newTool = this.tool.onMouseUp(event);
        if (newTool != null)
        {
            this.tool = newTool;
        }
    }
}