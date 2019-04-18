package com.spring.common.util.hbaseQuery;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Table;

public class HTableManagerBack {
//    public static int HTABLE_POOL_SIZE = 100;
	ExecutorService executor = Executors.newFixedThreadPool(10);
    private static HTableManagerBack instance;
    private static Connection connection;

    private HTableManagerBack(Configuration config) throws IOException {
//        Configuration config = HBaseConfiguration.create();
        config.set("hbase.defaults.for.version.skip", "false");
        config.setInt("hbase.client.retries.number",3);
//        connection = ConnectionFactory.createConnection(config, executor);
        connection = ConnectionFactory.createConnection(config);
    }

    public static HTableManagerBack getInstance(Configuration config) throws IOException {
        if (instance == null) {
            instance = new HTableManagerBack(config);
        }
        return instance;
    }

    public synchronized Table getHTable(String tableName) throws IOException {
    	return connection.getTable(TableName.valueOf(tableName));
    }
}
