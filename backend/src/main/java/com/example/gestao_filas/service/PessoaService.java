package com.example.gestao_filas.service;

import com.example.gestao_filas.dto.PessoaDto;
import com.example.gestao_filas.model.Pessoa;
import com.example.gestao_filas.model.Turmas;
import com.example.gestao_filas.repository.PessoaRepository;
import com.example.gestao_filas.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository alunoRepository;

    @Autowired
    private TurmaService turmaService;

    @Autowired
    private TurmaRepository turmaRepository;

    public Pessoa salvarPessoa(PessoaDto pessoaDto) {
        Pessoa pessoa = new Pessoa();
        pessoa.setEmail(pessoaDto.getEmail());
        pessoa.setNome(pessoaDto.getNome());
        pessoa.setQrcode("sfdsdfgdf");
        pessoa.setSenha(pessoaDto.getNome() + "senha");

        Turmas turma = turmaRepository.findById(pessoaDto.getIdTurma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        pessoa.setIsFuncionario(pessoaDto.getIsFuncionario());
        pessoa.setTurma(turma);

        return alunoRepository.save(pessoa);
    }

}
