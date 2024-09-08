package com.example.gestao_filas.controller;

import com.example.gestao_filas.enums.StatusFilaEnum;
import com.example.gestao_filas.service.FilaService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fila")
public class FilaController {

    @Autowired
    private FilaService filaService;

    @GetMapping("/buscarSenhas")
    public String getSenha() {
        //lembrar de fazer uma implemnetacao para levar 4 numeros ou mais para serem exibidos no canto
        //como por exxemplo 'proximos:'
        return filaService.getSenhas();
    }


    @SneakyThrows
    @PutMapping("/mudarStatus/{status}")
    public ResponseEntity<String> mudarStatus(@PathVariable("status") StatusFilaEnum status, @RequestBody String email) {
        filaService.mudarStatus(status, email);
        return ResponseEntity.ok("Status alterado para: " + status + " para o email: " + email);
    }
}
