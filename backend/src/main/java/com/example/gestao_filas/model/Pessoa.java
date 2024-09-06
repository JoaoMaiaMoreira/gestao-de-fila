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
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_pessoa")
    private Integer id;

    private String nome;

    @Column(name = "senha_fila")
    private String senha;

    @Column(name = "email_institucional")
    private String email;

    private Boolean isFuncionario;

    @ManyToOne
    @JoinColumn(name = "turma", nullable = false)
    private Turmas turma;

    @Column(name = "URL_QRCODE")
    private String qrcode;
}
