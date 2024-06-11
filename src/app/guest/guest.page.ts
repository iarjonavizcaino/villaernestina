import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { IonicSlides, IonModal, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, SwiperOptions, Zoom, Navigation } from 'swiper';

import { Router, NavigationExtras } from '@angular/router';
import { RoomV2 } from '../models/huesped';

SwiperCore.use([Autoplay, IonicSlides]);


@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuestPage implements OnInit {

  public isContentload = false;

  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 5,
    //allowTouchMove: true,
    // pagination: {
    //   //el: ".swiper-pagination",
    //   type: "progressbar",
    //   //clickable: true,
    //   //enabled: true
    // },
    //navigation: true,

    //pagination: true,
    loop: true,
    //cssMode: true
    //,
    //direction: 'vertical'
  };

  config2: SwiperOptions = {
    slidesPerView: 1.1,
    spaceBetween: 0,
    // autoplay: {
    //   delay: 5000
    // },
    //allowTouchMove: true,
    // pagination: {
    //   //el: ".swiper-pagination",
    //   type: "progressbar",
    //   //clickable: true,
    //   //enabled: true

    // },
    //navigation: true,

    //pagination: true,
    //loop: true,
    //cssMode: true
    //,
    //direction: 'vertical'
  };

  public principalcomments = [
    {
      name: 'Roberto',
      month: 'Mayo 2024',
      comment: `"El Bungalow es genial, el cuarto es amplio y muy cómodo, en el exterior cuenta con un jardín con todo lo necesario (asador, fogata, sillas, camastros, kayaks), muy recomendable"`,
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
      name: 'Sussan',
      month: 'Octubre 2023',
      comment: `"Lugar muy bello, genial para niños con la piscina y el trampolin. Nos prestaron kayaks y el paseo por la laguna fue espectacular. Cuarto muy comodo y agradable terreno con lindas vistas."`,
      starts: 5
    },
  ]

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

  @ViewChild('swiperSlideShow') swiperSlideShow: SwiperComponent;
  @ViewChild('swiperSlideShow2') swiperSlideShow2: SwiperComponent;
  @ViewChild('colibri', { read: ElementRef }) colibri: ElementRef;

  scrollToSection() {
    this.colibri.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  // @ViewChild("lionmodal") lionmodal: IonModal;

  animationInProgress = false;
  public lion: RoomV2 = {
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
  // this.spaces.push(lion);

  public elephant: RoomV2 = {
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

  constructor(public translate: TranslateService, private router: Router) {
    
    // this.spaces.push(elephant);

  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
    //this.animationInProgress = false;
    this.isContentload = true;
    //this.swiperSlideShow.config = this.config;
    // this.startAnimation();
  }

  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave")
  //   this.animationInProgress = false;
  // }

  /*startAnimation() {
    if (this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiperSlideShow2.swiperRef.slideNext(500);
      this.animationInProgress = false;
      this.startAnimation();
    }, 2000);
  }*/

  public viewDetails(bungalow: string) {

    if(bungalow === "lion" || bungalow === "elephant"){
      let navigationExtras: NavigationExtras = {
        state: {
          bungalow: bungalow
        }
      };
      this.router.navigate(['/lion'], navigationExtras);
    } else if (bungalow === "colibri") {
      this.router.navigate(['/colibri']);
    }
  
    
  }

}
