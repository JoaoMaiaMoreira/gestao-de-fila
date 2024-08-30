package com.example.gestao_filas.service;

import com.example.gestao_filas.model.Turmas;
import com.example.gestao_filas.repository.TurmaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurmaService {

    private TurmaRepository turmaRepository;

    public List<Turmas> buscarTodasAsTurmas() {
        return turmaRepository.findAll();
    }

}
