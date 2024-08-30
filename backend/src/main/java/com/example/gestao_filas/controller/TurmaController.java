package com.example.gestao_filas.controller;

import com.example.gestao_filas.model.Turmas;
import com.example.gestao_filas.service.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/turma")
public class TurmaController {

    @Autowired
    private TurmaService turmaService;

    @GetMapping("/getTurmas")
    public List<Turmas> buscarTodasAsTurmas(){
        return turmaService.buscarTodasAsTurmas();
    }

}
