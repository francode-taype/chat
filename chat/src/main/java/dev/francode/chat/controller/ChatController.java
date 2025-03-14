package dev.francode.chat.controller;

import dev.francode.chat.dto.MessageDTO;
import dev.francode.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/sendMessage")  // Mapeamos la URL a la que se enviarán los mensajes
    @SendTo("/topic/messages")  // El destino donde se enviarán los mensajes
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        chatService.processMessage(messageDTO);
        return messageDTO;
    }
}
