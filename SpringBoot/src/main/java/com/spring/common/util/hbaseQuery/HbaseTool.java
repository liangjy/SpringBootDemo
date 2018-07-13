package com.spring.common.util.hbaseQuery;

import java.nio.ByteBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

import org.apache.hadoop.hbase.thrift.generated.Hbase;
import org.apache.hadoop.hbase.thrift.generated.IOError;
import org.apache.hadoop.hbase.thrift.generated.Mutation;
import org.apache.hadoop.hbase.thrift.generated.TCell;
import org.apache.hadoop.hbase.thrift.generated.TRowResult;
import org.apache.log4j.Logger;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;
import org.springframework.stereotype.Repository;

import com.spring.common.util.PropertiesUtil;

/**
 * Hbase Thrift 工具类
 * 
 * @author 陶心万
 * @email taoxinwan@useease.com createDate 2016-3-23下午5:03:28
 * 
 */
@Repository
public class HbaseTool {

	private  Logger log = Logger.getLogger(HbaseTool.class);
	private  String server = "10.17.35.66";
	private  int port = 9090;
	public  Hbase.Client client = null;
	public  TTransport transport;

	// {
	//
	// try {
	//
	// Properties properties =
	// PropertiesUtil.getPropertiesByFileName("hbaseThrift.properties");
	// server = properties.getProperty("server");
	// port = Integer.parseInt(properties.getProperty("port"));
	//
	// TTransport transport = new TSocket(server, port);
	// TProtocol protocol = new TBinaryProtocol(transport);
	// client = new Hbase.Client(protocol);
	// transport.open();
	//
	// } catch (Exception e) {
	// log.error(e);
	// e.printStackTrace();
	// }
	//
	// }

	public HbaseTool() {

	}

	public  void openTransport() {
		try {

			Properties properties = PropertiesUtil.getPropertiesByFileName("hbase.properties");
			server = properties.getProperty("server");
			port = Integer.parseInt(properties.getProperty("port"));

			transport = new TSocket(server, port);
			TProtocol protocol = new TBinaryProtocol(transport);
			client = new Hbase.Client(protocol);
			if(!transport.isOpen()){
				transport.open();
			}
			

		} catch (Exception e) {
			log.error(e);
			e.printStackTrace();
		}
	}

	public  void closeTransport() {
		if(transport.isOpen()){
			transport.close();
		}
	}

	public  List<String> getTables() throws TException {
		List<String> list = new ArrayList<String>(0);
		for (ByteBuffer buf : client.getTableNames()) {
			byte[] name = decode(buf);
			list.add(new String(name));
		}
		return list;
	}

