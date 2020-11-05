export class Point {
    private _x : number;
    private _y : number;
    
    set x(X : number) { this._x = X};
    set y(Y : number) { this._y= Y};

    get x() { return this._x};
    get y() { return this._y};

    constructor(x : number, y : number) {
        this._x = x;
        this._y = y;
    }
    
    distTo(point : Point) {
        let first = Math.pow(point.x - this.x, 2);
        let second = Math.pow(point.y - this.y, 2);
        return Math.sqrt(first + second);
    }
}
export interface Shape {

} 
export class Circle implements Shape {
    //center point coordinate
    private _center : Point; 
    get center() : Point {
         return this._center
    }
    constructor(readonly radius : number, x : number, y : number) {
        this._center = new Point(x,y);
    }   
}

export class Line implements Shape {
    private _start : Point;
    private _end : Point;
    readonly length : number;
    get start() : Point { 
        return this._start;
    }
    set start(point : Point) {
        this._start = point;
    }
    get end() : Point {
        return this._end;
    }
    set end(point : Point) {
        this._end = point
    }

    constructor(x1 : number, y1 : number, x2 : number, y2 : number) {
        this._start = new Point(x1,y1);
        this._end = new Point(x2,y2);
        this.length = this._start.distTo(this._end);
    }
}