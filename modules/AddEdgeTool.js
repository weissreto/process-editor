
import { Bounds } from "./Bounds.js";
import { Edge } from "./Edge.js";
import { Tool } from "./Tool.js";
import { Invisible } from "./Symbol.js";
import { Node } from "./Node.js";
import { ALL } from "./Bounds.js";
import { SelectionTool } from "./SelectionTool.js";

export class AddEdgeTool extends Tool
{
  constructor(model, x, y, symbol)
  {
    super(model);
    this.x = x; 
    this.y = y;
    this.from = model.menu.element;
    this.to = new Node(new Bounds(x, y, 0, 0), new Invisible());
    this.edge = new Edge(this.from, this.to);
    model.add(this.edge);
  }

  onMouseMove(event)
  {
    this.to.moveBy(ALL, event.offsetX - this.x, event.offsetY - this.y);
    this.x = event.offsetX;
    this.y = event.offsetY;
  }

  onMouseDown(event)
  {
    let element = this.model.elementAt(event.offsetX, event.offsetY);
    this.model.remove(this.edge);
    if (element != null)
    {
        this.model.add(new Edge(this.from, element));
    }
    return new SelectionTool(this.model);
  }
}