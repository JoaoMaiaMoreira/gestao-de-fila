package com.example.gestao_filas.model;

import com.example.gestao_filas.enums.StatusFilaEnum;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
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

    @ManyToOne(optional = true)
    @JoinColumn(name = "turma_id", nullable = true)
    private Turmas turma;

    @Enumerated(EnumType.STRING)  // Armazena o valor do enum como uma string
    private StatusFilaEnum status; // Define o status padrão

    @Column(name = "URL_QRCODE")
    private String qrcode;

    public JsonObject gerarJson() {
        Gson gson = new Gson();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("nome", nome);
        jsonObject.addProperty("senha", senha);
        jsonObject.addProperty("email", email);

        if (turma != null) {
            jsonObject.addProperty("turma", turma.getId());
        } else {
            jsonObject.addProperty("turma", "Nenhuma turma");
        }
        return jsonObject;
    }

}
