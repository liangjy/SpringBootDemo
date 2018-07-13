package com.spring.common.util.geoUtil;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MapUtils {
	/**
	 * 射线法判断点是否在多边形内部, 改编自 http://www.html-js.com/article/1528
	 * 
	 * @param px
	 *            要判断的点所在的X坐标
	 * @param py
	 *            要判断的点所在的Y坐标
	 * @param polygonCoordinates
	 *            多边形顶点坐标数组
	 * @return 如果x、y坐标在多边形内部(或在边上，包含顶点)则返回true，否则返回false
	 */
	public static boolean rayCasting(double px, double py, Coordinate[] polygonCoordinates) {
		boolean flag = false;
		for (int i = 0, l = polygonCoordinates.length, j = l - 1; i < l; j = i, i++) {
			double sx = polygonCoordinates[i].getX();
			double sy = polygonCoordinates[i].getY();
			double tx = polygonCoordinates[j].getX();
			double ty = polygonCoordinates[j].getY();

			// 点与多边形顶点重合
			if ((sx == px && sy == py) || (tx == px && ty == py)) {
				return true;
			}

			// 判断线段两端点是否在射线两侧
			if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
				// 线段上与射线 Y 坐标相同的点的 X 坐标
				double x = sx + (py - sy) * (tx - sx) / (ty - sy);

				// 点在多边形的边上
				if (x == px) {
					return true;
				}

				// 射线穿过多边形的边界
				if (x > px) {
					flag = !flag;
				}
			}
		}
		// 射线穿过多边形边界的次数为奇数时点在多边形内
		return flag ? true : false;
	}

	/**
	 * 计算经纬度集合包含栅格
	 * 
	 * @param gis_date
	 * @param level
	 * @return
	 */
	public static ArrayList<Long> getGridNum(String gis_date, int level) {

		// 把用|、@、,分隔的数据拆分成Coordinate坐标对象
		Double max_lng = 0d;
		Double max_lat = 0d;
		Double min_lng = 180d;
		Double min_lat = 90d;
		String[] str_area_bonds = gis_date.split("\\|");
		Coordinate[][] area_bonds = new Coordinate[str_area_bonds.length][];
		for (int m = 0; m < str_area_bonds.length; m++) {
			String str_area_bonds_item = str_area_bonds[m];
			String[] lng_lats = str_area_bonds_item.split("@");
			Coordinate[] mCoordinates = new Coordinate[lng_lats.length];
			for (int n = 0; n < lng_lats.length; n++) {
				String lng_lat_item = lng_lats[n];
				String[] lng_lat = lng_lat_item.split(",");
				Double x = Double.parseDouble(lng_lat[0]);
				Double y = Double.parseDouble(lng_lat[1]);
				mCoordinates[n] = new Coordinate(x, y);
				// 设置最大最小经纬度
				if (x > max_lng)
					max_lng = x;
				if (y > max_lat)
					max_lat = y;
				if (x < min_lng)
					min_lng = x;
				if (y < min_lat)
					min_lat = y;
			}
			area_bonds[m] = mCoordinates;
		}
		// 求出经纬度返回包含的栅格
		Double base_lng = 109.456006485399;
		Double base_lat = 20.1297900884702;
		Double diff_lng = 0.00000972;
		Double diff_lat = 0.00000896;
		int d = 100000;
		if (level == 10)
			d = d * 10;
		int dnum = 1001;
		long max_lng_num = (long) Math.floor((max_lng - base_lng) / (diff_lng * level) + dnum);
		long max_lat_num = (long) Math.floor((max_lat - base_lat) / (diff_lat * level) + dnum);
		long min_lng_num = (long) Math.floor((min_lng - base_lng) / (diff_lng * level) + dnum);
		long min_lat_num = (long) Math.floor((min_lat - base_lat) / (diff_lat * level) + dnum);
		// 获取所有栅格号
		ArrayList<Long> allNums = new ArrayList<Long>();
		for (long m = min_lat_num; m <= max_lat_num; m++) {
			for (long n = min_lng_num; n <= max_lng_num; n++) {
				allNums.add(n * d + m);
			}
		}
		ArrayList<Long> retNums = new ArrayList<Long>();
		// 判断栅格是否落在多边形里面
		for (Long gridNum : allNums) {
			long lngNum = gridNum / d;
			long latNum = gridNum % d;
			double minLat = (latNum - dnum) * (diff_lat * level) + base_lat;
			double minLng = (lngNum - dnum) * (diff_lng * level) + base_lng;
			double midLat = minLat + (diff_lat * level) / 2;
			midLat = new BigDecimal(midLat).setScale(6, BigDecimal.ROUND_HALF_UP).doubleValue();
			double midLng = minLng + (diff_lng * level) / 2;
			midLng = new BigDecimal(midLng).setScale(6, BigDecimal.ROUND_HALF_UP).doubleValue();
			int is_in = 0;
			for (Coordinate[] bound : area_bonds) {
				if (rayCasting(midLng, midLat, bound)) {
					is_in += 1;
				}
			}
			if (is_in == 1) {
				retNums.add(gridNum);
			}
		}
		return retNums;
	}
	
	public static void main(String[] args){
		String gis_data = "113.54059,22.774771@113.523055,22.782369@113.493591,22.796163@113.486979,22.786634@113.491075,22.766307@113.482667,22.760442@113.472534,22.75171@113.463407,22.746911@113.459958,22.743644@113.464845,22.731178@113.492513,22.712177@113.51091,22.69684@113.542387,22.669097@113.545261,22.664028@113.539512,22.662561@113.546698,22.647085@113.575444,22.602383@113.607927,22.594375@113.637822,22.570883@113.657657,22.553261@113.723485,22.570082@113.705663,22.637078@113.668868,22.723244@113.644147,22.739245@113.607065,22.735511@113.582631,22.736045";
		List<Long> gridNum = getGridNum(gis_data,20);
		System.out.println("栅格长度："+gridNum.size());
	}
}
