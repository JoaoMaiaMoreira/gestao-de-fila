package com.example.gestao_filas.service;

import com.example.gestao_filas.model.Turmas;
import com.example.gestao_filas.repository.TurmaRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    public List<Turmas> buscarTodasAsTurmas() {
        return turmaRepository.findAll();
    }

}
