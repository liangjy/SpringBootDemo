package pointToPixelUtil;

import java.io.Serializable;

/**********************************
 * @ClassName Pixel
 * @funcdesc
 * @author liangjy
 * @create 2019/4/17 9:29
 ***********************************/
public class Pixel implements Serializable {
    private int x;
    private int y;
    public Pixel(){

    }
    public Pixel(int x,int y){
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
