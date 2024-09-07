package com.example.gestao_filas.controller;

import com.example.gestao_filas.service.QrCodeService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/qrCode")
public class QrCodeController {

    @Autowired
    private QrCodeService qrCodeService;

    @GetMapping("/buscarQrcode")
    @SneakyThrows
    public ResponseEntity buscarQrcode(){
        try {
            // Recupera o nome do arquivo QR Code
            String urlQrCode = qrCodeService.buscarUltimoQrcodeCadastrado();
            if (urlQrCode == null || urlQrCode.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // Cria um objeto File com o caminho do QR Code
            File file = new File(urlQrCode);
            if (!file.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // Retorna o arquivo como InputStreamResource
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                    .contentType(MediaType.IMAGE_PNG)
                    .contentLength(file.length())
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
