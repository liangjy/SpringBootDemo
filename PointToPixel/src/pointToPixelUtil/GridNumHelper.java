package pointToPixelUtil;


import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Mobin on 2017/3/30.
 */
public class GridNumHelper implements Serializable {
    private static final int RANK = 100; // 栅格级别

    /**
     * @param longitude
     * @param latitude
     * @return
     */
    public static Long gridNum(String longitude, String latitude) {

        // Double lonstr = Math.floor((Double.valueOf(longitude) - 109.456006485399)/0.0972*RANK + 1001) * 100000;
        // Double latstr = Math.floor((Double.valueOf(latitude) - 20.1297900884702)/0.0896*RANK + 1001);
        // return Long.valueOf(BigDecimal.valueOf(lonstr + latstr).toString());

        String lonstr = BigDecimal.valueOf(((Double.valueOf(longitude) - 109.456006485399) / 0.0972 * RANK + 1001))
                .toString();
        String lonstr1;
        if (lonstr.contains(".")) {
            lonstr1 = lonstr.substring(0, lonstr.indexOf("."));
        } else {
            lonstr1 = lonstr;
        }
        Long lon = Long.valueOf(lonstr1) * 100000;
        // 经度网格计算
        String latstr = BigDecimal.valueOf((Double.valueOf(latitude) - 20.1297900884702) / 0.0896 * RANK + 1001)
                .toString();
        String latstr1;
        if (latstr.contains(".")) {
            latstr1 = latstr.substring(0, latstr.indexOf("."));
        } else {
            latstr1 = latstr;
        }
        Long lat = Long.valueOf(latstr1);
        return lon + lat;
    }

    /**
     * 经纬度转栅格号
     * @param longitude 经度
     * @param latitude 纬度
     * @param level 级别
     * @param len 栅格号计算拼接值，10米为1000000，其他级别都为100000
     * @return 栅格号
     */
    public static Long gridNum(Double longitude, Double latitude, int level, int len) {
        // 经度编号=(经度-109.456006485399)/(0.00000972*级别)+1001（向下取整）
        // 纬度编号=(纬度-20.1297900884702)/(0.00000896*级别)+1001（向下取整）
        // 网格编号=经度编号*100000+纬度编号

        if (!IsInGD(longitude, latitude))
            return null;

        long lngnum = (long) Math.floor((longitude - 109.456006485399) / (0.00000972 * level) + 1001);
        long latnum = (long) Math.floor((latitude - 20.1297900884702) / (0.00000896 * level) + 1001);
        long gridnum = lngnum * len + latnum;
        return gridnum;
    }

    /**
     * 经度转列号
     * @param longitude 经度
     * @param level 级别
     * @return 列号
     */
    public static Long gridLngNum(Double longitude, int level){
        long lngnum = (long) Math.floor((longitude - 109.456006485399) / (0.00000972 * level) + 1001);
        return lngnum;
    }

    /**
     * 纬度转行号
     * @param latitude 纬度
     * @param level 级别
     * @return 行号
     */
    public static Long gridLatNum(Double latitude, int level){
        long latnum = (long) Math.floor((latitude - 20.1297900884702) / (0.00000896 * level) + 1001);
        return latnum;
    }

    /**********************************
     * @funcname gridLngNumToLng
     * @funcdesc 经度编号转经度
     * @param {long} gridLngNum 经度编号
     * @param {int} level 栅格级别
     * @return {Double[]} 经度编号对应的最小经度、中心经度、最大经度
     * @author liangjy
     * @createDate 2019/4/18 15:16
     ***********************************/
    public static Double[] gridLngNumToLng(long gridLngNum, int level){
        double minLng = (gridLngNum - 1001) * (0.00000972 * level) + 109.456006485399;
        double midLng = minLng + (0.00000972 * level) / 2;
        double maxLng = minLng + (0.00000972 * level);
        return new Double[]{minLng, midLng, maxLng};
    }

    /**********************************
     * @funcname gridLatNumToLat
     * @funcdesc 纬度编号转纬度
     * @param {long} gridLatNum 纬度编号
     * @param {int} level 栅格级别
     * @return {Double[]} 纬度编号对应的最小纬度、中心纬度、最大纬度
     * @author liangjy
     * @createDate 2019/4/18 15:19
     ***********************************/
    public static Double[] gridLatNumToLat(long gridLatNum, int level){
        double minLat = (gridLatNum - 1001) * (0.00000896 * level) + 20.1297900884702;
        double midLat = minLat + (0.00000896 * level) / 2;
        double maxLat = minLat + (0.00000896 * level);
        return new Double[]{minLat, midLat, maxLat};
    }

    public static boolean IsInGD(Double lng, Double lat) {
        return (lng != null && lat != null && lng > 109 && lng < 118 && lat > 20 && lat < 26);
    }

