package com.example.gestao_filas.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusFilaEnum {

    SENHA_CHAMADA(1, "Senha Chamada", "SENHA_CHAMADA"),
    NAO_FOI_CHAMADO(2, "Aguardando ser Chamado", "NAO_FOI_CHAMADO"),
    PROXIMO_CHAMADO(3, "Próximo a ser Chamado", "PROXIMO_CHAMADO"),
    CHAMADO_NAO_RECOLHIDO(4, "Chamado, mas Não Recolhido", "CHAMADO_NAO_RECOLHIDO"),
    JA_COMEU(5, "Já Comeu", "JA_COMEU");

    private final Integer id;
    private final String nome;
    private final String codigo;

}
