package dev.francode.chat.service;

import dev.francode.chat.dto.MessageDTO;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private static final int MAX_NAME_LENGTH = 20;
    private static final int MAX_MESSAGE_LENGTH = 1000;

    public void processMessage(MessageDTO messageDTO) {
        validateName(messageDTO.getName());
        validateMessage(messageDTO.getMessage());
    }

    private void validateName(String name) {
        if (isNullOrEmpty(name)) {
            throw new IllegalArgumentException("El nombre no puede estar vacío.");
        }
        if (name.length() > MAX_NAME_LENGTH) {
            throw new IllegalArgumentException("El nombre no puede tener más de " + MAX_NAME_LENGTH + " caracteres.");
        }
    }

    private void validateMessage(String message) {
        if (isNullOrEmpty(message)) {
            throw new IllegalArgumentException("El mensaje no puede estar vacío.");
        }
        if (message.length() > MAX_MESSAGE_LENGTH) {
            throw new IllegalArgumentException("El mensaje no puede tener más de " + MAX_MESSAGE_LENGTH + " caracteres.");
        }
    }

    private boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
}