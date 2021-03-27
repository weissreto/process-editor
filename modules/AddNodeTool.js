import { Bounds, ALL } from "./Bounds.js";
import { Edge } from "./Edge.js";
import { Node } from "./Node.js";
import { SelectionTool } from "./SelectionTool.js";
import { Task } from "./Symbol.js";
import { Tool } from "./Tool.js"

export class AddNodeTool extends Tool
{
  constructor(model, x, y, symbol)
  {
    super(model);
    this.x = x; 
    this.y = y;
    let width = symbol.defaultWidth;
    let height = symbol.defaultHeight;
    this.node = new Node(new Bounds(x - width / 2, y - height / 2, width, height), symbol);
    var edge = new Edge(model.menu.element, this.node);
    model.add(edge);
    model.add(this.node);
  }

  onMouseMove(event)
  {
    this.node.moveBy(ALL, event.offsetX - this.x, event.offsetY - this.y);
    this.x = event.offsetX;
    this.y = event.offsetY;
  }

  onMouseDown(event)
  {
    return new SelectionTool(this.model);
  }
}