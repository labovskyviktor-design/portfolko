// Enhanced translation system with dynamic content support
const translations = {
    sk: {
        nav: { about: 'O mne', services: 'Služby', skills: 'Zručnosti', work: 'Práce', contact: 'Kontakt' },
        hero: {
            badge: 'Dostupný pre nové projekty',
            tagline: 'Creative Developer špecializujúci sa na <span class="highlight">interaktívne zážitky</span> a vysoko výkonné aplikácie.'
        },
        cta: { works: 'Vybrané práce', contact: 'Kontaktuj ma' },
        about: {
            title: 'O mne',
            text: 'Som <strong>Creative Developer</strong> z Bratislavy, špecializujem sa na vytváranie digitálnych zážitkov, ktoré spájajú <strong>umenie, dizajn a technológiu</strong>. S viac ako 4-ročnými skúsenosťami sa zameriavam na výkon, prístupnosť a mikro-interakcie, ktoré potešia používateľov.'
        },
        services: {
            title: 'Služby',
            webSites: {
                title: 'Webové stránky',
                desc: 'Prémiové prezentačné webstránky s vlastným dizajnom, perfektným SEO a bleskovou rýchlosťou.',
                feature1: 'Landing Pages',
                feature2: 'Firemná identita',
                feature3: 'Interaktívne zážitky'
            },
            webApps: {
                title: 'Webové aplikácie',
                desc: 'Komplexné webové aplikácie vytvorené pre škálovateľnosť. Dashboardy, SaaS platformy a interné nástroje.',
                feature1: 'React / Next.js',
                feature2: 'SaaS vývoj',
                feature3: 'API integrácia'
            },
            desktopApps: {
                title: 'Desktopové aplikácie',
                desc: 'Výkonný softvér pre Windows a macOS vyvinutý pre špecifické podnikové potreby a automatizáciu.',
                feature1: 'Cross-platform vývoj',
                feature2: 'Systémová integrácia',
                feature3: 'Vysoký výkon'
            }
        },
        skills: {
            title: 'Zručnosti & Expertíza',
            react: {
                title: 'React / Next.js',
                desc: 'Vytváranie vysoko výkonných SSG a SSR aplikácií.',
                level: 'Senior',
                features: ['Next.js App Router', 'Redux / Context API', 'Server Components']
            },
            node: {
                title: 'Node.js',
                desc: 'Škálovateľné backendové služby a REST API.',
                level: 'Pokročilý',
                features: ['Express / Fastify', 'REST & GraphQL', 'Microservices']
            },
            three: {
                title: 'Three.js',
                desc: 'Immerzívne 3D webové zážitky.',
                level: 'Kreatívny',
                features: ['WebGL Shaders', '3D Scene Design', 'GSAP Animations']
            },
            wordpress: {
                title: 'WordPress',
                desc: 'Vlastné témy, pluginy & headless CMS architektúry.',
                level: 'Expert',
                features: ['Custom Themes', 'ACF / Gutenberg', 'Headless WP']
            },
            tailwind: {
                title: 'Tailwind CSS',
                desc: 'Rýchly, utility-first UI vývoj.',
                level: 'Pro',
                features: ['Custom Config', 'Responsive Design', 'Design Systems']
            },
            webgl: {
                title: 'WebGL',
                desc: 'Hardvérovo akcelerovaná grafika.',
                level: 'Experimentálny',
                features: ['GLSL Programming', 'Raw Buffers', 'Post-processing']
            },
            design2d: {
                title: '2D Dizajn',
                desc: 'UI/UX, Figma & Vektorová grafika.',
                level: 'Pro',
                features: ['Figma Prototyping', 'Vector Art', 'Typography']
            },
            design3d: {
                title: '3D Dizajn',
                desc: 'Blender, Spline & 3D modelovanie.',
                level: 'Pro',
                features: ['Low Poly Modeling', 'PBR textúrovanie', '3D Web Assets']
            }
        },
        projects: {
            title: 'Vybrané práce',
            p1: {
                title: '3DTlačiareň.sk',
                desc: 'Prémiová platforma pre 3D tlač a priemyselné modelovanie. Komplexné riešenia od prototypovania až po sériovú výrobu.',
                tag1: 'E-commerce',
                tag2: '3D Tlač',
                tag3: 'Manufacturing'
            },
            p2: {
                title: 'HTML Prekladač',
                desc: 'Inovatívny nástroj na kompletný lingvistický preklad webových stránok. Stačí vložiť odkaz a aplikácia preloží celý obsah medzi slovenčinou a češtinou.',
                tag1: 'HTML Translator',
                tag2: 'Web Scraping',
                tag3: 'Linguistics'
            },
            p3: {
                title: 'Thesis Agent',
                desc: 'Inteligentný akademický asistent navrhnutý pre študentov na automatizáciu rešerše a štruktúrovanie záverečných prác.',
                tag1: 'Academic Tool',
                tag2: 'Automation',
                tag3: 'Student AI'
            },
            p4: {
                title: 'Energetický Audit',
                desc: 'Inžinierska aplikácia podľa normy STN EN 16247 na certifikáciu budov a presnú analýzu úspor energie.',
                tag1: 'STN EN 16247',
                tag2: 'Engineering',
                tag3: 'Energy Efficiency'
            }
        },
        contact: {
            title: 'Kontakt',
            label: 'Napíš mi',
            cta: 'Pripravený vytvoriť<br>niečo <span class="highlight">úžasné?</span>',
            rights: 'Všetky práva vyhradené.',
            localTime: 'Lokálny čas:'
        }
    },
    en: {
        nav: { about: 'About', services: 'Services', skills: 'Skills', work: 'Work', contact: 'Contact' },
        hero: {
            badge: 'Available for new projects',
            tagline: 'Creative Developer specializing in <span class="highlight">interactive experiences</span> and high-performance applications.'
        },
        cta: { works: 'Selected Works', contact: 'Contact Me' },
        about: {
            title: 'About',
            text: 'I am a <strong>Creative Developer</strong> based in Bratislava, specializing in building digital experiences that merge <strong>art, design, and technology</strong>. With over 4 years of experience, I focus on performance, accessibility, and micro-interactions that delight users.'
        },
        services: {
            title: 'Services',
            webSites: {
                title: 'Web Sites',
                desc: 'High-end presentation websites with custom design, perfect SEO, and blazing fast performance.',
                feature1: 'Landing Pages',
                feature2: 'Corporate Identity',
                feature3: 'Interactive Experiences'
            },
            webApps: {
                title: 'Web Apps',
                desc: 'Complex web applications built for scale. Dashboards, SaaS platforms, and internal tools.',
                feature1: 'React / Next.js',
                feature2: 'SaaS Development',
                feature3: 'API Integration'
            },
            desktopApps: {
                title: 'Desktop Apps',
                desc: 'Powerful software for Windows and macOS built for specific business needs and automation.',
                feature1: 'Cross-platform Dev',
                feature2: 'System Integration',
                feature3: 'High Performance'
            }
        },
        skills: {
            title: 'Skills & Expertise',
            react: {
                title: 'React / Next.js',
                desc: 'Building high-performance SSGs and SSR apps.',
                level: 'Senior',
                features: ['Next.js App Router', 'Redux / Context API', 'Server Components']
            },
            node: {
                title: 'Node.js',
                desc: 'Scalable backend services and REST APIs.',
                level: 'Advanced',
                features: ['Express / Fastify', 'REST & GraphQL', 'Microservices']
            },
            three: {
                title: 'Three.js',
                desc: 'Immersive 3D web experiences.',
                level: 'Creative',
                features: ['WebGL Shaders', '3D Scene Design', 'GSAP Animations']
            },
            wordpress: {
                title: 'WordPress',
                desc: 'Custom themes, plugins & headless CMS architectures.',
                level: 'Expert',
                features: ['Custom Themes', 'ACF / Gutenberg', 'Headless WP']
            },
            tailwind: {
                title: 'Tailwind CSS',
                desc: 'Rapid, utility-first UI development.',
                level: 'Pro',
                features: ['Custom Config', 'Responsive Design', 'Design Systems']
            },
            webgl: {
                title: 'WebGL',
                desc: 'Hardware-accelerated graphics.',
                level: 'Experimental',
                features: ['GLSL Programming', 'Raw Buffers', 'Post-processing']
            },
            design2d: {
                title: '2D Design',
                desc: 'UI/UX, Figma & Vector Graphics.',
                level: 'Pro',
                features: ['Figma Prototyping', 'Vector Art', 'Typography']
            },
            design3d: {
                title: '3D Design',
                desc: 'Blender, Spline & 3D Modeling.',
                level: 'Pro',
                features: ['Low Poly Modeling', 'PBR Texturing', '3D Web Assets']
            }
        },
        projects: {
            title: 'Selected Works',
            p1: {
                title: '3DTlačiareň.sk',
                desc: 'Premium platform for 3D printing and industrial modeling. Solutions from prototyping to mass production.',
                tag1: 'E-commerce',
                tag2: '3D Printing',
                tag3: 'Manufacturing'
            },
            p2: {
                title: 'HTML Translator',
                desc: 'Innovative tool for full linguistic translation of websites. Just enter a link and the app translates the entire content between Slovak and Czech.',
                tag1: 'HTML Translator',
                tag2: 'Web Scraping',
                tag3: 'Linguistics'
            },
            p3: {
                title: 'Thesis Agent',
                desc: 'Intelligent academic assistant designed for students to automate research and thesis structuring.',
                tag1: 'Academic Tool',
                tag2: 'Automation',
                tag3: 'Student AI'
            },
            p4: {
                title: 'Energy Audit',
                desc: 'Engineering application based on STN EN 16247 for building certification and precise energy savings analysis.',
                tag1: 'STN EN 16247',
                tag2: 'Engineering',
                tag3: 'Energy Efficiency'
            }
        },
        contact: {
            title: 'Contact',
            label: 'Get in Touch',
            cta: 'Ready to create<br>something <span class="highlight">amazing?</span>',
            rights: 'All rights reserved.',
            localTime: 'Local time:'
        }
    }
};

let currentLang = localStorage.getItem('lang') || 'sk';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const keys = el.getAttribute('data-i18n').split('.');
        let value = translations[lang];
        for (const key of keys) {
            if (value) value = value[key];
        }

        if (value) {
            if (Array.isArray(value)) {
                // Handle features list specifically
                el.innerHTML = value.map(item => `<span>${item}</span>`).join('');
            } else {
                el.innerHTML = value;
            }
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });
});