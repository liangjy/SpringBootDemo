package pointToPixelUtil;

import java.text.DecimalFormat;

/**********************************
 * @ClassName PointToPixel
 * @funcdesc
 * @author liangjy
 * @create 2019/4/17 9:27
 ***********************************/
public class PointToPixel {
    static PointToPixel singleton = new PointToPixel();
    public double[] MCBAND = new double[] { 12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0 };
    public int[] LLBAND = new int[] { 75, 60, 45, 30, 15, 0 };
    public double[][] MC2LL = new double[6][];
    public double[][] LL2MC = new double[6][];
    public PointToPixel(){
        MC2LL[0] = new double[] { 1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2 };
        MC2LL[1] = new double[] { -7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86 };
        MC2LL[2] = new double[] { -3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37 };
        MC2LL[3] = new double[] { -1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06 };
        MC2LL[4] = new double[] { 3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4 };
        MC2LL[5] = new double[] { 2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5 };


        LL2MC[0] = new double[] { -0.0015702102444, 111320.7020616939, 1704480524535203D, -10338987376042340D, 26112667856603880D, -35149669176653700D, 26595700718403920D, -10725012454188240D, 1800819912950474D, 82.5 };
        LL2MC[1] = new double[] { 0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5 };
        LL2MC[2] = new double[] { 0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5 };
        LL2MC[3] = new double[] { 0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5 };
        LL2MC[4] = new double[] { -0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5 };
        LL2MC[5] = new double[] { -0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45 };
    }

    public static Pixel PointToPixel(Point point,int zoom,Point center,BoundSize boundsSize){
        point = FormatPoint(point);
        center = FormatPoint(center);
        double units = GetZoomUnits(zoom);
        Long x = Math.round((point.getLng() - center.getLng()) / units + boundsSize.getWidth() / 2);
        Long y = Math.round((center.getLat() - point.getLat()) / units + boundsSize.getHeight() / 2);
        return new Pixel(x.intValue(),y.intValue());
    }

    private static Point FormatPoint(Point point){
        Point lng_lat;
        double[] mc = new double[10];
        point.setLng(getLoop(point.getLng(), -180, 180));
        point.setLat(getRange(point.getLat(), -74, 74));
        lng_lat = new Point(point.getLng(),point.getLat());
        for (int i = 0; i < singleton.LLBAND.length; i++) {
            if (lng_lat.getLat() >= singleton.LLBAND[i]) {
                mc = singleton.LL2MC[i];
                break;
            }
        }
        if (mc.length == 0) {
            for (int i = singleton.LLBAND.length - 1; i >= 0; i--) {
                if (lng_lat.getLat() <= -singleton.LLBAND[i]) {
                    mc = singleton.LL2MC[i];
                    break;
                }
            }
        }
        Point cE = convertor(point, mc);
        Point lng_lat_return = new Point(singleton.fotmatDouble(cE.getLng()),singleton.fotmatDouble(cE.getLat()));
        return lng_lat_return;
    }

    private static double getLoop(Double lng, int a, int b){
        while (lng > b) {
            lng -= b - a;
        }
        while (lng < a) {
            lng += b - a;
        }
        return lng;
    }

    private static double getRange (Double lat, Integer a, Integer b) {
        if (a != null) {
            lat = Math.max(lat, a);
        }
        if (b != null) {
            lat = Math.min(lat, b);
        }
        return lat;
    }

    private static Point convertor(Point point, double[] mc){
        double lng = mc[0] + mc[1] * Math.abs(point.getLng());
        double c = Math.abs(point.getLat()) / mc[9];
        double lat = mc[2] + mc[3] * c + mc[4] * c * c + mc[5] * c * c * c + mc[6] * c * c * c * c + mc[7] * c * c * c * c * c + mc[8] * c * c * c * c * c * c;
        lng *= (point.getLng() < 0 ? -1 : 1);
        lat *= (point.getLat() < 0 ? -1 : 1);
        return new Point(lng,lat);
    }

    private double fotmatDouble(double formatValue){
        DecimalFormat df = new DecimalFormat("#.00");
        return Double.valueOf(df.format(formatValue));
    }

    private static double GetZoomUnits(int zoom) {
        return Math.pow(2, (18 - zoom));
    }
}
