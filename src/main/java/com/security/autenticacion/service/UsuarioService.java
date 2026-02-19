package com.security.autenticacion.service;

import com.security.autenticacion.usuarios.Usuario;
import com.security.autenticacion.usuarios.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
}
