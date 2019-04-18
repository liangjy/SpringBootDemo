package com.spring.common.util;

import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {
	
	private static Pattern floatNumericPattern = Pattern.compile("^[0-9\\-\\.]+$");
	private static Pattern abcPattern = Pattern.compile("^[a-z|A-Z]+$");
	public static final String splitStrPattern = ",|，|;|；|、|\\.|。|-|_|\\(|\\)|\\[|\\]|\\{|\\}|\\\\|/| |　|\"";
	
	/**
	 * 判断是否是空字符串 null和"" 都返回 true
	 * 
	 * @param s
	 * @return
	 */
	public static boolean isEmpty(String input){
		return input==null||"".equals(input.trim()) ;
	}
	
	/**
	 * 判断是否数字表示
	 * 
	 * @param src
	 *            源字符串
	 * @return 是否数字的标志
	 */
	public static boolean isNumeric(String input){
		if(input == null || "".equals(input.trim())){
			return false ;
		}
		Pattern pattern = Pattern.compile("[0-9]{1,}") ;
		return pattern.matcher(input).matches() ;
	}
	
	/**
	 * 去空格
	 * 
	 * @param input
	 * @return
	 */
	public static String trim2Empty(String input){
		if(input == null || "".equals(input.trim())){
			return "" ;
		}
		return input.trim() ;
	}
	
	/**
	 * 构造随机的请求号
	 * 时间戳+"_"+随机的五位整数
	 * @return
	 */
	public static String getRandomReqCode(){
		String result ;
		Long currentTimeMillis = System.currentTimeMillis() ;
		double d = Math.random()*100000 ;
		String dd = new DecimalFormat("0").format(d) ;
		Integer random = Integer.parseInt(dd) ;
		result = currentTimeMillis+"_"+random ;
		return result ;
	}

	/**
	 * 判断是否纯字母组合
	 *
	 * @param src
	 *            源字符串
	 * @return 是否纯字母组合的标志
	 */
	public static boolean isABC(String src) {
		boolean return_value = false;
		if (src != null && src.length() > 0) {
			Matcher m = abcPattern.matcher(src);
			if (m.find()) {
				return_value = true;
			}
		}
		return return_value;
	}

	/**
	 * 判断是否浮点数字表示
	 *
	 * @param src
	 *            源字符串
	 * @return 是否数字的标志
	 */
	public static boolean isFloatNumeric(String src) {
		boolean return_value = false;
		if (src != null && src.length() > 0) {
			Matcher m = floatNumericPattern.matcher(src);
			if (m.find()) {
				return_value = true;
			}
		}
		return return_value;
	}

	/**
	 * 把string array or list用给定的符号symbol连接成一个字符串
	 *
	 * @param array
	 * @param symbol
	 * @return
	 */
	public static String joinString(List array, String symbol) {
		String result = "";
		if (array != null) {
			for (int i = 0; i < array.size(); i++) {
				String temp = array.get(i).toString();
				if (temp != null && temp.trim().length() > 0)
					result += (temp + symbol);
			}
			if (result.length() > 1)
				result = result.substring(0, result.length() - 1);
		}
		return result;
	}

	/**
	 * 截取字符串　超出的字符用symbol代替 　　
	 *
	 * @param len
	 *            　字符串长度　长度计量单位为一个GBK汉字　　两个英文字母计算为一个单位长度
	 * @param str
	 * @param symbol
	 * @return
	 */
	public static String getLimitLengthString(String str, int len, String symbol) {
		int iLen = len * 2;
		int counterOfDoubleByte = 0;
		String strRet = "";
		try {
			if (str != null) {
				byte[] b = str.getBytes("GBK");
				if (b.length <= iLen) {
					return str;
				}
				for (int i = 0; i < iLen; i++) {
					if (b[i] < 0) {
						counterOfDoubleByte++;
					}
				}
				if (counterOfDoubleByte % 2 == 0) {
					strRet = new String(b, 0, iLen, "GBK") + symbol;
					return strRet;
				} else {
					strRet = new String(b, 0, iLen - 1, "GBK") + symbol;
					return strRet;
				}
			} else {
				return "";
			}
		} catch (Exception ex) {
			return str.substring(0, len);
		} finally {
			strRet = null;
		}
	}

	/**
	 * 截取字符串　超出的字符用...代替 　　
	 *
	 * @param len
	 *            　字符串长度　长度计量单位为一个GBK汉字　　两个英文字母计算为一个单位长度
	 * @param str
	 * @param symbol
	 * @return12
	 */
	public static String getLimitLengthString(String str, int len) {
		return getLimitLengthString(str, len, "...");
	}

	/**
	 * 截取字符，不转码
	 *
	 * @param subject
	 * @param size
	 * @return
	 */
	public static String subStrNotEncode(String subject, int size) {
		if (subject.length() > size) {
			subject = subject.substring(0, size);
		}
		return subject;
	}

	/**
	 * 把string array or list用给定的符号symbol连接成一个字符串
	 *
	 * @param array
	 * @param symbol
	 * @return
	 */
	public static String joinString(String[] array, String symbol) {
		String result = "";
		if (array != null) {
			for (int i = 0; i < array.length; i++) {
				String temp = array[i];
				if (temp != null && temp.trim().length() > 0)
					result += (temp + symbol);
			}
			if (result.length() > 1)
				result = result.substring(0, result.length() - 1);
		}
		return result;
	}

	/**
	 * 取得字符串的实际长度（考虑了汉字的情况）
	 *
	 * @param SrcStr
	 *            源字符串
	 * @return 字符串的实际长度
	 */
	public static int getStringLen(String SrcStr) {
		int return_value = 0;
		if (SrcStr != null) {
			char[] theChars = SrcStr.toCharArray();
			for (int i = 0; i < theChars.length; i++) {
				return_value += (theChars[i] <= 255) ? 1 : 2;
			}
		}
		return return_value;
	}

	/**
	 * 检查数据串中是否包含非法字符集
	 *
	 * @param str
	 * @return [true]|[false] 包含|不包含
	 */
	public static boolean check(String str) {
		String sIllegal = "'\"";
		int len = sIllegal.length();
		if (null == str)
			return false;
		for (int i = 0; i < len; i++) {
			if (str.indexOf(sIllegal.charAt(i)) != -1)
				return true;
		}

		return false;
	}

	/***************************************************************************
	 * getHideEmailPrefix - 隐藏邮件地址前缀。
	 *
	 * @param email
	 *            - EMail邮箱地址 例如: linwenguo@koubei.com 等等...
	 * @return 返回已隐藏前缀邮件地址, 如 *********@koubei.com.
	 * @version 1.0 (2006.11.27) Wilson Lin
	 **************************************************************************/
	public static String getHideEmailPrefix(String email) {
		if (null != email) {
			int index = email.lastIndexOf('@');
			if (index > 0) {
				email = repeat("*", index).concat(email.substring(index));
			}
		}
		return email;
	}

	/***************************************************************************
	 * repeat - 通过源字符串重复生成N次组成新的字符串。
	 *
	 * @param src
	 *            - 源字符串 例如: 空格(" "), 星号("*"), "浙江" 等等...
	 * @param num
	 *            - 重复生成次数
	 * @return 返回已生成的重复字符串
	 * @version 1.0 (2006.10.10) Wilson Lin
	 **************************************************************************/
	public static String repeat(String src, int num) {
		StringBuffer s = new StringBuffer();
		for (int i = 0; i < num; i++)
			s.append(src);
		return s.toString();
	}

	/**
	 * 根据指定的字符把源字符串分割成一个数组
	 *
	 * @param src
	 * @return
	 */
	public static List<String> parseString2ListByCustomerPattern(
			String pattern, String src) {

		if (src == null)
			return null;
		List<String> list = new ArrayList<String>();
		String[] result = src.split(pattern);
		for (int i = 0; i < result.length; i++) {
			list.add(result[i]);
		}
		return list;
	}

	/**
	 * 根据指定的字符把源字符串分割成一个数组
	 *
	 * @param src
	 * @return
	 */
	public static List<String> parseString2ListByPattern(String src) {
		String pattern = "，|,|、|。";
		return parseString2ListByCustomerPattern(pattern, src);
	}

	/**
	 * 格式化一个float或Double
	 *
	 * @param format
	 *            要格式化成的格式 such as #.00, #.#
	 */

	public static String formatFloatOrDouble(Object f, String format) {
		DecimalFormat df = new DecimalFormat(format);
		return df.format(f);
	}

	/**
	 * 自定义的分隔字符串函数 例如: 1,2,3 =>[1,2,3] 3个元素 ,2,3=>[,2,3] 3个元素 ,2,3,=>[,2,3,]
	 * 4个元素 ,,,=>[,,,] 4个元素
	 *
	 * 5.22算法修改，为提高速度不用正则表达式 两个间隔符,,返回""元素
	 *
	 * @param split
	 *            分割字符 默认,
	 * @param src
	 *            输入字符串
	 * @return 分隔后的list
	 * @author Robin
	 */
	public static List<String> splitToList(String split, String src) {
		// 默认,
		String sp = ",";
		if (split != null && split.length() == 1) {
			sp = split;
		}
		List<String> r = new ArrayList<String>();
		int lastIndex = -1;
		int index = src.indexOf(sp);
		if (-1 == index && src != null) {
			r.add(src);
			return r;
		}
		while (index >= 0) {
			if (index > lastIndex) {
				r.add(src.substring(lastIndex + 1, index));
			} else {
				r.add("");
			}

			lastIndex = index;
			index = src.indexOf(sp, index + 1);
			if (index == -1) {
				r.add(src.substring(lastIndex + 1, src.length()));
			}
		}
		return r;
	}

	/**
	 * 把 名=值 参数表转换成字符串 (a=1,b=2 =>a=1&b=2)
	 *
	 * @param map
	 * @return
	 */
	public static String linkedHashMapToString(LinkedHashMap<String, String> map) {
		if (map != null && map.size() > 0) {
			String result = "";
			Iterator it = map.keySet().iterator();
			while (it.hasNext()) {
				String name = (String) it.next();
				String value = (String) map.get(name);
				result += (result.equals("")) ? "" : "&";
				result += String.format("%s=%s", name, value);
			}
			return result;
		}
		return null;
	}

	/**
	 * 解析字符串返回 名称=值的参数表 (a=1&b=2 => a=1,b=2)
	 *
	 * @see test.koubei.util.StringUtilTest#testParseStr()
	 * @param str
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static LinkedHashMap<String, String> toLinkedHashMap(String str) {
		if (str != null && !str.equals("") && str.indexOf("=") > 0) {
			LinkedHashMap result = new LinkedHashMap();

			String name = null;
			String value = null;
			int i = 0;
			while (i < str.length()) {
				char c = str.charAt(i);
				switch (c) {
				case 61: // =
					value = "";
					break;
				case 38: // &
					if (name != null && value != null && !name.equals("")) {
						result.put(name, value);
					}
					name = null;
					value = null;
					break;
				default:
					if (value != null) {
						value = (value != null) ? (value + c) : "" + c;
					} else {
						name = (name != null) ? (name + c) : "" + c;
					}
				}
				i++;

			}

			if (name != null && value != null && !name.equals("")) {
				result.put(name, value);
			}

			return result;

		}
		return null;
	}

	/**
	 * 根据输入的多个解释和下标返回一个值
	 *
	 * @param captions
	 *            例如:"无,爱干净,一般,比较乱"
	 * @param index
	 *            1
	 * @return 一般
	 */
	public static String getCaption(String captions, int index) {
		if (index > 0 && captions != null && !captions.equals("")) {
			String[] ss = captions.split(",");
			if (ss != null && ss.length > 0 && index < ss.length) {
				return ss[index];
			}
		}
		return null;
	}

	/**
	 * 数字转字符串,如果num<=0 则输出"";
	 *
	 * @param num
	 * @return
	 */
	public static String numberToString(Object num) {
		if (num == null) {
			return null;
		} else if (num instanceof Integer && (Integer) num > 0) {
			return Integer.toString((Integer) num);
		} else if (num instanceof Long && (Long) num > 0) {
			return Long.toString((Long) num);
		} else if (num instanceof Float && (Float) num > 0) {
			return Float.toString((Float) num);
		} else if (num instanceof Double && (Double) num > 0) {
			return Double.toString((Double) num);
		} else {
			return "";
		}
	}

	/**
	 * 货币转字符串
	 *
	 * @param money
	 * @param style
	 *            样式 [default]要格式化成的格式 such as #.00, #.#
	 * @return
	 */

	public static String moneyToString(Object money, String style) {
		if (money != null && style != null && (money instanceof Double || money instanceof Float)) {
			Double num = (Double) money;

			if (style.equalsIgnoreCase("default")) {
				// 缺省样式 0 不输出 ,如果没有输出小数位则不输出.0
				if (num == 0) {
					// 不输出0
					return "";
				} else if ((num * 10 % 10) == 0) {
					// 没有小数
					return Integer.toString((int) num.intValue());
				} else {
					// 有小数
					return num.toString();
				}

			} else {
				DecimalFormat df = new DecimalFormat(style);
				return df.format(num);
			}
		}
		return null;
	}

	/**
	 * 在sou中是否存在finds 如果指定的finds字符串有一个在sou中找到,返回true;
	 *
	 * @param sou
	 * @param find
	 * @return
	 */
	public static boolean strPos(String sou, String... finds) {
		if (sou != null && finds != null && finds.length > 0) {
			for (int i = 0; i < finds.length; i++) {
				if (sou.indexOf(finds[i]) > -1)
					return true;
			}
		}
		return false;
	}

	/**
	 * 在sou中是否存在finds 如果指定的finds字符串有一个在sou中找到,返回true;
	 *
	 * @param sou
	 * @param finds
	 * @return
	 */
	public static boolean strPos(String sou, List<String> finds) {
		if (sou != null && finds != null && finds.size() > 0) {
			for (String s : finds) {
				if (sou.indexOf(s) > -1)
					return true;
			}
		}
		return false;
	}

	public static boolean strPos(String sou, String finds) {
		List<String> t = splitToList(",", finds);
		return strPos(sou, t);
	}

	/**
	 * 判断两个字符串是否相等 如果都为null则判断为相等,一个为null另一个not null则判断不相等 否则如果s1=s2则相等
	 *
	 * @param s1
	 * @param s2
	 * @return
	 */
	public static boolean equals(String s1, String s2) {
		if (StringUtil.isEmpty(s1) && StringUtil.isEmpty(s2)) {
			return true;
		} else if (!StringUtil.isEmpty(s1) && !StringUtil.isEmpty(s2)) {
			return s1.equals(s2);
		}
		return false;
	}

	/**
	 * 字符串  转 Integer  如果异常返回0
	 *
	 * @param s
	 * @return
	 */
	public static int toInt(String s) {
		if (s != null && !"".equals(s.trim())) {
			try {
				return Integer.parseInt(s);
			} catch (Exception e) {
				return 0;
			}
		}
		return 0;
	}

	/**
	 * 字符串 转 Double  如果异常返回0.00
	 *
	 * @param s
	 * @return
	 */
	public static double toDouble(String s) {
		if (s != null && !"".equals(s.trim())) {
			return Double.parseDouble(s);
		}
		return 0.00;
	}

	/**
	 * 字符串 转 Long 如果异常返回0L
	 *
	 * @param s
	 * @return
	 */
	public static long toLong(String s) {
		try {
			if (s != null && !"".equals(s.trim()))
				return Long.parseLong(s);
		} catch (Exception exception) {
		}
		return 0L;
	}

	/**
	 * 字符串转float 如果异常返回0.00
	 *
	 * @param s
	 *            输入的字符串
	 * @return 转换后的float
	 */
	public static Float toFloat(String s) {
		try {
			return Float.parseFloat(s);
		} catch (NumberFormatException e) {
			return new Float(0);
		}
	}

	/**
	 * 过滤用户输入的URL地址（防治用户广告） 目前只针对以http或www开头的URL地址
	 * 本方法调用的正则表达式，不建议用在对性能严格的地方例如:循环及list页面等
	 *
	 * @author fengliang
	 * @param str
	 *            需要处理的字符串
	 * @return 返回处理后的字符串
	 */
	public static String removeURL(String str) {
		if (str != null)
			str = str.toLowerCase().replaceAll("(http|www|com|cn|org|\\.)+", "");
		return str;
	}

	/**
	 * 检查字符串是否属于手机号码
	 *
	 * @param mobiles
	 * @return boolean
	 */
	public static boolean isMobileNO(String mobiles){

		Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");

		Matcher m = p.matcher(mobiles);

		return m.matches();
	}

	/**
	 * Wap页面的非法字符检查
	 *
	 * @param str
	 * @return
	 */
	public static String replaceWapStr(String str) {
		if (str != null) {
			str = str.replaceAll("<span class=\"keyword\">", "");
			str = str.replaceAll("</span>", "");
			str = str.replaceAll("<strong class=\"keyword\">", "");
			str = str.replaceAll("<strong>", "");
			str = str.replaceAll("</strong>", "");

			str = str.replace('$', '＄');

			str = str.replaceAll("&amp;", "＆");
			str = str.replace('&', '＆');

			str = str.replace('<', '＜');

			str = str.replace('>', '＞');

		}
		return str;
	}

	/**
	 * 页面中去除字符串中的空格、回车、换行符、制表符
	 *
	 * @param str
	 * @return
	 */
	public static String replaceBlank(String str) {
		if (str != null) {
			Pattern p = Pattern.compile("\\s*|\t|\r|\n");
			Matcher m = p.matcher(str);
			str = m.replaceAll("");
		}
		return str;
	}

	/**
	 *
	 * 转换编码
	 *
	 * @param s
	 *            源字符串
	 * @param fencode
	 *            源编码格式
	 * @param bencode
	 *            目标编码格式
	 * @return 目标编码
	 */
	public static String changCoding(String s, String fencode, String bencode) {
		try {
			String str = new String(s.getBytes(fencode), bencode);
			return str;
		} catch (UnsupportedEncodingException e) {
			return s;
		}
	}

	/**
	 * 除去html标签
	 *
	 * @param str
	 *            源字符串
	 * @return 目标字符串
	 */
	public static String removeHTMLLable(String str) {
		str = stringReplace(str, ">\\s*<", "><");
		str = stringReplace(str, "&nbsp;", " ");// 替换空格
		str = stringReplace(str, "<br ?/?>", "\n");// 去<br><br />
		str = stringReplace(str, "<([^<>]+)>", "");// 去掉<>内的字符
		str = stringReplace(str, "\\s\\s\\s*", " ");// 将多个空白变成一个空格
		str = stringReplace(str, "^\\s*", "");// 去掉头的空白
		str = stringReplace(str, "\\s*$", "");// 去掉尾的空白
		str = stringReplace(str, " +", " ");
		return str;
	}

	/**
	 *
	 * 字符串替换
	 *
	 * @param str
	 *            源字符串
	 * @param sr
	 *            正则表达式样式
	 * @param sd
	 *            替换文本
	 * @return 结果串
	 */
	public static String stringReplace(String str, String sr, String sd) {
		String regEx = sr;
		Pattern p = Pattern.compile(regEx, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(str);
		str = m.replaceAll(sd);
		return str;
	}

	/**
	 *
	 * 根据正则表达式分割字符串
	 *
	 * @param str
	 *            源字符串
	 * @param ms
	 *            正则表达式
	 * @return 目标字符串组
	 */
	public static String[] splitString(String str, String ms) {
		String regEx = ms;
		Pattern p = Pattern.compile(regEx, Pattern.CASE_INSENSITIVE);
		String[] sp = p.split(str);
		return sp;
	}

	/**
	 * 得到字符串的子串位置序列
	 *
	 * @param str
	 *            字符串
	 * @param sub
	 *            子串
	 * @param b
	 *            true子串前端,false子串后端
	 * @return 字符串的子串位置序列
	 */
	public static int[] getSubStringPos(String str, String sub, boolean b) {
		// int[] i = new int[(new Integer((str.length()-stringReplace( str , sub
		// , "" ).length())/sub.length())).intValue()] ;
		String[] sp = null;
		int l = sub.length();
		sp = splitString(str, sub);
		if (sp == null) {
			return null;
		}
		int[] ip = new int[sp.length - 1];
		for (int i = 0; i < sp.length - 1; i++) {
			ip[i] = sp[i].length() + l;
			if (i != 0) {
				ip[i] += ip[i - 1];
			}
		}
		if (b) {
			for (int j = 0; j < ip.length; j++) {
				ip[j] = ip[j] - l;
			}
		}
		return ip;
	}

	/**
	 * *************************************************************************
	 * 根据正则表达式提取字符串,相同的字符串只返回一个
	 *
	 * @param str
	 *            源字符串
	 * @param pattern
	 *            正则表达式
	 * @return 目标字符串数据组
	 *************************************************************************
	 */

	// ★传入一个字符串，把符合pattern格式的字符串放入字符串数组
	// java.util.regex是一个用正则表达式所订制的模式来对字符串进行匹配工作的类库包
	public static String[] getStringArrayByPattern(String str, String pattern) {
		Pattern p = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE);
		Matcher matcher = p.matcher(str);
		// 范型
		Set<String> result = new HashSet<String>();// 目的是：相同的字符串只返回一个。。。 不重复元素
		// boolean find() 尝试在目标字符串里查找下一个匹配子串。
		while (matcher.find()) {
			for (int i = 0; i < matcher.groupCount(); i++) { // int groupCount()
																// 返回当前查找所获得的匹配组的数量。
				// System.out.println(matcher.group(i));
				result.add(matcher.group(i));

			}
		}
		String[] resultStr = null;
		if (result.size() > 0) {
			resultStr = new String[result.size()];
			return result.toArray(resultStr);// 将Set result转化为String[] resultStr
		}
		return resultStr;

	}

	/**
	 * 得到第一个b,e之间的字符串,并返回e后的子串
	 *
	 * @param s
	 *            源字符串
	 * @param b
	 *            标志开始
	 * @param e
	 *            标志结束
	 * @return b,e之间的字符串
	 */

	/*
	 * String aaa="abcdefghijklmn"; String[] bbb=StringProcessor.midString(aaa,
	 * "b","l"); System.out.println("bbb[0]:"+bbb[0]);//cdefghijk
	 * System.out.println("bbb[1]:"+bbb[1]);//lmn
	 * ★这个方法是得到第二个参数和第三个参数之间的字符串,赋给元素0;然后把元素0代表的字符串之后的,赋给元素1
	 */

	/*
	 * String aaa="abcdefgllhijklmn5465"; String[]
	 * bbb=StringProcessor.midString(aaa, "b","l"); //ab cdefg llhijklmn5465 //
	 * 元素0 元素1
	 */
	public static String[] midString(String s, String b, String e) {
		int i = s.indexOf(b) + b.length();
		int j = s.indexOf(e, i);
		String[] sa = new String[2];
		if (i < b.length() || j < i + 1 || i > j) {
			sa[1] = s;
			sa[0] = null;
			return sa;
		} else {
			sa[0] = s.substring(i, j);
			sa[1] = s.substring(j);
			return sa;
		}
	}

	/**
	 * 判断是否与给定字符串样式匹配
	 *
	 * @param str
	 *            字符串
	 * @param pattern
	 *            正则表达式样式
	 * @return 是否匹配是true,否false
	 */
	public static boolean isMatch(String str, String pattern) {
		Pattern pattern_hand = Pattern.compile(pattern);
		Matcher matcher_hand = pattern_hand.matcher(str);
		boolean b = matcher_hand.matches();
		return b;
	}

	/**
	 * 判断相邻文字内容是否重复
	 */
	public static boolean isContentRepeat(String content) {
		int similarNum = 0;
		int forNum = 0;
		int subNum = 0;
		int thousandNum = 0;
		String startStr = "";
		String nextStr = "";
		boolean result = false;
		float endNum = (float) 0.0;
		if (content != null && content.length() > 0) {
			if (content.length() % 1000 > 0)
				thousandNum = (int) Math.floor(content.length() / 1000) + 1;
			else
				thousandNum = (int) Math.floor(content.length() / 1000);
			if (thousandNum < 3)
				subNum = 100 * thousandNum;
			else if (thousandNum < 6)
				subNum = 200 * thousandNum;
			else if (thousandNum < 9)
				subNum = 300 * thousandNum;
			else
				subNum = 3000;
			for (int j = 1; j < subNum; j++) {
				if (content.length() % j > 0)
					forNum = (int) Math.floor(content.length() / j) + 1;
				else
					forNum = (int) Math.floor(content.length() / j);
				if (result || j >= content.length())
					break;
				else {
					for (int m = 0; m < forNum; m++) {
						if (m * j > content.length()
								|| (m + 1) * j > content.length()
								|| (m + 2) * j > content.length())
							break;
						startStr = content.substring(m * j, (m + 1) * j);
						nextStr = content.substring((m + 1) * j, (m + 2) * j);
						if (startStr.equals(nextStr)) {
							similarNum = similarNum + 1;
							endNum = (float) similarNum / forNum;
							if (endNum > 0.4) {
								result = true;
								break;
							}
						} else
							similarNum = 0;
					}
				}
			}
		}
		return result;
	}

	/**
	 * 将带有htmlcode代码的字符转换成<>&'"
	 *
	 * @param str
	 * @return
	 */
	public static String htmlcodeToSpecialchars(String str) {
		str = str.replaceAll("&amp;", "&");
		str = str.replaceAll("&quot;", "\"");
		str = str.replaceAll("&#039;", "'");
		str = str.replaceAll("&lt;", "<");
		str = str.replaceAll("&gt;", ">");
		str = str.replaceAll("&nbsp", " ");
		return str;
	}

	/**
	 * 页面的非法字符检查
	 *
	 * @param str
	 * @return
	 */
	public static String replaceStr(String str) {
		if (str != null && str.length() > 0) {
			str = str.replaceAll("~", ",");
			str = str.replaceAll(" ", ",");
			str = str.replaceAll("　", ",");
			str = str.replaceAll(" ", ",");
			str = str.replaceAll("`", ",");
			str = str.replaceAll("!", ",");
			str = str.replaceAll("@", ",");
			str = str.replaceAll("#", ",");
			str = str.replaceAll("\\$", ",");
			str = str.replaceAll("%", ",");
			str = str.replaceAll("\\^", ",");
			str = str.replaceAll("&", ",");
			str = str.replaceAll("\\*", ",");
			str = str.replaceAll("\\(", ",");
			str = str.replaceAll("\\)", ",");
			str = str.replaceAll("-", ",");
			str = str.replaceAll("_", ",");
			str = str.replaceAll("=", ",");
			str = str.replaceAll("\\+", ",");
			str = str.replaceAll("\\{", ",");
			str = str.replaceAll("\\[", ",");
			str = str.replaceAll("\\}", ",");
			str = str.replaceAll("\\]", ",");
			str = str.replaceAll("\\|", ",");
			str = str.replaceAll("\\\\", ",");
			str = str.replaceAll(";", ",");
			str = str.replaceAll(":", ",");
			str = str.replaceAll("'", ",");
			str = str.replaceAll("\\\"", ",");
			str = str.replaceAll("<", ",");
			str = str.replaceAll(">", ",");
			str = str.replaceAll("\\.", ",");
			str = str.replaceAll("\\?", ",");
			str = str.replaceAll("/", ",");
			str = str.replaceAll("～", ",");
			str = str.replaceAll("`", ",");
			str = str.replaceAll("！", ",");
			str = str.replaceAll("＠", ",");
			str = str.replaceAll("＃", ",");
			str = str.replaceAll("＄", ",");
			str = str.replaceAll("％", ",");
			str = str.replaceAll("︿", ",");
			str = str.replaceAll("＆", ",");
			str = str.replaceAll("×", ",");
			str = str.replaceAll("（", ",");
			str = str.replaceAll("）", ",");
			str = str.replaceAll("－", ",");
			str = str.replaceAll("＿", ",");
			str = str.replaceAll("＋", ",");
			str = str.replaceAll("＝", ",");
			str = str.replaceAll("｛", ",");
			str = str.replaceAll("［", ",");
			str = str.replaceAll("｝", ",");
			str = str.replaceAll("］", ",");
			str = str.replaceAll("｜", ",");
			str = str.replaceAll("＼", ",");
			str = str.replaceAll("：", ",");
			str = str.replaceAll("；", ",");
			str = str.replaceAll("＂", ",");
			str = str.replaceAll("＇", ",");
			str = str.replaceAll("＜", ",");
			str = str.replaceAll("，", ",");
			str = str.replaceAll("＞", ",");
			str = str.replaceAll("．", ",");
			str = str.replaceAll("？", ",");
			str = str.replaceAll("／", ",");
			str = str.replaceAll("·", ",");
			str = str.replaceAll("￥", ",");
			str = str.replaceAll("……", ",");
			str = str.replaceAll("（", ",");
			str = str.replaceAll("）", ",");
			str = str.replaceAll("——", ",");
			str = str.replaceAll("-", ",");
			str = str.replaceAll("【", ",");
			str = str.replaceAll("】", ",");
			str = str.replaceAll("、", ",");
			str = str.replaceAll("”", ",");
			str = str.replaceAll("’", ",");
			str = str.replaceAll("《", ",");
			str = str.replaceAll("》", ",");
			str = str.replaceAll("“", ",");
			str = str.replaceAll("。", ",");
		}
		return str;
	}

	/**
	 * 全角字符变半角字符
	 *
	 * @param str
	 * @return
	 */
	public static String full2Half(String str) {
		if (str == null || "".equals(str))
			return "";
		StringBuffer sb = new StringBuffer();

		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);

			if (c >= 65281 && c < 65373)
				sb.append((char) (c - 65248));
			else
				sb.append(str.charAt(i));
		}

		return sb.toString();

	}

	/**
	 * 全角括号转为半角
	 *
	 * @param str
	 * @return
	 */
	public static String replaceBracketStr(String str) {
		if (str != null && str.length() > 0) {
			str = str.replaceAll("（", "(");
			str = str.replaceAll("）", ")");
		}
		return str;
	}

	/**
	 * 全角生成半角
	 *
	 * @param str
	 * @return
	 */
	public static String Q2B(String QJstr) {
		String outStr = "";
		String Tstr = "";
		byte[] b = null;
		for (int i = 0; i < QJstr.length(); i++) {
			try {
				Tstr = QJstr.substring(i, i + 1);
				b = Tstr.getBytes("unicode");
			} catch (UnsupportedEncodingException e) {

			}
			if (b[3] == -1) {
				b[2] = (byte) (b[2] + 32);
				b[3] = 0;
				try {
					outStr = outStr + new String(b, "unicode");
				} catch (UnsupportedEncodingException ex) {
					
				}
			} else {
				outStr = outStr + Tstr;
			}
		}
		return outStr;
	}
	
	/**
	 * 功能：将半角的符号转换成全角符号.(即英文字符转中文字符)
	 * 
	 * @param str
	 *            源字符串
	 * @return String
	 */
	public static String changeToFull(String str) {
		String source = "1234567890!@#$%^&*()abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_=+\\|[];:'\",<.>/?";
		String[] decode = { "１", "２", "３", "４", "５", "６", "７", "８", "９", "０",
				"！", "＠", "＃", "＄", "％", "︿", "＆", "＊", "（", "）", "ａ", "ｂ",
				"ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ",
				"ｏ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ",
				"Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ", "Ｋ", "Ｌ",
				"Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ",
				"Ｙ", "Ｚ", "－", "＿", "＝", "＋", "＼", "｜", "【", "】", "；", "：",
				"'", "\"", "，", "〈", "。", "〉", "／", "？" };
		String result = "";
		for (int i = 0; i < str.length(); i++) {
			int pos = source.indexOf(str.charAt(i));
			if (pos != -1) {
				result += decode[pos];
			} else {
				result += str.charAt(i);
			}
		}
		return result;
	}
	
	/**
	 * <p>
	 * 只从源字符串中移除指定开头子字符串.
	 * </p>
	 * 
	 * <pre>
	 * StringUtil.removeStart(null, *)      = null
	 * StringUtil.removeStart("", *)        = ""
	 * StringUtil.removeStart(*, null)      = *
	 * StringUtil.removeStart("www.domain.com", "www.")   = "domain.com"
	 * StringUtil.removeStart("domain.com", "www.")       = "domain.com"
	 * StringUtil.removeStart("www.domain.com", "domain") = "www.domain.com"
	 * StringUtil.removeStart("abc", "")    = "abc"
	 * </pre>
	 *
	 * @param str
	 *            源字符串
	 * @param remove
	 *            将要被移除的子字符串
	 * @return String
	 */
	public static String removeStart(String str, String remove) {
		if (isEmpty(str) || isEmpty(remove)) {
			return str;
		}
		if (str.startsWith(remove)) {
			return str.substring(remove.length());
		}
		return str;
	}

	/**
	 * <p>
	 * 只从源字符串中移除指定结尾的子字符串.
	 * </p>
	 * 
	 * <pre>
	 * StringUtil.removeEnd(null, *)      = null
	 * StringUtil.removeEnd("", *)        = ""
	 * StringUtil.removeEnd(*, null)      = *
	 * StringUtil.removeEnd("www.domain.com", ".com.")  = "www.domain.com"
	 * StringUtil.removeEnd("www.domain.com", ".com")   = "www.domain"
	 * StringUtil.removeEnd("www.domain.com", "domain") = "www.domain.com"
	 * StringUtil.removeEnd("abc", "")    = "abc"
	 * </pre>
	 *
	 * @param str
	 *            源字符串
	 * @param remove
	 *            将要被移除的子字符串
	 * @return String
	 */
	public static String removeEnd(String str, String remove) {
		if (isEmpty(str) || isEmpty(remove)) {
			return str;
		}
		if (str.endsWith(remove)) {
			return str.substring(0, str.length() - remove.length());
		}
		return str;
	}
	
}