    /**
     * 栅格号转经纬度
     * @param gridNum 栅格编号
     * @param level 栅格级别
     * @param len 计算量值
     * @return 栅格的最大最小经纬度和中心经纬度
     */
    public static double[] gridLngLat(long gridNum, int level,int len) {

        // 经度编号=(经度-109.456006485399)/(0.00000972*级别)+1001（向下取整）
        // 纬度编号=(纬度-20.1297900884702)/(0.00000896*级别)+1001（向下取整）
        // 网格编号=经度编号*100000+纬度编号
        //
        // 最小经度=(经度编号-1001)*(0.00000972*级别)+109.456006485399
        // 最小纬度=(经度编号-1001)*(0.00000896*级别)+20.1297900884702
        //
        // 中心经度=最小经度+(0.00000972*级别)/2
        // 中心纬度=最小纬度+(0.00000896*级别)/2
        //
        // 最大经度=最小经度+(0.00000972*级别)
        // 最大纬度=最小纬度+(0.00000896*级别)
        long lngNum = gridNum / len;
        long latNum = gridNum % len;
        double minLat = (latNum - 1001) * (0.00000896 * level) + 20.1297900884702;
        double minLng = (lngNum - 1001) * (0.00000972 * level) + 109.456006485399;
        double midLat = minLat + (0.00000896 * level) / 2;
        double midLng = minLng + (0.00000972 * level) / 2;
        double maxLat = minLat + (0.00000896 * level);
        double maxLng = minLng + (0.00000972 * level);
        return new double[]{minLng, minLat, midLng, midLat, maxLng, maxLat};
    }

    public static List<Long> getAreaGridNum(Double minLng, Double minLat, Double maxLng, Double maxLat, int level) {

        long minlngnum = (long) Math
                .floor((minLng - 109.456006485399 + (0.00000972 * level) / 2) / (0.00000972 * level) + 1001);
        long minlatnum = (long) Math
                .floor((minLat - 20.1297900884702 + (0.00000896 * level) / 2) / (0.00000896 * level) + 1001);

        long maxlngnum = (long) Math
                .floor((maxLng - 109.456006485399 - (0.00000972 * level) / 2) / (0.00000972 * level) + 1001);
        long maxlatnum = (long) Math
                .floor((maxLat - 20.1297900884702 - (0.00000896 * level) / 2) / (0.00000896 * level) + 1001);
        List<Long> result = new ArrayList<Long>();
        for (long i = minlngnum; i <= maxlngnum; i++) {
            for (long j = minlatnum; j <= maxlatnum; j++) {
                result.add(i * 100000 + j);
            }
        }
        return result;
    }

    public static List<Long> getNcGridNum(Long gridNum, int num) {
        long lngnum = gridNum / 100000;
        long latnum = gridNum % 100000;
        List<Long> result = new ArrayList<Long>();
        for (int i = 0; i < num + 1; i++) {
            for (int j = 0; j < num + 1; j++) {
                if (i == 0 && j != 0) {
                    result.add(lngnum * 100000 + latnum + j);
                    result.add(lngnum * 100000 + latnum - j);
                } else if (i != 0 && j == 0) {
                    result.add((lngnum + i) * 100000 + latnum);
                    result.add((lngnum - i) * 100000 + latnum);
                } else if (i != 0 && j != 0) {
                    result.add((lngnum + i) * 100000 + latnum + j);
                    result.add((lngnum + i) * 100000 + latnum - j);
                    result.add((lngnum - i) * 100000 + latnum + j);
                    result.add((lngnum - i) * 100000 + latnum - j);
                }
            }
        }
        return result;
    }

    /**
     * GPS经纬度转栅格号
     * @param lng_gps GPS经度
     * @param lat_gps GPS纬度
     * @param level 栅格级别
     * @param len 计算量
     * @return 返回GPS栅格数
     */
    public static Long getGPSGridNum(Double lng_gps, Double lat_gps, int level, int len) {
        // 经度编号=(经度-109.456006485399)/(0.00000972*级别)+1001（向下取整）
        // 纬度编号=(纬度-20.1297900884702)/(0.00000896*级别)+1001（向下取整）
        // 网格编号=经度编号*100000+纬度编号
        if (!IsInGD(lng_gps, lat_gps))
            return null;
        long lngnum = (long) Math.floor((lng_gps - 109.456006485399) / (0.00000972 * level) + 1001);
        long latnum = (long) Math.floor((lat_gps - 20.1297900884702) / (0.00000896 * level) + 1001);
        long gridnum = lngnum * len + latnum;
        return gridnum;
    }

    public static void main(String[] args) {
//        String gridnum = gridNum(113.3353232, 23.12323, 100).toString();
//        int lngNum = Integer.parseInt(gridnum.substring(0, gridnum.length() - 5));
//        int latNum = Integer.parseInt(gridnum.substring(gridnum.length() - 5, gridnum.length()));
//        System.out.println(gridnum);
//        System.out.println(lngNum);
//        System.out.println(latNum);
    }
}
