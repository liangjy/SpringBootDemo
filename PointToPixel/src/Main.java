import pointToPixelUtil.*;

import java.util.*;

public class Main {

    public static void main(String[] args) {

        Point point = new Point(113.232561, 23.152322);
        int zoom = 13;
        Point center = new Point(113.270793,23.135308);
        BoundSize boundsSize = new BoundSize(1740,878);
        Pixel pixel = PointToPixel.PointToPixel(point,zoom,center,boundsSize);
        System.out.println(pixel.getX()+","+pixel.getY());

        String boundSPolygon = "113.02031620000001,23.0181846@113.5212698,23.0181846@113.5212698,23.2523294@113.02031620000001,23.2523294";
        int gridLevel = 40;
        Date startTime = new Date();
        String[] boundsPointArr = boundSPolygon.split("@");
        List<Double> lngList = new ArrayList<>();
        List<Double> latList = new ArrayList<>();
        if(boundsPointArr.length > 2){
            for(String pointStr : boundsPointArr){
                String[] p = pointStr.split(",");
                lngList.add(Double.valueOf(p[0]));
                latList.add(Double.valueOf(p[1]));
            }
        }
        Collections.sort(lngList);
        Collections.sort(latList);
        Double min_lng = null;
        Double max_lng = null;
        Double min_lat = null;
        Double max_lat = null;
        if(lngList.size() > 0){
            min_lng = lngList.get(0);
            max_lng = lngList.get(lngList.size() - 1);
        }

        if(lngList.size() > 0){
            min_lat = latList.get(0);
            max_lat = latList.get(latList.size() - 1);
        }
        long minLngNum = GridNumHelper.gridLngNum(min_lng, gridLevel);
        long maxLngNum = GridNumHelper.gridLngNum(max_lng, gridLevel);
        long minLatNum = GridNumHelper.gridLatNum(min_lat, gridLevel);
        long maxLatNum = GridNumHelper.gridLatNum(max_lat, gridLevel);

        //范围扩大一行一列之后，要将最大最小经纬度也要进行扩展
        Double[] minLngArr = GridNumHelper.gridLngNumToLng(minLngNum, gridLevel);//[minLng, midLng, maxLng];
        Double[] maxLngArr = GridNumHelper.gridLngNumToLng(maxLngNum, gridLevel);//[minLng, midLng, maxLng];
        Double[] minLatArr = GridNumHelper.gridLatNumToLat(minLatNum, gridLevel);//[minLat, midLat, maxLat];
        Double[] maxLatArr = GridNumHelper.gridLatNumToLat(maxLatNum, gridLevel);//[minLat, midLat, maxLat];
        min_lng = minLngArr[0];
        min_lat = minLatArr[0];
        max_lng = maxLngArr[2];
        max_lat = maxLatArr[2];

        Map<String,Integer> gridLngNumToPixelLength = new HashMap<String,Integer>();
        for (long i = minLngNum; i <= maxLngNum; i++) {
            //计算出当前经度编码和下一个经度编码的经纬度，转换像素后，再计算像素长度
            Double[] currentGrid = GridNumHelper.gridLngNumToLng(i,gridLevel);//[minLng, midLng, maxLng];
            Double[] nextGrid = GridNumHelper.gridLngNumToLng(i+1,gridLevel);
            //当前这个栅格的最大最小经纬度，左下角点和右下角点的像素长度，就认为是当前这个栅格经度编码的像素长度
            Point leftButtomPoint = new Point(currentGrid[0], min_lat);
            Point rightButtomPoint = new Point(nextGrid[0], min_lat);
            Pixel leftButtomPixel = PointToPixel.PointToPixel(leftButtomPoint,zoom,center,boundsSize);
            Pixel rightButtomPixel = PointToPixel.PointToPixel(rightButtomPoint,zoom,center,boundsSize);

            int gridWidth = rightButtomPixel.getX() - leftButtomPixel.getX();
            gridLngNumToPixelLength.put(String.valueOf(i),gridWidth);
        }
        Map<String,Integer> gridLatNumToPixelLength = new HashMap<String,Integer>();
        //从上往下遍历
        for (long i = maxLatNum; i >= minLatNum; i--) {
            //计算出当前经度编码和下一个经度编码的经纬度，转换像素后，再计算像素长度
            Double[] currentGrid = GridNumHelper.gridLatNumToLat(i, gridLevel);//[minLat, midLat, maxLat];
            Double[] nextGrid = GridNumHelper.gridLatNumToLat((i-1), gridLevel);
            //当前这个栅格的最大最小经纬度，左下角点和右下角点的像素长度，就认为是当前这个栅格经度编码的像素长度
            Point leftTopPoint = new Point(min_lng, currentGrid[0]);
            Point leftButtomPoint = new Point(min_lng, nextGrid[0]);
            Pixel leftButtomPixel = PointToPixel.PointToPixel(leftButtomPoint,zoom,center,boundsSize);
            Pixel leftTopPixel = PointToPixel.PointToPixel(leftTopPoint,zoom,center,boundsSize);
            int gridHeight = leftButtomPixel.getY() - leftTopPixel.getY();
            gridLatNumToPixelLength.put(String.valueOf(i),gridHeight);
        }

        Point leftTopStartPoint = new Point(min_lng, max_lat);
        Pixel leftTopStartPixel = PointToPixel.PointToPixel(leftTopStartPoint,zoom,center,boundsSize);
        Date endTime = new Date();
        System.out.println("计算经纬度矩阵时间："+(endTime.getTime() - startTime.getTime()));
        /*Map<String,Object> boundsMatrix = new HashMap<>();
        boundsMatrix.put("boundsLngNumWidth",gridLngNumToPixelLength);
        boundsMatrix.put("boundsLatNumHeight",gridLatNumToPixelLength);
        boundsMatrix.put("boundsSouthWestPixel",leftTopStartPixel);*/
        System.out.println("boundsLngNumWidth:"+gridLngNumToPixelLength.toString());
        System.out.println("boundsLatNumHeight:"+gridLatNumToPixelLength.toString());
        System.out.println("boundsSouthWestPixel:"+leftTopStartPixel.getX()+","+leftTopStartPixel.getY());
    }
}
