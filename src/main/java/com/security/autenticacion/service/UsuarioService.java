package com.security.autenticacion.service;

import com.security.autenticacion.usuarios.Usuario;
import com.security.autenticacion.usuarios.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repository,
                          PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registrarUsuario(String username, String password) {

        if (repository.findByUsername(username).isPresent()) {
            throw new RuntimeException("El usuario ya existe");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setRole("ADMIN");

        repository.save(usuario);
    }

    public void incrementarIntentosFallidos(String username) {
        Usuario usuario = repository.findByUsername(username).get();
        int nuevosIntentos = usuario.getIntentosFallidos() + 1;
        usuario.setIntentosFallidos(nuevosIntentos);

        if (nuevosIntentos >= 4) {
            usuario.setCuentaBloqueada(true);
            usuario.setBloqueoHasta(LocalDateTime.now().plusMinutes(15));
        }

        repository.save(usuario);
    }

    public void autenticacionExitosa(String username){
        Usuario usuario = repository.findByUsername(username).get();
        usuario.setIntentosFallidos(0);
        usuario.setCuentaBloqueada(Boolean.FALSE);
        repository.save(usuario);
    }
}
