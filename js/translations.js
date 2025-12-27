// Enhanced translation system with dynamic content support
const translations = {
    sk: {
        nav: { about: 'O mne', services: 'Služby', skills: 'Zručnosti', work: 'Práce', contact: 'Kontakt' },
        hero: {
            badge: 'Portfólio 2025',
            tagline: 'Senior Creative Developer špecializujúci sa na <span class="highlight">interaktívne zážitky</span> a vysoko výkonné aplikácie.'
        },
        cta: { works: 'Vybrané práce', contact: 'Kontaktuj ma' },
        about: {
            title: 'O mne',
            text: 'Som <strong>Creative Developer</strong> z Bratislavy, špecializujem sa na vytváranie digitálnych zážitkov, ktoré spájajú <strong>umenie, dizajn a technológiu</strong>. S viac ako 8-ročnými skúsenosťami sa zameriavam na výkon, prístupnosť a mikro-interakcie, ktoré potešia používateľov.'
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
            }
        },
        skills: {
            title: 'Zručnosti & Expertíza',
            react: {
                title: 'React / Next.js',
                desc: 'Vytváranie vysoko výkonných SSG a SSR aplikácií.',
                level: 'Senior'
            },
            node: {
                title: 'Node.js',
                desc: 'Škálovateľné backendové služby a REST API.',
                level: 'Pokročilý'
            },
            three: {
                title: 'Three.js',
                desc: 'Immerzívne 3D webové zážitky.',
                level: 'Kreatívny'
            },
            wordpress: {
                title: 'WordPress',
                desc: 'Vlastné témy, pluginy & headless CMS architektúry.',
                level: 'Expert'
            },
            tailwind: {
                title: 'Tailwind CSS',
                desc: 'Rýchly, utility-first UI vývoj.',
                level: 'Pro'
            },
            webgl: {
                title: 'WebGL',
                desc: 'Hardvérovo akcelerovaná grafika.',
                level: 'Experimentálny'
            },
            design2d: {
                title: '2D Dizajn',
                desc: 'UI/UX, Figma & Vektorová grafika.',
                level: 'Pro'
            },
            design3d: {
                title: '3D Dizajn',
                desc: 'Blender, Spline & 3D modelovanie.',
                level: 'Pro'
            }
        },
        projects: { title: 'Vybrané práce' },
        contact: { title: 'Kontakt' }
    },
    en: {
        nav: { about: 'About', services: 'Services', skills: 'Skills', work: 'Work', contact: 'Contact' },
        hero: {
            badge: 'Portfolio 2025',
            tagline: 'Senior Creative Developer specializing in <span class="highlight">interactive experiences</span> and high-performance applications.'
        },
        cta: { works: 'Selected Works', contact: 'Contact Me' },
        about: {
            title: 'About',
            text: 'I am a <strong>Creative Developer</strong> based in Bratislava, specializing in building digital experiences that merge <strong>art, design, and technology</strong>. With over 8 years of experience, I focus on performance, accessibility, and micro-interactions that delight users.'
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
            }
        },
        skills: {
            title: 'Skills & Expertise',
            react: {
                title: 'React / Next.js',
                desc: 'Building high-performance SSGs and SSR apps.',
                level: 'Senior'
            },
            node: {
                title: 'Node.js',
                desc: 'Scalable backend services and REST APIs.',
                level: 'Advanced'
            },
            three: {
                title: 'Three.js',
                desc: 'Immersive 3D web experiences.',
                level: 'Creative'
            },
            wordpress: {
                title: 'WordPress',
                desc: 'Custom themes, plugins & headless CMS architectures.',
                level: 'Expert'
            },
            tailwind: {
                title: 'Tailwind CSS',
                desc: 'Rapid, utility-first UI development.',
                level: 'Pro'
            },
            webgl: {
                title: 'WebGL',
                desc: 'Hardware-accelerated graphics.',
                level: 'Experimental'
            },
            design2d: {
                title: '2D Design',
                desc: 'UI/UX, Figma & Vector Graphics.',
                level: 'Pro'
            },
            design3d: {
                title: '3D Design',
                desc: 'Blender, Spline & 3D Modeling.',
                level: 'Pro'
            }
        },
        projects: { title: 'Selected Works' },
        contact: { title: 'Contact' }
    }
};

let currentLang = localStorage.getItem('lang') || 'sk';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const keys = el.getAttribute('data-i18n').split('.');
        let value = translations[lang];
        for (const key of keys) value = value[key];
        if (value) el.innerHTML = value;
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