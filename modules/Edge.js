import { Bounds, Line } from "./Bounds.js"
import { Element } from "./Element.js"

export class Edge extends Element
{
    constructor(from, to)
    {
        super(null);        
        this.from = from;
        this.to = to;
        this.computeBounds();
        from.onChange(() => this.nodeChanged());
        to.onChange(() => this.nodeChanged());
    }

    computeBounds()
    {
        let line = new Line(this.from.bounds.center(), this.to.bounds.center());
        let start = this.from.bounds.intersection(line);
        if (start == null)
        {
            start = this.from.bounds.center();
        }
        let end = this.to.bounds.intersection(line);
        if (end == null)
        {
            end = this.to.bounds.center();
        }
        this.bounds = Bounds.bounds(start, end);
        if (this.text)
        {
            this.text.bounds = this.bounds;
        }
    }

    nodeChanged()
    {
        this.computeBounds();
        this.changed();
    }

    contains(x, y)
    {
        let lengthA = Math.sqrt((this.bounds.x-x)*(this.bounds.x-x)+(this.bounds.y-y)*(this.bounds.y-y));
        let lengthB = Math.sqrt((this.bounds.rightX()-x)*(this.bounds.rightX()-x)+(this.bounds.bottomY()-y)*(this.bounds.bottomY()-y));
        let lengthC = Math.sqrt((this.bounds.x-this.bounds.rightX())*(this.bounds.x-this.bounds.rightX())+(this.bounds.y-this.bounds.bottomY())*(this.bounds.y-this.bounds.bottomY()));
        return ((lengthA + lengthB) <= (lengthC * 1.005));    
    }

    draw(ctx)
    {
        super.draw(ctx);
        ctx.beginPath();
        var x1 = this.bounds.x;
        var y1 = this.bounds.y;
        var x2 = this.bounds.rightX();
        var y2 = this.bounds.bottomY();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        var angle = Math.atan(this.bounds.height/this.bounds.width);
        if (this.bounds.width < 0)
        {
            angle += Math.PI
        }
        var dx1 = - 10 * Math.cos(angle) - 5 * Math.sin(angle);
        var dx2 = - 10 * Math.cos(angle) + 5 * Math.sin(angle);
        var dy1 = - 10 * Math.sin(angle) + 5 * Math.cos(angle);
        var dy2 = - 10 * Math.sin(angle) - 5 * Math.cos(angle);
        ctx.lineTo(x2 + dx1, y2 + dy1);
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 + dx2, y2 + dy2);
        ctx.stroke();
        ctx.closePath();
        if (this.text)
        {
            this.text.draw(ctx);
        }
    }

    movedBy(handle, x, y)
    {
        super.movedBy(handle, x, y);
        if (this.text)
        {
            this.text.movedBy(handle, x, y);
        }
    }
}

