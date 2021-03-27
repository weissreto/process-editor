import { Decorator } from "./Decorator.js"
import { ALL, NONE, BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT, CENTER_LEFT, CENTER_RIGHT, TOP_LEFT, TOP_CENTER, TOP_RIGHT } from "./Bounds.js";

export class Selection 
{
    constructor()
    {
        this.elements = [];
        this.onChange = null;
    }

    draw(ctx)
    {
        var bounds = this.getBounds()
        if (bounds != null)
        {
            ctx.save();
            ctx.strokeStyle="grey";
            ctx.strokeRect(bounds.x-10, bounds.y-10, 6, 6);
            ctx.strokeRect(bounds.centerX() - 4, bounds.y-10, 6, 6);
            ctx.strokeRect(bounds.rightX()+4, bounds.y-10, 6, 6);
            ctx.strokeRect(bounds.rightX()+4, bounds.centerY() - 4, 6, 6);
            ctx.strokeRect(bounds.rightX()+4, bounds.bottomY()+4, 6, 6);
            ctx.strokeRect(bounds.centerX() - 4, bounds.bottomY()+4, 6, 6);
            ctx.strokeRect(bounds.x-10, bounds.bottomY()+4, 6, 6);
            ctx.strokeRect(bounds.x-10, bounds.centerY() - 4, 6, 6);
            ctx.beginPath();
            ctx.setLineDash([5,5,5]);
            ctx.moveTo(bounds.x, bounds.y-7);
            ctx.lineTo(bounds.centerX()-7, bounds.y-7)
            ctx.stroke();
            ctx.moveTo(bounds.centerX()+7, bounds.y-7);
            ctx.lineTo(bounds.rightX(), bounds.y-7);
            ctx.stroke();
            ctx.moveTo(bounds.rightX()+7, bounds.y);
            ctx.lineTo(bounds.rightX()+7, bounds.centerY() - 7);
            ctx.stroke()
            ctx.moveTo(bounds.rightX()+7, bounds.centerY() + 7);
            ctx.lineTo(bounds.rightX()+7, bounds.bottomY());
            ctx.stroke();
            ctx.moveTo(bounds.rightX(), bounds.bottomY() + 7);
            ctx.lineTo(bounds.centerX()+7, bounds.bottomY() + 7);
            ctx.stroke();
            ctx.moveTo(bounds.centerX()-7, bounds.bottomY() + 7);
            ctx.lineTo(bounds.x, bounds.y + bounds.height + 7);
            ctx.stroke();
            ctx.moveTo(bounds.x-7, bounds.bottomY());
            ctx.lineTo(bounds.x-7, bounds.centerY() + 7);
            ctx.stroke();
            ctx.moveTo(bounds.x-7, bounds.centerY() - 7);
            ctx.lineTo(bounds.x-7, bounds.y);
            ctx.stroke();   
            ctx.closePath();         
            ctx.restore();
        }
    }

    handleAt(x, y)
    {
        var bounds = this.getBounds()
        if (bounds == null)
        {
            return NONE;
        }
        if (bounds.contains(x, y))
        {
            return ALL;
        }
        if (x >= bounds.x-10 && x <= bounds.x-4)
        {
            if (y >= bounds.y-10 && y <= bounds.y-4)
            {
                return TOP_LEFT;
            }
            else if (y >= bounds.centerY()-3 && y <= bounds.centerY()+3)
            {
                return CENTER_LEFT;
            }
            else if (y >= bounds.bottomY()+4 && y <= bounds.bottomY()+10)
            {
                return BOTTOM_LEFT;
            }
        }
        if (x >= bounds.centerX()-3 && x <= bounds.centerX()+3)
        {
            if (y >= bounds.y-10 && y <= bounds.y-4)
            {
                return TOP_CENTER;
            }
            else if (y >= bounds.bottomY()+4 && y <= bounds.bottomY()+10)
            {
                return BOTTOM_CENTER;
            }
        }
        if (x >= bounds.rightX()+4 && x <= bounds.rightX()+10)
        {
            if (y >= bounds.y-10 && y <= bounds.y-4)
            {
                return TOP_RIGHT;
            }
            else if (y >= bounds.centerY()-3 && y <= bounds.centerY()+3)
            {
                return CENTER_RIGHT;
            }
            else if (y >= bounds.bottomY()+4 && y <= bounds.bottomY()+10)
            {
                return BOTTOM_RIGHT;
            }
        }
        return NONE;
    }

    getBounds()
    {
        if (this.elements.length == 0)
        {
            return null;
        }
        return this.elements.reduce((previous, current) => {
            if (previous === null)
            {
                return current.bounds;
            }
            else
            {
                return previous.add(current.bounds);
            }
        }, null);
    }

    clear()
    {
        this.elements.splice(0, this.elements.length);
        this.changed();
    }

    add(element)
    {
        if (this.elements.indexOf(element) < 0)
        {
            this.elements.push(element);
            this.changed();
        }
    }

    moveBy(handle, dx, dy)
    {
        this.elements.forEach(element => element.moveBy(handle, dx, dy));
    }

    changed()
    {
        this.onChange();
    }
}