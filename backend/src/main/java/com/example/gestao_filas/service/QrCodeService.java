package com.example.gestao_filas.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class QrCodeService {
    public String gerarQrCode(String texto, int largura, int altura, String caminhoArquivo) throws WriterException, IOException {
        BitMatrix matrix = new MultiFormatWriter().encode(texto, BarcodeFormat.QR_CODE, largura, altura);

        Path caminhoImagem = Paths.get(caminhoArquivo);

        MatrixToImageWriter.writeToPath(matrix, "PNG", caminhoImagem);

        return caminhoImagem.toString();
    }

}
