package com.example.gestao_filas.schedules;

import com.example.gestao_filas.repository.PessoaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RestaurarStatusFilaSchedules {

    private final PessoaRepository pessoaRepository;

    @Scheduled(cron = "")
    public void gerarEnderecosOS() {
        log.info("Atualizando os Status das pessoas");
        pessoaRepository.atualizarStatus();
        log.info("Atualizando os Status das pessoas: [FIM]");
    }
}
