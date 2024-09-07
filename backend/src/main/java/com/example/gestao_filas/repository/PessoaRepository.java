package com.example.gestao_filas.repository;

import com.example.gestao_filas.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    Optional<Pessoa> findByEmail(String email);

    @Query(value = "SELECT URL_QRCODE FROM public.pessoa ORDER BY id_pessoa DESC LIMIT 1", nativeQuery = true)
    String buscarUltimoQrcodeCadastrado();
}
