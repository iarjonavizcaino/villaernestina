import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicSlides, IonModal, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Huesped, Room, RoomV2, Comment } from '../models/huesped';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';



import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom } from 'swiper';

@Component({
  selector: 'app-lion',
  templateUrl: './lion.page.html',
  styleUrls: ['./lion.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LionPage implements OnInit {

  // config: SwiperOptions = {
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   pagination: true,
  //   loop: true
  // };

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;

  animationInProgress = false;
  public lioncomments = [
    {
      name: 'Roberto',
      month: 'Mayo 2024',
      comment: `"El Bungalow es genial, el cuarto es amplio y muy cómodo, en el exterior cuenta con un jardín con todo lo necesario (asador, fogata, sillas, camastros, kayaks), muy recomendable"`,
      starts: 5
    },
    {
      name: 'J Jesús',
      month: 'Abril 2024',
      comment: `"Estamos sumamente complacidos con nuestra estancia. El lugar ofrece un ambiente de serenidad inigualable, equiparable a ningún otro. El personal se distingue por su amabilidad excepcional, y la habitación, por su impecable limpieza y confort. Sin lugar a dudas, planeamos regresar en el futuro. Expresamos nuestro sincero agradecimiento a la anfitriona, cuya atención y disponibilidad constante fueron invaluables. Nos honró profundamente hospedarnos en sus instalaciones"`,
      starts: 5
    },
    {
      name: 'Ileana',
      month: 'Abril 2024',
      comment: `"Todo excelente durante nuestra estancia, Mariela estuvo siempre muy al pendiente y toda la información fue clara, el lugar está muy cerca de la laguna lo que facilitó el acceso a ella, además de muy cómodo y con todo lo necesario para pasar unos días de descanso, muchas gracias!"`,
      starts: 5
    },
    {
      name: 'Paulo',
      month: 'Marzo 2024',
      comment: `"Excelente lugar para pasar unos días de descanso, muy buena ubicación que a pesar de no estar junto a la laguna si queda muy cerca y estás en un lugar muy tranquilo"`,
      starts: 5
    },
    {
      name: 'Francisco',
      month: 'Marzo 2024',
      comment: `"Excelente opción para descansar cerca de la Laguna de SAMAO, la pasamos muy bien la habitación muy comoda con muy buenas amenidades, disfrutamos del kayac y la alberca. Gracias a Mariela por estar atenta en nuestra estancia"`,
      starts: 5
    },
    {
      name: 'Karen',
      month: 'Febrero 2024',
      comment: `"¡Excelente ubicación y atención!"`,
      starts: 5
    },
    {
      name: 'Karen',
      month: 'Enero 2024',
      comment: `"Pasamos un fin de semana genial en el bungalow. Todo coincidió con los servicios ofrecidos y siempre nos trataron de una manera cordial y amigable. Definitivamente regresaremos ✨"`,
      starts: 5
    },
    {
      name: 'Clariza',
      month: 'Enero 2024',
      comment: `"Las instalaciones son hermosas y seguras, el bungalow es hermoso, súper cómodo, ideal para pasar en familia. Tiene área para hacer fogata lo cual a mi familia le encantó! Está a unos pasos de la laguna por lo que puedes disfrutar todo el día"`,
      starts: 5
    },
    {
      name: 'Yareli',
      month: 'Enero 2024',
      comment: `"El lugar y sus alrededores están muy bonitos. El conserje Martin fue super amable y estuvo al pendiente. Es un lugar ideal para conectarte con la naturaleza. Si buscan algo que comer, les recomiendo el restaurante Pacos, que está cercas de ahí"`,
      starts: 5
    },
    {
      name: 'Evelia',
      month: 'Noviembre 2023',
      comment: `"El lugar coincidía con las imágenes, unas vistas increíbles y varias actividades para los niños en la misma estancia, fácil acceso a la laguna justo enfrente de la estancia, todo estuvo increíble"`,
      starts: 5
    },
    {
      name: 'Ricardo',
      month: 'Noviembre 2023',
      comment: `"Excelente atención y un lugar muy bonito, gracias por las atenciones"`,
      starts: 5
    },
    {
      name: 'Amy',
      month: 'Octubre 2023',
      comment: `"Muy bien, nuestra estancia… Ubicación excelente, muy amables y atentos Muy cómodo el lugar"`,
      starts: 5
    },
    {
      name: 'Sussan',
      month: 'Octubre 2023',
      comment: `"Lugar muy bello, genial para niños con la piscina y el trampolin. Nos prestaron kayaks y el paseo por la laguna fue espectacular. Cuarto muy comodo y agradable terreno con lindas vistas."`,
      starts: 5
    },
    {
      name: 'Chrystian Viridiana',
      month: 'Octubre 2023',
      comment: `"Fue mucho más de lo que imaginamos un excelente lugar para relajarse lejos de la ciudad, la vista a los agaves es mágica, mucha vegetación, excelente trato siempre al pendiente, responde de inmediato, las persona que está a cargo de la estancia desde que llegamos muy amable el señor, acomedido, servicial, muy limpio el lugar recomendado al 100% no dan ganas de salir mucho menos de regresar a casa.
      Gracias"`,
      starts: 5
    },
    {
      name: 'Nubia Fabiola',
      month: 'Agosto 2023',
      comment: `"Excelente anfitriona y excelente lugar, mi estancia fue muy agradable, tanto que ni siquiera salí del lugar, siempre hay alguien al pendiente para cualquier eventualidad y son muy amables. Sin duda regreso."`,
      starts: 5
    },
    {
      name: 'Areli',
      month: 'Agosto 2023',
      comment: `"Tuvimos una excelente experiencia, Mariela siempre estuvo al pendiente. El depa estaba limpio y completamente funcional, todo estaba en perfecto estado, muy comodo y limpio. Nos prestaron gratuitamente un Kayac y chalecos, pudimos pasar un rato muy divertido en el lago. Hay un arbol de mangos junto al departamento, solo hizo que mejorar la experiencia de desayunar por las mañanas viendo al cerrito. Me encanto todo!"`,
      starts: 5
    },
    {
      name: 'Mariela',
      month: 'Julio 2023',
      comment: `"Impecable, coincide con las fotos, camas cómodas, jardín muy amplio, nos llevamos a nuestro perrito y la paso super. El intendente muy amable y servicial en todo momento. No está a pie de laguna pero está cruzando la calle, es muy cerca de la entrada principal, de los restaurantes y tiendas, un lugar seguro y tranquilo pero sobretodo muy limpio"`,
      starts: 5
    },
    {
      name: 'Jazmin',
      month: 'Julio 2023',
      comment: `"Un lugar muy bello, literal como se muestran en las fotos. El señor jardinero que nos recibió, en todo momento se porto muy amable, al igual que Mariela.
      Sin duda regresaría!"`,
      starts: 5
    },
    {
      name: 'Ariana',
      month: 'Julio 2023',
      comment: `"En lo personal me gusta leer reseñas de personas que viajan con niños. La descripción coincide con el alojamiento, en donde se anuncia que prestan un Kayak, eso y la piscina fue lo que me llevó a tomar la decisión de reservar ahí. A nuestra llegada veo que la piscina está inhabilitada, cosa que no me sorprendió puesto que había hecho la reservación para el mismo día. Pero mi sorpresa fue al siguiente día la alberca ya se estaba llenando de agua calientita. Con el Kayak nos divertimos mucho en la laguna. Por lo demás el lugar es muy confortable."`,
      starts: 5
    },
    {
      name: 'Alejandra',
      month: 'Julio 2023',
      comment: `"La estancia fue muy amena, el lugar es exactamente como en las fotos. Además, Mariela siempre fue muy amable y atenta a cualquier duda que tuviéramos, muy recomendado!"`,
      starts: 5
    },
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
      name: 'Vladimir',
      month: 'Mayo 2024',
      comment: `"gracias por recibirnos con nuestros perros, la alberca es muy disfrutable, el señor que se encarga del aseo del lugar es muy atento y hamable nos mostró donde estaban ubicados los kayaks y nos acompaño hasta la orilla del lago"`,
      starts: 5
    },
    {
      name: 'Claus',
      month: 'Mayo 2024',
      comment: `"Nos encantó. Pasamos un tiempo muy agradable. El alojamiento muy bonito, cerca de la laguna, de restaurantes y de tiendas. Todo al 100. Seguramente volvemos"`,
      starts: 5
    },
    {
      name: 'Paul',
      month: 'Marzo 2024',
      comment: `"This place was amazing. Between the mountains near the lake. Stunning view from the terrace and all the amenities you need. We were very pleasantly surprised"`,
      starts: 5
    },
    {
      name: 'Michelle',
      month: 'Febrero 2024',
      comment: `"El lugar es aún más bonito que en las fotos, se respira tranquilidad, las áreas son preciosas para salir y tomar al aire. Las instrucciones para llegar fueron claras así como me encanto las recomendaciones de su app y la rapidez para contestar. Me encanto que tiene servicio de kayak y chalecos salvavidas gratis, por lo cual no dudamos en aprovecharlos, el lugar esta súper cerca de la entrada y de todo puedes salir caminando tranquilamente, definitivamente es súper buena opción para desconectarte y pasar un buen rato!"`,
      starts: 5
    },
    {
      name: 'David',
      month: 'Enero 2024',
      comment: `"El lugar es muy tranquilo y agradable. Cerca de todo! Mariela siempre muy amable y atenta. La estancia cuenta con todo lo necesario"`,
      starts: 5
    },
    {
      name: 'Syamakanta',
      month: 'Septiembre 2023',
      comment: `"Todo estuvo de lujo volveríamos sin duda!
      La anfitriona súper amable y atenta en todo momento, muy recomendable!"`,
      starts: 5
    },
    {
      name: 'Manuel',
      month: 'Septiembre 2023',
      comment: `"Increíble lugar y la Villa impecable, gracias!.. regresamos pronto!, saludos!"`,
      starts: 5
    }
    ,
    {
      name: 'Israel',
      month: 'Septiembre 2023',
      comment: `"Me gustó mucho el lugar, super privado y tranquilo disfrutamos despertarnos tarde y sin ruido.
      justo como esperábamos para una estancia de detox del ajetreo de la ciudad.
      volvería a hospedarme en este lugar 100% y lo recomiendo mucho"`,
      starts: 5
    }
    ,
    {
      name: 'Cindy',
      month: 'Agosto 2023',
      comment: `"Los anfitriones siempre estuvieron al pendiente, el lugar muy limpio, tranquilo, zona segura, cómoda y agradable, internet algo intermitente.
      Nos gusto mucho
      Si volveríamos!"`,
      starts: 5
    }
    ,
    {
      name: 'Sonia',
      month: 'Agosto 2023',
      comment: `"Nuestra estancia fue buena, agusto, nos gustó mucho, descansamos y pasamos unos días muy relajados. Muy amable y atenta la anfitriona así como el personal que tienen en la casa para ver los imprevistos.
      Gracias Mariela!!"`,
      starts: 5
    }
    ,
    {
      name: 'Yazmin',
      month: 'Agosto 2023',
      comment: `"un lugar muy bonito para pasar momentos de relajación muy atento todo el personal sin duda volveré"`,
      starts: 5
    }
    ,
    {
      name: 'Natalia',
      month: 'Julio 2023',
      comment: `"Súper bien"`,
      starts: 5
    }
    ,
    {
      name: 'Cynthia',
      month: 'Julio 2023',
      comment: `"Es un lugar lindo, lleno de naturaleza y muy bien ubicado; perfecto para desconectarte y tener días a pasos de la laguna.
      Al rededor hay lugares para comer o si prefieres comprar alimentos en el pueblo y cocinarlos en el Airbnb tambien lo puedes hacer, el espacio cuenta con lo elemental para preparar algo simple.
      Destacable el WIFI, tiene una recepción eficiente y las fotos del anuncio coinciden con la realidad.
      Mariela fue muy amable y estuvo al pendiente de nuestra estancia. La habitación no es muy lujosa, pero tiene lo necesario para descansar con mucha comodidad."`,
      starts: 5
    }
    ,
    {
      name: 'Alfonso',
      month: 'Julio 2023',
      comment: `"Excelente alojamiento para aislarte un rato de la ciudad, con toda la privacidad y con una excelente anfitriona que sin contacto personal está pendiente de principio a fin."`,
      starts: 5
    }
    ,
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

  public imagesSlides = [
    '../../assets/img/lion/recamara.jpeg',
    '../../assets/img/lion/terraza.jpeg',
    '../../assets/img/lion/cocina.jpeg',
    '../../assets/img/lion/patio.jpeg',
    '../../assets/img/lion/fogata.jpeg',
    '../../assets/img/lion/banio.jpeg',
    '../../assets/img/lion/noche.jpeg',
    //'../../assets/img/elephant/sala.webp',
  ];

  public amenities = [
    {
      svg: `M29 2v10a2 2 0 0 1-1.66 1.97L27 14h-1.03l2.73 10.18a42.58 42.58 0 0 0 1.68-1.23l1.25 1.56A24.9 24.9 0 0 1 16 30 24.9 24.9 0 0 1 .78 24.83l-.4-.31 1.25-1.56c.61.5 1.25.95 1.91 1.38L7.45 10c-1.2 0-2.31.88-2.7 2.04L3.7 16H1.62l1.15-4.3A5 5 0 0 1 7.37 8H18.07l.04-.22a7 7 0 0 1 6.15-5.74l.25-.02.25-.02H25zM17 20v2h-2v-2h-4.1l-1.86 6.93A23.01 23.01 0 0 0 16 28a23 23 0 0 0 7.2-1.15L21.37 20zm-5-10H9.44L5.32 25.37c.6.32 1.2.6 1.83.87L9.36 18H15v-2.13a4 4 0 0 1-3-3.67zm15-6h-2.18a5 5 0 0 0-4.8 4.58L20 8.8V12a4 4 0 0 1-3 3.87V18h5.9l2.18 8.14a22.85 22.85 0 0 0 1.84-.89L23.36 12 22.3 8h2.07l1.07 4H27zm-9 6h-4v2a2 2 0 0 0 2 2c1.05 0 2-.9 2-2z`,
      title: 'Trampolin para niños'
    },
    {
      svg: `M28 2a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H4v15.5h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 18c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1v3h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 23c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1V28h24zm-6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z`,
      title: 'Acceso al lago a menos de un minuto a pie'
    },
    {
      svg: `M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z`,
      title: 'Cocina y utensilios básicos para cocinar'
    },
    {
      svg: `M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z`,
      title: 'Wifi'
    },
    {
      svg: `M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z`,
      title: 'Estacionamiento amplio y gratuito'
    },
    {
      svg: `M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z`,
      title: 'SmartTV 4K Ultra HD de 40" con MAX, Disney+, Netflix'
    },
    {
      svg: `M17 1v4.03l4.03-2.32 1 1.73L17 7.34v6.93l6-3.47V5h2v4.65l3.49-2.02 1 1.74L26 11.38l4.03 2.33-1 1.73-5.03-2.9L18 16l6 3.46 5.03-2.9 1 1.73L26 20.62l3.49 2.01-1 1.74L25 22.35V27h-2v-5.8l-6-3.47v6.93l5.03 2.9-1 1.73L17 26.97V31h-2v-4.03l-4.03 2.32-1-1.73 5.03-2.9v-6.93L9 21.2V27H7v-4.65l-3.49 2.02-1-1.74L6 20.62l-4.03-2.33 1-1.73L8 19.46 14 16l-6-3.46-5.03 2.9-1-1.73L6 11.38 2.51 9.37l1-1.74L7 9.65V5h2v5.8l6 3.47V7.34l-5.03-2.9 1-1.73L15 5.03V1z`,
      title: 'Aire acondicionado'
    },
    {
      svg: `M23 1a2 2 0 0 1 2 1.85V19h4v2h-2v8h2v2H3v-2h2v-8H3v-2h4V3a2 2 0 0 1 1.85-2H9zM9 21H7v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm-10-8H9v6h6zm8 0h-6v6h6zM15 3H9v8h6zm8 0h-6v8h6z`,
      title: 'Terraza'
    },
    {
      svg: `M16 1a5 5 0 0 1 5 5 5 5 0 0 1 0 10 5 5 0 0 1-4 4.9v4.29A9.04 9.04 0 0 1 23.95 22a8.94 8.94 0 0 1 3.74.81l.31.15v2.33A6.96 6.96 0 0 0 23.95 24a6.88 6.88 0 0 0-6.93 5.87l-.02.15v.1a1 1 0 0 1-.88.87L16 31a1 1 0 0 1-.97-.77l-.02-.12A6.95 6.95 0 0 0 7.97 24 6.96 6.96 0 0 0 4 25.23v-2.31a9.16 9.16 0 0 1 11 2.3V20.9a5 5 0 0 1-4-4.68V16h-.22a5 5 0 0 1 0-10H11v-.22A5 5 0 0 1 16 1zm2.86 14.1a4.98 4.98 0 0 1-5.72 0l-.07.23a3 3 0 1 0 5.85 0zM11 8a3 3 0 1 0 .67 5.93l.23-.07A4.98 4.98 0 0 1 11 11c0-1.06.33-2.05.9-2.86l-.23-.07A3.01 3.01 0 0 0 11 8zm10 0c-.23 0-.45.03-.67.07l-.23.07c.57.8.9 1.8.9 2.86a4.98 4.98 0 0 1-.9 2.86l.23.07A3 3 0 1 0 21 8zm-5 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-5a3 3 0 0 0-2.93 3.67l.07.23a4.98 4.98 0 0 1 5.72 0l.07-.23A3 3 0 0 0 16 3z`,
      title: 'Patio amplio'
    },
    {
      svg: `m15.59 1.91 1.02.8C22.17 7.04 25 11.46 25 15.98a8.99 8.99 0 0 1-.5 3.02H31v2h-2v9a1 1 0 0 1-.88 1H4a1 1 0 0 1-1-.88V21H1v-2h6.42c-.28-.9-.42-1.91-.42-3.01 0-2.25 1.1-4.82 3.27-7.75l.27-.35.55-.73 1.78 1.12L15.6 1.9zM27 21H5v8h22v-8zM16.4 5.1l-2.6 6.1-2.21-1.37-.17.24C9.87 12.3 9.07 14.2 9 15.77l-.01.21c0 1.1.17 2.04.48 2.85l.07.17h3a6.1 6.1 0 0 1-.05-.83c0-1.52.86-3.19 2.52-5.07l.24-.27.74-.81.74.8c1.82 2 2.76 3.76 2.76 5.35 0 .3-.02.57-.05.83h3.06l-.14-.07a6.7 6.7 0 0 0 .63-2.95c0-3.42-2.03-6.93-6.17-10.51l-.43-.36zm-.4 9.94-.08.1c-.9 1.14-1.36 2.11-1.41 2.88l-.01.15c0 .35.03.63.09.83h2.82c.06-.2.09-.48.09-.83 0-.79-.46-1.8-1.42-3.04l-.08-.1z`,
      title: 'Lugar para hacer fogata'
    },
    
    {
      svg: `M30.97 2.26a74.69 74.69 0 0 1-2.73 8.66c-1.63 4.26-3.45 7.41-5.85 10.06l1.46 1.46a3.48 3.48 0 0 1 3.95.46l2.16 2.14a3.48 3.48 0 0 1-4.77 5.06l-2.15-2.14a3.48 3.48 0 0 1-.6-4.1l-1.45-1.45c-4.67 4.4-11.37 7.38-18.83 8.58a1 1 0 0 1-1.13-1.21l.4-1.73C3.38 20.27 5.74 15.08 9.6 11L8.15 9.56A3.48 3.48 0 0 1 4.2 9.1L2.04 6.96A3.48 3.48 0 0 1 6.81 1.9l2.15 2.14a3.48 3.48 0 0 1 .6 4.1l1.46 1.47c4.52-4.06 11.16-7.02 18.78-8.59a1 1 0 0 1 1.17 1.24zm-6.51 22.2a1.48 1.48 0 0 0-.1 1.97l2.1 2.11a1.48 1.48 0 0 0 2.19-1.97l-2.1-2.11a1.48 1.48 0 0 0-2.1 0zM11 12.42c-3.46 3.68-5.67 8.4-7.48 15.5l-.2.83.17-.04c6.4-1.29 12.07-3.96 16.08-7.72L18 19.41l-1.3 1.3a3.83 3.83 0 0 1-5.25.15l-.16-.15a3.83 3.83 0 0 1-.15-5.26L12.58 14l-1.57-1.58zm2.99 3-1.3 1.29a1.83 1.83 0 0 0-.1 2.46l.1.12a1.83 1.83 0 0 0 2.47.12L16.6 18l-2.6-2.59zM28.6 3.3C22.8 4.7 16.9 7 12.4 11l8.5 8.5c3.71-4.08 5.7-9.3 7.24-14.57l.46-1.63zm-6.7 6.8a3.83 3.83 0 0 1 .15 5.26L20.9 16.5l-1.41-1.41.99-.99a1.83 1.83 0 0 0 .1-2.46l-.1-.12a1.83 1.83 0 0 0-2.47-.12l-1.1 1.1-1.42-1.41.99-.99a3.83 3.83 0 0 1 5.41 0zM3.46 3.46a1.48 1.48 0 0 0-.1 1.97l2.1 2.11a1.48 1.48 0 0 0 2.19-1.97l-2.1-2.11a1.48 1.48 0 0 0-2.1 0z`,
      title: 'Kayak gratis'
    },
    {
      svg: `M25 1a2 2 0 0 1 2 1.85V29a2 2 0 0 1-1.85 2H7a2 2 0 0 1-2-1.85V3a2 2 0 0 1 1.85-2H7zm0 10H7v18h18zm-15 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM25 3H7v6h18zM10 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z`,
      title: 'Refrigerador'
    },
    {
      svg: `M29 3a2 2 0 0 1 2 1.85V27a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V5a2 2 0 0 1 1.85-2H3zm0 2H3v22h26zm-6 2v18H5V7zm-2 2H7v14h3a4.97 4.97 0 0 1-1-2.72V17h10v3a4.98 4.98 0 0 1-1 3h3zm-4 10h-6v1a3 3 0 0 0 2.65 2.98l.17.01.18.01a3 3 0 0 0 3-2.82V20zm9-8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z`,
      title: 'Microondas'
    },
    {
      svg: `M27 0a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V2a2 2 0 0 1 1.85-2H5zm0 2H5v26h22zm-3 22a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5.33 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5.34 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM8 24a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm13-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM21 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z`,
      title: 'Estufa'
    },
    {
      svg: `M29 15v16h-2v-6h-6v6h-2v-6.15a2 2 0 0 1 1.84-1.84L21 23h6v-8zM5 15v8h6a2 2 0 0 1 2 1.85V31h-2v-6H5v6H3V15zM16 1a15 15 0 0 1 13.56 8.57 1 1 0 0 1-.8 1.42l-.1.01H17v8h8v2h-8v10h-2V21H7v-2h8v-8H3.35a1 1 0 0 1-.95-1.32l.04-.1A15 15 0 0 1 16 1zm0 2A13 13 0 0 0 5.4 8.47l-.2.28-.16.25h21.92l-.17-.25a13 13 0 0 0-10.1-5.73L16.34 3z`,
      title: 'Muebles exteriores'
    },
    
    {
      svg: `M13 2h2c0 2.06-.48 3.34-1.77 5.42l-.75 1.19C11.6 10 11.2 10.9 11.06 12H9.04c.1-1.07.38-1.97.9-3H6a10 10 0 0 0 20 .28V9h-3.77a7.44 7.44 0 0 0-1.17 3h-2.02c.15-1.61.71-2.84 1.91-4.73l.57-.88c1.11-1.79 1.47-2.78 1.47-4.4h2c0 1.93-.4 3.17-1.5 5L28 7v2c0 .68-.06 1.35-.17 2H30v2h-2.68a12.04 12.04 0 0 1-5.9 6.7l4.5 9.89-1.83.82-2-4.41H17v4h-2v-4H9.92L7.9 30.41l-1.82-.82 4.49-9.88A12.04 12.04 0 0 1 4.68 13H2v-2h2.17A12.06 12.06 0 0 1 4 9.3V7h7.13l.39-.6c1.11-1.8 1.47-2.8 1.47-4.4zm-.57 18.46L10.83 24H15v-3.04a11.95 11.95 0 0 1-2.57-.5zm4.57.5V24h4.17l-1.6-3.54c-.69.21-1.4.37-2.13.45zM18 2h2c0 2.06-.48 3.35-1.77 5.42l-.75 1.19C16.6 10 16.2 10.9 16.06 12h-2.02c.15-1.62.71-2.84 1.91-4.74l.57-.88C17.63 4.6 17.99 3.61 17.99 2z`,
      title: 'Asador'
    },
    
    {
      svg: `M25 2a1 1 0 0 1 .94.65l.03.1 1 4A1 1 0 0 1 26.11 8L26 8h-9v2h-2V8H5v20h3a5 5 0 0 1-.72-4.66l.1-.26 2.52-6.04-1.8-3.6a1 1 0 0 1 .78-1.43L9 12h14a1 1 0 0 1 .94 1.34l-.05.1L22.62 16H24a5 5 0 0 1 5 4.78V25h-2v-4a3 3 0 0 0-2.82-3H22.5l2.12 5.08A5 5 0 0 1 24 28h3v2H4a1 1 0 0 1-1-.88V3a1 1 0 0 1 .88-1H4zM12.65 22a6.64 6.64 0 0 0-2.91.63l-.5 1.22a3 3 0 0 0-.2.68l-.03.23L9 25a3 3 0 0 0 2.82 3h8.19l.23-.01a3 3 0 0 0 2.6-2.02c-1.7-.12-2.93-.67-4.84-1.9l-.37-.23c-2.14-1.4-3.18-1.84-4.98-1.84zm7.68-4h-8.66l-.92 2.19a9.06 9.06 0 0 1 1.9-.19c2.19 0 3.51.52 5.75 1.95l.38.25c1.74 1.13 2.74 1.62 4.03 1.76l-.04-.11zm1.05-4H10.62l1 2h8.76zm2.84-10H5v2h19.72z`,
      title: 'Cafetera y café de cortesía'
    },
    {
      svg: `M23 1a1 1 0 0 1 1 .88V6l-.02.2-2.9 14.53a5 5 0 0 1 2.31 3.4l.04.25.56 4.5a1 1 0 0 1-.87 1.11L23 30H9a1 1 0 0 1-1-1v-.12l.57-4.5a5 5 0 0 1 2.36-3.65L8.18 7H7a1 1 0 0 0-1 .88V15H4V8a3 3 0 0 1 2.82-3H8V2a1 1 0 0 1 .88-1H23zm-9.5 21a3 3 0 0 0-2.92 2.45l-.03.18-.42 3.37h11.74l-.42-3.37a3 3 0 0 0-2.62-2.6L18.5 22h-5zm2.5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5.78-17H10.22l2.6 13H15v-9h2v9h2.18l2.6-13zM22 3H10v2h12V3z`,
      title: 'Licuadora'
    },
    {
      svg: `m9.24 3-.2.4a20.37 20.37 0 0 0-1.7 5.02v.03A9 9 0 0 1 10.16 8c2.26 0 4.44.84 6.12 2.4l.24.24a6.98 6.98 0 0 0 4.95 2.05 6.99 6.99 0 0 0 3.53-.95v-.23a19.57 19.57 0 0 0-2.04-8.1l-.2-.41H9.24zm.92 7a7 7 0 0 0-3.11.73C7 11.15 7 11.57 7 12a9 9 0 0 0 9 9c4.06 0 7.7-3.14 8.72-6.92a9 9 0 0 1-3.25.6 8.98 8.98 0 0 1-6.13-2.4l-.23-.23A6.97 6.97 0 0 0 10.16 10zm13.8-9 .29.52A21.78 21.78 0 0 1 27 12c0 5.4-4.53 10.4-10 10.95V29h6v2H9v-2h6v-6.04A11 11 0 0 1 5 12c0-3.6.92-7.09 2.75-10.48L8.04 1h15.92z`,
      title: 'Copas'
    },
    
    {
      svg: `M26 3a5 5 0 0 1 5 4.78V24a5 5 0 0 1-4.78 5H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H6zm0 2H6a3 3 0 0 0-3 2.82V24a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3zm-7 4v4h4v6h-4v4h-6v-4H9v-6h4V9zm-2 2h-2v4h-4v2h4v4h2v-4h4v-2h-4z`,
      title: 'Botiquín'
    },
  ]

  expanded: boolean = false;

  public loveMessage: string = "Hola Mariela, me interesa el Bungalow León, me podrías proporcionar más información";

  public currentIndex: number = 0;

  public config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0
  };

  constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController) {

    // this.nameSpace = "";
    // let lion: RoomV2 = {
    //   key: "lion",
    //   name: "Bungalow León",
    //   avatarimg: "../../assets/img/leon.png",
    //   price: "MXN$1,450.00",
    //   photoscreen: "../../assets/img/lion2.jpeg",
    //   photos: [
    //     "../../assets/img/lioncocina.jpeg",
    //     "../../assets/img/lionterraza.jpeg",
    //     "../../assets/img/lionbath.jpeg"
    //   ],
    //   slogan: '"Para disfrutar en familia..."',
    //   abstract: "Bungalow completo ideal para 4 personas",
    //   description: "1 habitación, 2 camas queen, 1 baño, terraza privada, comedor y cocina exterior",
    //   starts: 4.92,
    //   commentsqty: this.lioncomments.length.toString(),
    //   comments: this.lioncomments,
    //   color: "warning"
    // }
    // this.spaces.push(lion);

    // let elephant: RoomV2 = {
    //   key: "elephant",
    //   name: "Bungalow Elefante",
    //   avatarimg: "../../assets/img/elefante.png",
    //   price: "MXN$1,150.00",
    //   photoscreen: "../../assets/img/elephant1.jpeg",
    //   photos: [
    //     "../../assets/img/elephant2.jpeg",
    //     "../../assets/img/elephant3.jpeg",
    //     "../../assets/img/lionbath.jpeg"
    //   ],
    //   slogan: '"Para disfrutar en pareja..."',
    //   abstract: "Bungalow completo ideal para 2 personas",
    //   description: "1 habitación, 1 cama king, 1 baño, terraza privada, comedor y cocina exterior",
    //   starts: 4.93,
    //   commentsqty: this.elephantcomments.length.toString(),
    //   comments: this.elephantcomments,
    //   color: "primary"
    // }

    // this.spaces.push(elephant);

    // this.route.queryParams.subscribe(
    //   (params) => {
    //     if(this.router.getCurrentNavigation().extras.state) {
    //       this.nameSpace = this.router.getCurrentNavigation().extras.state["bungalow"];
    //       console.log(this.selectedSpace);
    //     } else {
    //       this.nameSpace = "elephant";
    //     }

    //     this.selectedSpace = this.spaces.filter(
    //       (place) => {
    //         return place.key === this.nameSpace;
    //       }
    //     )[0];

    //     this.selectedSpace.commentsqty
    //   }
    // );

    // console.log("Name space:"+this.nameSpace);

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

  goToGuest() {
    this.navCtrl.navigateRoot('/guest', {replaceUrl:true});
  }

  onSlideChange() {
    this.currentIndex = this.swiperSlideShow.swiperRef.activeIndex;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
