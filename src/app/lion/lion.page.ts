import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicSlides, IonModal, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Huesped, Room, RoomV2, Comment } from '../models/huesped';
import { ActivatedRoute, Router } from '@angular/router';



import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';

@Component({
  selector: 'app-lion',
  templateUrl: './lion.page.html',
  styleUrls: ['./lion.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LionPage implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    loop: true
  };

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;

  animationInProgress = false;
  public lioncomments = [
    {
      name: 'Jorge',
      month: 'Junio 2023',
      comment: `"Un lugar limpio y tranquilo para pasar un buen fin de semana en familia"`,
      starts: 5
    }
    ,
    {
      name: 'Mauricio',
      month: 'Junio 2023',
      comment: `"El lugar es ideal para mascotas, muy amplio terreno para que los perros puedan disfrutar, el lugar está literalmente en frente de restaurantes y a pasos de tiendas de conveniencia
      La propiedad cuenta con árboles de mangos los cuales puedes disfrutar y llevar.
      Mariela fue super atenta, rápida para responder
      Muy buena experiencia"`,
      starts: 5
    }
    ,
    {
      name: 'Cynthia',
      month: 'Junio 2023',
      comment: '"Excelente lugar, tal como en fotos, limpio y con todas las comodidades. A unos cuantos pasos del acceso a la laguna, restaurantes muy cerca y muy bien ubicado. Ideal para pasar unos días en contacto con la naturaleza y poder descansar"',
      starts: 5
    }
    ,
    {
      name: 'Susana',
      month: 'Junio 2023',
      comment: '"Súper recomendado, en el lugar te hacían sentir como en casa, hasta pudimos recolectar ciruelas y mangos de lo arboles dentro de la propiedad, Perfecto para pasar unos días de tranquilidad y alejados de la ciudad. la atención de Mariela fue de primera incluso el encargado de la finca siempre muy amable y atento, definitivamente volveríamos."',
      starts: 5
    }
    ,
    {
      name: 'Christian',
      month: 'Abril 2023',
      comment: '"muy agradable lugar para un buen descanso de relax, Agusto con los colchones y con el servicio"',
      starts: 5
    }
    ,
    {
      name: 'Gabriela',
      month: 'Abril 2023',
      comment: '"Excelente servicio por mi anfitrión, estuvo al pendiente de mi llegada y mis necesidades, el lugar es excelente y claro que regresaremos pronto… 100% para pasar unos días de verdadero descanso…"',
      starts: 5
    }
    ,
    {
      name: 'Carmen',
      month: 'Abril 2023',
      comment: '"el alojamiento esta excelente! todo esta como nuevo. las camas comodisimas. tiene todo lo necesario para pasar una buena estancia. la ubicacion es buena. Con restaurantes cerca asi como tienditas. Mariela una anfitriona muy atenta."',
      starts: 5
    }
    ,
    {
      name: 'Ivan',
      month: 'Marzo 2023',
      comment: '"Depa bonito, tranquilo y limpio"',
      starts: 5
    }
    ,
    {
      name: 'Bolivar',
      month: 'Marzo 2023',
      comment: '"un lugar rodeado por naturaleza y paz, super tranquilo y que te recarga la pila. Aunque nuestra estancia fue breve definitivamente valió la pena, es un pequeño paraíso al alcance de la ciudad. Nuestra anfitriona siempre estuvo al pendiente de nosotros."',
      starts: 5
    }
    ,
    {
      name: 'Hector',
      month: 'Febrero 2023',
      comment: '"Excelente ubicación, limpieza y atención! Recomendado"',
      starts: 5
    }
    ,
    {
      name: 'Andrés',
      month: 'Enero 2023',
      comment: '"El lugar es muy bonito, pequeño pero muy acogedor. Las areas verdes son muy amplias y puedes andar por ahí caminando. La habitación muy limpia y nueva. Todo nos gustó"',
      starts: 5
    }
    ,
    {
      name: 'Nelly',
      month: 'Enero 2023',
      comment: '"Súper cómoda, un lugar muy agradable para desconectarse y realmente descansar"',
      starts: 5
    }
    ,
    {
      name: 'Jorge',
      month: 'Diciembre 2022',
      comment: '"Todo en excelente condición, regresaremos sin duda"',
      starts: 5
    }
    ,
    {
      name: 'Gerardo',
      month: 'Diciembre 2022',
      comment: '"La casa impecable en limpieza, todo parece nuevo. El lugar super tranquilo para estar en familia. Tiene zona para hacer fogata increíble. Sin duda regresaría pero con más familia"',
      starts: 5
    }
    ,
    {
      name: 'Alberto',
      month: 'Diciembre 2022',
      comment: '"Todo como esta en las fotos, mis dos perros les encanto porque pudieron correr estar en el aire libre, la estancia muy agusto, la gente amable, todo excelente"',
      starts: 5
    }
    ,
    {
      name: 'Cristina',
      month: 'Diciembre 2022',
      comment: '"muy accesible, muy limpio, excelente lugar"',
      starts: 5
    }
    ,
    {
      name: 'Juan',
      month: 'Noviembre 2022',
      comment: '"Lugar muy bonito, cómodo y bien ubicado en Santa Maria del Oro, ojalá podamos volver pronto"',
      starts: 5
    }
    ,
    {
      name: 'Carolina',
      month: 'Noviembre 2022',
      comment: '"Bonito, limpio y ordenado! Me ayudo con contactos de taxi y eso fue de gran ayuda para mi estadía!"',
      starts: 5
    }
    ,
    {
      name: 'Bety',
      month: 'Septiembre 2022',
      comment: `"El alojamiento de Mariela en la Laguna está súper ! muy bien ubicado, la habitación que nos tocó está prácticamente nueva. Es muy práctico que tiene su cocinetita al aire libre, puedes prepararte tu desayunito, etc. Tenía algunos menesteres básicos, como sal, azúcar, café, etc. lo que se agradece. Mariela accedió a todas nuestras peticiones, es flexible y muy atenta.

      Agradecemos sus atenciones y sin duda volveríamos, saludos!"`,
      starts: 5
    }
    ,
    {
      name: 'Mercedes',
      month: 'Agosto 2022',
      comment: `"Todo estuvo excelente, desde la comunicación con Mariela, que fue una excelente anfitriona, hasta todo lo que ofrece el Airbnb. Todo es tal cual como viene en las fotos; tiene espacios muy cómodos y la ubicación es muy buena. Tiene la ventaja de que tiene un tipo de convenio con el Restaurante Catalina que está casi enfrente de donde se ubica el Airbnb, y ahí te puedes meter a la laguna y hacer uso de los kayaks. 100% recomendado"`,
      starts: 5
    }
    ,
    {
      name: 'Cristina',
      month: 'Agosto 2022',
      comment: `"El bungalow se encuentra en un recinto precioso en medio de la naturaleza en el que hay otros alojamientos, pero a distancia suficiente unos de otros para mantener la privacidad. El alojamiento es nuevo y moderno, con todas las comodidades que necesitan. Está limpio y bien decorado y la terraza está divina y da un ambiente muy acogedor. Cruzando la calle está la laguna, restaurantes, tiendita y todo lo
      necesario.
      Nos ha gustado mucho y está a muy buen precio para todo lo q ofrece. Sin duda regresaría"`,
      starts: 5
    }
    ,
    {
      name: 'Rodrigo',
      month: 'Agosto 2022',
      comment: `"El lugar está en perfectas condiciones y bastante limpio. Todo se ve bastante cuidado. Es tal cual como se ve en la fotos. Los bungalows están muy bien ubicados cruzando la calle frente a la laguna. nos gustó muchísimo la atención del host y que es muy fácil comunicarse con ella. Teníamos un par de preguntas sobre dónde conseguir leña, y al momento nos envió a alguien con leña. Así mismo nos orientaron muy bien sobre las actividades que se pueden hacer en la laguna. Y tienen un Kayak que los huéspedes pueden utilizar si está disponible. Nos encantó todo! Totalmente recomendado y esperemos poder volver pronto."`,
      starts: 5
    }
    ,
    {
      name: 'Lisa',
      month: 'Julio 2022',
      comment: `"La habitación es muy limpia, bonita, confortable y cuenta con todos los servicios al igual que la cocina. Tiene todo lo necesario para cocinar.
      Hay muchas áreas verdes alrededor.
      Es fácil de llegar y cerca de la laguna y todas las actividades que se pueden realizar allí.
      Mariela siempre estuvo al pendiente de cualquier mensaje y es muy hospitalaria"`,
      starts: 5
    }
    ,
    {
      name: 'Mauricio',
      month: 'Junio 2022',
      comment: "excelente anfitrión, muy amable y atento",
      starts: 5
    }
    ,
    {
      name: 'Artur',
      month: 'Diciembre 2022',
      comment: `"We very much enjoyed our stay at Mariele's. If you want relaxing and peaceful surroundings with time to unwind this is a great spot"`,
      starts: 5
    }
  ]

  public elephantcomments = [

    {
      name: 'César',
      month: 'Junio 2023',
      comment: `"muy buena atención y muy lindo lugar, 100% recomendado!"`,
      starts: 5
    }
    ,
    {
      name: 'Catalina',
      month: 'Junio 2023',
      comment: `"Es un agradable lugar, con privacidad y seguridad, pero al mismo tiempo muy cerca de todo.
      Tiene árboles un frutales, en especial uno de mango que en temporada puedes deleitarlos.
      Seguramente regresaré..."`,
      starts: 5
    }
    ,
    {
      name: 'Gabriela',
      month: 'Mayo 2023',
      comment: `"me gustó mucho, la pasé super bien"`,
      starts: 5
    }
    ,
    {
      name: 'Sandra',
      month: 'Mayo 2023',
      comment: `"estaba muy bien ubicado , limpio la terraza mega agusto , buena privacidad ....10 de 10"`,
      starts: 5
    }
    ,
    {
      name: 'Juan Carlos',
      month: 'Mayo 2023',
      comment: `"Las instalaciones son iguales a la descripción que vienen en la página, es agradable, con una pequeña vista al lago y silencioso para un descanso optimo, Mariela es una excelente anfitriona y siempre nos brindo información para conocer mejor el lugar, sin duda volveríamos a visitalo"`,
      starts: 5
    }
    ,
    {
      name: 'Thai',
      month: 'Mayo 2023',
      comment: `"Mariela was very responsive and we were grateful for her tips -- she pointed us in the right direction when we wanted to know where to buy firewood!"`,
      starts: 5
    }
    ,
    {
      name: 'Dennis',
      month: 'Mayo 2023',
      comment: `"The bungalow is practically brand new. It was very clean and well furnished. The location is very nice, right at the entrance to La Laguna just across the road from the lake. We will definitely be going for a return stay."`,
      starts: 5
    }
    ,
    {
      name: 'Mara',
      month: 'Mayo 2023',
      comment: `"La atención de Mariela fue excelente.
      Tuvimos un inconveniente con la cerradura al llegar por lo que no pudimos acceder al bungalow elefante, al comunicarle a la anfitriona resolvió rápidamente el problema y nos ofreció otro bungalow dentro de la misma propiedad que cumplía con las características del alojamiento que habíamos rentado.
      Nuestra estancia fue muy agradable y placentera."`,
      starts: 5
    }
    ,
    {
      name: 'Priscila',
      month: 'Abril 2023',
      comment: `"Muy bien todo"`,
      starts: 5
    }
    ,
    {
      name: 'Kenneth',
      month: 'Abril 2023',
      comment: `"me sentí como en casa con esa habitación, tiene todo lo indispensable, además de todas las comodidades; el anfitrión es excelente, todo el tiempo está al pendiente y responde rápido los mensajes. no le batallas con nada, limpio, seguro, flexibilidad con el check in y el kayak está en excelentes condiciones, sin duda regresaré. lo único malo es que la recepción del teléfono no funciona y el internet es intermitente, de ahí en más unas muy buenas vacaciones"`,
      starts: 5
    }
    ,
    {
      name: 'Darián',
      month: 'Abril 2023',
      comment: `"Mariela siempre estuvo atenta y nos ayudó con todo lo que necesitamos.
      El lugar muy bonito y limpio, excelente para pasar el fin de semana"`,
      starts: 5
    }
    ,
    {
      name: 'Martha',
      month: 'Abril 2023',
      comment: `"El lugar es muy bonito y cómodo, tiene todo. Solo fue un poco difícil de llegar pero porque llegamos de noche y Santa María es un tanto oscuro. Pero eso no tiene que ver con el anfitrión, sonó con el lugar."`,
      starts: 5
    }
    ,
    {
      name: 'Mario',
      month: 'Abril 2023',
      comment: `"la anfitriona super amable y atenta, en el horario que establecía estuvo el alojamiento, están al pendiente los anfitriones para cualquier duda, y estaba todo ordenado, quizás solo me pasó a mi pero cuando solicite si podia colocarnos la alberca fueron y la quitaron, y la regadera cuando te balabas a veces se quitaba el agua caliente y salía fría, pero de ahí en más está excelente el lugar lo recomiendo"`,
      starts: 4
    }
    ,
    {
      name: 'Aldo',
      month: 'Abril 2023',
      comment: `"Muy bonito lugar,privado y con restaurantes y la laguna muy cerca"`,
      starts: 5
    }
    ,
    {
      name: 'Sofi',
      month: 'Marzo 2023',
      comment: `"el alojamiento es realmente hermoso, una excelente atención y hospitalidad por parte de los anfitriones, muy cálidos.
      las fotos tal cual el alojamiento, volvemos sin duda!
      gracias!"`,
      starts: 5
    }
    ,
    {
      name: 'Monica',
      month: 'Marzo 2023',
      comment: `"Muy bonito y cómodo lugar, mucha tranquilidad y privado. Al rededor muchos restaurantes y tiendas, todo muy agradable :)"`,
      starts: 5
    }
    ,
    {
      name: 'Ernesto',
      month: 'Marzo 2023',
      comment: `"Mariela es una excelente anfitriona siempre estuvo al pendiente y atenta a lo que se necesitará, el bungalow elefante es genial, cómodo, privado y bastante agradable, la pasamos muy bien."`,
      starts: 5
    }
    ,
    {
      name: 'Roseelene',
      month: 'Marzo 2023',
      comment: `"El lugar es tal cual en más fotos, tiene fácil acceso para entrar y salir, restaurantes cerca,
      El lugar es bonito y cómodo"`,
      starts: 5
    }
    ,
    {
      name: 'Itzel',
      month: 'Febrero 2023',
      comment: `"100% Recomendable! Un lugar bastante agradable, sin mencionar la atención que tuvieron con nosotros en todo momento, un lugar para relajarse, olvidarse de la rutina y sentirse como en casa.
      Sin duda volveremos."`,
      starts: 5
    }
    ,
    {
      name: 'Elba',
      month: 'Febrero 2023',
      comment: `"Es un lugar bastante agradable, tal cual las fotografías del lugar, bastante cómodo, la habitación muy limpia, y el personal del lugar tanto como Maricela siempre estuvieron al pendiente.
      Sin duda vale la pena"`,
      starts: 5
    }
    ,
    {
      name: 'Sarahi',
      month: 'Febrero 2023',
      comment: `"Hospedarnos en el bungalow Elefante fue una muy buena opción. Tiene todo lo necesario para pasar un buen fin de semana. Está super bien ubicado , a unos pasos de la laguna y de un restaurante. Puedes usar el kayak sin costo y el patio iluminado super lindo es un excelente lugar para encender una fogata.
      El cuarto es cómodo y limpio. Cuenta con agua caliente y bonita vista. Maricela contesto todas nuestras preguntas muy rápidamente."`,
      starts: 5
    }
    ,
    {
      name: 'Jenyfer',
      month: 'Febrero 2023',
      comment: `"Un lugar muy bonito para desconectarse y descansar. Lo recomiendo mucho"`,
      starts: 5
    }
    ,
    {
      name: 'Jose',
      month: 'Febrero 2023',
      comment: "Excelente lugar con mucha paz y tranquilidad súper acogedor",
      starts: 5
    }
    ,
    {
      name: 'Pedro',
      month: 'Enero 2023',
      comment: `"Muy bonito, y tranquilo para descansar, y relajarse"`,
      starts: 5
    }
    ,
    {
      name: 'Valentina',
      month: 'Enero 2023',
      comment: `"O no pudimos quedarnos más tiempo pero disfrutamos mucho nuestra estancia la vista el lugar gracias!"`,
      starts: 5
    }
    ,
    {
      name: 'Philip',
      month: 'Enero 2023',
      comment: `"Mariela es una anfitriona excepcional. Ella respondió rápidamente y fue muy comprensiva.

      El apartamento estaba limpio, nuevo y muy bien equipado con lo que necesitábamos para disfrutar de nuestro tiempo allí (incluido el kayak doble).
      
      Está ubicado cerca de muchos restaurantes, el agua y la entrada principal a la laguna, lo que facilitó la vida considerando que el camino alrededor de la laguna es pura terraceria y no está plano.
      
      Disfrutamos especialmente nuestro café de la mañana con vista al campo de agave al pie de la montaña cercana."`,
      starts: 5
    }
    ,
    {
      name: 'Ma Elena',
      month: 'Enero 2023',
      comment: `"impecable el lugar, muy buen gusto en los detalles interiores"`,
      starts: 5
    }
    ,
    {
      name: 'Yvone',
      month: 'Enero 2023',
      comment: `"Nos encantó el lugar y definitivamente volveríamos!
      Un plus es que te prestan el kayak cosa que otros lugares cobran y esta a unos pasos de los restaurantes y tiendas.
      
      100000%recomendado y gracias por recibirnos!"`,
      starts: 5
    }
    ,
    {
      name: 'El Ru',
      month: 'Diciembre 2022',
      comment: `"Ya la recomiendo, muy bonita la estancia"`,
      starts: 5
    }
    ,
    {
      name: 'Jonnathan',
      month: 'Noviembre 2022',
      comment: `"Lugar muy agradable, Mariela fue muy clara con las indicaciones y atentos por soluciones a detallitos mínimos"`,
      starts: 5
    }
    ,
    {
      name: 'Franco',
      month: 'Noviembre 2022',
      comment: `"Muy bien, todo atención y lugar"`,
      starts: 5
    }
    ,
    {
      name: 'Vibes',
      month: 'Octubre 2022',
      comment: `"Este lugar tiene todo! Los anfitriones han pensado en cada detalle para la comodidad de sus huéspedes y son muy atentos. Nosotros buscábamos un lugar de refugio de un huracán que llegaba a la costa. Hicimos la reservación a la última hora y llegamos con nuestros perritos. Los perritos estaban felices del lugar porque había mucho espacio para ellos. No puedo hacer un mejor recomendación para este lugar"`,
      starts: 5
    }
    ,
    {
      name: 'Ricardo',
      month: 'Octubre 2022',
      comment: `"todo excelente"`,
      starts: 5
    }
    ,
    {
      name: 'Fer',
      month: 'Septiembre 2022',
      comment: `"Una buena recomendación si quieres desconectarte de las redes, apreciar la naturaleza y que no incomode interactuar con bichos y animales característicos de campo, muy buen atención"`,
      starts: 4.8
    }
    ,
    {
      name: 'Antonio',
      month: 'Septiembre 2022',
      comment: `"Un lugar muy bonito, todo nos gustó mucho, definitivamente volveremos"`,
      starts: 5
    }
    ,
    {
      name: 'Marco',
      month: 'Septiembre 2022',
      comment: `"Un lugar muy agradable, las vistas del balcón muy lindas, excelente lugar para desconectarte pues en la laguna hay muy mala recepción de Internet. Excusa para leer y no hacer nada"`,
      starts: 4.7
    }
    ,
    {
      name: 'Eduardo',
      month: 'Septiembre 2022',
      comment: `"super es un lugar fantástico y la atención de es de primera supera todas las expectativas. y solo cursando a la calle puedes acceder al restaurante y ahí tienen kayak y una playita muy cómoda para bañarte agusto en la laguna"`,
      starts: 5
    }
    ,
    {
      name: 'Mercedes',
      month: 'Agosto 2022',
      comment: `"Todo estuvo excelente, desde la comunicación con Mariela, que fue una excelente anfitriona, hasta todo lo que ofrece el Airbnb. Todo es tal cual como viene en las fotos; tiene espacios muy cómodos y la ubicación es muy buena. Tiene la ventaja de que tiene un tipo de convenio con el Restaurante Catalina que está casi enfrente de donde se ubica el Airbnb, y ahí te puedes meter a la laguna y hacer uso de los kayaks. 100% recomendado"`,
      starts: 5
    }
    ,
    {
      name: 'Saúl',
      month: 'Agosto 2022',
      comment: `"Maravilloso lugar con acceso a la Laguna con sólo cruzar la calle, te prestan kayak para que aproveches la laguna y los anfitriones super atentos durante toda nuestra estancia, nos respondían muy rápido a todas nuestras dudas. definitivamente regresaremos"`,
      starts: 5
    }
    ,
    {
      name: 'Georgina',
      month: 'Julio 2022',
      comment: `"Todo perfecto, disfruté mucho mi estadía. Cuenta con todo lo necesario para pasar un excelente fin de semana en SAMAO. Súper cerca de la Laguna"`,
      starts: 5
    }
    ,
    {
      name: 'Jess',
      month: 'Enero 2023',
      comment: `"¡Un pequeño lugar perfecto para una escapada! Muchas gracias por la hospitalidad. Disfrutamos de nuestra estancia en este tranquilo pueblo"`,
      starts: 5
    }
    ,
    {
      name: 'Kate',
      month: 'Octubre 2022',
      comment: `"Qué bonito lago y me encanta este alojamiento. Nos recomendaron un delicioso restaurante para cenar y luego nos sentamos en nuestra terraza a jugar juegos (cortesía del Airbnb) mientras se ponía el sol.
      También tenía un kayak que podías usar, así que nos despertamos temprano y hicimos kayak alrededor de parte del lago, muy recomendable. Definitivamente volveremos a subir a este lugar, nos encantó"`,
      starts: 5
    }
    ,
    {
      name: 'Kevin',
      month: 'Septiembre 2022',
      comment: `"Amena"`,
      starts: 4.7
    }
    ,
    {
      name: 'David',
      month: 'Septiembre 2022',
      comment: `"Increíble estancia, llena de naturaleza y calidez local + ¡hay un kayak que puedes pedir prestado para nadar en la laguna"`,
      starts: 5
    }
    ,
    {
      name: 'Omar',
      month: 'Agosto 2022',
      comment: `"Increíble lugar! Gracias por todo"`,
      starts: 5
    }
  ]
  public spaces: Array<RoomV2> = new Array<RoomV2>;

  public selectedSpace: RoomV2 = null;
  public nameSpace: string;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.nameSpace = "";
    let lion: RoomV2 = {
      key: "lion",
      name: "Bungalow León",
      avatarimg: "../../assets/img/leon.png",
      price: "MXN$1,450.00",
      photoscreen: "../../assets/img/lion2.jpeg",
      photos: [
        "../../assets/img/lioncocina.jpeg",
        "../../assets/img/lionterraza.jpeg",
        "../../assets/img/lionbath.jpeg"
      ],
      slogan: '"Para disfrutar en familia..."',
      abstract: "Bungalow completo ideal para 4 personas",
      description: "1 habitación, 2 camas queen, 1 baño, terraza privada, comedor y cocina exterior",
      starts: 4.96,
      commentsqty: this.lioncomments.length.toString(),
      comments: this.lioncomments,
      color: "warning"
    }
    this.spaces.push(lion);

    let elephant: RoomV2 = {
      key: "elephant",
      name: "Bungalow Elefante",
      avatarimg: "../../assets/img/elefante.png",
      price: "MXN$1,150.00",
      photoscreen: "../../assets/img/elephant1.jpeg",
      photos: [
        "../../assets/img/elephant2.jpeg",
        "../../assets/img/elephant3.jpeg",
        "../../assets/img/lionbath.jpeg"
      ],
      slogan: '"Para disfrutar en pareja..."',
      abstract: "Bungalow completo ideal para 2 personas",
      description: "1 habitación, 1 cama king, 1 baño, terraza privada, comedor y cocina exterior",
      starts: 4.91,
      commentsqty: this.elephantcomments.length.toString(),
      comments: this.elephantcomments,
      color: "primary"
    }

    this.spaces.push(elephant);

    this.route.queryParams.subscribe(
      (params) => {
        if(this.router.getCurrentNavigation().extras.state) {
          this.nameSpace = this.router.getCurrentNavigation().extras.state["bungalow"];
          console.log(this.selectedSpace);
        } else {
          this.nameSpace = "elephant";
        }

        this.selectedSpace = this.spaces.filter(
          (place) => {
            return place.key === this.nameSpace;
          }
        )[0];

        this.selectedSpace.commentsqty
      }
    );

    console.log("Name space:"+this.nameSpace);

    //this.nameSpace = this.nameSpace ? this.nameSpace : "Bungalow León";


    
  }

  ngOnInit() {
  }

  // ionViewDidEnter() {
  //   console.log("ionViewDidEnter")
  //   this.animationInProgress = false;
  //   this.startAnimation();
  // }

  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave")
  //   this.animationInProgress = false;
  // }

  // startAnimation() {
  //   if (this.animationInProgress) return;
  //   this.animationInProgress = true;
  //   setTimeout(() => {
  //     this.swiperSlideShow.swiperRef.slideNext(500);
  //     this.animationInProgress = false;
  //     this.startAnimation();
  //   }, 2000);
  // }

}
