// =========================
// ANALITICA SIMPLE
// =========================




const sessionData = {
    sessionId: crypto.randomUUID(),
    startTime: new Date().toISOString(),
    eventos: []
};

function track(tipo, valor = null) {
    const evento = {
        tipo,
        valor,
        timestamp: new Date().toISOString()
    };

    sessionData.eventos.push(evento);

    // Guardar siempre la última versión
    localStorage.setItem(
        "dia_del_padre_analytics",
        JSON.stringify(sessionData)
    );

    console.log("TRACK:", evento);
}   
   
   // Archetype data
        const archetypes = [
            {
                id: 1,
                title: 'Es capaz de responder un correo mientras conversa contigo.',
                product: 'Stylus Pen Grabado',
                peak:'Siempre tiene una reunión más. Nunca llega con las manos vacías.Y de alguna forma encuentra tiempo para todos.',
                description: 'Profesional, decidido, siempre en movimiento.',
                copy: '"Un hombre de negocios necesita herramientas que reflejen su calidad"',
                icon: '',
                btn: "botones-gatos/1.png",
                img: "tictus.png"
            },
            {
                id: 2,
                title: 'El arte está en los matices.',
                product: 'Vasos Grabados Premium',
                peak:'No abre una botella cualquiera. Guarda las mejores para las conversaciones importantes.Y siempre tiene una historia que contar.',
                description: 'Experto en aromas, sabores y buenos momentos.',
                copy: '"Cada sorbo tiene una historia"',
                icon: '',
                btn: "botones-gatos/2.png",
                img: "copa.png"
            },
            {
                id: 3,
                title: 'La experiencia nunca pasa de moda',
                product: 'Caja de Vino c/ Ajedrez',
                peak:'Dice que las cosas ya no se hacen como antes.Pero sigue siendo el primero al que todos llaman cuando necesitan consejo.',
             
                description: 'Clásico, refinado, con carácter y profundidad.',
                copy: '"Como el vino, algunos momentos mejoran con el tiempo"',
                icon: '',
                btn: "botones-gatos/3.png",
                img: "ajedrez.png"
            },
            {
                id: 4,
                title: 'Construye hoy lo que inspirará mañana.',
                product: 'Bowl Azul de Diseño',
                peak:'Te enseñó cosas que recién ahora empiezas a entender.Y sigue corrigiendo detalles que nadie más ve.',
                description: 'Creativo, detallista, amante de lo hecho con precisión.',
                copy: '"La perfección está en los detalles"',
                icon: '',
                btn: "botones-gatos/4.png",
                img: "vaso.png"
               
            }
        ];

        // FAQ data
        const faqItems = [
            {
                question: '¿Qué tipo de regalos personalizan?',
                answer: 'Trabajamos con soluciones pensadas para campañas, eventos, reconocimientos y regalos institucionales. Desde pen drives grabados hasta cajas de vino personalizadas.'
            },
            {
                question: '¿Pueden asesorarme si aún no tengo claro qué elegir?',
                answer: 'Absolutamente. Nuestro equipo te ayuda a definir la opción más adecuada según tu necesidad, imagen de marca y presupuesto.'
            },
            {
                question: '¿Cómo garantizan la calidad?',
                answer: 'Cuidamos cada etapa del proceso con revisión técnica y criterio de acabado para asegurar consistencia. Cada pieza es revisada antes de partir.'
            },
            {
                question: '¿Trabajan con pedidos para empresas?',
                answer: 'Sí, atendemos proyectos corporativos con foco en personalización, orden y cumplimiento de plazos.'
            }
        ];

        // Populate archetypes
        function populateArchetypes() {
            const container = document.getElementById('archetype-cards');
            container.innerHTML = archetypes.map(archetype => `
                <div class="archetype-card" data-id="${archetype.id}">
                    <div class="archetype-card-bg"></div>
                    <div class="archetype-card-content">
                        <div class="archetype-header">
                            <span class="archetype-icon">${archetype.icon}</span>
                            <span class="archetype-product">${archetype.title}</span>
                        </div>
                        
                           <img src="${archetype.btn}" alt="${archetype.title}-btn ">
       
                                         <p>${archetype.peak}</p>
                        
                        

                        <div class="archetype-cta">
                        <p class="description">${archetype.description}</p>
                        <p class="archetype-copy">${archetype.copy}</p>
                        
                       
                      <img src="${archetype.img}" alt="${archetype.title}-oferta ">
       
                        <div class="archetype-divider"></div>
                           <h3>Regalo Recomendado : ${archetype.product}</h3>
              
                   
                       <div class="archetype-divider"></div>
                    
                            <a href="https://wa.me/56972410251" target="_blank" rel="noopener noreferrer" class="btn-small whatsapp-btn" data-product="${archetype.product}>
                                Consultar disponibilidad →
                        
                            
                                </a>
                       
                        </div>
                    </div>
                </div>
            `).join('');

//add click whatsapp
            document.querySelectorAll('.whatsapp-btn')
                .forEach(btn => {

                    btn.addEventListener('click', function(e) {

                        track(
                            "cta_whatsapp",
                            this.dataset.product
                        );

                    });

                });

            // Add click handlers
            document.querySelectorAll('.archetype-card').forEach(card => {
            card.addEventListener('click', function() {

                const archetypeId = this.dataset.id;

                const archetype = archetypes.find(
                    a => a.id == archetypeId
                );

                track(
                    "archetype_selected",
                    archetype.product
                );

                document.querySelectorAll('.archetype-card')
                    .forEach(c => c.classList.remove('active'));

                this.classList.add('active');
            });
            });
        }

        // Populate FAQ
        function populateFAQ() {
            const container = document.getElementById('faq-items');
            container.innerHTML = faqItems.map((item, idx) => `
                <div class="faq-item" data-id="${idx}">
                    <button class="faq-question">
                        ${item.question}
                        <span class="faq-toggle">▼</span>
                    </button>
                    <div class="faq-answer">${item.answer}</div>
                </div>
            `).join('');

            // Add click handlers
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.addEventListener('click', function() {
                    const item = this.closest('.faq-item');
                    item.classList.toggle('open');
                });
            });
        }

        window.addEventListener('beforeunload', () => {

            const segundos = Math.round(
                (Date.now() - new Date(sessionData.startTime).getTime()) / 1000
            );

            track(
                "session_duration",
                segundos
            );

        });

        const debugMode =
                new URLSearchParams(window.location.search)
                    .get('debug') === 'true';

            if (!debugMode) {
                document
                    .getElementById('export-json')
                    ?.classList.add('hidden');
            }


        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            track("landing_opened");
            populateArchetypes();
            populateFAQ();
           
        });