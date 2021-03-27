export class View
{
    constructor(canvas, model)
    {
        this.canvas = canvas;
        this.model = model;
        this.model.onChange = () => this.changed();
        this.changed();
    }

    changed()
    {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.model.draw(ctx);
    }
}