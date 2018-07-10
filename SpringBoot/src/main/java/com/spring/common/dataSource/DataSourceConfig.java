package com.spring.common.dataSource;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DataSourceConfig {
	
	@Bean(name = "noceDataSource")
    @Qualifier("noceDataSource")
    @ConfigurationProperties(prefix="spring.datasource")
	@Primary
    public DataSource DataSource() {
		System.out.println("初始化noceDataSource");
        return DataSourceBuilder.create().build();
    }
	
	@Bean(name = "alarmDataSource")
    @Qualifier("alarmDataSource")
    @ConfigurationProperties(prefix="spring.datasource.alarm")
    public DataSource alarmDataSource() {
		System.out.println("初始化alarmDataSource");
        return DataSourceBuilder.create().build();
    }
	
	@Bean(name = "alarmJdbcTemplate")
	@Qualifier("alarmJdbcTemplate")
	public JdbcTemplate alarmJdbcTemplate(
	        @Qualifier("alarmDataSource") DataSource dataSource) {
		System.out.println("初始化alarmJdbcTemplate");
	    return new JdbcTemplate(dataSource);
	}
	
}
