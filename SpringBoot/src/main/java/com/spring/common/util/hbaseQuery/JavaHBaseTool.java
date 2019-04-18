package com.spring.common.util.hbaseQuery;

import com.spring.common.util.PropertiesUtil;
import com.spring.common.util.StringUtil;
import com.spring.common.util.geoUtil.GridNumHelper;
import com.spring.common.util.geoUtil.MapUtils;
import net.sf.json.JSONArray;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.Cell;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.filter.*;
import org.apache.hadoop.hbase.filter.CompareFilter.CompareOp;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.hadoop.security.UserGroupInformation;

import java.io.IOException;
import java.util.*;

public class JavaHBaseTool {
	// 声明配置  
    private static String cityString = "广州韶关深圳珠海汕头佛山江门湛江茂名肇庆惠州梅州汕尾河源阳江清远东莞中山潮州揭阳云浮";
    public Configuration getJavaHBaseKerberosConfig(){
    	Configuration conf = null;
        Properties hbaseProperties = null;
    	 try {
 			hbaseProperties = PropertiesUtil.getPropertiesByFileName("Hbase.properties");
 		} catch (Exception e) {
 			e.printStackTrace();
 		}
        String quorum = hbaseProperties.getProperty("hbase.zookeeper.quorum");
        String clientPort = hbaseProperties.getProperty("hbase.zookeeper.property.clientPort");
        String parent = hbaseProperties.getProperty("zookeeper.znode.parent");
        String hadoopAuthentication = hbaseProperties.getProperty("hadoop.security.authentication");
        String hbaseAuthentication = hbaseProperties.getProperty("hbase.security.authentication");
        String masterPrincipal = hbaseProperties.getProperty("hbase.master.kerberos.principal");
        String regionserverPrincipal = hbaseProperties.getProperty("hbase.regionserver.kerberos.principal");
        String loginUser = hbaseProperties.getProperty("loginUser");
        String keytabFile = hbaseProperties.getProperty("keytabFile");
//      System.setProperty("java.security.krb5.conf","C:\\hbase213\\"+kbr5Conf);
        conf = HBaseConfiguration.create();
 	    conf.set("hbase.zookeeper.quorum", quorum);
 	    conf.set("hbase.zookeeper.property.clientPort", clientPort); 
 	    conf.set("zookeeper.znode.parent",parent);
        conf.setInt("hbase.rpc.timeout",20000);
        conf.setInt("hbase.client.operation.timeout",30000);
        conf.setInt("hbase.client.scanner.timeout.period",200000);
// 	   conf.addResource("");
 	    
 	    //---------------------------------------
 	    //设置安全验证方式为kerberos  
 	    conf.set("hadoop.security.authentication",hadoopAuthentication);  
 	    conf.set("hbase.security.authentication",hbaseAuthentication);  
 	    //设置hbase master及hbase regionserver的安全标识，这两个值可以在hbase-site.xml中找到  
 	    conf.set("hbase.master.kerberos.principal", masterPrincipal);  
 	    conf.set("hbase.regionserver.kerberos.principal",regionserverPrincipal);  
 	    //使用设置的用户登陆  
 	    UserGroupInformation.setConfiguration(conf);
// 	    UserGroupInformation.loginUserFromKeytab("test2@HAOY.COM","C:\\hbase213\\test2.keytab");
 	    try {
 			UserGroupInformation.loginUserFromKeytab(loginUser,keytabFile);
 		} catch (Exception e) {
 			e.printStackTrace();
 		}
 	    return conf;
    }
    /**
	 * 对sql字符串使用换行符切割，切割后形成map返回
	 * @param sql:替换后的sql字符串
	 * @return map：根据指定的规则对sql字符串进行处理后，返回四个参数，其中第一个用于判断是精确查找还是前缀查找
	 *         第二个参数为表名，第三个参数为key列表（如果是精确查找，为list，否则为前缀查找，为string），第四个参数为取值字段列表
	 * @throws Exception
	 */
	public static Map<String, Object> getHbaseParaBySqlstr(String sql)
			throws Exception {
		sql = sql.trim();
		String lineSeparator = System.getProperty("line.separator"); 
		String[] sqlParaArr = sql.split(lineSeparator);//修改为系统的换行符
		if(sqlParaArr.length==1){
			sqlParaArr = sql.split("\n");
		}
		if (sqlParaArr.length < 9) {
			String queryType = sqlParaArr[0].trim().toLowerCase();
			String qType1 = "getByKeys".toLowerCase();
			String qType2 = "getByKeyPrefix".toLowerCase();
			String qType3 = "scan".toLowerCase();
            String qType4 = "getByKeyScope".toLowerCase();
            String qType5 = "getGridByKey".toLowerCase();
            String qType6 = "getGridsByContour".toLowerCase();
			if(!queryType.equals(qType1)&&!queryType.equals(qType2)&&!queryType.equals(qType3)&&!queryType.equals(qType4)&&!queryType.equals(qType5)&&!queryType.equals(qType6)){
				throw new Exception("匹配不到查询类型，请检查。传入的查询类型为:"+queryType);
			}
			String tableName = sqlParaArr[1].trim();
			if(tableName.equals("")||tableName.equals(null)){
				throw new NullPointerException("表名为空，请检查....");
			}
			String key = sqlParaArr[2].trim();
			String cloumns = sqlParaArr[3].trim();
			int limit=0;
			int offset=0;
			int rowkey=0;
            String filterPara = null;
			if(queryType.equals(qType1) || queryType.equals(qType2) || queryType.equals(qType3)){
				if(sqlParaArr.length>4){
				    for(int i=4;i<sqlParaArr.length;i++){
                        if(sqlParaArr[i].toLowerCase().contains("rowkey")){
                            rowkey=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("rowkey", "").trim());
                        }else if(sqlParaArr[i].toLowerCase().contains("limit")){
                            limit=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("limit", "").trim());
                        }else if(sqlParaArr[i].toLowerCase().contains("offset")){
                            offset=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("offset", "").trim());
                        }
                    }

				    /**
					if(sqlParaArr[4].toLowerCase().contains("rowkey")){
						rowkey=Integer.parseInt(sqlParaArr[4].replace("rowkey", "").trim());
					}else if(sqlParaArr.length>6){
						if(sqlParaArr[6].toLowerCase().contains("rowkey")){
							rowkey=Integer.parseInt(sqlParaArr[6].replace("rowkey", "").trim());
						}
					}
					
					if(sqlParaArr[4].toLowerCase().contains("limit")){
						limit=Integer.parseInt(sqlParaArr[4].replace("limit", "").trim());
					}else if(sqlParaArr[4].toLowerCase().contains("offset")){
						offset=Integer.parseInt(sqlParaArr[4].replace("offset", "").trim());
					}
					if(sqlParaArr.length>5){
						if(sqlParaArr[5].toLowerCase().contains("limit")){
							limit=Integer.parseInt(sqlParaArr[5].replace("limit", "").trim());
						}else{
							offset=Integer.parseInt(sqlParaArr[5].replace("offset", "").trim());
						}
					}**/
					
				}
					Map<String, Object> queryPara = new HashMap<String, Object>();
					queryPara.put("queryType", queryType);
					queryPara.put("tableName", tableName);
					queryPara.put("key", key);
					queryPara.put("cloumns", cloumns);
					queryPara.put("limit", limit);
					queryPara.put("offset", offset);
					queryPara.put("rowkey", rowkey);
					return queryPara;
				}else if(queryType.equals(qType4)){
					String startKey = sqlParaArr[2].trim();
					String endKey = sqlParaArr[3].trim();
					cloumns = sqlParaArr[4].trim();
					if(sqlParaArr.length>5){
						/**if(sqlParaArr[5].toLowerCase().contains("rowkey")){
							rowkey=Integer.parseInt(sqlParaArr[5].replace("rowkey", "").trim());
						}**/
                        for(int i=5;i<sqlParaArr.length;i++){
                            if(sqlParaArr[i].toLowerCase().contains("rowkey")){
                                rowkey=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("rowkey", "").trim());
                            }else if(sqlParaArr[i].toLowerCase().contains("limit")){
                                limit=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("limit", "").trim());
                            }else if(sqlParaArr[i].toLowerCase().contains("offset")){
                                offset=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("offset", "").trim());
                            }else if(sqlParaArr[i].toLowerCase().contains("filterpara")){
                                filterPara=sqlParaArr[i].toLowerCase().replace("filterpara", "").trim();
                            }
                        }
					}
					Map<String, Object> queryPara = new HashMap<String, Object>();
					queryPara.put("queryType", queryType);
					queryPara.put("tableName", tableName);
					queryPara.put("startKey", startKey);
					queryPara.put("cloumns", cloumns);
					queryPara.put("endKey", endKey);
					queryPara.put("rowkey", rowkey);
					queryPara.put("limit", limit);
					queryPara.put("offset", offset);
					queryPara.put("filterPara", filterPara);
					return queryPara;
				}else if(queryType.equals(qType5)){
                    String gridKeyPrefix = sqlParaArr[2].trim();
                    String gridLevel = sqlParaArr[3].trim();
                    String[] lngAndLatPara = sqlParaArr[4].trim().split(",");
                    String maxLng = lngAndLatPara[0];
                    String maxLat = lngAndLatPara[1];
                    String minLng = lngAndLatPara[2];
                    String minLat = lngAndLatPara[3];
                    cloumns = sqlParaArr[5].trim();
                    int partitionmod = 0;
                    if(sqlParaArr.length>6){
    //					if(sqlParaArr[5].toLowerCase().contains("rowkey")){
    //						rowkey=Integer.parseInt(sqlParaArr[5].replace("rowkey", "").trim());
    //					}
                        for(int i=5;i<sqlParaArr.length;i++){
                            if(sqlParaArr[i].toLowerCase().contains("rowkey")){
                                rowkey=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("rowkey", "").trim());
                            }else if(sqlParaArr[i].toLowerCase().contains("limit")){
                                limit=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("limit", "").trim());
                            }else if(sqlParaArr[i].toLowerCase().contains("offset")){
                                offset=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("offset", "").trim());
                            }else if(sqlParaArr[i].toLowerCase().contains("filterpara")){
                                filterPara=sqlParaArr[i].toLowerCase().replace("filterpara", "").trim();
                            }else if(sqlParaArr[i].toLowerCase().contains("partitionmod")){
                            	partitionmod=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("partitionmod", "").trim());
                            }
                        }
                    }
                    Map<String, Object> queryPara = new HashMap<String, Object>();
                    queryPara.put("queryType", queryType);
                    queryPara.put("tableName", tableName);
                    queryPara.put("gridKeyPrefix", gridKeyPrefix);
                    queryPara.put("cloumns", cloumns);
                    queryPara.put("gridLevel", gridLevel);
                    queryPara.put("maxLng", maxLng);
                    queryPara.put("maxLat", maxLat);
                    queryPara.put("minLng", minLng);
                    queryPara.put("minLat", minLat);
                    queryPara.put("rowkey", rowkey);
                    queryPara.put("limit", limit);
                    queryPara.put("offset", offset);
                    queryPara.put("partitionmod", partitionmod);
                    return queryPara;
            }else if(queryType.equals(qType6)){
                String gridKeyPrefix = sqlParaArr[2].trim();
                String gridLevel = sqlParaArr[3].trim();
                String gis_data = sqlParaArr[4].trim();
                cloumns = sqlParaArr[5].trim();
                int partitionmod = 0;
                if(sqlParaArr.length>6){
                    for(int i=5;i<sqlParaArr.length;i++){
                        if(sqlParaArr[i].toLowerCase().contains("rowkey")){
                            rowkey=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("rowkey", "").trim());
                        }else if(sqlParaArr[i].toLowerCase().contains("limit")){
                            limit=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("limit", "").trim());
                        }else if(sqlParaArr[i].toLowerCase().contains("offset")){
                            offset=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("offset", "").trim());
                        }else if(sqlParaArr[i].toLowerCase().contains("filterpara")){
                            filterPara=sqlParaArr[i].toLowerCase().replace("filterpara", "").trim();
                        }else if(sqlParaArr[i].toLowerCase().contains("partitionmod")){
                            partitionmod=Integer.parseInt(sqlParaArr[i].toLowerCase().replace("partitionmod", "").trim());
                        }
                    }
                }

                Map<String, Object> queryPara = new HashMap<String, Object>();
                queryPara.put("queryType", queryType);
                queryPara.put("tableName", tableName);
                queryPara.put("gridKeyPrefix", gridKeyPrefix);
                queryPara.put("cloumns", cloumns);
                queryPara.put("gridLevel", gridLevel);
                queryPara.put("gis_data",gis_data);
                queryPara.put("rowkey", rowkey);
                queryPara.put("limit", limit);
                queryPara.put("offset", offset);
                queryPara.put("partitionmod", partitionmod);
                return queryPara;

            }else{
                Map<String, Object> queryPara = new HashMap<String, Object>();
                return queryPara;
            }
				
		} else {
			throw new Exception("对hbase查询进行换行符切割时，长度大于8。切割后的长度为："
					+ sqlParaArr.length);
		}
	}
    public Map<String,Object> queryHbase(String sql) throws Exception{
	    Configuration conf = getJavaHBaseKerberosConfig();
	    return queryHbaseData(conf,sql);

    }
    
    public Map<String,Object> queryHbaseNoKerberos(String sql) throws Exception{
    	Configuration conf = getHbaseConfiguration();
        return queryHbaseData(conf,sql);
    }

    public  Map<String,Object> queryHbaseData(Configuration conf, String sql) throws Exception{
        Map<String, Object> queryMap = getHbaseParaBySqlstr(sql);
        String queryType = (String) queryMap.get("queryType");
        String tableName = (String) queryMap.get("tableName");
        String key = (String) queryMap.get("key");
        String cloumns = (String) queryMap.get("cloumns");
        int limit = (Integer) queryMap.get("limit");
        int offset = (Integer) queryMap.get("offset");
        int rowkey = (Integer) queryMap.get("rowkey");
//		JavaHBaseTool tool = new JavaHBaseTool();
//		queryType = "getByKeys".toLowerCase();
        HTableManager htableManager = HTableManager.getInstance(conf);
        if ("getByKeys".toLowerCase().equals(queryType)) {
            //将校验都放在getHbaseParaBySqlstr中，转成小写再判断
            //精确查找
            List<Get> keyList = new ArrayList<Get>();
            String[] keyArr = key.split(",");
            
            List<String[]> cloumnsList = new ArrayList<String[]>();
            if(cloumns == null || "null".equals(cloumns)){

            }else{
                String[] cloumnArr = cloumns.split(",");
                for(String c:cloumnArr){//i:a1
                    if(c.contains(":")){
                    	cloumnsList.add(c.split(":"));                
                    }else{
                        throw new Exception("查询的cloumn不包含有冒号，请输入正确的列名");
                    }
                }
            }
            
            for(String k:keyArr){
                Get g = new Get(k.getBytes("UTF-8"));
                if(cloumns==null||"null".equals(cloumns)){

                }else{
                    for(String[] c : cloumnsList){
                    	g.addColumn(c[0].getBytes(), c[1].getBytes());
                    }
                }
                keyList.add(g);
            }
            Map<String,Object> resultMap = new HashMap<String, Object>();
            List<String> cloumnsLabel = new ArrayList<String>();
            List<Object> resultList = new ArrayList<Object>();
            if(cloumns==null||"null".equals(cloumns)){
                //取全部列数据
//                HTable htable = new HTable(conf,tableName);
                HTableInterface htable = htableManager.getHTable(tableName);
                Result[] result = htable.get(keyList);

                List<Result> rowResult = new ArrayList<Result>();
                for(Result r:result){
                    if(!r.isEmpty()){
                        rowResult.add(r);
                    }
                }
                if(limit==0&&offset==0){
                    for(Result r:rowResult){
                        if(!r.isEmpty()){
                            int resultSize = r.listCells().size();
                            List<Object> rList = new ArrayList<Object>();
                            //放入key
                            if(rowkey==0){
                                rList.add(Bytes.toString(r.getRow()));
                            }
                            for (Cell cell:r.listCells()) {
                                if(cloumnsLabel.size()<resultSize){
                                    String cmn = Bytes.toString(cell.getFamily())+":"+ Bytes.toString(cell.getQualifier());
                                    cloumnsLabel.add(cmn);
                                }
                                rList.add(Bytes.toString(cell.getValue()));
                            }
                            resultList.add(rList);
                        }

                    }
                }else{
                    int num=0;
                    for(int i=0;i<rowResult.size();i++){
                        if(i>=offset){//开始取数据的位置
                            if(num==limit){//取分页条数后跳出循环
                                break;
                            }
                            if(!rowResult.get(i).isEmpty()){
                                int resultSize = rowResult.get(i).listCells().size();
                                List<Object> rList = new ArrayList<Object>();
                                //放入key
                                if(rowkey==0){
                                    rList.add(Bytes.toString(rowResult.get(i).getRow()));
                                }
//								rList.add(Bytes.toString(rowResult.get(i).getRow()));
                                for (Cell cell:rowResult.get(i).listCells()) {
                                    if(cloumnsLabel.size()<resultSize){
                                        String cmn = Bytes.toString(cell.getFamily())+":"+ Bytes.toString(cell.getQualifier());
                                        cloumnsLabel.add(cmn);
                                    }
                                    rList.add(Bytes.toString(cell.getValue()));
                                }
                                resultList.add(rList);
                                num++;
                            }

                        }
                    }
                }
                if(rowkey==0){
                    cloumnsLabel.add(0, "rowkey");
                }
                htable.close();
                resultMap.put("result", resultList);
                resultMap.put("columns", cloumnsLabel);
                resultMap.put("types", new ArrayList<String>());

            }else{
                //取指定列的数据
                String[] cloumnArr = cloumns.split(",");
                List<String> cloumnList = new ArrayList<String>();
                for(String c:cloumnArr){
                    if(c.contains(":")){
                        cloumnList.add(c);
                    }else{
                        throw new Exception("查询的cloumn不包含有冒号");
                    }
                }
                HTableInterface htable = htableManager.getHTable(tableName);
//                HTable htable = new HTable(conf,tableName);
                Result[] result = htable.get(keyList);

                List<Result> rowResult = new ArrayList<Result>();
                for(Result r:result){
                    if(!r.isEmpty()){
                        rowResult.add(r);
                    }
                }
                if (limit == 0 && offset == 0) {
                    for (Result r : rowResult) {
                        List<Object> rList = new ArrayList<Object>();
                        // 放入key
                        if (rowkey == 0) {
                            rList.add(Bytes.toString(r.getRow()));
                        }
                        for (String cloumn : cloumnList) {
                            String[] cArr = cloumn.split(":", 2);
                            if (r.containsColumn(cArr[0].getBytes(),cArr[1].getBytes())) {
                                String value = Bytes.toString(r.getValue(cArr[0].getBytes(),cArr[1].getBytes()));
                                rList.add(value);
                            } else {
                                rList.add(null);
                            }
                        }
                        resultList.add(rList);
                    }
                }else{
                    int num=0;
                    for(int i=0;i<rowResult.size();i++){
                        if(i>=offset){
                            if(num==limit){
                                break;
                            }
                            List<Object> rList = new ArrayList<Object>();
                            // 放入key
                            if (rowkey == 0) {
                                rList.add(Bytes.toString(rowResult.get(i).getRow()));
                            }
                            for (String cloumn : cloumnList) {
                                String[] cArr = cloumn.split(":", 2);
                                if (rowResult.get(i).containsColumn(cArr[0].getBytes(),cArr[1].getBytes())) {
                                    String value = Bytes.toString(rowResult.get(i).getValue(cArr[0].getBytes(),cArr[1].getBytes()));
                                    rList.add(value);
                                } else {
                                    rList.add(null);
                                }
                            }
                            resultList.add(rList);
                            num++;
                        }

                    }
                }
                if(rowkey==0){
                    cloumnList.add(0, "rowkey");
                }
                htable.close();
                resultMap.put("result",resultList);
                resultMap.put("columns", cloumnList);
                resultMap.put("types", new ArrayList<String>());
            }

            return resultMap;
        } else if ("getByKeyPrefix".toLowerCase().equals(queryType)) {//前缀查询
//            Map<String,Object> resultMap = new HashMap<String, Object>();
//            List<String> cloumnsLabel = new ArrayList<String>();
//            List<Object> resultList = new ArrayList<Object>();
//            if(cloumns==null||"null".equals(cloumns)){
//                //取全部列数据
////                HTable htable = new HTable(conf,tableName);
//                HTableInterface htable = htableManager.getHTable(tableName);
//                Scan scan = new Scan();
////				Filter filter = new RowFilter(CompareOp.EQUAL, new SubstringComparator(key));
//                Filter filter = new PrefixFilter(key.getBytes("UTF-8"));
//                scan.setFilter(filter);
//                ResultScanner resultScanner = htable.getScanner(scan);
//
//                if(limit==0&&offset==0){
//                    for (Result result : resultScanner) {
//                        int resultSize = result.listCells().size();
//                        if(!result.isEmpty()){
//                            List<Object> rList = new ArrayList<Object>();
//                            //放入key
//                            if(rowkey==0){
//                                rList.add(Bytes.toString(result.getRow()));
//                            }
////				    		rList.add(Bytes.toString(result.getRow()));
//                            for(Cell cell: result.listCells()){
//                                if(cloumnsLabel.size()<resultSize){
//                                    String cmn =Bytes.toString(cell.getFamily())+":"+Bytes.toString(cell.getQualifier());
//                                    cloumnsLabel.add(cmn);
//                                }
//                                rList.add(Bytes.toString(cell.getValue()));
//                            }
//                            resultList.add(rList);
//                        }
//
//                    }
//                }else{
//                    List<Result> rowResult = new ArrayList<Result>();
//                    for(Result result : resultScanner){
//                        if(!result.isEmpty()){
//                            rowResult.add(result);
//                        }
//                    }
//                    int num=0;
//                    for(int i=0;i<rowResult.size();i++){
//                        if(i>=offset){
//                            if(num==limit){
//                                break;
//                            }
//                            int resultSize = rowResult.get(i).listCells().size();
//                            List<Object> rList = new ArrayList<Object>();
//                            //放入key
//                            if(rowkey==0){
//                                rList.add(Bytes.toString(rowResult.get(i).getRow()));
//                            }
//
//                            for(Cell cell: rowResult.get(i).listCells()){
//                                if(cloumnsLabel.size()<resultSize){
//                                    String cmn =Bytes.toString(cell.getFamily())+":"+Bytes.toString(cell.getQualifier());
//                                    cloumnsLabel.add(cmn);
//                                }
//                                rList.add(Bytes.toString(cell.getValue()));
//                            }
//                            resultList.add(rList);
//                            num++;
//                        }
//                    }
//
//                }
//
//
//                if(rowkey==0){
//                    cloumnsLabel.add(0, "rowkey");
//                }
//                htable.close();
//                resultMap.put("result", resultList);
//                resultMap.put("columns", cloumnsLabel);
//                resultMap.put("types", new ArrayList<String>());
//
//            }else{
////                HTable htable = new HTable(conf,tableName);
//                HTableInterface htable = htableManager.getHTable(tableName);
//                Scan scan = new Scan();
//
//                //取指定列数据
//                String[] cloumnArr = cloumns.split(",");
//                List<String> cloumnList = new ArrayList<String>();
//                for(String c:cloumnArr){
//                    if(c.contains(":")){
//                        cloumnList.add(c);
//                        String[] col = c.split(":");
//                        scan.addColumn(col[0].getBytes(),col[1].getBytes());
//                    }else{
//                        throw new Exception("查询的cloumn不包含有冒号，请输入正确的列名");
//                    }
//                }
//
////				Filter filter = new RowFilter(CompareOp.EQUAL, new SubstringComparator(key));
//                Filter filter = new PrefixFilter(key.getBytes("UTF-8"));
//                scan.setFilter(filter);
//                ResultScanner resultScanner = htable.getScanner(scan);
//
//                if(limit==0&&offset==0){
//                    for(Result r:resultScanner){
//                        if(!r.isEmpty()){
//                            List<Object> rList = new ArrayList<Object>();
//                            if(rowkey==0){
//                                rList.add(Bytes.toString(r.getRow()));
//                            }
//                            for(String cloumn:cloumnList){
//                                String[] cArr = cloumn.split(":",2);
//                                if(r.containsColumn(cArr[0].getBytes(), cArr[1].getBytes())){
//                                    String value = Bytes.toString(r.getValue(cArr[0].getBytes(), cArr[1].getBytes()));
//                                    rList.add(value);
//                                }else{
//                                    rList.add(null);
//                                }
//                            }
//                            resultList.add(rList);
//                        }
//                    }
//                }else{
//                    List<Result> rowResult = new ArrayList<Result>();
//                    for(Result result : resultScanner){
//                        if(!result.isEmpty()){
//                            rowResult.add(result);
//                        }
//                    }
//                    int num=0;
//                    for(int i=0;i<rowResult.size();i++){
//                        if(i>=offset){
//                            if(num==limit){
//                                break;
//                            }
//                            List<Object> rList = new ArrayList<Object>();
//                            if(rowkey==0){
//                                rList.add(Bytes.toString(rowResult.get(i).getRow()));
//                            }
//                            for(String cloumn:cloumnList){
//                                String[] cArr = cloumn.split(":",2);
//                                if(rowResult.get(i).containsColumn(cArr[0].getBytes(), cArr[1].getBytes())){
//                                    String value = Bytes.toString(rowResult.get(i).getValue(cArr[0].getBytes(), cArr[1].getBytes()));
//                                    rList.add(value);
//                                }else{
//                                    rList.add(null);
//                                }
//                            }
//                            resultList.add(rList);
//                            num++;
//                        }
//                    }
//                }
//                if(rowkey==0){
//                    cloumnList.add(0, "rowkey");
//                }
//                htable.close();
//                resultMap.put("result",resultList);
//                resultMap.put("columns", cloumnList);
//                resultMap.put("types", new ArrayList<String>());
//            }
//
//            return resultMap;
            throw new Exception("getByKeyPrefix is no longer supported due to low performance in Hbase java API. Please use getByKeyScope instead.\n");

        }else if("scan".toLowerCase().equals(queryType)){
//			String queryType = (String) queryMap.get("queryType");//type
//			String tableName = (String) queryMap.get("tableName");//tablename
//			String key = (String) queryMap.get("key");//forward/backward
//			String cloumns = (String) queryMap.get("cloumns");//#{KEYSUBSTRING}
//			int limit = (Integer) queryMap.get("limit");//limit N
            Map<String,Object> resultMap = new HashMap<String, Object>();
            List<String> cloumnsLabel = new ArrayList<String>();
            List<Object> resultList = new ArrayList<Object>();
            HTableInterface htable = htableManager.getHTable(tableName);
            Scan scan = new Scan();
            if("backward".equals(key)){
//				scan.setReversed(true);
            }
            scan.setMaxResultSize(limit);
            Filter filter = new RowFilter(CompareOp.EQUAL, new SubstringComparator(key));
//		    Filter filter = new PrefixFilter(key.getBytes());
            scan.setFilter(filter);
            ResultScanner resultScanner = htable.getScanner(scan);
            int num = 0;
            for(Result rs : resultScanner){
                if(!rs.isEmpty()){
                    if(num<=limit){
                        resultList.add(Bytes.toString(rs.getRow()));
                        num++;
                    }else{
                        break;
                    }
                }
            }
            htable.close();
            cloumnsLabel.add(0, "rowKey");
            resultMap.put("result",resultList);
            resultMap.put("columns", cloumnsLabel);
            resultMap.put("types", new ArrayList<String>());
            return resultMap;
        }else if("getByKeyScope".toLowerCase().equals(queryType)){
            String startKey = (String) queryMap.get("startKey");
            String endKey = (String) queryMap.get("endKey");
            String filterPara = (String) queryMap.get("filterPara");

            Map<String,Object> resultMap = new HashMap<String, Object>();
            List<String> cloumnsLabel = new ArrayList<String>();
            List<Object> resultList = new ArrayList<Object>();


            HTableInterface htable = htableManager.getHTable(tableName);

            Scan scan = new Scan();

            if(cloumns==null||"null".equals(cloumns)){

            }else{
                String[] cloumnArr = cloumns.split(",");
                for(String c:cloumnArr){
                    if(c.contains(":")){
                        String[] col = c.split(":");
                        scan.addColumn(col[0].getBytes(),col[1].getBytes());
                    }else{
                        throw new Exception("查询的cloumn不包含有冒号，请输入正确的列名");
                    }
                }
            }

            scan.setStartRow(startKey.getBytes("UTF-8"));
            scan.setStopRow(endKey.getBytes("UTF-8"));

            if(filterPara!=null){
                String[] para = filterPara.split(",");//规则，第一个为字段，第二个为最小纬度，第三个为最大纬度
                String[] col = para[0].split(":");
                FilterList filterList = new FilterList();
                //SingleColumnValueFilter(byte[] family, byte[] qualifier, CompareOp compareOp, byte[] value) {
                SingleColumnValueFilter singleColumnValue1 = new SingleColumnValueFilter(col[0].getBytes("UTF-8"),col[1].getBytes("UTF-8"), CompareOp.GREATER_OR_EQUAL,(para[1]).getBytes("UTF-8"));
                SingleColumnValueFilter singleColumnValue2 = new SingleColumnValueFilter(col[0].getBytes("UTF-8"),col[1].getBytes("UTF-8"), CompareOp.LESS_OR_EQUAL,(para[2]).getBytes("UTF-8"));
                filterList.addFilter(singleColumnValue1);
                filterList.addFilter(singleColumnValue2);
                scan.setFilter(filterList);
            }

            if(cloumns == null || "null".equals(cloumns)){

            }else{
                String[] cloumnArr = cloumns.split(",");
                for(String c:cloumnArr){
                    if(c.contains(":")){
                        cloumnsLabel.add(c);
                    }else{
                        throw new Exception("查询的cloumn不包含有冒号，请输入正确的列名");
                    }
                }
            }

            ResultScanner resultScanner = htable.getScanner(scan);
            for(Result result : resultScanner){
                if(!result.isEmpty()){
                    if(cloumns == null || "null".equals(cloumns)){
                        int resultSize = result.listCells().size();
                        List<Object> rList = new ArrayList<Object>();
                        //放入key
                        if(rowkey==0){
                            rList.add(Bytes.toString(result.getRow()));
                        }

                        for(Cell cell: result.listCells()){
                            if(cloumnsLabel.size()<resultSize){
                                String cmn = Bytes.toString(cell.getFamily())+":"+ Bytes.toString(cell.getQualifier());
                                cloumnsLabel.add(cmn);
                            }
                            rList.add(Bytes.toString(cell.getValue()));
                        }
                        resultList.add(rList);
                    }else{
                        List<Object> rList = new ArrayList<Object>();
                        if(rowkey==0){
                            rList.add(Bytes.toString(result.getRow()));
                        }
                        for(String cloumn:cloumnsLabel){
                            String[] cArr = cloumn.split(":",2);
                            if(result.containsColumn(cArr[0].getBytes(), cArr[1].getBytes())){
                                String value = Bytes.toString(result.getValue(cArr[0].getBytes(), cArr[1].getBytes()));
                                rList.add(value);
                            }else{
                                rList.add(null);
                            }
                        }
                        resultList.add(rList);
                    }
                }
            }
            htable.close();

            if(rowkey==0){
                cloumnsLabel.add(0, "rowkey");
            }

            resultMap.put("result",resultList);
            resultMap.put("columns", cloumnsLabel);
            resultMap.put("types", new ArrayList<String>());
            return resultMap;
        }else if("getGridByKey".toLowerCase().equals(queryType)){

            Map<String,Object> resultMap = new HashMap<String, Object>();
            List<String> cloumnsLabel = new ArrayList<String>();
            List<Object> resultList = new ArrayList<Object>();


            String gridKeyPrefix = (String) queryMap.get("gridKeyPrefix");
            int partitionmod = (Integer) queryMap.get("partitionmod");
            int gridLevel = Integer.valueOf((String)queryMap.get("gridLevel"));
            int len = 100000;
            if(gridLevel==10){
                len = 1000000;
            }

            double maxLng = Double.valueOf((String)queryMap.get("maxLng"));
            double maxLat = Double.valueOf((String)queryMap.get("maxLat"));
            double minLng = Double.valueOf((String)queryMap.get("minLng"));
            double minLat = Double.valueOf((String)queryMap.get("minLat"));

            long minGridLngNum = GridNumHelper.gridLngNum(minLng,gridLevel);
            long maxGridLngNum = GridNumHelper.gridLngNum(maxLng,gridLevel);
            long minGridLatNum = GridNumHelper.gridLatNum(minLat,gridLevel);
            long maxGridLatNum = GridNumHelper.gridLatNum(maxLat,gridLevel);


            List<String[]> cloumnsList = new ArrayList<String[]>();
            if(cloumns == null || "null".equals(cloumns)){

            }else{
                String[] cloumnArr = cloumns.split(",");
                for(String c:cloumnArr){//i:a1
                    if(c.contains(":")){
                    	cloumnsList.add(c.split(":"));
                    }else{
                        throw new Exception("查询的cloumn不包含有冒号，请输入正确的列名");
                    }
                }
            }

            Date handleGridNum = new Date();
            List<Get> gridNumList = new ArrayList<Get>();
            boolean showRowkey = true;
            out:for(long i=minGridLngNum;i<=maxGridLngNum;i++){
                for(long j=minGridLatNum;j<=maxGridLatNum;j++){
                    String gridNum = String.valueOf(i*len+j);
                    String RowKey = null;
                    if(partitionmod!=0){
                    	if(partitionmod==1){
                    		String mod = gridNum.substring(gridNum.length()-2);
                    		RowKey = mod+gridKeyPrefix+gridNum;
//                    		System.out.println("RowKey:"+RowKey);
                    	}else{
                    		throw new Exception("查询模板分区规范没有这个分支，请检查.........");
                    	}
                    }else{
                    	RowKey = gridKeyPrefix+gridNum;
                    }
                    if(showRowkey){
                    	System.out.println("RowKey:"+RowKey);
                    	showRowkey = false;
                    }
                    Get g = new Get(RowKey.getBytes());
                    if(cloumns == null || "null".equals(cloumns)){

                    }else{
                        for(String[] c:cloumnsList){
                        	g.addColumn(c[0].getBytes(), c[1].getBytes());
                        }
                    }
                    gridNumList.add(g);
                    if(gridNumList.size() > 100000){
//                    throw new Exception("查询的栅格数据量过大(超出10万)，请联系系统管理员...");
                        System.out.println("查询的栅格数据量过大(超出10万),只查询前10万个记录数据");
                        break out;
                    }
                }
            }
            System.out.println("查询的rowkey长度："+gridNumList.size());

            Date handleGridNumEnd = new Date();
            System.out.println("生成Get对象集合时间:"+(handleGridNumEnd.getTime()-handleGridNum.getTime()));
            if(cloumns == null || "null".equals(cloumns)){

            }else{
                String[] cloumnArr = cloumns.split(",");
                for(String c:cloumnArr){
                    if(c.contains(":")){
                        cloumnsLabel.add(c);
                    }else{
                        throw new Exception("查询的cloumn不包含有冒号，请输入正确的列名");
                    }
                }
            }
            HTableInterface htable = htableManager.getHTable(tableName);
//            HTable htable = new HTable(conf,tableName);
            Result[] resultScanner = htable.get(gridNumList);
            for(Result result : resultScanner){
                if(!result.isEmpty()){
                    if(cloumns == null || "null".equals(cloumns)){
                        int resultSize = result.listCells().size();
                        List<Object> rList = new ArrayList<Object>();
                        //放入key
                        if(rowkey==0){
                            rList.add(Bytes.toString(result.getRow()));
                        }

                        for(Cell cell: result.listCells()){
                            if(cloumnsLabel.size()<resultSize){
                                String cmn = Bytes.toString(cell.getFamily())+":"+ Bytes.toString(cell.getQualifier());
                                cloumnsLabel.add(cmn);
                            }
                            rList.add(Bytes.toString(cell.getValue()));
                        }
                        resultList.add(rList);
                    }else{
                        List<Object> rList = new ArrayList<Object>();
                        if(rowkey==0){
                            rList.add(Bytes.toString(result.getRow()));
                        }
                        for(String cloumn:cloumnsLabel){
                            String[] cArr = cloumn.split(":",2);
                            if(result.containsColumn(cArr[0].getBytes(), cArr[1].getBytes())){
                                String value = Bytes.toString(result.getValue(cArr[0].getBytes(), cArr[1].getBytes()));
                                rList.add(value);
                            }else{
                                rList.add(null);
                            }
                        }
                        resultList.add(rList);
                    }
                }
            }
            htable.close();
            Date getGridData = new Date();
            System.out.println("获取栅格数据并处理时间:"+(getGridData.getTime()-handleGridNumEnd.getTime()));

            if(rowkey==0){
                cloumnsLabel.add(0, "rowkey");
            }
            Date handleGridData = new Date();
            System.out.println("数据格式处理时间:"+(handleGridData.getTime()-getGridData.getTime()));

            resultMap.put("result",resultList);
            resultMap.put("columns", cloumnsLabel);
            resultMap.put("types", new ArrayList<String>());
            return resultMap;

        }else if("getGridsByContour".toLowerCase().equals(queryType)){
            Map<String,Object> resultMap = new HashMap<String, Object>();
            List<String> cloumnsLabel = new ArrayList<String>();
            List<Object> resultList = new ArrayList<Object>();

            String gridKeyPrefix = (String) queryMap.get("gridKeyPrefix");
            int partitionmod = (Integer) queryMap.get("partitionmod");
            int gridLevel = Integer.valueOf((String)queryMap.get("gridLevel"));
            int len = 100000;
            if(gridLevel==10){
                len = 1000000;
            }
            String gis_data = (String) queryMap.get("gis_data");
            Date handleGridNum = new Date();
            List<Long> gridNumArray = MapUtils.getGridNum(gis_data,gridLevel);//根据轮廓集合得到栅格编号
            Date handleGridNumEnd = new Date();
            System.out.println("获取多边形内栅格时间："+(handleGridNumEnd.getTime()-handleGridNum.getTime()));
            List<String[]> cloumnsList = new ArrayList<String[]>();
            if(cloumns == null || "null".equals(cloumns)){

            }else{
                String[] cloumnArr = cloumns.split(",");
                for(String c:cloumnArr){//i:a1,i:a2
                    if(c.contains(":")){
                    	cloumnsList.add(c.split(":"));
                        cloumnsLabel.add(c);
                    }else{
                        throw new Exception("查询的cloumn不包含有冒号，请输入正确的列名");
                    }
                }
            }
            boolean showRowkey = true;
            List<Get> gridNumList = new ArrayList<Get>();
            //遍历栅格编号集合，拼接出rowkey，并生成api查询时的Get对象，生成Get对象集合
            for(Long gridNum : gridNumArray){
                String num = String.valueOf(gridNum);
                String RowKey = null;
                if(partitionmod!=0){
                    if(partitionmod==1){
                        String mod = num.substring(num.length()-2);
                        RowKey = mod+gridKeyPrefix+gridNum;
                    }else{
                        throw new Exception("查询模板分区规范没有这个分支，请检查.........");
                    }
                }else{
                    RowKey = gridKeyPrefix+gridNum;
                }
                if(showRowkey){
                    System.out.println("RowKey:"+RowKey);
                    showRowkey = false;
                }
                Get g = new Get(RowKey.getBytes());
                if(cloumns == null || "null".equals(cloumns)){

                }else{
                	if(cloumnsList.size()>0){
                		for(String[] c : cloumnsList){//i:a1,i:a2
                			g.addColumn(c[0].getBytes(),c[1].getBytes());
                		}

                	}
                }
                gridNumList.add(g);

                if(gridNumList.size() > 100000){
//                    throw new Exception("查询的栅格数据量过大(超出10万)，请联系系统管理员...");
                    System.out.println("查询的栅格数据量过大(超出10万),只查询前10万个记录数据");
                    break;
                }
            }
            System.out.println("查询的rowkey长度："+gridNumList.size());
            Date getRowkey = new Date();
            System.out.println("构造查询rowkey时间："+(getRowkey.getTime()-handleGridNumEnd.getTime()));
           
            //使用生成的Get对象集合，精确查询数据
            HTableInterface htable = htableManager.getHTable(tableName);
//            HTable htable = new HTable(conf,tableName);
            Result[] resultScanner = htable.get(gridNumList);
            for(Result result : resultScanner){
                if(!result.isEmpty()){
                    if(cloumns == null || "null".equals(cloumns)){
                        int resultSize = result.listCells().size();
                        List<Object> rList = new ArrayList<Object>();
                        //放入key
                        if(rowkey==0){
                            rList.add(Bytes.toString(result.getRow()));
                        }

                        for(Cell cell: result.listCells()){
                            if(cloumnsLabel.size()<resultSize){
                                String cmn = Bytes.toString(cell.getFamily())+":"+ Bytes.toString(cell.getQualifier());
                                cloumnsLabel.add(cmn);
                            }
                            rList.add(Bytes.toString(cell.getValue()));
                        }
                        resultList.add(rList);
                    }else{
                        List<Object> rList = new ArrayList<Object>();
                        if(rowkey==0){
                            rList.add(Bytes.toString(result.getRow()));
                        }
                        for(String cloumn:cloumnsLabel){
                            String[] cArr = cloumn.split(":",2);
                            if(result.containsColumn(cArr[0].getBytes(), cArr[1].getBytes())){
                                String value = Bytes.toString(result.getValue(cArr[0].getBytes(), cArr[1].getBytes()));
                                rList.add(value);
                            }else{
                                rList.add(null);
                            }
                        }
                        resultList.add(rList);
                    }
                }
            }
            htable.close();
            Date getData = new Date();
            System.out.println("获取栅格数据并处理时间："+(getData.getTime()-getRowkey.getTime()));
            //构造返回数据的格式

            if(rowkey==0){
                cloumnsLabel.add(0, "rowkey");
            }
//            Date handleData = new Date();
//            System.out.println("栅格数据处理时间："+(handleData.getTime()-getData.getTime()));
            resultMap.put("result",resultList);
            resultMap.put("columns", cloumnsLabel);
            resultMap.put("types", new ArrayList<String>());
            return resultMap;
        }

        return new HashMap<String, Object>();

    }
    
    
    public Map<String,Object> queryHbaseByKey(String tableName,List<String> keyList,List<String> cloumns) throws Exception{
//    	JavaHBaseTool tool = new JavaHBaseTool();
    	Configuration conf = getJavaHBaseKerberosConfig();
        HTableManager htableManager = HTableManager.getInstance(conf);
        HTableInterface htable = htableManager.getHTable(tableName);
//		HTable htable = new HTable(conf, tableName);
	    List<Get> getList = new ArrayList<Get>();
	    for(String key:keyList){
	    	Get g = new Get(key.getBytes());
	    	if(cloumns.size()>0){
	    		for(String c : cloumns){
	    			String[] cm = c.split(":",2);
	    			if(cm.length!=2){
	    				g.addFamily(cm[0].getBytes());
	    			}else{
	    				g.addColumn(cm[0].getBytes(), cm[1].getBytes());
	    			}
	    		}
	    	}
	    	getList.add(g);
	    }
	    Result[] result = htable.get(getList);
	    
	    Map<String,Object> resultMap = new HashMap<String,Object>();
	    for(Result r:result){
	    	if(!r.isEmpty()){
	    		Map<String,Object> cellMap = new HashMap<String, Object>();
	    		String rowKey = Bytes.toString(r.getRow());
	    		for (Cell kv : r.listCells()) {
	    			String cmn = Bytes.toString(kv.getFamily())+":"+ Bytes.toString(kv.getQualifier());
	    			String value = Bytes.toString(kv.getValue());
	    			cellMap.put(cmn, value);
			    }
	    		resultMap.put(rowKey, cellMap);
	    	}
	    }
	    htable.close();
		return resultMap;
	}
    public Map<String,Object> queryHbaseByPrekey(String tableName,String prekey,List<String> cloumns) throws Exception{
//    	JavaHBaseTool tool = new JavaHBaseTool();
    	Configuration conf = getJavaHBaseKerberosConfig();
        HTableManager htableManager = HTableManager.getInstance(conf);
        HTableInterface htable = htableManager.getHTable(tableName);
//		HTable htable = new HTable(conf, tableName);
		Scan scan = new Scan();
		Filter filter = new PrefixFilter(prekey.getBytes("UTF-8"));
		scan.setFilter(filter);
	    if(cloumns.size()>0){
	    	for(String c : cloumns){
	    		String[] cm = c.split(":",2);
	    		if(cm.length!=2){
	    			scan.addFamily(cm[0].getBytes());
	    		}else{
	    			scan.addColumn(cm[0].getBytes(), cm[1].getBytes());
	    		}
	    	}
	    }
	    ResultScanner resultScanner = htable.getScanner(scan);
	    
	    Map<String,Object> resultMap = new HashMap<String,Object>();
	    for(Result r:resultScanner){
	    	if(!r.isEmpty()){
	    		Map<String,Object> cellMap = new HashMap<String, Object>();
	    		String rowKey = Bytes.toString(r.getRow());
	    		for (Cell kv : r.listCells()) {
	    			String cmn = Bytes.toString(kv.getFamily())+":"+ Bytes.toString(kv.getQualifier());
	    			String value = Bytes.toString(kv.getValue());
	    			cellMap.put(cmn, value);
			    }
	    		resultMap.put(rowKey, cellMap);
	    	}
	    }
	    htable.close();
		return resultMap;
	}
    public void kerberosTest() throws Exception{
//    	JavaHBaseTool hbaseTool = new JavaHBaseTool();
    	Configuration conf = getJavaHBaseKerberosConfig();
    	System.out.println("准备查询。。。。。");
        HTableManager htableManager = HTableManager.getInstance(conf);
        HTableInterface htable = htableManager.getHTable("NOCE:DSI_AGPS_GRID_AREA_D");
//    	HTable htable = new HTable(conf, "NOCE:DSI_AGPS_GRID_AREA_D");
	    System.out.println("创建HTable成功....");
	    
	    Scan scan = new Scan();
//	    scan.setBatch(10);
	    Filter filter = new RowFilter(CompareOp.EQUAL, new SubstringComparator("20170322_5_9900638029"));
	    scan.setFilter(filter);
	    scanTable(htable,scan);
	    System.out.println("执行获取记录结束....");
	    htable.close();
    }
    
    public Configuration getHbaseConfiguration(){
    	Configuration conf = HBaseConfiguration.create();
        conf.setInt("hbase.rpc.timeout",20000);
        conf.setInt("hbase.client.operation.timeout",30000);
        conf.setInt("hbase.client.scanner.timeout.period",200000);
        conf.setInt("zookeeper.session.timeout",60000);
        conf.setInt("hbase.regionserver.lease.period",60000);//客户端租用HRegionserver 期限，即超时阀值。单位是毫秒。默认情况下，客户端必须在这个时间内发一条信息，否则视为死掉。


//	    conf.set("hbase.zookeeper.quorum", "host-9-65,host-9-66,host-9-130");
//        conf.set("hbase.rootdir", "hdfs://noce1/hbase");
//	    conf.set("hbase.zookeeper.property.clientPort", "2181");
//	    conf.set("zookeeper.znode.parent","/hbase");
    	
//    	conf.addResource("core-site-produce.xml");
//    	conf.addResource("hbase-site-produce.xml");
//    	conf.addResource("hdfs-site-produce.xml");
	    return conf;
    }
    
    public static void main(String[] args) throws Exception {
//    	JavaHBaseTool hbaseTool = new JavaHBaseTool();
//    	System.out.println("准备查询。。。。。");
//    	
//	    HTable htable = new HTable(hbaseTool.conf, "NOCE:DSI_WIRELESS_MULTI");
//	    System.out.println("创建HTable成功....");
//	    
//	    Scan scan = new Scan();
//	    Filter filter = new RowFilter(CompareOp.EQUAL, new SubstringComparator("_M_1_广州"));
////	    Filter filter = new PrefixFilter("20170424_W_2_广州_".getBytes("UTF-8"));
//	    scan.setFilter(filter);
////	    scan.setMaxResultSize(1);
////	    scan.setTimeStamp(Long.MAX_VALUE);
//	    scanTable(htable,scan);
////	    scanTableTwo(htable,scan);
//	    System.out.println("执行获取记录结束....");
//	    htable.close();
    	
//    	String sql = "getByKeyScope\nNOCE:DSI_AGPS_GRID_RSRP_M\n201708_200_0_10048_\n201708_200_0_10048_~\ni:a1,i:a2,i:a4,i:a10,i:a11,i:a23,i:a24,i:a25,i:a26,i:a27,i:a28";
//    	String sql = "getByKeyScope\nNOCE:DSI_MRO_AGPS_GRID_M\n201708_200_4050_999182_\n201708_200_4050_999182_~\ni:a1,i:a2,i:a4,i:a10,i:a11,i:a23,i:a24,i:a25,i:a26,i:a27,i:a28";
    	Date startDate = new Date();//// var startRow1 = date+"_"+city_id+"_0_"+marketId+"_"+startGirdNum;
//        String sql = "getByKeyScope\nNOCE:DSI_AGPS_GRID_RSRP_M\n" +
//                "201711_200_0_999045_41789036541\n201711_200_0_999045_42658036949\n" +
//                "i:a1,i:a2,i:a3,i:a4,i:a5,i:a6,i:a7,i:a8,i:a9,i:a10,i:a11,i:a12,i:a13,i:a14," +
//                "i:a15,i:a16,i:a17,i:a18,i:a19,i:a20,i:a21,i:a22,i:a23,i:a24,i:a25,i:a26,i:a27,i:a28\n"+
//                "filterPara i:a12,23.314233,23.350801";
//        String sql = "getGridByKey\nNOCE:DSI_AGPS_GRID_RSRP_M\n201711_200_0_50_999188_\n" +
//                "50\n113.359,23.1353,113.322,23.1131\n" +
//                "i:a1,i:a2,i:a4,i:a6,i:a9,i:a10,i:a13,i:a14,i:a48,i:a49,i:a57,i:a58,i:a59,i:a69\nrowkey 1";
        String sql = "getGridsByContour\nNOCE:DSI_MRO_ALL_GRID_TOT_W\n_0_20_20180323_\n20\n" +
                "113.27866481001894,23.127818881775035@113.27854615605008,23.12720886904501@113.27892792604403,23.12468885877834@113.27821474096064,23.124383428522957@113.27728295128318,23.124094720426417@113.27701161470381,23.124739704267135@113.27639373476909,23.124524531493037@113.27630204463743,23.124880680750163@113.27741037728717,23.125571404029532@113.27644943521112,23.126971752880237@113.2762355845516,23.126841183225654@113.27577934546187,23.12669866369659@113.27574603914083,23.126784017945365@113.27626523921693,23.126969998334705@113.27629373104429,23.127039297728558@113.27648737117046,23.127195850212534@113.27638272288415,23.127371232711983@113.27580771617869,23.127047169245454@113.27576964848888,23.127156279923835@113.27576494717644,23.12715462543447@113.2760120119807,23.12738199675587@113.27840772827538,23.12859711861355@113.27866481001894,23.127818881775035|113.27834303690605,23.125169704264373@113.27851938431027,23.12463317742799@113.27877614055079,23.124735119156124@113.27884265210618,23.124871291032647@113.2787877482859,23.125289784731205@113.2783455313423,23.125171985639664@113.27834303690605,23.125169704264373|113.27796063450441,23.125850086535348@113.27808217747987,23.125494058633947@113.2784577899262,23.125618453670743@113.27835776006256,23.125967549828445@113.27796312965211,23.125852488350972@113.27796063450441,23.125850086535348|113.27649611526054,23.127597179907447@113.27577718266262,23.127155770303307@113.2758142315274,23.127069261698157@113.27633458895464,23.127357628424978@113.27632269755102,23.127377747030746@113.2765590660007,23.1275323157372@113.27649611526054,23.127597179907447\n" +
                "i:a1,i:a2,i:a3,i:a4,i:a5,i:a6,i:a7,i:a8,i:a9\npartitionmod 1\nrowkey 1\n";
    	Map<String,Object> resultMap = new JavaHBaseTool().queryHbaseNoKerberos(sql);
//    	Map<String,Object> resultMap = new JavaHBaseTool().queryHbase(sql);
    	System.out.println("长度"+((List)resultMap.get("result")).size());
        Date endDate = new Date();
        System.out.println("时间:"+(endDate.getTime()-startDate.getTime()));
//    	System.out.println("resultMap:"+JSONObject.fromObject(resultMap).toString());
	}
    
    public static void scanTable(HTableInterface hTable, Scan scan) throws IOException
	  {
	    ResultScanner resultScanner = hTable.getScanner(scan);
//	    System.out.println();
	    int i=0;
	    for (Result result : resultScanner) {
//	    	if(i>10){
//	    		break;
//	    	}
	    	System.out.println("---------------------");
//	    	System.out.println("result长度:"+result.size());
	    	System.out.println(Bytes.toString(result.getRow()));
	    	for(Cell cell: result.listCells()){
//	    		System.out.println("cell长度："+cell.getValueLength());
//	    		System.out.println("cloumn    "+Bytes.toString(cell.getFamily())+":"+Bytes.toString(cell.getQualifier())+"---->"+"value:" + Bytes.toString(cell.getValue()));
//	    		System.out.print("value:" + Bytes.toString(cell.getValue()));
//	    		System.out.println();
	    	}
	    	i++;
	    }
	  }
    public static void scanTableTwo(HTable hTable, Scan scan) throws IOException{
    	List<String> cloumnsLabel = new ArrayList<String>();
    	List<Object> resultList = new ArrayList<Object>();
    	ResultScanner resultScanner = hTable.getScanner(scan);
    	for (Result result : resultScanner) {
	    	int resultSize = result.listCells().size();
	    	if(!result.isEmpty()){
	    		List<Object> rList = new ArrayList<Object>();
	    		//放入key
	    		rList.add(Bytes.toString(result.getRow()));
//	    		rList.add(Bytes.toString(result.getRow()));
		    	for(Cell cell: result.listCells()){
		    		if(cloumnsLabel.size()<resultSize){
		    			String cmn = Bytes.toString(cell.getFamily())+":"+ Bytes.toString(cell.getQualifier());
		    			cloumnsLabel.add(cmn);
		    		}
		    		rList.add(Bytes.toString(cell.getValue()));
		    	}
		    	resultList.add(rList);
	    	}
	    	
	    }
    	System.out.println("resultList"+JSONArray.fromObject(resultList));
    }
}
