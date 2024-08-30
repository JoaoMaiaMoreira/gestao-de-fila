package com.example.gestao_filas.repository;

import com.example.gestao_filas.model.Turmas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurmaRepository extends JpaRepository<Turmas, Integer> {
}
