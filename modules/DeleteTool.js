import { Tool } from "./Tool.js"
import { SelectionTool } from "./SelectionTool.js"

export class DeleteTool extends Tool
{
  constructor(model, x, y, symbol)
  {
    super(model);
    this.model.remove(this.model.menu.element);
    this.model.selection.clear();
  }

  onMouseMove(event)
  {
    return new SelectionTool(this.model);
  }
}