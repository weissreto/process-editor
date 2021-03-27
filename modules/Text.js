import { Element } from "./Element.js"

export class Text extends Element
{
    constructor(bounds)
    {
        super(bounds);
        this.text = "";
        this.font = "15px serif";
    }

    draw(ctx)
    {
        ctx.save();
        this.drawText(ctx);
        if (this.edit)
        {
            let metric = ctx.measureText(this.text);
            this.drawCursor(ctx, metric);
            this.drawBox(ctx, metric)
        }
        ctx.restore();
    }

    drawText(ctx) 
    {
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.bounds.centerX(), this.bounds.centerY());
    }

    drawCursor(ctx, metric)
    {
        let cursor = ctx.measureText(this.text.substring(0, this.cursorPos));
        let x = this.bounds.centerX() - metric.actualBoundingBoxLeft + cursor.width;
        let topY =  this.bounds.centerY() - metric.actualBoundingBoxAscent - 4;
        let bottomY =  this.bounds.centerY() + metric.actualBoundingBoxDescent + 4;
        ctx.beginPath();
        ctx.strokeStyle = "black"
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
        ctx.closePath()
    }

    drawBox(ctx, metric)
    {
        let leftX = this.bounds.centerX() - metric.width /2 - 4;
        let rightX = this.bounds.centerX() + metric.width / 2 + 4;
        let topY = this.bounds.centerY() - metric.actualBoundingBoxAscent - 4;
        let bottomY = this.bounds.centerY() + metric.actualBoundingBoxDescent + 4;
        ctx.stroke()
        ctx.strokeStyle="grey";
        ctx.strokeRect(leftX, topY, rightX - leftX, bottomY - topY);
    }

    startEdit()
    {
        this.edit = true;
        this.cursorPos = this.text.length
        this.changed();
    }

    stopEdit()
    {
        this.edit = false;
        this.changed();
    }

    add(char)
    {
        this.text = this.text.substring(0, this.cursorPos) + char + this.text.substring(this.cursorPos, this.text.length);
        this.cursorPos++;
        this.changed();
    }

    removeLeft()
    {
        if (this.cursorPos >= 1)
        {
            this.text = this.text.substring(0, this.cursorPos-1) + this.text.substring(this.cursorPos, this.text.length);
            this.cursorPos--;
            this.changed();
        }
    }

    removeRight()
    {
        if (this.cursorPos < this.text.length)
        {
            this.text = this.text.substring(0, this.cursorPos) + this.text.substring(this.cursorPos+1, this.text.length);
            this.changed();
        }
    }

    cursorLeft()
    {
        if (this.cursorPos > 0)
        {
            this.cursorPos--
        }
        this.changed();
    }
    
    cursorRight()
    {
        if (this.cursorPos <= this.text.length)
        {
            this.cursorPos++;
        }
        this.changed();
    }
}