export class Symbol
{
    constructor (defaultWidth, defaultHeight)
    {
        this.defaultWidth = defaultWidth;
        this.defaultHeight = defaultHeight;        
    }

    draw(bounds, ctx)
    {

    }
}

export class Task extends Symbol
{
    constructor()
    {
        super(60, 30);
    }

    draw(bounds, ctx)
    {
        const hRad = Math.PI;
        const qRad = hRad / 2;
        let radius = 8;
        let min = Math.min(bounds.width, bounds.height);
        if (min < 4 * radius)
        {
            radius = min / 4;
        }
        ctx.beginPath();
        ctx.arc(bounds.x + radius, bounds.y+radius, radius, -qRad, hRad, true);
        ctx.lineTo(bounds.x, bounds.bottomY() - radius);
        ctx.arc(bounds.x + radius, bounds.bottomY() - radius, radius, hRad, qRad, true);
        ctx.lineTo(bounds.rightX() - radius, bounds.bottomY());
        ctx.arc(bounds.rightX() - radius, bounds.bottomY() - radius, radius, qRad, 0, true);
        ctx.lineTo(bounds.rightX(), bounds.y + radius);
        ctx.arc(bounds.rightX() - radius, bounds.y + radius, radius, 0, -qRad, true);
        ctx.lineTo(bounds.x + radius, bounds.y);
        ctx.closePath();
        ctx.stroke();
    }
}

export class Start extends Symbol
{
    constructor()
    {
        super(20, 20);
    }

    draw(bounds, ctx)
    {
        ctx.beginPath();
        ctx.ellipse(bounds.centerX(), bounds.centerY(), bounds.width/2, bounds.height/2, 0, 0, 2* Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
}

export class End extends Symbol
{
    constructor()
    {
        super(20, 20);
    }

    draw(bounds, ctx)
    {
        ctx.save();
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(bounds.centerX(), bounds.centerY(), bounds.width/2, bounds.height/2, 0, 0, 2* Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}

export class Invisible extends Symbol
{
    constructor()
    {
        super(0, 0);
    }

    draw(bounds, ctx)
    {

    }
}

