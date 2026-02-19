package com.security.autenticacion.capaSuperior;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {



    @GetMapping("/api")
    public String publico() {
        return "Bienvenido! 🌍";
    }
}
