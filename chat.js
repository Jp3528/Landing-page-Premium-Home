(() => {

  "use strict";


  /* =====================================
     DATOS DE LAS PROPIEDADES
  ====================================== */

  const properties = {

    "villa-moderna": {

      name:
        "Villa moderna",

      location:
        "La Molina, Lima",

      district:
        "La Molina",

      price:
        "$50,000",

      bedrooms:
        4,

      bathrooms:
        3,

      area:
        "320 m²",

      status:
        "Disponible",

      image:
        "img/1.png",

      description:
        "Villa luminosa con piscina, jardín privado y zona social integrada."

    },


    "residencial-lujoso": {

      name:
        "Residencial lujoso",

      location:
        "San Isidro, Lima",

      district:
        "San Isidro",

      price:
        "$20,000",

      bedrooms:
        3,

      bathrooms:
        2,

      area:
        "240 m²",

      status:
        "Nuevo",

      image:
        "img/2.png",

      description:
        "Propiedad privada cerca de parques, comercios y vías principales."

    },


    "mansion-lujosa": {

      name:
        "Mansión lujosa",

      location:
        "Casuarinas, Lima",

      district:
        "Casuarinas",

      price:
        "$700,000",

      bedrooms:
        6,

      bathrooms:
        5,

      area:
        "680 m²",

      status:
        "Premium",

      image:
        "img/3.png",

      description:
        "Residencia con terraza, jardín amplio y acabados de alta gama."

    },


    "casa-familiar": {

      name:
        "Casa familiar premium",

      location:
        "Surco, Lima",

      district:
        "Surco",

      price:
        "$135,000",

      bedrooms:
        5,

      bathrooms:
        4,

      area:
        "410 m²",

      status:
        "Oportunidad",

      image:
        "img/4.png",

      description:
        "Casa amplia con sala doble, estudio y patio ideal para reuniones."

    }

  };


  /* =====================================
     PALABRAS PARA IDENTIFICAR PROPIEDADES
  ====================================== */

  const aliases = {

    "villa-moderna": [
      "villa",
      "villa moderna",
      "molina",
      "la molina",
      "ph-001"
    ],

    "residencial-lujoso": [
      "residencial",
      "residencial lujoso",
      "san isidro",
      "ph-002"
    ],

    "mansion-lujosa": [
      "mansion",
      "mansión",
      "mansion lujosa",
      "mansión lujosa",
      "casuarinas",
      "ph-003"
    ],

    "casa-familiar": [
      "casa familiar",
      "casa familiar premium",
      "surco",
      "ph-004"
    ]

  };


  /* =====================================
     UTILIDADES
  ====================================== */

  const $ = (
    selector,
    root = document
  ) => root.querySelector(selector);


  const $$ = (
    selector,
    root = document
  ) => [
    ...root.querySelectorAll(selector)
  ];


  const normalize = (
    value = ""
  ) => {

    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .trim();

  };


  /* =====================================
     IMAGEN DE RESPALDO
  ====================================== */

  $$("img").forEach(
    (img) => {

      img.addEventListener(

        "error",

        () => {

          if (
            img.dataset.fallbackApplied
          ) {
            return;
          }

          img.dataset.fallbackApplied =
            "true";


          const label =
            img.alt ||
            "PremiumHome";


          const cleanLabel =
            label.replace(
              /[&<>]/g,
              ""
            );


          const svg = `

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1200"
              height="800"
              viewBox="0 0 1200 800"
            >

              <defs>

                <linearGradient
                  id="g"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >

                  <stop
                    stop-color="#15372f"
                  />

                  <stop
                    offset="1"
                    stop-color="#2b6655"
                  />

                </linearGradient>

              </defs>

              <rect
                width="1200"
                height="800"
                fill="url(#g)"
              />

              <path
                d="M320 470 600 250l280 220v190H690V525H510v135H320Z"
                fill="#d8ad61"
                opacity=".72"
              />

              <text
                x="600"
                y="730"
                text-anchor="middle"
                fill="white"
                font-family="Arial, sans-serif"
                font-size="34"
              >
                ${cleanLabel}
              </text>

            </svg>

          `;


          img.src =
            `data:image/svg+xml;charset=UTF-8,${
              encodeURIComponent(svg)
            }`;

        },

        {
          once:
            true
        }

      );

    }
  );


  /* =====================================
     MENÚ RESPONSIVE
  ====================================== */

  const menuToggle =
    $("#menu-toggle");


  const navPanel =
    $("#nav-links");


  menuToggle?.addEventListener(

    "click",

    () => {

      const open =
        navPanel.classList.toggle(
          "open"
        );


      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }

  );


  $$("#nav-links a").forEach(

    (link) => {

      link.addEventListener(

        "click",

        () => {

          navPanel?.classList.remove(
            "open"
          );


          menuToggle?.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      );

    }

  );


  /* =====================================
     FILTROS DE PROPIEDADES
  ====================================== */

  const search =
    $("#property-search");


  const district =
    $("#district-filter");


  const bedroom =
    $("#bedroom-filter");


  const cards =
    $$(".propiedad-card");


  const count =
    $("#property-count");


  const empty =
    $("#property-empty");


  function filterProperties() {

    const query =
      normalize(
        search?.value
      );


    const selectedDistrict =
      normalize(
        district?.value
      );


    const minBedrooms =
      bedroom?.value === "all"
        ? 0
        : Number(
            bedroom?.value ||
            0
          );


    let visible =
      0;


    cards.forEach(

      (card) => {

        const haystack =
          normalize(
            `${
              card.dataset.name
            } ${
              card.dataset.district
            } ${
              card.textContent
            }`
          );


        const districtMatches =
          selectedDistrict === "all" ||
          normalize(
            card.dataset.district
          ) ===
          selectedDistrict;


        const bedroomsMatch =
          Number(
            card.dataset.bedrooms ||
            0
          ) >=
          minBedrooms;


        const textMatches =
          !query ||
          haystack.includes(
            query
          );


        const show =
          districtMatches &&
          bedroomsMatch &&
          textMatches;


        card.hidden =
          !show;


        if (show) {
          visible += 1;
        }

      }

    );


    if (count) {

      count.textContent =
        `${visible} ${
          visible === 1
            ? "propiedad disponible"
            : "propiedades disponibles"
        }`;

    }


    if (empty) {

      empty.hidden =
        visible !== 0;

    }

  }


  [
    search,
    district,
    bedroom
  ].forEach(

    (control) => {

      control?.addEventListener(
        "input",
        filterProperties
      );

    }

  );


  $("#clear-filters")
    ?.addEventListener(

      "click",

      () => {

        if (search) {
          search.value =
            "";
        }


        if (district) {
          district.value =
            "all";
        }


        if (bedroom) {
          bedroom.value =
            "all";
        }


        filterProperties();

      }

    );


  /* =====================================
     FAVORITOS
  ====================================== */

  $$(".favorite-button")
    .forEach(

      (button) => {

        button.addEventListener(

          "click",

          () => {

            const active =
              button.classList.toggle(
                "active"
              );


            button.textContent =
              active
                ? "♥"
                : "♡";


            button.setAttribute(
              "aria-pressed",
              String(active)
            );

          }

        );

      }

    );


  /* =====================================
     MODAL DE PROPIEDAD
  ====================================== */

  const dialog =
    $("#property-dialog");


  let activePropertyKey =
    null;


  function openProperty(key) {

    const property =
      properties[key];


    if (
      !property ||
      !dialog
    ) {
      return;
    }


    activePropertyKey =
      key;


    const image =
      $("#dialog-image");


    image.src =
      property.image;


    image.alt =
      property.name;


    $("#dialog-status")
      .textContent =
      property.status;


    $("#dialog-location")
      .textContent =
      property.location;


    $("#dialog-title")
      .textContent =
      property.name;


    $("#dialog-price")
      .textContent =
      property.price;


    $("#dialog-description")
      .textContent =
      property.description;


    $("#dialog-features")
      .innerHTML = `

        <li>
          <strong>
            ${property.bedrooms}
          </strong>

          dormitorios
        </li>

        <li>
          <strong>
            ${property.bathrooms}
          </strong>

          baños
        </li>

        <li>
          <strong>
            ${property.area}
          </strong>

          área
        </li>

      `;


    dialog.showModal();

  }


  $$(".property-action")
    .forEach(

      (button) => {

        button.addEventListener(

          "click",

          () => {

            openProperty(
              button.dataset.property
            );

          }

        );

      }

    );


  $("#dialog-close")
    ?.addEventListener(

      "click",

      () => {

        dialog?.close();

      }

    );


  dialog?.addEventListener(

    "click",

    (event) => {

      if (
        event.target === dialog
      ) {

        dialog.close();

      }

    }

  );


  /* =====================================
     FORMULARIO
  ====================================== */

  function prefillContact(
    key,
    source = "property"
  ) {

    const property =
      properties[key];


    if (!property) {
      return;
    }


    const select =
      $("#property-interest");


    const message =
      $("#message");


    if (select) {

      select.value =
        property.name;

    }


    if (message) {

      message.value =
        `Estoy interesado/a en ${
          property.name
        } (${
          property.location
        }) y quisiera coordinar una visita.`;

    }


    dialog?.close();


    document
      .querySelector(
        "#contacto"
      )
      ?.scrollIntoView(
        {
          behavior:
            "smooth"
        }
      );


    if (
      source === "chat"
    ) {

      addBotMessage(
        `Perfecto. Dejé seleccionado “${property.name}” en el formulario de contacto. Solo completa tu nombre y correo.`
      );

    }

  }


  $("#dialog-contact")
    ?.addEventListener(

      "click",

      () => {

        if (
          activePropertyKey
        ) {

          prefillContact(
            activePropertyKey
          );

        }

      }

    );


  $("#dialog-chat")
    ?.addEventListener(

      "click",

      () => {

        if (
          !activePropertyKey
        ) {
          return;
        }


        dialog?.close();


        setChatContext(
          activePropertyKey
        );


        openChat();


        addBotMessage(
          `Hablemos de ${
            properties[
              activePropertyKey
            ].name
          }. Puedes preguntarme por precio, dormitorios, baños, área, ubicación o visita.`
        );


        addQuickReplies([
          [
            "Precio",
            "context-price"
          ],
          [
            "Características",
            "context-features"
          ],
          [
            "Agendar visita",
            "context-visit"
          ]
        ]);

      }

    );


  $("#contact-form")
    ?.addEventListener(

      "submit",

      (event) => {

        event.preventDefault();


        const feedback =
          $("#contact-feedback");


        if (feedback) {

          feedback.textContent =
            "Solicitud registrada en esta demostración. Conecta este formulario a tu backend para enviarla realmente.";


          feedback.className =
            "form-feedback success";

        }

      }

    );


  /* =====================================
     CHATBOT
  ====================================== */

  const chatToggle =
    $("#chatbot-toggle");


  const chatBox =
    $("#chatbot-box");


  const chatClose =
    $("#chatbot-close");


  const chatMessages =
    $("#chatbot-messages");


  const chatForm =
    $("#chatbot-form");


  const chatInput =
    $("#chatbot-input");


  const contextBar =
    $("#chat-context");


  const contextName =
    $("#chat-context-name");


  let chatContextKey =
    null;


  /* =====================================
     ABRIR / CERRAR CHAT
  ====================================== */

  function openChat() {

    if (!chatBox) {
      return;
    }


    chatBox.hidden =
      false;


    chatToggle?.setAttribute(
      "aria-expanded",
      "true"
    );


    setTimeout(
      () => {

        chatInput?.focus();

      },
      60
    );

  }


  function closeChat() {

    if (!chatBox) {
      return;
    }


    chatBox.hidden =
      true;


    chatToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  chatToggle?.addEventListener(

    "click",

    () => {

      if (
        chatBox?.hidden
      ) {

        openChat();

      } else {

        closeChat();

      }

    }

  );


  chatClose?.addEventListener(
    "click",
    closeChat
  );


  $$("[data-open-chat]")
    .forEach(

      (button) => {

        button.addEventListener(
          "click",
          openChat
        );

      }

    );


  /* =====================================
     MENSAJES DEL CHAT
  ====================================== */

  function addMessage(
    text,
    type = "bot"
  ) {

    const wrap =
      document.createElement(
        "div"
      );


    wrap.className =
      `${
        type === "user"
          ? "user-message"
          : "bot-message"
      } message`;


    const paragraph =
      document.createElement(
        "p"
      );


    paragraph.textContent =
      text;


    wrap.appendChild(
      paragraph
    );


    chatMessages?.appendChild(
      wrap
    );


    if (chatMessages) {

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

    }


    return wrap;

  }


  const addBotMessage =
    (text) => {

      return addMessage(
        text,
        "bot"
      );

    };


  const addUserMessage =
    (text) => {

      return addMessage(
        text,
        "user"
      );

    };


  /* =====================================
     RESPUESTAS RÁPIDAS
  ====================================== */

  function addQuickReplies(
    items
  ) {

    if (!chatMessages) {
      return;
    }


    const group =
      document.createElement(
        "div"
      );


    group.className =
      "quick-replies";


    items.forEach(

      ([
        label,
        action,
        key
      ]) => {

        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";


        button.textContent =
          label;


        button.dataset.chatAction =
          action;


        if (key) {

          button.dataset.property =
            key;

        }


        group.appendChild(
          button
        );

      }

    );


    chatMessages.appendChild(
      group
    );


    chatMessages.scrollTop =
      chatMessages.scrollHeight;

  }


  /* =====================================
     LISTADO DE PROPIEDADES EN CHAT
  ====================================== */

  function addPropertyMiniList() {

    if (!chatMessages) {
      return;
    }


    const list =
      document.createElement(
        "div"
      );


    list.className =
      "property-mini-list";


    Object
      .entries(properties)
      .forEach(

        ([
          key,
          property
        ]) => {

          const button =
            document.createElement(
              "button"
            );


          button.type =
            "button";


          button.dataset.chatAction =
            "select-property";


          button.dataset.property =
            key;


          const name =
            document.createElement(
              "span"
            );


          name.textContent =
            `${property.name} · ${property.district}`;


          const price =
            document.createElement(
              "strong"
            );


          price.textContent =
            property.price;


          button.append(
            name,
            price
          );


          list.appendChild(
            button
          );

        }

      );


    chatMessages.appendChild(
      list
    );


    chatMessages.scrollTop =
      chatMessages.scrollHeight;

  }


  /* =====================================
     CONTEXTO DE LA PROPIEDAD
  ====================================== */

  function setChatContext(
    key
  ) {

    const property =
      properties[key];


    if (!property) {
      return;
    }


    chatContextKey =
      key;


    contextName.textContent =
      property.name;


    contextBar.hidden =
      false;

  }


  function clearChatContext() {

    chatContextKey =
      null;


    contextBar.hidden =
      true;


    contextName.textContent =
      "";

  }


  $("#clear-context")
    ?.addEventListener(

      "click",

      clearChatContext

    );


  /* =====================================
     DETECTAR PROPIEDAD
  ====================================== */

  function detectProperty(
    text
  ) {

    const clean =
      normalize(text);


    const matches =
      [];


    Object
      .entries(aliases)
      .forEach(

        ([
          key,
          terms
        ]) => {

          const found =
            terms.some(

              (term) => {

                return clean.includes(
                  normalize(term)
                );

              }

            );


          if (found) {

            matches.push(
              key
            );

          }

        }

      );


    return [
      ...new Set(matches)
    ];

  }


  function hasAny(
    text,
    terms
  ) {

    const clean =
      normalize(text);


    return terms.some(

      (term) => {

        return clean.includes(
          normalize(term)
        );

      }

    );

  }


  /* =====================================
     RESUMEN DE PROPIEDAD
  ====================================== */

  function propertySummary(
    key
  ) {

    const property =
      properties[key];


    return (
      `${property.name} está en ${property.location}. ` +
      `Precio publicado: ${property.price}. ` +
      `Tiene ${property.bedrooms} dormitorios, ` +
      `${property.bathrooms} baños y ${property.area}. ` +
      property.description
    );

  }


  /* =====================================
     RESPONDER SOBRE PROPIEDAD SELECCIONADA
  ====================================== */

  function answerForProperty(
    key,
    text
  ) {

    const property =
      properties[key];


    if (
      hasAny(
        text,
        [
          "precio",
          "cuanto",
          "cuánto",
          "costo",
          "vale",
          "costar"
        ]
      )
    ) {

      return (
        `${property.name} tiene un precio publicado de ${property.price}.`
      );

    }


    if (
      hasAny(
        text,
        [
          "dormitorio",
          "habitacion",
          "habitación",
          "cuartos",
          "habitaciones"
        ]
      )
    ) {

      return (
        `${property.name} tiene ${property.bedrooms} dormitorios.`
      );

    }


    if (
      hasAny(
        text,
        [
          "baño",
          "bano",
          "baños",
          "banos"
        ]
      )
    ) {

      return (
        `${property.name} tiene ${property.bathrooms} baños.`
      );

    }


    if (
      hasAny(
        text,
        [
          "area",
          "área",
          "metros",
          "m2",
          "m²",
          "tamaño",
          "tamano"
        ]
      )
    ) {

      return (
        `${property.name} tiene ${property.area} de área publicada.`
      );

    }


    if (
      hasAny(
        text,
        [
          "donde",
          "dónde",
          "ubicacion",
          "ubicación",
          "distrito",
          "zona"
        ]
      )
    ) {

      return (
        `${property.name} está ubicada en ${property.location}.`
      );

    }


    if (
      hasAny(
        text,
        [
          "visita",
          "agendar",
          "cita",
          "verla",
          "conocerla"
        ]
      )
    ) {

      addBotMessage(
        `Puedo llevarte al formulario para solicitar una visita a ${property.name}.`
      );


      addQuickReplies([
        [
          "Ir al formulario",
          "context-visit"
        ],
        [
          "Seguir preguntando",
          "context-features"
        ]
      ]);


      return null;

    }


    if (
      hasAny(
        text,
        [
          "detalle",
          "caracteristica",
          "característica",
          "informacion",
          "información",
          "tiene"
        ]
      )
    ) {

      return propertySummary(
        key
      );

    }


    return (
      `Tengo seleccionada “${property.name}”. ` +
      "Puedo responder sobre precio, dormitorios, baños, área, ubicación o ayudarte a agendar una visita."
    );

  }


  /* =====================================
     PROCESAR TEXTO DEL USUARIO
  ====================================== */

  function handleFreeText(
    rawText
  ) {

    const text =
      normalize(
        rawText
      );


    const detected =
      detectProperty(
        rawText
      );


    /* MÁS DE UNA PROPIEDAD */

    if (
      detected.length > 1
    ) {

      addBotMessage(
        "Veo que mencionaste más de una propiedad. Elige cuál quieres consultar para no mezclar información."
      );


      addQuickReplies(

        detected.map(

          (key) => [

            properties[key].name,

            "select-property",

            key

          ]

        )

      );


      return;

    }


    /* UNA PROPIEDAD DETECTADA */

    if (
      detected.length === 1
    ) {

      const key =
        detected[0];


      setChatContext(
        key
      );


      const answer =
        answerForProperty(
          key,
          rawText
        );


      if (answer) {

        addBotMessage(
          answer
        );

      }


      return;

    }


    /* EXISTE CONTEXTO */

    if (
      chatContextKey
    ) {

      const answer =
        answerForProperty(
          chatContextKey,
          rawText
        );


      if (answer) {

        addBotMessage(
          answer
        );

      }


      return;

    }


    /* SALUDO */

    if (
      hasAny(
        text,
        [
          "hola",
          "buenas",
          "buenos dias",
          "buen dia",
          "hey"
        ]
      )
    ) {

      addBotMessage(
        "Hola. Puedo ayudarte únicamente con la información publicada de las propiedades de PremiumHome. ¿Qué quieres revisar?"
      );


      addQuickReplies([
        [
          "Ver propiedades",
          "list"
        ],
        [
          "Comparar precios",
          "prices"
        ],
        [
          "Agendar visita",
          "visit"
        ]
      ]);


      return;

    }


    /* PRECIOS */

    if (
      hasAny(
        text,
        [
          "precio",
          "precios",
          "cuanto cuestan",
          "cuánto cuestan",
          "barata",
          "economica",
          "económica",
          "cara"
        ]
      )
    ) {

      addBotMessage(
        "Estos son los precios publicados actualmente:"
      );


      addBotMessage(
        "Residencial lujoso: $20,000 · Villa moderna: $50,000 · Casa familiar premium: $135,000 · Mansión lujosa: $700,000."
      );


      addQuickReplies([
        [
          "Ver propiedades",
          "list"
        ],
        [
          "Elegir una propiedad",
          "list"
        ]
      ]);


      return;

    }


    /* DISTRITOS */

    if (
      hasAny(
        text,
        [
          "distrito",
          "ubicacion",
          "ubicación",
          "zonas",
          "donde estan",
          "dónde están"
        ]
      )
    ) {

      addBotMessage(
        "Las propiedades publicadas están en La Molina, San Isidro, Casuarinas y Surco, todas en Lima."
      );


      addQuickReplies([
        [
          "La Molina",
          "select-property",
          "villa-moderna"
        ],
        [
          "San Isidro",
          "select-property",
          "residencial-lujoso"
        ],
        [
          "Casuarinas",
          "select-property",
          "mansion-lujosa"
        ],
        [
          "Surco",
          "select-property",
          "casa-familiar"
        ]
      ]);


      return;

    }


    /* VISITA */

    if (
      hasAny(
        text,
        [
          "visita",
          "agendar",
          "cita",
          "contacto",
          "asesor"
        ]
      )
    ) {

      addBotMessage(
        "Para agendar sin confusiones, primero elige la propiedad que quieres visitar."
      );


      addQuickReplies(

        Object
          .entries(properties)
          .map(

            ([
              key,
              property
            ]) => [

              property.name,

              "visit-property",

              key

            ]

          )

      );


      return;

    }


    /* CATÁLOGO */

    if (
      hasAny(
        text,
        [
          "propiedad",
          "propiedades",
          "casa",
          "casas",
          "opciones",
          "catalogo",
          "catálogo"
        ]
      )
    ) {

      addBotMessage(
        "Actualmente hay 4 propiedades publicadas. Elige una para ver información exacta."
      );


      addPropertyMiniList();


      return;

    }


    /* RESPUESTA DE SEGURIDAD */

    addBotMessage(
      "No quiero inventar una respuesta. Puedo ayudarte con las 4 propiedades publicadas: precio, ubicación, dormitorios, baños, área, descripción y visitas. Elige una opción:"
    );


    addQuickReplies([
      [
        "Ver propiedades",
        "list"
      ],
      [
        "Comparar precios",
        "prices"
      ],
      [
        "Ver distritos",
        "locations"
      ],
      [
        "Agendar visita",
        "visit"
      ]
    ]);

  }


  /* =====================================
     ACCIONES DE BOTONES DEL CHAT
  ====================================== */

  function handleChatAction(
    action,
    key
  ) {

    switch (action) {


      case "list":

        addBotMessage(
          "Estas son las 4 propiedades publicadas. Selecciona una para continuar:"
        );


        addPropertyMiniList();

        break;


      case "prices":

        addBotMessage(
          "Precios publicados: Residencial lujoso $20,000 · Villa moderna $50,000 · Casa familiar premium $135,000 · Mansión lujosa $700,000."
        );


        addQuickReplies([
          [
            "Ver propiedades",
            "list"
          ],
          [
            "Agendar visita",
            "visit"
          ]
        ]);

        break;


      case "locations":

        addBotMessage(
          "Tenemos propiedades publicadas en La Molina, San Isidro, Casuarinas y Surco."
        );


        addQuickReplies([
          [
            "La Molina",
            "select-property",
            "villa-moderna"
          ],
          [
            "San Isidro",
            "select-property",
            "residencial-lujoso"
          ],
          [
            "Casuarinas",
            "select-property",
            "mansion-lujosa"
          ],
          [
            "Surco",
            "select-property",
            "casa-familiar"
          ]
        ]);

        break;


      case "visit":

        addBotMessage(
          "Elige cuál propiedad quieres visitar:"
        );


        addQuickReplies(

          Object
            .entries(properties)
            .map(

              ([
                propertyKey,
                property
              ]) => [

                property.name,

                "visit-property",

                propertyKey

              ]

            )

        );

        break;


      case "select-property":

        if (
          !properties[key]
        ) {
          return;
        }


        setChatContext(
          key
        );


        addBotMessage(
          propertySummary(
            key
          )
        );


        addQuickReplies([
          [
            "Precio",
            "context-price"
          ],
          [
            "Características",
            "context-features"
          ],
          [
            "Ver ficha",
            "open-property",
            key
          ],
          [
            "Agendar visita",
            "context-visit"
          ]
        ]);

        break;


      case "visit-property":

        if (
          !properties[key]
        ) {
          return;
        }


        setChatContext(
          key
        );


        prefillContact(
          key,
          "chat"
        );

        break;


      case "context-price":

        if (
          chatContextKey
        ) {

          addBotMessage(
            `${
              properties[
                chatContextKey
              ].name
            } tiene un precio publicado de ${
              properties[
                chatContextKey
              ].price
            }.`
          );

        }

        break;


      case "context-features":

        if (
          chatContextKey
        ) {

          addBotMessage(
            propertySummary(
              chatContextKey
            )
          );

        }

        break;


      case "context-visit":

        if (
          chatContextKey
        ) {

          prefillContact(
            chatContextKey,
            "chat"
          );

        } else {

          handleChatAction(
            "visit"
          );

        }

        break;


      case "open-property":

        if (
          properties[key]
        ) {

          openProperty(
            key
          );

        }

        break;


      default:

        break;

    }

  }


  /* =====================================
     CLICK EN OPCIONES DEL CHAT
  ====================================== */

  chatMessages?.addEventListener(

    "click",

    (event) => {

      const button =
        event.target.closest(
          "[data-chat-action]"
        );


      if (!button) {
        return;
      }


      handleChatAction(

        button.dataset.chatAction,

        button.dataset.property

      );

    }

  );


  /* =====================================
     ENVIAR MENSAJE
  ====================================== */

  chatForm?.addEventListener(

    "submit",

    (event) => {

      event.preventDefault();


      const value =
        chatInput.value.trim();


      if (!value) {
        return;
      }


      addUserMessage(
        value
      );


      chatInput.value =
        "";


      window.setTimeout(

        () => {

          handleFreeText(
            value
          );

        },

        180

      );

    }

  );

})();