	public  ByteBuffer wrap(String value) {
		ByteBuffer bb = null;
		try {
			bb = ByteBuffer.wrap(value.getBytes("UTF-8"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bb;
	}

	protected  byte[] decode(ByteBuffer buffer) {
		byte[] bytes = new byte[buffer.limit()];
		for (int i = 0; i < buffer.limit(); i++) {
			bytes[i] = buffer.get();
		}
		return bytes;
	}
	
	public  String utf8(byte[] buf) {  
        try {  
            CharsetDecoder decoder = Charset.forName("UTF-8").newDecoder();  
           
            return decoder.decode(ByteBuffer.wrap(buf)).toString();  
        } catch (CharacterCodingException e) {  
            return "[INVALID UTF-8]";  
        }  
    }  

	/**
	 * 打开查询
	 * 
	 * @param table
	 *            表名
	 * @param startRow
	 *            开始的rowkey
	 * @param columns
	 *            返回结果列集合
	 * @param attributes
	 * @return
	 * @throws TException
	 * @author 陶心万
	 * @crateDate 2016-3-23下午5:09:52
	 */
	public  int scannerOpen(String table, String startRow, List<String> columns,
			Map<String, String> attributes) throws TException {
		ByteBuffer tableName = wrap(table);
		List<ByteBuffer> fl = encodeColumns(columns);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		return client.scannerOpen(tableName, wrap(startRow), fl, wrappedAttributes);
	}

	public  int scannerOpen(String table, String startRow, String stopRow,
			List<String> columns, Map<String, String> attributes) throws TException {
		ByteBuffer tableName = wrap(table);
		List<ByteBuffer> fl = encodeColumns(columns);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		return client.scannerOpenWithStop(tableName, wrap(startRow), wrap(stopRow), fl,
				wrappedAttributes);
	}

	/**
	 * 模糊匹配
	 * 
	 * @param table
	 *            表名
	 * @param startAndPrefix
	 *            匹配条件
	 * @param columns
	 *            列集合
	 * @param attributes
	 * @return
	 * @throws TException
	 * @author 陶心万
	 * @crateDate 2016-3-23下午5:12:00
	 */
	public  int scannerOpenWithPrefix(String table, String startAndPrefix,
			List<String> columns, Map<String, String> attributes) throws TException {
		ByteBuffer tableName = wrap(table);
		List<ByteBuffer> fl = encodeColumns(columns);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		return client.scannerOpenWithPrefix(tableName, wrap(startAndPrefix), fl, wrappedAttributes);
	}

	/**
	 * 模糊匹配 结果已经转换成List<Map>的形式，Map的key分别是rowKey和列的名称
	 * 
	 * @param table
	 *            表名
	 * @param startAndPrefix
	 *            匹配条件
	 * @param columns
	 *            列集合
	 * @param attributes
	 * @param nbRows
	 *            返回行数
	 * @return
	 * @throws TException
	 * @author 陶心万
	 * @crateDate 2016-3-23下午5:12:00
	 */
	public  List<Map> getResultListByWithPrefix(String table, String startAndPrefix,
			List<String> columns, Map<String, String> attributes, int nbRows) throws Exception {
		ByteBuffer tableName = wrap(table);
		List<ByteBuffer> fl = encodeColumns(columns);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		int scannerId = client.scannerOpenWithPrefix(tableName, wrap(startAndPrefix), fl,
				wrappedAttributes);

		return formatRowResultToList(scannerGetList(scannerId, nbRows));
	}

	/**
	 * 时间戳查询
	 * 
	 * @param table
	 * @param startRow
	 * @param columns
	 * @param timestamp
	 * @param attributes
	 * @return
	 * @throws TException
	 * @author 陶心万
	 * @crateDate 2016-3-23下午5:12:29
	 */
	public  int scannerOpenTs(String table, String startRow, List<String> columns,
			long timestamp, Map<String, String> attributes) throws TException {
		ByteBuffer tableName = wrap(table);
		List<ByteBuffer> fl = encodeColumns(columns);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		return client.scannerOpenTs(tableName, wrap(startRow), fl, timestamp, wrappedAttributes);
	}

	public  int scannerOpenTs(String table, String startRow, String stopRow,
			List<String> columns, long timestamp, Map<String, String> attributes) throws TException {
		ByteBuffer tableName = wrap(table);
		List<ByteBuffer> fl = encodeColumns(columns);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		return client.scannerOpenWithStopTs(tableName, wrap(startRow), wrap(stopRow), fl,
				timestamp, wrappedAttributes);
	}

	/**
	 * 查询结果
	 * 
	 * @param id
	 *            查询ID
	 * @param nbRows
	 *            返回行数
	 * @return
	 * @throws TException
	 * @author 陶心万
	 * @crateDate 2016-3-23下午5:13:03
	 */
	public  List<TRowResult> scannerGetList(int id, int nbRows) throws TException {
		return client.scannerGetList(id, nbRows);
	}

	public  List<TRowResult> scannerGet(int id) throws TException {
		return client.scannerGetList(id, 1);
	}

	/**
	 * 获取查询结果
	 * 
	 * @param table
	 * @param startRow
	 * @param columns
	 * @param attributes
	 * @param nbRows
	 * @return
	 * @throws TException
	 * @author 陶心万
	 * @crateDate 2016-3-24上午9:39:48
	 */
	public  List<TRowResult> getResultByScanner(String table, String startRow,
			List<String> columns, Map<String, String> attributes, int nbRows) throws Exception {
		int scannerId = scannerOpen(table, startRow, columns, attributes);
		return scannerGetList(scannerId, nbRows);
	}

	/**
	 * 获取查询结果，结果已经转换成List<Map>的形式，Map的key分别是rowKey和列的名称
	 * 
	 * @param table
	 *            表名
	 * @param startRow
	 *            开始行
	 * @param columns
	 *            返回列
	 * @param attributes
	 * @param nbRows
	 *            返回条数
	 * @return
	 * @throws Exception
	 * @author 陶心万
	 * @crateDate 2016-3-24上午9:51:47
	 */
	public  List<Map> getResultListByScanner(String table, String startRow,
			List<String> columns, Map<String, String> attributes, int nbRows) throws Exception {
		int scannerId = scannerOpen(table, startRow, columns, attributes);
		return formatRowResultToList(scannerGetList(scannerId, nbRows));
	}

	public  List<TRowResult> getRow(String table, String row, Map<String, String> attributes)
			throws TException {
		ByteBuffer tableName = wrap(table);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		return client.getRow(tableName, wrap(row), wrappedAttributes);
	}

	public  List<TRowResult> getRows(String table, List<String> rows,
			Map<String, String> attributes) throws TException {
		ByteBuffer tableName = wrap(table);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		List<ByteBuffer> wrappedRows = encodeRows(rows);
		return client.getRows(tableName, wrappedRows, wrappedAttributes);
	}

	public  List<TRowResult> getRowsWithColumns(String table, List<String> rows,
			List<String> columns, Map<String, String> attributes) throws TException {
		ByteBuffer tableName = wrap(table);
		List<ByteBuffer> wrappedRows = encodeRows(rows);
		List<ByteBuffer> wrappedColumns = encodeColumns(columns);
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = encodeAttributes(attributes);
		return client.getRowsWithColumns(tableName, wrappedRows, wrappedColumns, wrappedAttributes);
	}

	private  List<ByteBuffer> encodeColumns(List<String> columns) {
		List<ByteBuffer> fl = new ArrayList<ByteBuffer>(0);
		if (columns != null) {
			for (String column : columns) {
				fl.add(wrap(column));
			}
		}
		return fl;
	}

	private  Map<ByteBuffer, ByteBuffer> encodeAttributes(Map<String, String> attributes) {
		Map<ByteBuffer, ByteBuffer> wrappedAttributes = null;
		if (attributes != null && !attributes.isEmpty()) {
			wrappedAttributes = new HashMap<ByteBuffer, ByteBuffer>(1);
			for (Map.Entry<String, String> entry : attributes.entrySet()) {
				wrappedAttributes.put(wrap(entry.getKey()), wrap(entry.getValue()));
			}
		}
		return wrappedAttributes;
	}

	private  List<ByteBuffer> encodeRows(List<String> rows) {
		List<ByteBuffer> list = new ArrayList<ByteBuffer>(0);
		for (String row : rows) {
			list.add(wrap(row));
		}
		return list;
	}

	public void iterateResults(TRowResult result) {
		Iterator<Entry<ByteBuffer, TCell>> iter = result.columns.entrySet().iterator();
		System.out.println("RowKey=" + new String(result.getRow()));
		while (iter.hasNext()) {
			Entry<ByteBuffer, TCell> entry = iter.next();
			System.out.println("\tCol=" + new String(decode(entry.getKey())) + ", Value="
					+ new String(entry.getValue().getValue()));
		}
	}

	public  List<Map> formatRowResultToList(List<TRowResult> tRowResults) throws Exception {
		List<Map> resultList = new ArrayList<Map>();
		if (tRowResults != null) {
			for (TRowResult result : tRowResults) {
				Map<String, String> rowMap = new HashMap<String, String>();
				Iterator<Entry<ByteBuffer, TCell>> iter = result.columns.entrySet().iterator();
				String rowKey = new String(result.getRow());
				rowMap.put("rowKey", rowKey);
				while (iter.hasNext()) {
					Entry<ByteBuffer, TCell> entry = iter.next();
					String col = new String(decode(entry.getKey()));
					//String colValue = new String(entry.getValue().getValue());
					String colValue = utf8(entry.getValue().getValue());
					rowMap.put(col, colValue);
				}
				resultList.add(rowMap);
			}
		}
		return resultList;
	}

	public void scannerClose(int id) throws TException {
		client.scannerClose(id);
	}
}
