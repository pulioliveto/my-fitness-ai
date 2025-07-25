# Frontend Landing

## Estructura
- `components/landing`: componentes UI de la landing (Hero, Features, AppPreview, Testimonials, Footer, Navbar).
- `config/landing`: arrays de configuración (features, stats, mockups, particles) para mantener el render limpio.
- `types/landing.ts`: tipado compartido para las configuraciones.
- `page.tsx`: orquestador de secciones, mantiene el código mínimo y ordenado.

## Principios
- Tipado estricto con TypeScript, **nada de `any`**.
- Animaciones con **Framer Motion**, cada sección maneja sus propias transiciones.
- Datos dinámicos separados en archivos de configuración (arrays en `config/`).
- Componentes **pequeños, reutilizables y desacoplados**.
- Uso de **TailwindCSS** para estilos rápidos y consistentes.
- Código **limpio, modular y fácil de escalar**.
