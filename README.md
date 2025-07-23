# MyFitness AI

App web con Next.js + Supabase + AI para crear rutinas y planes fitness personalizados.

## Stack

- Next.js + TypeScript + Tailwind
- Docker + docker-compose
- Supabase
- ChatGPT API



my-fitness-ai/
│
├── .git/                   ← Git tracking
├── .github/                ← Workflows de CI/CD (GitHub Actions)
│   └── workflows/
│       └── ci.yml          ← Pruebas / build automático
│
├── docker/                 ← Archivos Docker específicos por servicio
│   ├── next.Dockerfile     ← Dockerfile para Next.js
│   └── supabase.Dockerfile ← (opcional si querés Supabase local)
│
├── docker-compose.yml      ← Orquestador de contenedores
│
├── frontend/               ← App Next.js (React + TypeScript + Tailwind)
│   ├── public/             ← Assets estáticos
│   ├── src/
│   │   ├── components/     ← Componentes reutilizables
│   │   ├── pages/          ← Rutas (Next.js)
│   │   ├── styles/         ← Tailwind config + estilos globales
│   │   ├── lib/            ← Funciones reutilizables
│   │   ├── services/       ← Comunicación con Supabase / API / IA
│   │   ├── types/          ← Tipos TypeScript centralizados
│   │   └── hooks/          ← Custom hooks (auth, AI, etc.)
│   ├── .env                ← Variables de entorno (no versionar)
│   ├── .eslintrc.json      ← Reglas de lint
│   ├── tsconfig.json       ← Configuración de TypeScript
│   └── tailwind.config.ts  ← Configuración de Tailwind
│
├── supabase/               ← Configuración si usás Supabase local
│   ├── migrations/
│   ├── init.sql
│   └── README.md
│
├── docs/                   ← Documentación técnica del proyecto
│   ├── project-overview.md
│   ├── api-design.md
│   ├── architecture.md
│   └── roadmap.md
│
├── .env.example            ← Variables necesarias (sin valores sensibles)
├── README.md               ← Guía principal de instalación y uso
├── LICENSE                 ← Licencia del proyecto (MIT, etc.)
└── .gitignore              ← Archivos y carpetas que no se versionan
