export const ALL = "All"
export const NONE = "None"
export const TOP_LEFT = "TopLeft";
export const TOP_CENTER = "TopCenter";
export const TOP_RIGHT = "TopRight";
export const BOTTOM_LEFT = "BottomLeft";
export const BOTTOM_CENTER = "BottomCenter";
export const BOTTOM_RIGHT = "BottomRight";
export const CENTER_LEFT = "CenterLeft";
export const CENTER_RIGHT = "CenterRight";

export class Bounds
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    static bounds(p1, p2)
    {
        let x = p1.x
        let y = p1.y
        let width = p2.x - p1.x;
        let height = p2.y - p1.y;
        return new Bounds(x, y, width, height);
    }

    moveBy(handle, dx, dy)
    {
        if (handle == ALL)
        {
            this.x = this.x + dx;
            this.y = this.y + dy;
        }
        if (handle == TOP_LEFT || handle == CENTER_LEFT || handle == BOTTOM_LEFT)
        {
            this.x = this.x + dx;
            this.width = this.width - dx;
        }
        if (handle == TOP_LEFT || handle == TOP_CENTER ||handle == TOP_RIGHT)
        {
            this.y = this.y + dy;
            this.height = this.height - dy;
        }
        if (handle == TOP_RIGHT || handle == CENTER_RIGHT || handle == BOTTOM_RIGHT)
        {
            this.width = this.width + dx;
        }
        if (handle == BOTTOM_RIGHT || handle == BOTTOM_CENTER || handle == BOTTOM_LEFT)
        {
            this.height = this.height + dy;
        }
    }

    intersection(line)
    {
        let side = this.sides().find(side => side.intersection(line) != null)
        if (side != null)
        {
            return side.intersection(line);
        }
        return null;
    }

    sides()
    {
        return [this.left(), this.top(), this.right(), this.bottom()];
    }

    left()
    {
        return new Line(this.topLeft(), this.bottomLeft());
    }

    top()
    {
        return new Line(this.topLeft(), this.topRight());
    }

    right()
    {
        return new Line(this.topRight(), this.bottomRight());
    }

    bottom()
    {
        return new Line(this.bottomRight(), this.bottomLeft());
    }

    contains(x, y)
    {
        return this.x <= x && 
               this.x + this.width > x &&
               this.y <= y &&
               this.y + this.height > y;
    }

    add(other)
    {
        var x = Math.min(this.x, other.x);
        var y = Math.min(this.y, other.y);
        var x2 = Math.max(this.rightX(), other.rightX());
        var y2 = Math.max(this.bottomY(), other.bottomY());
        var width = x2 - this.x;
        var height = y2 - this.y;
        return new Bounds(x, y, width, height);
    }

    shrink(eachSide)
    {
        let x = this.x + eachSide;
        let y = this.y + eachSide;
        let width = this.width - eachSide * 2;
        let height = this.height - eachSide * 2
        return new Bounds(x, y, width, height);
    }

    rightX()
    {
        return this.x + this.width;
    }

    bottomY()
    {
        return this.y + this.height;
    }

    centerX()
    {
        return this.x + this.width / 2;
    }

    centerY()
    {
        return this.y + this.height / 2;
    }

    center()
    {
        return new Position(this.centerX(), this.centerY());
    }

    topLeft()
    {
        return new Position(this.x, this.y);
    }

    topRight()
    {
        return new Position(this.rightX(), this.y);
    }

    bottomRight()
    {
        return new Position(this.rightX(), this.bottomY());
    }

    bottomLeft()
    {
        return new Position(this.x, this.bottomY());
    }
}

export class Position
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    deltaTo(otherPos)
    {
        return new Position(otherPos.x - this.x, otherPos.y - this.y);
    }
    
    determinant(otherPos)
    {
        return this.x * otherPos.y - this.y * otherPos.x;
    }
}

export class Line
{
    constructor(a, b)
    {
        this.a = a;
        this.b = b;
    }

    intersection(otherLine)
    {
        let ab = this.deltaFromAToB();
        let cd = otherLine.deltaFromAToB();
        let ad = this.a.deltaTo(otherLine.b);
        let detN = ab.determinant(cd);
        if (detN != 0)
        {
            let det1 = ad.determinant(cd);
            if (this.compareSign(detN, det1) == -1 || Math.abs(det1)>Math.abs(detN))
            {
                return null;
            }
            let det2 = ab.determinant(ad);
            if (this.compareSign(detN, det2) == -1 || Math.abs(det2)>Math.abs(detN))
            {
                return null;
            }
            return new Position(
                this.a.x + Math.round(det1 * ab.x / detN),
                this.a.y + Math.round(det1 * ab.y / detN));
        }
        else if (ab.determinant(ad) != 0)
        {
            return null;
        }
        else if (this.between(otherLine.b, this.a, otherLine.a))
        {
            return this.a;
        }
        else if (this.between(this.a, otherLine.a, this.b))
        {
            return otherLine.a;
        }
        else if (this.between(this.a, otherLine.b, this.b))
        {
            return otherLine.b;
        }
        else if (this.between(otherLine.b, b, otherLine.a))
        {
            return this.b;
        }
        else
        {
            return null;
        }
    }

    compareSign(a, b)
    {
        if (a==0 || b==0)
        {
            return 0;
        }
        else
        {
            return a>0 && b>0 || a<0 && b<0 ? 1: -1;
        }
    }

    between (a, m, b)
    {
      if (a.x != b.x)
      {
        return a.x <= m.x && m.x <= b.x || a.x >= m.x && m.x >= b.x;
      }
      else
      {
        return a.y <= m.y && m.y <= b.y || a.y >= m.y && m.y >= b.y;
      }
    }
  
    deltaFromAToB()
    {
          return this.a.deltaTo(this.b);
    }
}