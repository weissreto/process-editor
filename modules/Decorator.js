import { Element } from "./Element.js"

export class Decorator extends Element
{
    constructor(decorates)
    {
        super(decorates.bounds);
        this.decorates = decorates;
    }

    draw(ctx)
    {
        this.decorate(ctx);
        this.decorates.draw(ctx);
    }

    decorate(ctx)
    {

    }
}