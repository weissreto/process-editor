import { AddNodeTool } from "./AddNodeTool.js"
import { AddEdgeTool } from "./AddEdgeTool.js"
import { DeleteTool } from "./DeleteTool.js"
import { TextTool } from "./TextTool.js"
import { Bounds } from "./Bounds.js";
import { End, Task } from "./Symbol.js";
export class Menu
{
    constructor(element, x, y)
    {
        this.element = element;
        this.x = x;
        this.y = y;
        this.items = [
            new AddNode(this.boundsFor(0), new Task()), 
            new AddNode(this.boundsFor(1), new End()),
            new AddEdge(this.boundsFor(2)),
            new Text(this.boundsFor(3)),
            new Delete(this.boundsFor(4))
        ];
    }

    draw(ctx)
    {
        this.items.forEach(item => item.draw(ctx, item == this.highlightItem));
    }

    boundsFor(itemNr)
    {
        return new Bounds(this.x + itemNr * 25, this.y + itemNr * 0, 20, 20);
    }

    itemAt(x, y)
    {
        return this.items.find(item => item.contains(x, y));
    }

    highlightMenuItemAt(model, x, y)
    {
        let item = this.itemAt(x, y);
        if (item != this.highlightItem)
        {
            this.highlightItem = item;
            model.changed();
        }
    }
}

class MenuItem
{
    constructor(bounds)
    {
        this.bounds = bounds;
    }

    draw(ctx, highlight)
    { 
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle="blue";
        ctx.fillStyle = "lightGray";
        ctx.ellipse(this.bounds.centerX(), this.bounds.centerY(), this.bounds.width/2, this.bounds.height/2, 0, 0, 2 * Math.PI);
        ctx.closePath();
        if (highlight)
        {
            ctx.fill();
        }
        ctx.stroke();
        this.drawIcon(ctx);
        ctx.restore();
    }

    contains(x, y)
    {
        return this.bounds.contains(x, y);
    }

    drawIcon(ctx)
    {
    }

    getTool(model)
    {
        return null;
    }
}

class AddNode extends MenuItem
{
    constructor(bounds, symbol)
    {
        super(bounds);
        this.symbol = symbol;
    }

    drawIcon(ctx)
    {
        this.symbol.draw(this.bounds.shrink(5), ctx);
    }

    getTool(model, x, y)
    {
        return new AddNodeTool(model, x, y, this.symbol);
    }
}

class AddEdge extends MenuItem
{
    constructor(bounds)
    {
        super(bounds);
    }

    drawIcon(ctx)
    {
        let bounds = this.bounds.shrink(5);
        ctx.beginPath();
        ctx.moveTo(bounds.x, bounds.centerY());
        ctx.lineTo(bounds.rightX(), bounds.centerY());
        ctx.lineTo(bounds.rightX()-3, bounds.centerY()-2);
        ctx.moveTo(bounds.rightX(), bounds.centerY());
        ctx.lineTo(bounds.rightX()-3, bounds.centerY()+2);
        ctx.closePath()
        ctx.stroke();
    }

    getTool(model, x, y)
    {
        return new AddEdgeTool(model, x, y);
    }
}

class Delete extends MenuItem
{
    constructor(bounds)
    {
        super(bounds);
    }

    drawIcon(ctx)
    {
        let bounds = this.bounds.shrink(5);
        ctx.beginPath();
        ctx.moveTo(bounds.x, bounds.y);
        ctx.lineTo(bounds.rightX(), bounds.bottomY());
        ctx.moveTo(bounds.x, bounds.bottomY());
        ctx.lineTo(bounds.rightX(), bounds.y);
        ctx.closePath();
        ctx.stroke();
    }

    getTool(model, x, y)
    {
        return new DeleteTool(model);
    }
}

class Text extends MenuItem
{
    constructor(bounds)
    {
        super(bounds);
    }

    drawIcon(ctx)
    {
        ctx.save();
        ctx.fillStyle = "blue";
        ctx.font = "15px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("T", this.bounds.centerX(), this.bounds.centerY());
        ctx.restore();
    }

    getTool(model, x, y)
    {
        return new TextTool(model)
    }
}
