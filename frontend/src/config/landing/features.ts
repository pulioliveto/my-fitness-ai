import { Dumbbell, Apple, TrendingUp } from "lucide-react";
import { FeatureItem } from "@/types/landing";

export const FEATURES: FeatureItem[] = [
  {
    icon: Dumbbell,
    title: "Rutinas Personalizadas",
    description:
      "Entrenamientos adaptados a tu nivel, objetivos y disponibilidad. Para gimnasio o casa, la IA crea tu plan perfecto.",
    tags: ["Gimnasio", "Casa"],
    colors: "from-blue-500 to-blue-600",
    tagColors: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800"],
  },
  {
    icon: Apple,
    title: "Alimentación Inteligente",
    description:
      "Planes nutricionales que se ajustan a tus gustos, restricciones y objetivos. Recetas fáciles y listas de compra incluidas.",
    tags: ["Recetas", "Macros"],
    colors: "from-green-500 to-green-600",
    tagColors: ["bg-green-100 text-green-800", "bg-orange-100 text-orange-800"],
  },
  {
    icon: TrendingUp,
    title: "Seguimiento con IA",
    description:
      "Análisis inteligente de tu progreso. La IA ajusta tu plan automáticamente para maximizar tus resultados.",
    tags: ["Analytics", "Insights"],
    colors: "from-purple-500 to-purple-600",
    tagColors: ["bg-purple-100 text-purple-800", "bg-pink-100 text-pink-800"],
  },
];
