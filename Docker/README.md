Guía de Instalación del entorno Docker
==========

Preparación del entorno
----------

Con esta guía os mostraremos como instalar nuestro entorno de Automatización de Tareas con Jenkins. Primero de todo hay que instalar Docker en el sistema operativo.

1. Si tu maquina es un linux, existe un script que te hace la instalacion automaticamente y que puedes lanzarlo con la siguiente linea de comandos:

```
    $ curl -sSL https://get.docker.com/ | sh
```
ó

```
    $ wget -q0- https://get.docker.com/ | sh
```

2. Si tu maquina es Mac o Windows, Docker te recomienda que instales Docker Toolbox, disponible en el siguiente [enlace](https://www.docker.com/products/docker-toolbox).

Una vez tengamos Docker instalado, es importante instalarse Docker Compose, una herramienta que nos facilitará la creación de imagenes de Docker y su despliegue. Si habeis usado el Docker Toolbox, este lo instala por defecto, si teneis una maquina linux:

1. Instalar una versión de Python 3.x.x en vuestro entorno:

```
    $ sudo apt-get update
    $ sudo apt-get install -y python
```

Si con ese comando no se os instala la versión 3.x.x, probar con el siguiente:

```
    $ sudo apt-get install -y python3
```

Estamos teniendo en cuenta que vuestro entorno de linux es un Ubuntu o Debian, en caso de ser otra versión de lunix tendréis que cambiar el comando `apt-get` por el comando correspondiente del manejador de paquetes de vuestro sistema operativo linux.

2. Instalar pip:

```
    $ sudo apt-get install -y python-pip
```

Si habeis tenido que instalar la versión de `pyhton3`, debereis ir a la carpeta donde esta alojado el bin de python y lanzar el siguiente comando:

```
    $ python3 get-pip.py
```

Una vez instalado pip, solo falta utilizarlo para poder instalar el Docker Compose en vuestro SO.

```
    $ sudo pip install docker-compose
    $ docker-compose --version
```

Con todo esto ya tendremos nuestro entorno preparado para lanzar crear y levantar todas las imagenes de Docker que queramos.


Configuración de los contenedores
---------

Dentro de la carpeta Docker hay un archivo **docker-compose.yml**. En él están configuradas todas las imagenes que vamos a lanzar.
En nuestro caso tenemos 5 imagenes, una por cada tipo de herramienta que vamos a necesitar para lanzar nuestros *Jobs* de **Jenkins**.

- SonarQube
- JMeter
- Robot Framework
- NodeJS
- Jenkins

Si abrís el archivo **docker-compose.yml** podéis modificar los puertos en los que estan publicadas las diferentes imagenes y así configurarlo al gusto del cliente. Si se quieren añadir parámetros de configuración, se ha de seguir la [guía de oficial de Docker Compose](https://docs.docker.com/compose/).

Para lanzar los contenedores y dejarlos vivos sólo hay que ir hasta la carpeta donde se encuentra el archivo **docker-compose.yml** y lanzar el siguiente comando:

```
    $ sudo docker-compose up -d
```

Con esto se crearán las imagenes si no estaban creadas anteriormente y se lanzarán.

Una vez lanzadas hay que hacer una serie de configuraciónes en las siguientes imágenes:

- JMeter
- Robot Framework
- NodeJS

Para poder acceder al terminal dentro de ese contenedor necesitamos saber el **ID** de los contenedores:

```
    $ docker ps
```

Así listamos los procesos que estan activos y podemos ver las **IDs** de los contenedores que queremos. Con ese ID utilizamos el siguiente comando para poder entrar en la maquina correspondiente y hacer la configuración necesaría:

```
    $ sudo docker exec -it {ID} su
```

Ahora que estamos dentro hay que modificar el archivo **sshd_config** ubicado en la carpeta */etc/ssh/*. Antes de modificarlo, creamos una copia del archivo, para poder volver a la versión inicial en caso de error. Usamos el editor de linea de comandos *vi* para modificar el archivo:

```
    $ vi sshd_config
```

En este archivo hay que modificar la linea:

```
    PermitRootLogin without-password
```

Por la linea:

```
    PermitRootLogin yes
```

Habilitando así la posible conexión a partir de *ssh* con un usuario con los permisos *Root*. Normalmente es mala practica permitir este tipo de login porque nos hace mas sensibles a los ataques, pero debido a que desde **Jenkins** lanzar scripts con comandos sudo es bastante complicado y **Robot Framework** necesita lanzarse con estos permisos, hemos decidido que es la forma más adecuada.

Ahora, hay que reiniciar el servicio *ssh* para que se refresquen los cambios:

```
    $ service ssh restart
```

Es hora de crear un usuario con los permisos *Root* con el cual realizaremos nuestras conexiones a partir de *ssh* con las diferentes maquinas.

```
    $ useradd -aG 0 {user}
    $ passwd {user}
```

A partir de aquí podremos conectarnos a la maquina a partir de *ssh* a la ip y puerto correspondiente a la maquina en cuestión. **__Recuerda que estos ultimos pasos han de realizarse sobre las tres imagenes mencionanas anteriormente__**.

Y hasta aquí la guía de la isntalación del entorno

### FIN
