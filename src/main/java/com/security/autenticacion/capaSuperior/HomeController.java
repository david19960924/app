package com.security.autenticacion.capaSuperior;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/formLogin")
    public String formLogin() {
        return "formLogin";
    }

    @GetMapping("/")
    public String home(){
        return "home";
    }

    @GetMapping("/register")
    public String register(){
        return "formRegister";
    }
}
