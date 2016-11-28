poc-docker-jenkins
=========

Una prueba de concepto para montar un entorno de integración continua dockerizada.

¿Qué es Docker?
---------

<p>
Docker es una plataforma que te permite paquetizar tus aplicaciones de forma sencilla. 
Basa su arquitectura en la creación de contenedores en los cuales puedes ir incluyendo tus diferentes aplicaciones.
En estos contenedores puedes incluir tantas aplicaciones como quieras y facilmente publicarlas en la red para que puedas acceder a ellas rápidamente.
</p>

<p>
Docker se diferencia de las maquinas virtuales en que, en una VM necesitas introducir un SO en el cual puedas lanzar tu aplicacion y si quieres lanzar otra aplicación de una forma
aislada a la anterior aplicación, tienes que crear otra VM con el nuevo entorno, sin embargo en docker, tu creas diferentes imagenes con tu aplicación, y estas corren sobre un kernel
común, el Docker Engine.
</p>

¿Por qué Docker?
---------

<p>
Gracias a que todo corre sobre el mismo kernel, tus aplicaciones se pueden llevar facilmente de un entorno a otro sin problemas de compatibilidad, y con un simple comando 
tienes tu entorno montado y totalmente funcional en cualquier contenedor en el que introduzcas tu imagen.
</p>

<p>
Docker te incluye herramientas para crear redes para conectar tus diferentes imágenes, linkar tus ímagenes para que puedan encontrarse facilmente en esa red, 
y publicar esa red para que el resto de dispositivos puedan llegar a ella.
</p>

<p>
Puedes crear espacios de discos compartidos para todas la imágenes. Pueden ser locales o remotos, pudiendo así compartirlo entre diferentes Docker instalados en diferentes equipos y SO.
</p>

<span>Ademas, la comunidad de Docker tiene una gran amplitud de imágenes subidas al </span>
[Docker Hub](https://hub.docker.com/)
<span> y de las que puedes basarte para modificarlas y añadir la configuración que necesites para tu entorno, facilitandote la creación de nuevas imágenes para tus aplicaciones</span>

Dockerizate
--------

Hay una gran cantidad de material en linea que te da las facilidades de aprender todo lo que necesitas acerca esta plataforma, aquí dejo un poco de ese material:

- [Documentación oficial de Docker](https://docs.docker.com/)
- [Blog de CodeCentric](https://blog.codecentric.de/en/2015/10/continuous-integration-platform-using-docker-container-jenkins-sonarqube-nexus-gitlab/)
- Video de CodeMotion: [Docker4Developer](https://www.youtube.com/watch?v=fVYyCQeZZNs)
- Video de CodeMotion: [Testing de Integración automatizados con Docker y Bamboo](https://www.youtube.com/watch?v=NuOSJjk802Y)