/**
 * Created by zhihenggao on 2019/1/11.
 */
/** @library GAO -- Geometry Application Objects
 *  @author gaozhiheng
 *  @createdate 20190111
 */
"use strict";
var GAO = window.GAO = GAO || {};
( function() {
    class Point {
        constructor(x, y) { //x, y coordinate
            this.x = x;
            this.y = y;
        }

        equal(p) {
            if (this.x == p.x && this.y == p.y) return true;
            else return false;
        }

        getDistance(p) {
            return Math.sqrt((this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y));
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, true);
            ctx.stroke();

        }
    }

    class Line {
        constructor(p1, p2) {
            if (p1 instanceof Point && p2 instanceof Point) {//define a line with 2 points
                if (p1.equal(p2)) {
                    console.log("Error: can not initializ a line with 2 identical points ")
                }
                const {K:k,B:b} = get_KB_by_points(p1.x, p1.y, p2.x, p2.y);
                this.K = k;// slope ,K could be positive infinite
                this.B = b;// intercept with Y axis, while K = positive infinite, b is the intercept with X axis.
            } else if ((typeof p1 == "number") && (typeof p1 == "number")) { //define a line with slope and intercept
                this.K = p1;
                this.B = p2;
            } else {
                console.log("parameter type error while initiating a line object")
            }

            function get_KB_by_points(x1, y1, x2, y2) {
                if (x1 != x2) {
                    return {K: (y1 - y2) / (x1 - x2), B: (x1 * y2 - x2 * y1) / (x1 - x2)};
                }
                else {//vertical line, infinite K,and B equals the fixed x
                    return {K: Number.POSITIVE_INFINITY, B: x1};
                }
            }
        }

        getCrossPoint(L) { //return the crossing point with L, return positive infinite if in parallel or same
            const k1 = this.K, b1 = this.B, k2 = L.K, b2 = L.B;
            if (k1 == Number.POSITIVE_INFINITY) {
                if (k2 == Number.POSITIVE_INFINITY) { // two vertical lines, not cross point
                    return new Point(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
                }
                else {//only line1 is vertical
                    return new Point(b1, k2 * b1 + b2);
                }
            }
            else {
                if (k2 == Number.POSITIVE_INFINITY) {// only line2 is vertical
                    return new Point(b2, k1 * b2 + b1);
                }
                else { // no vertical
                    if (k1 == k2) { // in parallel
                        return new Point(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
                    } else {
                        return new Point((b2 - b1) / (k1 - k2), (b2 - b1) / (k1 - k2) * k1 + b1);
                    }
                }
            }
        }

        //get the line which is in vertical  and crossing point p1
        getVerticalLineAt(p) {
            const k = this.K, b = this.B;
            if (k == 0) return new Line(Number.POSITIVE_INFINITY, p.x);
            else if (k == Number.POSITIVE_INFINITY) return new Line(0, p.y);
            else return new Line(-1 / k, p.y + p.x / k);
        }

        isSameLineAs(l) {
            return this.K == l.K && this.B == l.B;
        }
    }

//let l1 = new Line(new Point(0,0),new Point(0,0));
//let l2 = new Line(new Point(1,0),new Point(2,1));
//console.log(l1.getCrossPoint(l2));

    class LineSegment extends Line {
        constructor(p1, p2) {
            super(p1, p2);
            this.p1 = p1;
            this.p2 = p2;
        }

        //get a line, which is in parallel  and distance n
        //and at the right side (while standing at p1,facing p2 )
        getParallelRigthDistance(n) {
            const k = this.K, b = this.B, x1 = this.p1.x, y1 = this.p1.y, x2 = this.p2.x, y2 = this.p2.y;
            if (k == Number.POSITIVE_INFINITY) {
                if (y1 < y2) {
                    return new Line(k, b + n);
                }
                else {
                    return new Line(k, b - n);
                }
            }
            else if (x1 < x2) {
                return new Line(k, b - (Math.sqrt(1 + k * k)) * n);
            }
            else {
                return new Line(k, b + (Math.sqrt(1 + k * k)) * n);
            }
        }

        //get the point at the right side and distance n from start point
        getStartRightPointAtDistance(n) {
            return this.getParallelRigthDistance(n).getCrossPoint(this.getVerticalLineAt(this.p1));
        }

        getMidPoint() {
            return new Point((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2);
        }
    }

    class Arc {
        constructor(cntPoint, radius, startAngle, endAngle, clockwise) {
            this.cp = cntPoint;
            this.r = radius;
            this.sA = startAngle;
            this.eA = endAngle;
            this.cw = clockwise || false;
        }

        draw(ctx) {
            ctx.arc(this.cp.x, this.cp.y, this.r, this.sA, this.eA, this.cw);
            ctx.stroke();
        }
    }

    class LineSegmentsJoint {
        constructor(p1, p2, p3) {
            this.p1 = p1;
            this.p2 = p2;
            this.p3 = p3;
        }

        getRigthPointAtJointDistance(n) {
            const ls1 = new LineSegment(this.p1, this.p2), ls2 = new LineSegment(this.p2, this.p3);
            if (ls1.isSameLineAs(ls2)) return ls2.getStartRightPointAtDistance(n);
            else return ls1.getParallelRigthDistance(n).getCrossPoint(ls2.getParallelRigthDistance(n));
        }
    }

    class PolyLine {
        constructor(pList) {
            this.pList = pList;
        }

        //if the distance of tow consecutive points is no more than n, then combine to the middle
        zip(n) {
            const pl_temp = [], pl = this.pList;
            let pRef = pl[0];
            for (const [i, p] of pl.entries()){ //remove the consequtive duplicated points
                if (i == 0) {
                    pl_temp.push(p);
                }
                else {
                    if (p.getDistance(pRef) > n) { // distance between pl[i] and pl[i-1] > n
                        pl_temp.push(p);
                        pRef = p;
                    }
                    /*else {
                        const pMid = new Point((p.x + pRef.x) / 2, (p.y + pRef.y) / 2);
                        pl_temp.pop();
                        pl_temp.push(pMid);
                        pRef = pMid;
                    }*/
                }
            }
            return new PolyLine(pl_temp);
        }

        expand(n) {
            const pl_temp = this.pList;
            let upper_pl = [];
            let lower_pl = [];
            if (pl_temp.length == 1) {
                const x1 = pl_temp[0].x + n , y1 = pl_temp[0].y + n, x2 = pl_temp[0].x - n , y2 = pl_temp[0].y - n;
                const x = pl_temp[0].x, y = pl_temp[0].y;
                return new PolyLine([new Point(x, y1), new Point(x2, y), new Point(x, y2), new Point(x1, y)]);
            }
            for (const [i, point] of
                pl_temp.entries()
                )
            {
                if (i == 0) { //first point
                    const ls = new LineSegment(point, pl_temp[i + 1]);
                    upper_pl.push(ls.getStartRightPointAtDistance(n));
                    lower_pl.push(ls.getStartRightPointAtDistance(n * (-1)));
                }
                else if (i == pl_temp.length - 1) { //last point
                    const ls = new LineSegment(point, pl_temp[i - 1]);
                    upper_pl.push(ls.getStartRightPointAtDistance(n * (-1)));
                    lower_pl.push(ls.getStartRightPointAtDistance(n));
                }
                else {
                    const lsj = new LineSegmentsJoint(pl_temp[i - 1], point, pl_temp[i + 1]);
                    upper_pl.push(lsj.getRigthPointAtJointDistance(n));
                    lower_pl.push(lsj.getRigthPointAtJointDistance(n * (-1)));
                }
            }

            if (pl_temp.length == 2) { // a special ploly line with only two points, a middle point should be purposely inserted in order to aviod a round shape.
                upper_pl = [upper_pl[0],new LineSegment(upper_pl[0],upper_pl[1]).getMidPoint(),upper_pl[1]];
                lower_pl = [lower_pl[0],new LineSegment(lower_pl[0],lower_pl[1]).getMidPoint(),lower_pl[1]];
            }
            return new PolyLine(upper_pl.concat(lower_pl.reverse()));
        }

        shiftX(x) {
            for (const p of
                this.pList
                )
            {
                p.x += x;
            }
            return this;
        }

        shiftY(y) {
            for (const p of
                this.pList
                )
            {
                p.y += y;
            }
            return this;
        }

        scale(x) {
            for (const p of
                this.pList
                )
            {
                p.x *= x;
            }
            return this;
        }

        scaleY(y) {
            for (const p of
                this.pList
                )
            {
                p.y *= y;
            }
            return this;
        }

        _drawDirectly(ctx){
            for (const [i, p] of  this.pList.entries() ) {
                if (i == 0) ctx.moveTo(p.x, p.y);
                else  {
                    ctx.lineTo(p.x, p.y);
                }
            }
            ctx.stroke();
        }
        getSubPolyLine(startIndex,endIndex){
            const pl=this.pList;
            let pl_temp = [];
            for(let i=startIndex;i<=endIndex;i++) pl_temp.push(pl[i]);
            return new PolyLine(pl_temp);
        }

        _drawRoundEnd(ctx,p1,p2,p3,p4,w){
            const pm = new LineSegment(p2,p3).getMidPoint();
            ctx.beginPath();
            ctx.moveTo(p1.x,p1.y);
            ctx.arcTo(p2.x,p2.y,pm.x,pm.y,w);
            ctx.stroke();
            ctx.moveTo(p4.x,p4.y);
            ctx.arcTo(p3.x,p3.y,pm.x,pm.y,w);
            ctx.stroke();
        }

        _drawWithWidth(ctx,w,endShape){
            const pl_line =this.zip(w*2).expand(w);
            const pl = pl_line.pList;
            const s= endShape || "angle";
            if(s == "angle") {
                for (const [i, p] of
                    pl.entries()
                    )
                {
                    if (i == 0) ctx.moveTo(p.x, p.y);
                    else if (i == pl.length - 1) {
                        ctx.lineTo(p.x, p.y);
                        ctx.lineTo(pl[0].x, pl[0].y);
                    }
                    else ctx.lineTo(p.x, p.y)
                }
                ctx.stroke();
            }else if (s == "round"){
                const l = pl.length;
                if(l == 4){//draw a circle
                    ctx.beginPath();
                    ctx.arc((pl[0].x+pl[2].x)/2,(pl[0].y+pl[2].y)/2,w,0,2*Math.PI)
                    ctx.stroke();
                }else{//draw a line with round ends
                    //draw round ends
                    this._drawRoundEnd(ctx,pl[l-2],pl[l-1],pl[0],pl[1],w);
                    this._drawRoundEnd(ctx,pl[l/2-2],pl[l/2-1],pl[l/2],pl[l/2+1],w);
                    if(l >6){
                        pl_line.getSubPolyLine(1,l/2-2).draw(ctx);
                        pl_line.getSubPolyLine(l/2+1,l-2).draw(ctx);
                    }
                }
            }else{
                console.log(`End shape of ${s} is not supported by PolyLine.draw method.`);
            }

        }

        draw(ctx,width,endShape) {
            const w = width || 0;
            const pl = this.pList;
            if(w){
                this._drawWithWidth(ctx,w,endShape);
            }else{
                this._drawDirectly(ctx);
            }
        }

    }

    GAO.Point = Point;
    GAO.Line = Line;
    GAO.LineSegment = LineSegment;
    GAO.PolyLine = PolyLine;

    //   const ctx = document.getElementById("myCanvas").getContext("2d");
//test cases for Arc.draw()
//    let arc = new Arc(new Point(500, 500), 50, 0, Math.PI);
//    arc.draw(ctx);

    /*//test cases for PolyLine.draw()
     let pl = new PolyLine([new Point(0,0),new Point(50,50),new Point(100,0),new Point(50,-50)]);
     let ple = pl.expand(10);
     pl.shiftX(600).shiftY(-500).scaleY(-1).draw(ctx);
     ple.shiftX(600).shiftY(-500).scaleY(-1).draw(ctx);*/
    /*
     //test cases for Point.draw()
     let p = new Point(100,100);
     p.draw("myCanvas");
     */
//test cases for PolyLine.expand()
//pl = new PolyLine([new Point(0,0),new Point(1,1),new Point(1,2),new Point(4,8)])
//console.log(pl.expand(0.5))
    /*
     //test cases for PolyLine.zip()
     pl = new PolyLine([new Point(0,0),new Point(1,1),new Point(1,1),new Point(4,8)])
     console.log(pl.zip(0.5));
     var c=document.getElementById("myCanvas");
     var cxt=c.getContext("2d");
     cxt.fillStyle="#FF0000";
     cxt.fillRect(0,0,150,75);
     */
    /*
     //test cases for LineSegmentsJoint.getRigthPointAtJointDistance()
     let ls=new LineSegmentsJoint(new Point(0,0),new Point(1,1),new Point(3,8));
     console.log(ls.getRigthPointAtJointDistance(0.707));
     */

    /*
     //test cases for LineSegment.getStartRightPointAtDistance()
     let l1=new LineSegment(new Point(0,0),new Point(-1,1));
     console.log(l1.getStartRightPointAtDistance(1.414)) //(1,1)
     let l2=new LineSegment(new Point(0,0),new Point(0,1));
     console.log(l2.getStartRightPointAtDistance(1)) //(1,0)
     let l3=new LineSegment(new Point(1,0),new Point(10,0));
     console.log(l3.getStartRightPointAtDistance(1)) //(1,-1)
     */
    /*//test cases for Line.isSameAs()
     let l1=new LineSegment(new Point(0,0),new Point(1,1));
     let l2=new LineSegment(new Point(2,2),new Point(1,1));
     console.log(l2.isSameLineAs(l1));
     l1=new LineSegment(new Point(0,0),new Point(3,1));
     l2=new LineSegment(new Point(2,2),new Point(1,1));
     console.log(l2.isSameLineAs(l1));
     l1=new LineSegment(new Point(0,0),new Point(0,1));
     l2=new LineSegment(new Point(2,2),new Point(1,1));
     console.log(l2.isSameLineAs(l1));*/

})();

/*
const ctx = document.getElementById("myCanvas").getContext("2d");
//test cases for GAO.PolyLine
let pl = new GAO.PolyLine([new GAO.Point(0,0),new GAO.Point(50,50),new GAO.Point(100,0),new GAO.Point(50,-50)]).shiftX(600).shiftY(-500).scaleY(-1);
pl.draw(ctx);
pl.draw(ctx,10,"round");
let p = new GAO.PolyLine([new GAO.Point(0,0),new GAO.Point(1,1),new GAO.Point(2,2),new GAO.Point(3,4)]).shiftX(1000).shiftY(-500).scaleY(-1);
p.draw(ctx,10,"round");
*/

/*
ctx.moveTo(300,300);
ctx.lineTo(300,400);
ctx.lineTo(400,400);
ctx.stroke();
*/



//pl.shiftX(600).shiftY(-500).scaleY(-1).draw(ctx);
//ple.shiftX(600).shiftY(-500).scaleY(-1).draw(ctx);
