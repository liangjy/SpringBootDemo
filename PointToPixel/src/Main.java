import pointToPixelUtil.BoundSize;
import pointToPixelUtil.Pixel;
import pointToPixelUtil.Point;
import pointToPixelUtil.PointToPixel;

public class Main {

    public static void main(String[] args) {

        Point point = new Point(113.232561, 23.152322);
        int zoom = 13;
        Point center = new Point(113.270793,23.135308);
        BoundSize boundsSize = new BoundSize(1740,878);
        Pixel pixel = PointToPixel.PointToPixel(point,zoom,center,boundsSize);
        System.out.println(pixel.getX()+","+pixel.getY());
    }
}
