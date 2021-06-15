# ChatBar

<img src="./images/chatbar.png" alt="...">
</div>

## Contexto de la app

Con esta single-page app podrás chatear con personas que se encuentren dentro de un mismo bar.
En una época marcada por la pandemia causada por el virus SARS-CoV-2, comúnmente conocido como "covid-19", tras varios meses de confinamientos y restricciones en todo el mundo, cada país poco a poco se dirige a la normalidad previa a esta enfermedad.

En el caso de España, en el sector de la restauración y el ocio nocturno, se deben respetar una serie de restricciones que hacen que nuestra manera de relacionarnos con la gente haya cambiado.
Una de las medidas acordadas por las autoridades sanitarias es la del distanciamiento social, que obliga a las personas asistentes a cualquier bar o pub a ocupar una mesa determinada no pudiendo moverse entre éstas y no pudiendo ser más de cuatro personasen cada una.

La idea de esta app surge a raíz de lo anteriormente expuesto, posibilitando así el hecho de relacionarnos con gente de una manera mixta; de manera presencial pero a la vez respetando las medidas sanitarias.

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


## Backend

Basado en Node.JS.
Base de datos alojada en MongoAtlas. Llamadas a la BD y modelo de datos a través de Mongoose.
Encriptamiento de datos (password) y protección de rutas privadas con bcrypt y jsonwebtoken.
Direccionamiento con Express.

### Diagrama de relaciones entre modelos

<img src="./images/2.png" alt="..." width="602">
</div>

### Direccionamiento

Usuario ("/users")

    GET:        /
    POST:       /signup
                /login
Bares

    GET:        /bares/find/:id
    POST:       /bares
    PUT:        /bares/add_user
                /bares/remove_user
    DELETE:     /bares/remove_bar

Chat_room

    GET:        /chat_room/find/:id
    POST:       /chat_room/new_room

Messages

    PUT         /messages/add_message


## About

- Current version: V1.0



## Middleware

- app.use(express.json()): básicamente para poder leer el body, antes de las rutas
- app.use(express.urlencoded({extended: true})):
- errorHandler: va después de las rutas
- checkToken: comprueba si estamos login o no antes de entrar a una ruta

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript
- Node.JS v14.16.0.
- MongoDB

## ToDo

- Añadir roles: Admin/user

> Dorothy followed her through many of the beautiful rooms in her castle.