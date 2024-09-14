package com.example.gestao_filas.service;

import com.example.gestao_filas.dto.PessoaDto;
import com.example.gestao_filas.enums.StatusFilaEnum;
import com.example.gestao_filas.model.Pessoa;
import com.example.gestao_filas.model.Turmas;
import com.example.gestao_filas.repository.PessoaRepository;
import com.example.gestao_filas.repository.TurmaRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.Data;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Data
@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private TurmaService turmaService;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private QrCodeService qrCodeService;

    @SneakyThrows
    public Pessoa salvarPessoa(PessoaDto pessoaDto) throws Exception {

        Optional<Pessoa> pessoaOptional = pessoaRepository.findByEmail(pessoaDto.getEmail());

        if (pessoaOptional.isPresent()){
            throw new Exception("Já existe uma pessoa com esse email");
        }

        Pessoa pessoa = new Pessoa();
        pessoa.setEmail(pessoaDto.getEmail());
        pessoa.setNome(pessoaDto.getNome());

        Turmas turma = turmaRepository.findById(pessoaDto.getIdTurma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        pessoa.setSenha(gerarSenhaPessoal(pessoaDto.getNome(), turma.getApelido()));
        pessoa.setIsFuncionario(pessoaDto.getIsFuncionario());
        pessoa.setTurma(turma);
        pessoa.setStatus(StatusFilaEnum.NAO_FOI_CHAMADO);
        pessoa.setQrcode(gerarQrcode(pessoa.gerarJson()));
        return pessoaRepository.save(pessoa);
    }

    public String gerarQrcode(JsonObject json) throws Exception {
        String caminhoArquivo = "/home/youx/Documentos/qrCodeEstudo/" + UUID.randomUUID() + ".png";
        String urlQrcode = qrCodeService.gerarQrCode(json.toString(), 200, 200, caminhoArquivo);
        return urlQrcode;
    }

    public String gerarSenhaPessoal(String nome, String turma) {
        var nomequebrado = nome.split(" ");
        return nomequebrado[0] + nomequebrado[nomequebrado.length -1] + "/" + turma;
    }
}
