package dev.francode.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // Prefijo de los mensajes de destino
        registry.setApplicationDestinationPrefixes("/app"); // Prefijo para las solicitudes del cliente
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Configuración para el endpoint WebSocket
        registry.addEndpoint("/chat")
                .setAllowedOrigins("http://127.0.0.1:5500")
                .withSockJS(); // Configuración para usar SockJS en caso de que WebSocket no esté disponible
    }
}

