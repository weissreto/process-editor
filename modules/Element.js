export class Element
{
    constructor(bounds)
    {
        this.bounds = bounds;
        this.listeners = [];
    }

    draw(ctx)
    {
    }

    moveBy(handle, dx, dy)
    {
        this.bounds.moveBy(handle, dx, dy);
        this.changed();
    }

    contains(x, y)
    {
        return this.bounds.contains(x, y);
    }

    onChange(listener)
    {
        this.listeners.push(listener);
    }

    changed()
    {
        this.listeners.forEach(listener => listener())
    }
}