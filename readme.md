# ChatBar

Con esta single-page app podrás chatear con personas que se encuentren dentro de un mismo bar.

<div style="text-align:center">
<img src="./images/chatbar.png" alt="...">
</div>

## Estructura

- Home page
- Login page

## ¿Qué puede hacerse?

- Crear usuario
- Login
- Ver lista de bares
- Entrar/salir de un bar
- Ver los usuarios del bar
- Ver perfiles
- Crear sala de chat
- Enviar mensaje
- Eliminar chat
- Ver mis chats


## About

- Current version: V1.0

## ToDo

## Middleware

- app.use(express.json()): básicamente para poder leer el body, antes de las rutas
- app.use(express.urlencoded({extended: true})):
- errorHandler: va después de las rutas
- checkToken: comprueba si estamos login o no antes de entrar a una ruta