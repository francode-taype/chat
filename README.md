# Chat en Tiempo Real

Aplicación de chat en tiempo real construida con **Spring Boot** en el backend y **HTML, CSS, JavaScript** en el frontend, utilizando WebSockets y STOMP para la comunicación entre usuarios.
### Capturas de Pantalla

Vista previa de la aplicación:

<p align="center">
  <img src="https://github.com/fran-codev/chat/blob/main/chatClient/chat1.png?raw=true" width="45%" />
  <img src="https://github.com/fran-codev/chat/blob/main/chatClient/chat2.png?raw=true" width="45%" />
</p>

## Instalación y Ejecución

### Backend (Spring Boot):

Para ejecutar el backend, necesitas tener **Java 21** y **Maven** instalados en tu máquina.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/fran-codev/chat.git

2. Navega al directorio del proyecto:
    ```bash
    cd chat/chat

3. Ejecuta el siguiente comando para iniciar el servidor:
    ```bash
    mvnw spring-boot:run

4. El servidor de backend estará corriendo en http://localhost:8080.

### Frontend (HTML, CSS, JS):

1. Abre la carpeta `chatClient`.

2. Asegúrate de ejecutar el frontend en un servidor local para que funcione correctamente con WebSockets.

3. Asegúrate de que el servidor WebSocket esté configurado correctamente en el archivo `WebSocketConfig.java`, en la ruta `chat/src/main/java/dev/francode/chat/config`. Verifica que el CORS esté habilitado para la ruta de tu cliente, asegurándote de que esté configurado correctamente con `.setAllowedOrigins("http://127.0.0.1:5500")`, donde el servidor de cliente esté corriendo en esa dirección.

