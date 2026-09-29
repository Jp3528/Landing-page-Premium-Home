(() => {

  "use strict";


  /* =====================================
     DATOS DE LAS PROPIEDADES
  ====================================== */

  const properties = {

    "loft-mirador": {

      name:
        "Loft Mirador",

      location:
        "Barranco, Lima",

      district:
        "Barranco",

      price:
        "S/ 690,000",

      bedrooms:
        1,

      bathrooms:
        1,

      area:
        "78 m²",

      status:
        "Ideal inversión",

      image:
        "img/1.png",

      description:
        "Loft compacto con balcón, luz natural y cercanía a cafés, galerías y malecón."

    },


    "suite-parque": {

      name:
        "Suite Parque",

      location:
        "Miraflores, Lima",

      district:
        "Miraflores",

      price:
        "S/ 980,000",

      bedrooms:
        2,

      bathrooms:
        2,

      area:
        "118 m²",

      status:
        "Lista para mudanza",

      image:
        "img/2.png",

      description:
        "Departamento sereno frente a parques, con cocina abierta y área social integrada."

    },


    "casa-patio": {

      name:
        "Casa Patio",

      location:
        "San Borja, Lima",

      district:
        "San Borja",

      price:
        "S/ 1,420,000",

      bedrooms:
        3,

      bathrooms:
        3,

      area:
        "246 m²",

      status:
        "Casa urbana",

      image:
        "img/3.png",

      description:
        "Casa remodelada con patio central, estudio independiente y comedor abierto."

    },


    "penthouse-terraza": {

      name:
        "Penthouse Terraza",

      location:
        "Surco, Lima",

      district:
        "Surco",

      price:
        "S/ 1,890,000",

      bedrooms:
        4,

      bathrooms:
        4,

      area:
        "310 m²",

      status:
        "Vista abierta",

      image:
        "img/4.png",

      description:
        "Penthouse dúplex con terraza social, parrilla y sala familiar privada."

    }

  };


  /* =====================================
     PALABRAS PARA IDENTIFICAR PROPIEDADES
  ====================================== */

  const aliases = {

    "loft-mirador": [
      "loft",
      "loft mirador",
      "mirador",
      "barranco",
      "da-101"
    ],

    "suite-parque": [
      "suite",
      "suite parque",
      "miraflores",
      "parque",
      "da-204"
    ],

    "casa-patio": [
      "casa",
      "casa patio",
      "patio",
      "san borja",
      "da-318"
    ],

    "penthouse-terraza": [
      "penthouse",
      "terraza",
      "penthouse terraza",
      "surco",
      "da-427"
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
            "Distrito Alto";


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

  $("[data-clear-filters]")
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


  function openPropertyDialog() {

    if (!dialog) {
      return;
    }


    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      return;
    }


    dialog.setAttribute(
      "open",
      ""
    );

    document.body.classList.add(
      "dialog-fallback-open"
    );

  }


  function closePropertyDialog() {

    if (!dialog) {
      return;
    }


    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute(
        "open"
      );
    }


    document.body.classList.remove(
      "dialog-fallback-open"
    );

  }


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


    openPropertyDialog();

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

        closePropertyDialog();

      }

    );


  dialog?.addEventListener(

    "click",

    (event) => {

      if (
        event.target === dialog
      ) {

        closePropertyDialog();

      }

    }

  );


  document.addEventListener(

    "keydown",

    (event) => {

      if (
        event.key === "Escape" &&
        dialog?.hasAttribute(
          "open"
        )
      ) {

        closePropertyDialog();

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


    closePropertyDialog();


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


        closePropertyDialog();


        setChatContext(
          activePropertyKey
        );


        openChat();


        addBotMessage(
          `Hablemos de ${
            properties[
              activePropertyKey
            ].name
          }. Puedes preguntarme por precio, dormitorios, baños, área, ubicación o asesoría.`
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
      "Puedo responder sobre precio, dormitorios, baños, área, ubicación o ayudarte a solicitar asesoría."
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
        "Hola. Puedo ayudarte únicamente con la información publicada de Distrito Alto. ¿Qué quieres revisar?"
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
        "Loft Mirador: S/ 690,000 · Suite Parque: S/ 980,000 · Casa Patio: S/ 1,420,000 · Penthouse Terraza: S/ 1,890,000."
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
        "Las propiedades publicadas están en Barranco, Miraflores, San Borja y Surco, todas en Lima."
      );


      addQuickReplies([
        [
          "Barranco",
          "select-property",
          "loft-mirador"
        ],
        [
          "Miraflores",
          "select-property",
          "suite-parque"
        ],
        [
          "San Borja",
          "select-property",
          "casa-patio"
        ],
        [
          "Surco",
          "select-property",
          "penthouse-terraza"
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
        "Para coordinar una visita o asesoría sin confusiones, primero elige la propiedad que quieres evaluar."
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
          "Precios publicados: Loft Mirador S/ 690,000 · Suite Parque S/ 980,000 · Casa Patio S/ 1,420,000 · Penthouse Terraza S/ 1,890,000."
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
          "Tenemos propiedades publicadas en Barranco, Miraflores, San Borja y Surco."
        );


        addQuickReplies([
          [
            "Barranco",
            "select-property",
            "loft-mirador"
          ],
          [
            "Miraflores",
            "select-property",
            "suite-parque"
          ],
          [
            "San Borja",
            "select-property",
            "casa-patio"
          ],
          [
            "Surco",
            "select-property",
            "penthouse-terraza"
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
