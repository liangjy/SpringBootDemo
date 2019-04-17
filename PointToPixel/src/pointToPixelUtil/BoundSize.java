package pointToPixelUtil;

import java.io.Serializable;

/**********************************
 * @ClassName BoundSize
 * @funcdesc
 * @author liangjy
 * @create 2019/4/17 9:52
 ***********************************/
public class BoundSize implements Serializable {
    private int width;
    private int height;
    public BoundSize(){

    }

    public BoundSize(int width,int height){
        this.width = width;
        this.height = height;
    }
    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }
}
