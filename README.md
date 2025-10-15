# El *** del Boardgame
## Practica y prototipo de nuevo mapa de miembros
### Perfiles de usuarios:
    Jugadores
    Cafe/Bar (Jugar sin costo)
    Tienda (Venta y/o jugar con costo)
    Influencer (Publicidad, redes sociales, organizacion de eventos)

    Jugadores:
        Pueden ver otros jugadores
        Pueden ver cafes y tiendas
        Pueden ver influencer con ubicacion abierta
        Puede organizar eventos gratuitos y/o pagos (ver reglas)

    Cafe/Bar:
        Puede ver tiendas
        Puede ver otros cafes
        Puede ver jugadores?
        Puede organizar eventos gratuitos sin costo
        Puede organizar eventos pagos con costo
        Definir rol a mostrar para este tipo de usuario

    Tienda:
        Puede ver otras tiendas
        Puede ver cafes
        Puede organizar eventos gratuitos con costo
        Puede organizar eventos pagos, con costo
        Puede activar ofertas, costo?

    Influencer:
        Puede ver tiendas y cafes
        Puede organizar eventos con costo

Todos los perfiles:
    Pueden actualizar su ubicacion. (Se actualizara para el publico ¿inmediatamente? y podrá ver jugadores y/o influencer 12hs despues)


Jugadores, cafe e influencer:
    Pueden crear subastas
    Pueden participar en subastas


Jugadores seran vistos en el mapa con el icono verde (club)
Cafe seran vistos con un icono violeta
Tiendas seran vistos con un icono rojo, cuando active ofertas cambiara a color ____.
Influencers seran vistos con icono azul
Eventos seran vistos con un icono ____, reemplazaran temporalmente el icono del lugar donde se realice y del organizador. Aun mostraran detalles con un tooltip.

El tipo de usuario y la ubicacion seran guardados en base de datos Mongo en un servidor separado al login que sera almacenado en la base de dato que provee Auth0.


Eventos, ofertas y subastas seran implementados en una segunda iteracion del sistema.

El tipo de usuario no se podrá cambiar desde el sistema despues de la primera configuracion. 