package com.example.gestao_filas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_funcionario")
    private Integer id;

    private String nome;

    @Column(name = "senha_fila")
    private String senha;

    @Column(name = "URL_QRCODE")
    private String qrcode;

    private String email;

}
