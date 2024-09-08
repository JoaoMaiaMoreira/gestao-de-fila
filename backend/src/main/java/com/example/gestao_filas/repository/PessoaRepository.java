package com.example.gestao_filas.repository;

import com.example.gestao_filas.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.*;
import java.util.List;
import java.util.Optional;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    Optional<Pessoa> findByEmail(String email);

    @Query(value = "SELECT URL_QRCODE FROM public.pessoa ORDER BY id_pessoa DESC LIMIT 1", nativeQuery = true)
    String buscarUltimoQrcodeCadastrado();

    @Query(value = "SELECT p.senhaFila " +
            "FROM public.pessoa p " +
            "JOIN p.turma t on t.id_turma = p.turma " +
            "WHERE t.apelido = ?1 and p.ja_comeu = false" +
            "LIMIT 1", nativeQuery = true)
    List<String> getSenhasA(String turma);

    @Query(value = "SELECT p.senha_fila " +
            "FROM public.pessoa p " +
            "JOIN public.turmas t ON t.id_turma = p.turma " +
            "WHERE t.apelido = ?1 AND p.status = 'NAO_FOI_CHAMADO' " +
            "LIMIT 1", nativeQuery = true)
    String getSenhas(String turma);

}
