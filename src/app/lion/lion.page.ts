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
      starts: 5,
      commentsqty: "16",
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
      starts: 4.88,
      commentsqty: "26",
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
