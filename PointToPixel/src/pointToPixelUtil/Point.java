package pointToPixelUtil;

import java.io.Serializable;

/**********************************
 * @ClassName Point
 * @funcdesc
 * @author liangjy
 * @create 2019/4/17 9:30
 ***********************************/
public class Point implements Serializable {
    private double lng;
    private double lat;
    public Point(){
    }
    public Point(double lng,double lat){
        this.lng = lng;
        this.lat = lat;
    }
    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }
}
