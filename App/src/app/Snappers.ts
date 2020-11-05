import * as shapes from "./shapes"
class SnapShape  {
    protected snapObj : any; // save Snap's graphical primitive for render
    protected geoShape : shapes.Shape
    protected snapName : string
    protected canvas;
    protected _isDragable : boolean;
    protected _newObj : SnapLine; // Save object creat by ActiveDragable; very bad HACK need refactor 
    get newObj() : SnapLine {
        return this._newObj;
    }
    // Default relise drag and drop method 
    // Need refactor!!!
    ActiveDragable()  { 
        let so = this.snapObj;
        let xcenter = (this.geoShape as shapes.Circle).center.x
        let ycenter = (this.geoShape as shapes.Circle).center.x
        let radius = (this.geoShape as shapes.Circle).radius;
        let geoline = new shapes.Line(xcenter, ycenter, xcenter, ycenter);
        let line = new SnapLine(geoline, this.canvas);
        let canvas = this.canvas; // need for bag fix with start function context
        line.render();
        function start() {
                so.data('lm', so.transform().localMatrix);
                let oldCircle = new SnapCircle(new shapes.Circle(radius, xcenter, ycenter), canvas);
                oldCircle.render();
        }
        function move(dx : number, dy : number) {
            let m = so.data('lm').clone();
            so.attr('transform', m.translate(dx,dy));
            line.remove();
            geoline.end = new shapes.Point(xcenter + dx, xcenter + dy);
            line.update(geoline);
            line.render();
        }
        function end() {
            // Saves to property data because (this) is implicitly passed to function end,
            // and typescript requires you to always specify this, when you try access to class field
            // BUT this -> this.snapObj , not SnapShape...
            so.data('line', line);         }
        so.drag(move, start, end);
        this._newObj = so.data('line');

        
    }
    constructor(geoShape : shapes.Shape, canvas : any) {
        this.geoShape = geoShape;
        this.canvas = canvas;
    }
    
    render() {
        this.snapObj = this.canvas.el(this.snapName)
        this.snapObj.attr({
            fill : "white",
            stroke : "black",
            strokeWidth : 3
        })
    }
    remove() {
        this.snapObj.remove();
    }
    update(geoShape : shapes.Shape) {
        this.geoShape = geoShape;
    }
    //moveTO 
    translate(x : number, y : number) {
        console.log(this.snapObj.localMatrix)
    }
}

export class SnapCircle extends SnapShape {
    snapName = "circle";
    render() {
        super.render();
        // The typescript does not compile the as operator. I don't know why, I had to do such a hack
        // If you do this, the typescript and js do not give errors.
        this.snapObj.attr({
            cx : (this.geoShape as shapes.Circle).center.x,
            cy : (this.geoShape as shapes.Circle).center.y,
            r : (this.geoShape as shapes.Circle).radius 
        })  
    }
}
export class SnapLine extends SnapShape {
    snapName = "line";
    render() {
        super.render();
        this.snapObj.attr({
            x1 : (this.geoShape as shapes.Line).start.x,
            y1 : (this.geoShape as shapes.Line).start.y,
            x2 : (this.geoShape as shapes.Line).end.x,
            y2 :  (this.geoShape as shapes.Line).end.y
        })  
    }
    GetLength() {
        return (this.geoShape as shapes.Line).length
    }
}
