package com.spring.common.util.hbaseQuery;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.HTablePool;

import java.io.IOException;

public class HTableManager {
    public static int HTABLE_POOL_SIZE = 100;

    private static HTableManager instance;
    private static HTablePool hTablePool;

    private HTableManager(Configuration config) {
//        Configuration config = HBaseConfiguration.create();
        config.set("hbase.defaults.for.version.skip", "false");
        config.setInt("hbase.client.retries.number",3);
        hTablePool = new HTablePool(config, HTABLE_POOL_SIZE);
    }

    public static HTableManager getInstance(Configuration config) {
        if (instance == null) {
            instance = new HTableManager(config);
        }
        return instance;
    }

    public synchronized HTableInterface getHTable(String tableName) throws IOException {
        return hTablePool.getTable(tableName);
    }
}
