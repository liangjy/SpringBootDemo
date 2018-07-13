package com.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@SpringBootApplication
@Controller
public class App {
    public static void main( String[] args ){
//        System.out.println( "Hello World!" );
        SpringApplication.run(App.class,args);
    }
    
    @RequestMapping("/NOCE")
	public String login(){
		return "/Index/login";
	}

    @RequestMapping("/home")
    public String home(){
        return "/Index/home";
    }

    @RequestMapping("/tianyi")
    public String index(){
        return "/IntelligentRoadTestV3/IntelligentRoadTestAnalysisV3";
    }
}
