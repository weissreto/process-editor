import { Bounds } from "./Bounds.js";
import { Model } from "./Model.js";
import { Node } from "./Node.js";
import { Selection } from "./Selection.js";
import { Controller } from "./Controller.js";
import { View } from "./View.js";
import { Task, Start, End } from "./Symbol.js";
import { Edge } from "./Edge.js";

export class GraphicalEditor
{
    constructor()
    {
        var canvas = document.createElement("canvas");
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        var body = document.getElementsByTagName("body").item(0);
        body.appendChild(canvas);
        
        this.model = new Model();

        let start = new Node(new Bounds(90, 100, 20, 20), new Start());
        this.model.add(start);

        let task = new Node(new Bounds(170, 95, 60, 30), new Task());
        this.model.add(task);

        let end = new Node(new Bounds(290, 100, 20, 20), new End());
        this.model.add(end);

        let edge = new Edge(start, task);
        this.model.add(edge);

        edge = new Edge(task, end);
        this.model.add(edge);
        
        this.controller = new Controller(canvas, this.model);
        this.view = new View(canvas, this.model);
    }
}