package com.example.gestao_filas.service;

import com.example.gestao_filas.repository.PessoaRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
public class QrCodeService {

    @Autowired
    private PessoaRepository pessoaRepository;


    public String gerarQrCode(String texto, int largura, int altura, String caminhoArquivo) throws WriterException, IOException {
        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();

        BitMatrix matrix = multiFormatWriter.encode(texto, BarcodeFormat.QR_CODE, largura, altura);

        Path caminhoImagem = Paths.get(caminhoArquivo);

        MatrixToImageWriter.writeToPath(matrix, "PNG", caminhoImagem);

        return caminhoImagem.toString();
    }

    @SneakyThrows
    public String buscarUltimoQrcodeCadastrado() {
        return pessoaRepository.buscarUltimoQrcodeCadastrado();

    }
}

