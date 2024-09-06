package com.example.gestao_filas.controller;

import com.example.gestao_filas.dto.PessoaDto;
import com.example.gestao_filas.model.Pessoa;
import com.example.gestao_filas.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping("/salvarPessoa")
    public Pessoa salvarPessoa(@RequestBody PessoaDto pessoaDto) throws Exception {
        return pessoaService.salvarPessoa(pessoaDto);
    }
}
