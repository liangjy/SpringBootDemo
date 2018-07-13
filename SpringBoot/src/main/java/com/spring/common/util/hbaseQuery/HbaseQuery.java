package com.spring.common.util.hbaseQuery;

import java.nio.ByteBuffer;
import java.util.*;
import java.util.Map.Entry;

import org.apache.hadoop.hbase.thrift.generated.TCell;
import org.apache.hadoop.hbase.thrift.generated.TRowResult;
import org.apache.hadoop.hbase.thrift.generated.TScan;
import org.springframework.stereotype.Repository;

import com.spring.common.util.geoUtil.GridNumHelper;
import com.spring.common.util.geoUtil.MapUtils;

@Repository
public class HbaseQuery {
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
//                queryPara.put("filter", filter);
				return queryPara;
			}else if(queryType.equals(qType4)){
				String startKey = sqlParaArr[2].trim();
				String endKey = sqlParaArr[3].trim();
				cloumns = sqlParaArr[4].trim();
				if(sqlParaArr.length>5){
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
                queryPara.put("gis_data", gis_data);
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
	/**
	 * 根据替换后的sql字符串进行hbase查询，分为精确查询和前缀查询，查询都需要判断取全部字段的数据还是取部分字段的数据，取得数据后进行格式化，并返回
	 * @param sql :替换后的sql字符串
	 * @return 格式化的查询结果数据
	 * @throws Exception
	 */
	public static Map<String, Object> getQueryResult(String sql) throws Exception {
		Map<String, Object> queryMap = getHbaseParaBySqlstr(sql);
		String queryType = (String) queryMap.get("queryType");
		String tableName = (String) queryMap.get("tableName");
		String key = (String) queryMap.get("key");
		String cloumns = (String) queryMap.get("cloumns");
		int limit = (Integer) queryMap.get("limit");
		int offset = (Integer) queryMap.get("offset");
		int rowkey = (Integer) queryMap.get("rowkey");
		HbaseTool hbaseQueryTool = new HbaseTool();
		if ("getByKeys".toLowerCase().equals(queryType)) {
			//将校验都放在getHbaseParaBySqlstr中，转成小写再判断
			//精确查找
			List<String> keyList = new ArrayList<String>();
			String[] keyArr = key.split(",");
			for(String k:keyArr){
				keyList.add(k);
			}
			List<TRowResult> rowResult = new ArrayList<TRowResult>();
			
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<String> cloumnsLabel = new ArrayList<String>();
			List<Object> resultList = new ArrayList<Object>();
			if(cloumns==null||"null".equals(cloumns)){
				//取全部列数据
				hbaseQueryTool.openTransport();
				rowResult = hbaseQueryTool.getRowsWithColumns(tableName,keyList,null,null);
				hbaseQueryTool.closeTransport();
				//for(TRowResult t:rowResult){
				if(limit==0&&offset==0){
					for(int i=0;i<rowResult.size();i++){
						Map<ByteBuffer, TCell> cellMap = rowResult.get(i).getColumns();
						
						List<String> list = new ArrayList<String>();
//						System.out.println(JSONArray.fromObject(list).toString());
						//放入key
						if(rowkey==0){
							list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
						}
						for(Entry<ByteBuffer, TCell> entry:cellMap.entrySet()){
							if(cloumnsLabel.size()!=cellMap.size()){
								cloumnsLabel.add(hbaseQueryTool.utf8(entry.getKey().array()));
							}
							if(entry.getValue()!=null){
								list.add(hbaseQueryTool.utf8(entry.getValue().getValue()));
							}else{
								list.add(null);
							}
						}
						resultList.add(list);
					}
				}else{
					int num=0;
					for(int i=0;i<rowResult.size();i++){
						if(i>=offset){
							if(num==limit){
								break;
							}
							Map<ByteBuffer, TCell> cellMap = rowResult.get(i).getColumns();
							
							List<String> list = new ArrayList<String>();
//							System.out.println(JSONArray.fromObject(list).toString());
							//放入key
							if(rowkey==0){
								list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
							}
							for(Entry<ByteBuffer, TCell> entry:cellMap.entrySet()){
								if(cloumnsLabel.size()!=cellMap.size()){
									cloumnsLabel.add(hbaseQueryTool.utf8(entry.getKey().array()));
								}
								if(entry.getValue()!=null){
									list.add(hbaseQueryTool.utf8(entry.getValue().getValue()));
								}else{
									list.add(null);
								}
								
							}
							resultList.add(list);
							num++;
						}
					}
					
				}
				if(rowkey==0){
					cloumnsLabel.add(0, "rowkey");
				}
				resultMap.put("result", resultList);
				resultMap.put("columns", cloumnsLabel);
				resultMap.put("types", new ArrayList<String>());
				
			}else{
				//取指定列的数据
				String[] cloumnArr = cloumns.split(",");
				List<String> cloumnList = new ArrayList<String>();
				for(String c:cloumnArr){
					cloumnList.add(c);
				}
				hbaseQueryTool.openTransport();
				rowResult = hbaseQueryTool.getRowsWithColumns(tableName, keyList, cloumnList, null);
				hbaseQueryTool.closeTransport();
				if(limit==0&&offset==0){
					//for(TRowResult t:rowResult){
					for(int i=0;i<rowResult.size();i++){
						Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
						List<String> list = new ArrayList<String>();
						if(rowkey==0){
							list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
						}
						
						for(String cloum:cloumnList){
							TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
							if(cell!=null){
								list.add(hbaseQueryTool.utf8(cell.getValue()));
							}else{
								list.add(null);
							}
						}
						resultList.add(list);
					}
				}else{
					int num=0;
					for(int i=0;i<rowResult.size();i++){
						if(i>=offset){
							if(num==limit){
								break;
							}
							Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
							List<String> list = new ArrayList<String>();
							if(rowkey==0){
								list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
							}
							
							for(String cloum:cloumnList){
								TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
								if(cell!=null){
									list.add(hbaseQueryTool.utf8(cell.getValue()));
								}else{
									list.add(null);
								}
								
							}
							resultList.add(list);
							num++;
						}
						
					}
					
				}
				if(rowkey==0){
					cloumnList.add(0, "rowkey");
				}
				resultMap.put("result",resultList);
				resultMap.put("columns", cloumnList);
				resultMap.put("types", new ArrayList<String>());
			}
			
			return resultMap;
		} else if ("getByKeyPrefix".toLowerCase().equals(queryType)) {//前缀查询
			List<TRowResult> rowResult = new ArrayList<TRowResult>();
			
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<String> cloumnsLabel = new ArrayList<String>();
			List<Object> resultList = new ArrayList<Object>();
			if(cloumns==null||"null".equals(cloumns)){
				//取全部列数据
				hbaseQueryTool.openTransport();
				int scannerId = hbaseQueryTool.client.scannerOpenWithPrefix(hbaseQueryTool.wrap(tableName), hbaseQueryTool.wrap(key), null,	null);
				if(limit==0&&offset==0){
					rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 100000);
					hbaseQueryTool.closeTransport();
					//for(TRowResult t:rowResult){
					for(int i=0;i<rowResult.size();i++){
						Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
						List<String> list = new ArrayList<String>();
//						System.out.println(JSONArray.fromObject(list).toString());
						if(rowkey==0){
							list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
						}
						
						for(Entry<ByteBuffer, TCell> keyBuffer:cellMap.entrySet()){
							if(cloumnsLabel.size()!=cellMap.size()){
								cloumnsLabel.add(hbaseQueryTool.utf8(keyBuffer.getKey().array()));
							}
							if(keyBuffer.getValue()!=null){
								list.add(hbaseQueryTool.utf8(keyBuffer.getValue().getValue()));
							}else{
								list.add(null);
							}
						}
						resultList.add(list);
					}
				}else{
					rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 100000);
					hbaseQueryTool.closeTransport();
					int num=0;
					for(int i=0;i<rowResult.size();i++){
						if(i>=offset){
							if(num==limit){
								break;
							}
							Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
							List<String> list = new ArrayList<String>();
//							System.out.println(JSONArray.fromObject(list).toString());
							if(rowkey==0){
								list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
							}
							for(Entry<ByteBuffer, TCell> keyBuffer:cellMap.entrySet()){
								if(cloumnsLabel.size()!=cellMap.size()){
									cloumnsLabel.add(hbaseQueryTool.utf8(keyBuffer.getKey().array()));
								}
								if(keyBuffer.getValue()!=null){
									list.add(hbaseQueryTool.utf8(keyBuffer.getValue().getValue()));
								}else{
									list.add(null);
								}
							}
							resultList.add(list);
							num++;
						}
					}
					
				}
				/*for(TRowResult t:rowResult){
					Map<ByteBuffer, TCell> cellMap =t.getColumns();
					List<String> list = new ArrayList<String>();
//					System.out.println(JSONArray.fromObject(list).toString());
					list.add(hbaseQueryTool.utf8(t.getRow()));
					for(Entry<ByteBuffer, TCell> keyBuffer:cellMap.entrySet()){
						if(cloumnsLabel.size()!=cellMap.size()){
							cloumnsLabel.add(hbaseQueryTool.utf8(keyBuffer.getKey().array()));
						}
						list.add(hbaseQueryTool.utf8(keyBuffer.getValue().getValue()));
					}
					resultList.add(list);
				}*/
				if(rowkey==0){
					cloumnsLabel.add(0, "rowkey");
				}
				
				resultMap.put("result", resultList);
				resultMap.put("columns", cloumnsLabel);
				resultMap.put("types", new ArrayList<String>());
				
			}else{
				//取指定列数据
				String[] cloumnArr = cloumns.split(",");
				List<String> cloumnList = new ArrayList<String>();
				List<ByteBuffer> cloumnBuffer = new ArrayList<ByteBuffer>();
				for(String c:cloumnArr){
					cloumnList.add(c);
					cloumnBuffer.add(hbaseQueryTool.wrap(c));
				}
				
				hbaseQueryTool.openTransport();
				int scannerId = hbaseQueryTool.client.scannerOpenWithPrefix(hbaseQueryTool.wrap(tableName), hbaseQueryTool.wrap(key), cloumnBuffer,	null);
				if(limit==0&&offset==0){
					rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 1000000);
					hbaseQueryTool.closeTransport();
					for(int i=0;i<rowResult.size();i++){
						Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
						List<String> list = new ArrayList<String>();
						if(rowkey==0){
							list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
						}
						
						for(String cloum:cloumnList){
							TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
							if(cell!=null){
								list.add(hbaseQueryTool.utf8(cell.getValue()));
							}else{
								list.add(null);
							}
							
						}
						resultList.add(list);
					}
				}else{
					rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 1000000);
					hbaseQueryTool.closeTransport();
					int num=0;
					for(int i=0;i<rowResult.size();i++){
						if(i>=offset){
							if(num==limit){
								break;
							}
							Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
							List<String> list = new ArrayList<String>();
							if(rowkey==0){
								list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
							}
							
							for(String cloum:cloumnList){
								TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
								if(cell!=null){
									list.add(hbaseQueryTool.utf8(cell.getValue()));
								}else{
									list.add(null);
								}
							}
							resultList.add(list);
							num++;
						}
					}
					
				}
				if(rowkey==0){
					cloumnList.add(0, "rowkey");
				}
				
				resultMap.put("result",resultList);
				resultMap.put("columns", cloumnList);
				resultMap.put("types", new ArrayList<String>());
			}
			
			return resultMap;
			
		}else if("scan".toLowerCase().equals(queryType)){//scan
//			String queryType = (String) queryMap.get("queryType");//type
//			String tableName = (String) queryMap.get("tableName");//tablename
//			String key = (String) queryMap.get("key");//forward/backward
//			String cloumns = (String) queryMap.get("cloumns");//#{KEYSUBSTRING}
//			int limit = (Integer) queryMap.get("limit");//limit N
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<String> cloumnsLabel = new ArrayList<String>();
			List<Object> resultList = new ArrayList<Object>();
			HbaseTool h = new HbaseTool();
			h.openTransport();
			TScan scan =new TScan();
//			scan.setReversed(true);
//			scan.setBatchSize(10);
//			scan.setTimestamp(Long.MAX_VALUE);
			if("backward".equals(key)){
				scan.setReversed(true);
			}
			ByteBuffer filterString = h.wrap("RowFilter(=, 'substring:"+cloumns+"')");
			scan.setFilterString(filterString);
			ByteBuffer table = h.wrap(tableName);
			int scanid = h.client.scannerOpenWithScan(table, scan , null);
			List<TRowResult> rowResult = h.client.scannerGetList(scanid, limit);
			for(int i=0;i<rowResult.size();i++){
				Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
				List<String> list = new ArrayList<String>();
				list.add(h.utf8(rowResult.get(i).getRow()));
				
//				for(Entry<ByteBuffer, TCell> keyBuffer:cellMap.entrySet()){
//					if(cloumnsLabel.size()!=cellMap.size()){
//						cloumnsLabel.add(hbaseQueryTool.utf8(keyBuffer.getKey().array()));
//					}
//					if(keyBuffer.getValue()!=null){
//						list.add(hbaseQueryTool.utf8(keyBuffer.getValue().getValue()));
//					}else{
//						list.add(null);
//					}
//				}
				resultList.add(list);
			}
			h.closeTransport();
			cloumnsLabel.add(0, "rowKey");
			resultMap.put("result",resultList);
			resultMap.put("columns", cloumnsLabel);
			resultMap.put("types", new ArrayList<String>());
			return resultMap;
		}else if("getByKeyScope".toLowerCase().equals(queryType)){
			String startKey = (String) queryMap.get("startKey");
			String endKey = (String) queryMap.get("endKey");
			String filterPara = (String) queryMap.get("filterPara");
			List<TRowResult> rowResult = new ArrayList<TRowResult>();
			
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<String> cloumnsLabel = new ArrayList<String>();
			List<Object> resultList = new ArrayList<Object>();
			
			TScan scan = new TScan();
			scan.setStartRow(startKey.getBytes("UTF-8"));
			scan.setStopRow(endKey.getBytes("UTF-8"));

			if(filterPara!=null){
			    String[] para = filterPara.split(",");//规则，第一个为字段，第二个为最小纬度，第三个为最大纬度
                String[] col = para[0].split(":");
                //SingleColumnValueFilter('i', 'a12', >, 'binary:23.1593')
                String filterString = "(SingleColumnValueFilter('"+col[0]+"', '"+col[1]+"',>, 'binary:"+para[1]+"')) AND (SingleColumnValueFilter('"+col[0]+"', '"+col[1]+"',<, 'binary:"+para[2]+"'))";
//                String filterString = "SingleColumnValueFilter('"+col[0]+"', '"+col[1]+"',<, 'binary:"+para[2]+"')";//(<, '"+para[2]+"','"+col[0]+"', '"+col[1]+"')
                scan.setFilterString(hbaseQueryTool.wrap(filterString));
            }

			
			if(cloumns==null||"null".equals(cloumns)){
				hbaseQueryTool.openTransport();
				int scannerId = hbaseQueryTool.client.scannerOpenWithScan(hbaseQueryTool.wrap(tableName), scan, null);
				rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 1000000);
				hbaseQueryTool.closeTransport();
					//for(TRowResult t:rowResult){
				if(limit==0&&offset==0){
					for(int i=0;i<rowResult.size();i++){
						Map<ByteBuffer, TCell> cellMap = rowResult.get(i).getColumns();
						
						List<String> list = new ArrayList<String>();
//						System.out.println(JSONArray.fromObject(list).toString());
						//放入key
						if(rowkey==0){
							list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
						}
						for(Entry<ByteBuffer, TCell> entry:cellMap.entrySet()){
							if(cloumnsLabel.size()!=cellMap.size()){
								cloumnsLabel.add(hbaseQueryTool.utf8(entry.getKey().array()));
							}
							if(entry.getValue()!=null){
								list.add(hbaseQueryTool.utf8(entry.getValue().getValue()));
							}else{
								list.add(null);
							}
						}
						resultList.add(list);
					}
				}else{
					int num=0;
					for(int i=0;i<rowResult.size();i++){
						if(i>=offset){
							if(num==limit){
								break;
							}
							Map<ByteBuffer, TCell> cellMap = rowResult.get(i).getColumns();
							
							List<String> list = new ArrayList<String>();
//							System.out.println(JSONArray.fromObject(list).toString());
							//放入key
							if(rowkey==0){
								list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
							}
							for(Entry<ByteBuffer, TCell> entry:cellMap.entrySet()){
								if(cloumnsLabel.size()!=cellMap.size()){
									cloumnsLabel.add(hbaseQueryTool.utf8(entry.getKey().array()));
								}
								if(entry.getValue()!=null){
									list.add(hbaseQueryTool.utf8(entry.getValue().getValue()));
								}else{
									list.add(null);
								}
								
							}
							resultList.add(list);
							num++;
						}
					}
					
				}
				
				
//				for(int i=0;i<rowResult.size();i++){
//					Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
//					List<String> list = new ArrayList<String>();
//					if(rowkey==0){
//						list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
//					}
//					
//					for(Entry<ByteBuffer, TCell> keyBuffer:cellMap.entrySet()){
//						if(cloumnsLabel.size()!=cellMap.size()){
//							cloumnsLabel.add(hbaseQueryTool.utf8(keyBuffer.getKey().array()));
//						}
//						if(keyBuffer.getValue()!=null){
//							list.add(hbaseQueryTool.utf8(keyBuffer.getValue().getValue()));
//						}else{
//							list.add(null);
//						}
//					}
//					resultList.add(list);
//				}
			}else{
				//取指定列数据
				String[] cloumnArr = cloumns.split(",");
				List<ByteBuffer> cloumnBuffer = new ArrayList<ByteBuffer>();
				for(String c:cloumnArr){
					cloumnsLabel.add(c);
					cloumnBuffer.add(hbaseQueryTool.wrap(c));
				}
				
				hbaseQueryTool.openTransport();
				int scannerId = hbaseQueryTool.client.scannerOpenWithScan(hbaseQueryTool.wrap(tableName), scan, null);
				rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 1000000);
				hbaseQueryTool.closeTransport();
				if(limit==0&&offset==0){
					//for(TRowResult t:rowResult){
					for(int i=0;i<rowResult.size();i++){
						Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
						List<String> list = new ArrayList<String>();
						if(rowkey==0){
							list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
						}
						
						for(String cloum:cloumnsLabel){
							TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
							if(cell!=null){
								list.add(hbaseQueryTool.utf8(cell.getValue()));
							}else{
								list.add(null);
							}
						}
						resultList.add(list);
					}
				}else{
					int num=0;
					for(int i=0;i<rowResult.size();i++){
						if(i>=offset){
							if(num==limit){
								break;
							}
							Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
							List<String> list = new ArrayList<String>();
							if(rowkey==0){
								list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
							}
							
							for(String cloum:cloumnsLabel){
								TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
								if(cell!=null){
									list.add(hbaseQueryTool.utf8(cell.getValue()));
								}else{
									list.add(null);
								}
								
							}
							resultList.add(list);
							num++;
						}
						
					}
					
				}
