import { Menu } from "./Menu.js";
import { Selection } from "./Selection.js"
import { Node } from "./Node.js"
import { Edge } from "./Edge.js"

export class Model
{
    constructor()
    {
        this.elements = [];
        this.onChange = () => {};
        this.selection = new Selection();
        this.selection.onChange = () => this.changed();
        this.menu = null;
        this.tool = null;
    }

    add(element)
    {
        this.elements.push(element);
        element.onChange(() => this.changed());
        this.changed();
    }

    remove(element)
    {
        let index = this.elements.indexOf(element);
        if (index >= 0)
        {
            this.elements.splice(index, 1);
        }
        if (element instanceof Node)
        {
            this.elements
                .filter(edge => this.referencesElement(edge, element))
                .forEach(edge => this.remove(edge));
        }
    }

    referencesElement(edge, element)
    {
        if (edge instanceof Edge)
        {
            return edge.from == element || edge.to == element;
        }
        return false;
    }

    elementAt(x, y)
    {
        return this.elements.find( (element) => element.contains(x, y));
    }

    changed()
    {
        this.onChange();
    }

    showMenuFor(element)
    {
        if (element != null)
        {
            this.menu = new Menu(element, element.bounds.x, element.bounds.y - 30);
        }
        else
        {
            this.menu = null;
        } 
        this.changed();
    }

    menuItemAt(x, y)
    {
        if (this.menu != null)
        {
            return this.menu.itemAt(x, y);
        }
        return null;
    }

    highlightMenuItemAt(x, y)
    {
        if (this.menu != null)
        {
            this.menu.highlightMenuItemAt(this, x, y);
        }
    }

    draw(ctx)
    {
        if (this.menu != null)
        {
            this.menu.draw(ctx);
        }
        this.selection.draw(ctx);
        this.elements.forEach((element) => element.draw(ctx));
    }

    decorate(decorator)
    {
        const index = this.elements.indexOf(decorator.decorates);
        this.elements[index] = decorator;
    } 
}