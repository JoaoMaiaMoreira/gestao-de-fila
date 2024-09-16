package com.example.gestao_filas.service;

import com.example.gestao_filas.enums.StatusFilaEnum;
import com.example.gestao_filas.model.Pessoa;
import com.example.gestao_filas.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FilaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public String getSenhas(){
       return pessoaRepository.getSenhaAleatoria();
    }

    public Pessoa mudarStatus(StatusFilaEnum statusFilaEnum, String email){
        Optional<Pessoa> pessoa = pessoaRepository.findByEmail(email);
        Pessoa pessoaEncontrada = pessoa.get();
        pessoaEncontrada.setStatus(statusFilaEnum);
        return pessoaRepository.save(pessoaEncontrada);
    }
}
