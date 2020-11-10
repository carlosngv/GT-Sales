Manejo e implementación de archivos
A+
Tablón
Trabajo de clase
Personas
Manejo e implementación de archivos
A+
Fecha de entrega próxima
Se entrega mañana
23:59 – Proyecto 2
Ver todo

Comparte algo con tu clase…

Anuncio: "Buenas noches compañeros ya se…"
Carlos Hernandez
Fecha de creación: 8 nov.8 nov.
Buenas noches compañeros ya se encuentran habilitado las tareas en uedi y en classroom, para entregar el proyecto en uedi entregan el link del repositorio y en classroom entregar el proyecto en rar. OBLIGATORIO ENTREGAR EN AMBAS PLATAFORMAS PARA PODER CALIFICARSE. 

Por otro lado con respecto a los mínimos  creo que algunas personas no llegaran a eso entonces de una vez les digo que no seré exigente con eso, pero eso si solo les calificare lo que tengan funcional.

Kevin Cardona8 nov.
gracias!

Javier Chin8 nov.
Gracias Carlos!

Andres Rodas8 nov.
Gracias!

Rafael C8 nov.
disculpa, a mi creo que no me has aceptado en github

Tarea: "Proyecto 2"
Carlos Hernandez ha publicado una nueva tarea: Proyecto 2
Fecha de creación: 8 nov.8 nov.

Anuncio: "Buenos días compañeros, departe de Ecys…"
Carlos Hernandez
Fecha de creación: 5 nov.5 nov.
Buenos días compañeros, departe de Ecys  nos piden que les pasemos la siguientes encuestas. Si pudieran hacer favor de llenarlas se los agradecería.

Y ya se encuentra publicada la hoja de calificación en UEDI.

Encuesta ECYS S2-2020 Mod.Virtual
https://docs.google.com/forms/d/e/1FAIpQLSfJBBj7455G6kC1KEr270iUhnQ-nCp9q01DEJu9BUQmfkPeeA/viewform

Encuesta
https://docs.google.com/forms/d/e/1FAIpQLSdQNjG-Wha8VjwhNmRwqMgC1xvC2otTzt5VvAcboXYnSylZ9A/viewform?usp=sf_link


Publicado por Didier Domínguez
Didier Domínguez
Fecha de creación: 5 nov.5 nov.
Instrucciones para generar el apk

README.md
Texto

Didier Domínguez5 nov.
Video 1: https://www.youtube.com/watch?v=HxC65-1f59s
Video 2: https://www.youtube.com/watch?v=pKyus_9y6JM

Rafael C5 nov.
hay tener instalado android studio?

Didier Domínguez5 nov.
Si

Rafael C5 nov.
gracias


Anuncio: "Buenas noches compañeros, se autorizo…"
Carlos Hernandez
Fecha de creación: 3 nov.3 nov.
Buenas noches compañeros, se autorizo una prorroga para el proyecto 2 la  fecha de entrega será el 10 de noviembre a la media noche. Aprovéchenla para entregar un buen proyecto éxitos.

Andres Rodas3 nov.
Gracias


Anuncio: "Buenas tardes compañeros para los que…"
Carlos Hernandez
Fecha de creación: 1 nov.1 nov.
Buenas tardes compañeros para los que este interesados hoy vamos a tener la instalación de oracle en una ec2 en aws https://meet.google.com/ezt-tpww-dpe

Edgar Herrera1 nov.
Ya esta


Anuncio: "Buenas noches compañeros ya se…"
Carlos Hernandez
Fecha de creación: 31 oct.31 oct.
Buenas noches compañeros ya se encuentra su nota del examen final en el dtt.

Carlos Hernandez1 nov.
Envíame correo  de que pregunta era  para revisar


Anuncio: "Buenas tardes compañeros les recuerdo…"
Carlos Hernandez
Fecha de creación: 31 oct.31 oct.
Buenas tardes compañeros les recuerdo que el día de hoy a las 10 pm comenzara el examen final, entran todas las presentaciones y también lo de modelos ER. Así que  ahí estudian para sacar  buena nota. Y estén puntuales que no tendrá reposición.


Anuncio: "Buenas noches compañeros les recuerdo…"
Carlos Hernandez
Fecha de creación: 24 oct.24 oct.
Buenas noches compañeros les recuerdo que  el día de hoy a las 10 pm tendremos nuestro último examen corto entran las presentaciones 9 y 10.  El examen durará 15 minutos y se cerrar a las 10:15. Éxitos!!
1 comentario de clase

Cristofher Saquilmer24 oct.
Gracias


Anuncio: "Buenas tardes compañeros por este medio…"
Carlos Hernandez
Fecha de creación: 21 oct.21 oct.
Buenas tardes compañeros por este medio les hago la invitación al Webinar: Inteligencia Artificial aplicada en la predicción del florecimiento de algas nocivas. 22.Oct 6:30 p.m.
Por participar en esta actividad tendrá 5 puntos extras en el proyecto. Se estará creando un apartado en uedi para que suban una foto del inicio del webinar y otra del final  en ambas deben mostrar sus datos. Y si participaran es de carácter obligatorio llenar el formulario, las inscripciones  del webinar  terminan mañana a medio día.

Webinar: Inteligencia Artificial
https://docs.google.com/forms/d/e/1FAIpQLScyHuTbbeEKGtHldne24Xf-qZYCF8o7x4dnL_snTcZ3ErAa5Q/viewform?usp=sf_link

Webinar: Inteligencia Artificial aplicada en la prediccion del florecimiento de algas nocivas. 22.Oct 6:30 p.m.
https://www.promisan.com/webinars/registration.cfm

Andrea Palomo22 oct.
http://bit.ly/AfricaFlores


## Implementación de capacitor y generación de la aplicacion movil

* Instalación de capacitor
```bash
ng add @capacitor/angular
```

* Solucionar error 'spawn npx ENOENT' en Windows
```bash
npx cap init
```

* Modificar el webDir con la carpeta de salida del compilado de angular en el archivo capacitor.config.json 
```json
{
  "webDir" : "dist/GTSales"
}
```

* Preparación del entorno para android
```bash
npx cap add android
```

* Compilar Angular
```bash
ng build --prod --build-optimizer --output-hashing=none
```

* Compilar dist en android
```bash
npx cap sync 
npx cap copy
npx cap update
npx cap open
```

* Permitir solicitudes http en android
```xml
<application
  android:usesCleartextTraffic="true">
</application> 
```
README.md
Mostrando README.md.