import { Element } from "./Element.js"

export class Node extends Element
{
    constructor(bounds, symbol)
    {
        super(bounds);
        this.symbol = symbol;
    }

    draw(ctx)
    {
        super.draw(ctx);
        this.symbol.draw(this.bounds, ctx);
    }
}