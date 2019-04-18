class PolylineToProfile {
    //calculate K, B of line, which is determined by points (x1,y1) and (x2,y2)
    static get_KB_by_points(x1, y1, x2, y2) {
        if (x1 != x2) {
            return {K: (y1 - y2) / (x1 - x2), B: (x1 * y2 - x2 * y1) / (x1 - x2)};
        }
        else {//vertical line, infinite K,and B equals the fixed x
            return {K: Number.POSITIVE_INFINITY, B: x1};
        }
    }

    /*
    //calculate K, B of line, which is in parallel with [(x1,y1),(x2,y2)] and distance up n pixels
    function get_KB_up_n_by_points(x1,y1,x2,y2,n){
        const {K:k,B:b} = get_KB_by_points(x1,y1,x2,y2);
        if(k == Number.POSITIVE_INFINITY){
            return {K:Number.POSITIVE_INFINITY,B:b+n};
        }
        else{
            return {K:k,B: (Math.sqrt(1+k*k))*n+b};
        }
    }*/

//calculate K, B of line, which is in parallel with [(x1,y1),(x2,y2)] and distance n pixels
//and at the right side (while standing at (x1,y1),facing (x2,y2) )
    static get_KB_right_n_by_points(x1, y1, x2, y2, n) {
        const {K: k, B: b} = this.get_KB_by_points(x1, y1, x2, y2);
        if (k == Number.POSITIVE_INFINITY) {
            if (y1 < y2) {
                return {K: Number.POSITIVE_INFINITY, B: b + n};
            }
            else {
                return {K: Number.POSITIVE_INFINITY, B: b - n};
            }
        }
        else if (x1 < x2) {
            return {K: k, B: b - (Math.sqrt(1 + k * k)) * n};
        }
        else {
            return {K: k, B: b + (Math.sqrt(1 + k * k)) * n};
        }

    }

//calculate K, B of line, which is in vertical with [(x1,y1),(x2,y2)] and crossing point(x1,y1)
    static get_vertical_KB_by_points(x1, y1, x2, y2) {
        if (y1 == y2) {
            return {K: Number.POSITIVE_INFINITY, B: x1};
        }
        else {
            return {K: (x2 - x1) / (y1 - y2), B: y1 - (x2 - x1) / (y1 - y2) * x1};
        }
    }


//calculate the cross point of two lines
    static get_cross_point(k1, b1, k2, b2) {
        if (k1 == Number.POSITIVE_INFINITY) {
            if (k2 == Number.POSITIVE_INFINITY) { // two vertical lines, not cross point
                return {x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY};
            }
            else {//only line1 is vertical
                return {x: b1, y: k2 * b1 + b2};
            }
        }
        else {
            if (k2 == Number.POSITIVE_INFINITY) {// only line2 is vertical
                return {x: b2, y: k1 * b2 + b1};
            }
            else { // no vertical
                return {x: (b2 - b1) / (k1 - k2), y: (b2 - b1) / (k1 - k2) * k1 + b1};
            }
        }
    }

//calculate the upper and lower points at the start of a line segment, distance n pixelDepth
    static get_points_of_start_in_line_segment(p1, p2, n) {
        //const {K:k1,B:b1} = get_KB_up_n_by_points(p1.x,p1.y,p2.x,p2.y,n);
        const {K: kr, B: br} = this.get_KB_right_n_by_points(p1.x, p1.y, p2.x, p2.y, n);
        const {K: kv, B: bv} = this.get_vertical_KB_by_points(p1.x, p1.y, p2.x, p2.y, n);
        //const {K:k3,B:b3} = get_KB_up_n_by_points(p1.x,p1.y,p2.x,p2.y,n*(-1));
        const {K: kl, B: bl} = this.get_KB_right_n_by_points(p1.x, p1.y, p2.x, p2.y, n * (-1));
        return {
            upper_point: (this.get_cross_point(kv, bv, kr, br)),
            lower_point: (this.get_cross_point(kv, bv, kl, bl))
        };
    }

//calculate the upper and lower points at the joint of two consequtive line segment, distance n pixelDepth
//if p2.x is between p1.x and p3.x, upper_flag=1, else -1
    static get_points_of_joint_in_line_segments(p1, p2, p3, n) {
        const {K: kr1, B: br1} = this.get_KB_right_n_by_points(p1.x, p1.y, p2.x, p2.y, n);
        const {K: kr2, B: br2} = this.get_KB_right_n_by_points(p2.x, p2.y, p3.x, p3.y, n);
        if (kr1 == kr2) { //same line , no cross point by KB expression
            return this.get_points_of_start_in_line_segment(p2, p3, n);
        }
        else {
            const {K: kl1, B: bl1} = this.get_KB_right_n_by_points(p1.x, p1.y, p2.x, p2.y, n * (-1));
            const {K: kl2, B: bl2} = this.get_KB_right_n_by_points(p2.x, p2.y, p3.x, p3.y, n * (-1));
            return {
                upper_point: (this.get_cross_point(kr1, br1, kr2, br2)),
                lower_point: (this.get_cross_point(kl1, bl1, kl2, bl2))
            };
        }
    }

//push upper/lower points to upper/lower arr, according to upper_flag
    static push_point(upper_pl, lower_pl, up, lp, upper_flag) {
        if (upper_flag == 1) {
            upper_pl.push(up);
            lower_pl.push(lp);
        }
        else {
            upper_pl.push(lp);
            lower_pl.push(up);
        }
    }

//expand polyline by n pixels,return a polygon
//pl: polyline, array of consequtive points objects {X:x,Y:y}
    /**********************************
     * @funcname polyline_expand
     * @funcdesc expand polyline by n pixels,return a polygon
     * @param {Array} pl (input)
     polyline, array of consequtive points objects {X:x,Y:y} (in pixels)
     * @param {int} n (input)
     distance between the new line and old one (in pixels)
     * @return {Array} polygon, array of consequtive points objects {X:x,Y:y} (in pixels)
     * @author gaozhiheng
     * @create 20190103
     * @modifier ---
     * @modify ---
     ***********************************/
    static polyline_expand(pl,n){
        let upper_pl = [];
        let lower_pl = [];
        let pl_temp = [];
        for(let [i, p] of pl.entries()) { //remove the consequtive duplicated points
            if(i == 0 ) {
                pl_temp.push(p);
            }
            else {
                if( (pl[i].x - pl[i-1].x )*(pl[i].x - pl[i-1].x ) + (pl[i].y - pl[i-1].y )*(pl[i].y - pl[i-1].y ) > n*n/4){ // distance between pl[i] and pl[i-1] > n
                    pl_temp.push(p);
                }
            }
        }
        if(pl_temp.length == 1) {
            let x1 = pl_temp[0].x+n,y1 = pl_temp[0].y+n,x2 = pl_temp[0].x-n,y2 = pl_temp[0].y-n;
            let x = pl_temp[0].x,y = pl_temp[0].y;
            //return {upper_pl:[{x:x,y:y1},{x:x2,y:y}],lower_pl:[{x:x,y:y2},{x:x1,y:y}]};
            return [{x:x,y:y1},{x:x2,y:y},{x:x,y:y2},{x:x1,y:y},{x:x,y:y1}];
        }
        for (let [i, point] of pl_temp.entries()) {
            if(i == 0 ){ //first point
                let {upper_point:up,lower_point:lp} = this.get_points_of_start_in_line_segment(point,pl_temp[i+1],n);
                this.push_point(upper_pl,lower_pl,up,lp,1);
            }
            else if( i == pl_temp.length-1 ){ //last point
                let {upper_point:up,lower_point:lp} = this.get_points_of_start_in_line_segment(point,pl_temp[i-1],n);
                this.push_point(upper_pl,lower_pl,up,lp,-1);
            }
            else{
                let {upper_point:up,lower_point:lp} = this.get_points_of_joint_in_line_segments(pl_temp[i-1],point,pl_temp[i+1],n);
//			console.log(uf)
//			console.log(`upper(${up.x},${up.y});lower(${lp.x},${lp.y});uf:${upper_flag}`)
                this.push_point(upper_pl,lower_pl,up,lp,1);
            }
        }

        let all_pl_arr = upper_pl.concat(lower_pl.reverse());
        if(upper_pl.length > 0){
            all_pl_arr.push(upper_pl[0]);
        }
        return all_pl_arr;
        /*let lower = [].concat(lower_pl.reverse());
        return {upper_pl:upper_pl,lower_pl:lower};*/
    }
}

export {PolylineToProfile}