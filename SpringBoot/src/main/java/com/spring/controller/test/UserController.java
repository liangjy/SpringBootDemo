package com.spring.controller.test;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

    @RequestMapping("/gotoUserJSP")
    public String gotoUserJSP(Model model){
        model.addAttribute("username" , "linch");
        return "user";
    }

    @RequestMapping("/gotoHome")
    public String gotoHome(){
        return "IntelligentRoadTestV3/IntelligentRoadTestAnalysisV3";
    }

    @RequestMapping("/gotoHomeV5")
    public String gotoHomeV5(){
        return "IntelligentRoadTestV5/IntelligentRoadTestAnalysisV5";
    }
}
