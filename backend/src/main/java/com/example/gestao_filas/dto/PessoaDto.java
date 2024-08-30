package com.example.gestao_filas.dto;

import lombok.Data;

@Data
public class PessoaDto {
    private String nome;
    private String email;
    private Integer idTurma;
    private Boolean isFuncionario;
}