//				for(int i=0;i<rowResult.size();i++){						
//					Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
//					List<String> list = new ArrayList<String>();
//					if(rowkey==0){
//						list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
//					}
//						
//					for(String cloum:cloumnsLabel){
//						TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
//						if(cell!=null){
//							list.add(hbaseQueryTool.utf8(cell.getValue()));
//						}else{
//							list.add(null);
//						}
//					}
//					resultList.add(list);
//				}
				
			}
			
			if(rowkey==0){
				cloumnsLabel.add(0, "rowkey");
			}
			
			resultMap.put("result",resultList);
			resultMap.put("columns", cloumnsLabel);
			resultMap.put("types", new ArrayList<String>());
			return resultMap;
		}else if("getGridByKey".toLowerCase().equals(queryType)){
            String gridKeyPrefix = (String) queryMap.get("gridKeyPrefix");
            int gridLevel = Integer.valueOf((String)queryMap.get("gridLevel"));
            int len = 100000;
            if(gridLevel==10){
                len = 1000000;
            }

            double maxLng = Double.valueOf((String)queryMap.get("maxLng"));
            double maxLat = Double.valueOf((String)queryMap.get("maxLat"));
            double minLng = Double.valueOf((String)queryMap.get("minLng"));
            double minLat = Double.valueOf((String)queryMap.get("minLat"));
            int partitionmod = (Integer)queryMap.get("partitionmod");

            long minGridLngNum = GridNumHelper.gridLngNum(minLng,gridLevel);
            long maxGridLngNum = GridNumHelper.gridLngNum(maxLng,gridLevel);
            long minGridLatNum = GridNumHelper.gridLatNum(minLat,gridLevel);
            long maxGridLatNum = GridNumHelper.gridLatNum(maxLat,gridLevel);

            List<String> gridNumList = new ArrayList<String>();
            boolean showRowkey = true;
            for(long i=minGridLngNum;i<=maxGridLngNum;i++){
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
                    gridNumList.add(RowKey);
                }
            }
            System.out.println("查询Rowkey的长度："+gridNumList.size());
            List<TRowResult> rowResult = new ArrayList<TRowResult>();

            Map<String,Object> resultMap = new HashMap<String, Object>();
            List<String> cloumnsLabel = new ArrayList<String>();
            List<Object> resultList = new ArrayList<Object>();


            if(cloumns==null||"null".equals(cloumns)){
                hbaseQueryTool.openTransport();
                rowResult = hbaseQueryTool.getRowsWithColumns(tableName,gridNumList,null,null);
                hbaseQueryTool.closeTransport();
                //for(TRowResult t:rowResult){
                for(int i=0;i<rowResult.size();i++){
                    Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
                    List<String> list = new ArrayList<String>();
//					System.out.println(JSONArray.fromObject(list).toString());
                    if(rowkey==0){
                        list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
                    }

                    for(Entry<ByteBuffer, TCell> keyBuffer:cellMap.entrySet()){
                        if(cloumnsLabel.size()!=cellMap.size()){
                            cloumnsLabel.add(hbaseQueryTool.utf8(keyBuffer.getKey().array()));
                        }
                        if(keyBuffer.getValue()!=null){
                            list.add(hbaseQueryTool.utf8(keyBuffer.getValue().getValue()));
                        }else{
                            list.add(null);
                        }
                    }
                    resultList.add(list);
                }
            }else{
                //取指定列数据
                String[] cloumnArr = cloumns.split(",");
                List<ByteBuffer> cloumnBuffer = new ArrayList<ByteBuffer>();
                for(String c:cloumnArr){
                    cloumnsLabel.add(c);
                    cloumnBuffer.add(hbaseQueryTool.wrap(c));
                }

                hbaseQueryTool.openTransport();
                rowResult = hbaseQueryTool.getRowsWithColumns(tableName,gridNumList,cloumnsLabel,null);
//                int scannerId = hbaseQueryTool.client.scannerOpenWithScan(hbaseQueryTool.wrap(tableName), scan, null);
//                rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 1000000);
                hbaseQueryTool.closeTransport();

                for(int i=0;i<rowResult.size();i++){
                    Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
                    List<String> list = new ArrayList<String>();
                    if(rowkey==0){
                        list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
                    }

                    for(String cloum:cloumnsLabel){
                        TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
                        if(cell!=null){
                            list.add(hbaseQueryTool.utf8(cell.getValue()));
                        }else{
                            list.add(null);
                        }
                    }
                    resultList.add(list);
                }

            }

            if(rowkey==0){
                cloumnsLabel.add(0, "rowkey");
            }

            resultMap.put("result",resultList);
            resultMap.put("columns", cloumnsLabel);
            resultMap.put("types", new ArrayList<String>());
            return resultMap;
        }else if("getGridsByContour".toLowerCase().equals(queryType)){
            String gridKeyPrefix = (String) queryMap.get("gridKeyPrefix");
            int gridLevel = Integer.valueOf((String)queryMap.get("gridLevel"));
            int len = 100000;
            if(gridLevel==10){
                len = 1000000;
            }
            String gis_data = (String) queryMap.get("gis_data");
            int partitionmod = (Integer)queryMap.get("partitionmod");

            List<Long> gridNumArray = MapUtils.getGridNum(gis_data,gridLevel);//根据轮廓集合得到栅格编号
            List<String> gridNumList = new ArrayList<String>();
            boolean showRowkey = true;
            //遍历栅格编号集合，拼接出rowkey，生成rowkey集合
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
                gridNumList.add(RowKey);
            }
            System.out.println("查询Rowkey的长度："+gridNumList.size());

            List<TRowResult> rowResult = new ArrayList<TRowResult>();

            Map<String,Object> resultMap = new HashMap<String, Object>();
            List<String> cloumnsLabel = new ArrayList<String>();
            List<Object> resultList = new ArrayList<Object>();
            if(cloumns==null||"null".equals(cloumns)){
                hbaseQueryTool.openTransport();
                rowResult = hbaseQueryTool.getRowsWithColumns(tableName,gridNumList,null,null);
                hbaseQueryTool.closeTransport();
                //for(TRowResult t:rowResult){
                for(int i=0;i<rowResult.size();i++){
                    Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
                    List<String> list = new ArrayList<String>();
//					System.out.println(JSONArray.fromObject(list).toString());
                    if(rowkey==0){
                        list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
                    }

                    for(Entry<ByteBuffer, TCell> keyBuffer:cellMap.entrySet()){
                        if(cloumnsLabel.size()!=cellMap.size()){
                            cloumnsLabel.add(hbaseQueryTool.utf8(keyBuffer.getKey().array()));
                        }
                        if(keyBuffer.getValue()!=null){
                            list.add(hbaseQueryTool.utf8(keyBuffer.getValue().getValue()));
                        }else{
                            list.add(null);
                        }
                    }
                    resultList.add(list);
                }
            }else{
                //取指定列数据
                String[] cloumnArr = cloumns.split(",");
                List<ByteBuffer> cloumnBuffer = new ArrayList<ByteBuffer>();
                for(String c:cloumnArr){
                    cloumnsLabel.add(c);
                    cloumnBuffer.add(hbaseQueryTool.wrap(c));
                }

                hbaseQueryTool.openTransport();
                rowResult = hbaseQueryTool.getRowsWithColumns(tableName,gridNumList,cloumnsLabel,null);
//                int scannerId = hbaseQueryTool.client.scannerOpenWithScan(hbaseQueryTool.wrap(tableName), scan, null);
//                rowResult = hbaseQueryTool.client.scannerGetList(scannerId, 1000000);
                hbaseQueryTool.closeTransport();

                for(int i=0;i<rowResult.size();i++){
                    Map<ByteBuffer, TCell> cellMap =rowResult.get(i).getColumns();
                    List<String> list = new ArrayList<String>();
                    if(rowkey==0){
                        list.add(hbaseQueryTool.utf8(rowResult.get(i).getRow()));
                    }

                    for(String cloum:cloumnsLabel){
                        TCell cell = cellMap.get(hbaseQueryTool.wrap(cloum));
                        if(cell!=null){
                            list.add(hbaseQueryTool.utf8(cell.getValue()));
                        }else{
                            list.add(null);
                        }
                    }
                    resultList.add(list);
                }

            }

            if(rowkey==0){
                cloumnsLabel.add(0, "rowkey");
            }

            resultMap.put("result",resultList);
            resultMap.put("columns", cloumnsLabel);
            resultMap.put("types", new ArrayList<String>());
            return resultMap;
        }
		return new HashMap<String, Object>();
		
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
////                "10\n113.363259,23.150508,113.342131,23.141353\n" +
//                "50\n113.359,23.1353,113.322,23.1131\n" +
//                "i:a1,i:a2,i:a4,i:a6,i:a9,i:a10,i:a13,i:a14,i:a48,i:a49,i:a57,i:a58,i:a59,i:a69\nrowkey 1";
        String sql = "getGridsByContour\nNOCE:DSI_MRO_ALL_GRID_TOT_W\n_0_20_20180323_\n20\n" +
                "113.27866481001894,23.127818881775035@113.27854615605008,23.12720886904501@113.27892792604403,23.12468885877834@113.27821474096064,23.124383428522957@113.27728295128318,23.124094720426417@113.27701161470381,23.124739704267135@113.27639373476909,23.124524531493037@113.27630204463743,23.124880680750163@113.27741037728717,23.125571404029532@113.27644943521112,23.126971752880237@113.2762355845516,23.126841183225654@113.27577934546187,23.12669866369659@113.27574603914083,23.126784017945365@113.27626523921693,23.126969998334705@113.27629373104429,23.127039297728558@113.27648737117046,23.127195850212534@113.27638272288415,23.127371232711983@113.27580771617869,23.127047169245454@113.27576964848888,23.127156279923835@113.27576494717644,23.12715462543447@113.2760120119807,23.12738199675587@113.27840772827538,23.12859711861355@113.27866481001894,23.127818881775035|113.27834303690605,23.125169704264373@113.27851938431027,23.12463317742799@113.27877614055079,23.124735119156124@113.27884265210618,23.124871291032647@113.2787877482859,23.125289784731205@113.2783455313423,23.125171985639664@113.27834303690605,23.125169704264373|113.27796063450441,23.125850086535348@113.27808217747987,23.125494058633947@113.2784577899262,23.125618453670743@113.27835776006256,23.125967549828445@113.27796312965211,23.125852488350972@113.27796063450441,23.125850086535348|113.27649611526054,23.127597179907447@113.27577718266262,23.127155770303307@113.2758142315274,23.127069261698157@113.27633458895464,23.127357628424978@113.27632269755102,23.127377747030746@113.2765590660007,23.1275323157372@113.27649611526054,23.127597179907447\n" +
                "i:a1,i:a2,i:a3,i:a4,i:a5,i:a6,i:a7,i:a8,i:a9\npartitionmod 1\nrowkey 1\n";
        Map<String,Object> resultMap = HbaseQuery.getQueryResult(sql);
//        Map<String,Object> resultMap = new JavaHBaseTool().queryHbaseNoKerberos(sql);
//    	Map<String,Object> resultMap = new JavaHBaseTool().queryHbase(sql);
        System.out.println("长度"+((List)resultMap.get("result")).size());
        Date endDate = new Date();
        System.out.println("时间:"+(endDate.getTime()-startDate.getTime()));
//    	System.out.println("resultMap:"+JSONObject.fromObject(resultMap).toString());
    }
}
