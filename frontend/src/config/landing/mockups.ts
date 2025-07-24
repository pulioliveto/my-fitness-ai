import { User, Calendar, BarChart3 } from "lucide-react";
import type { MockupItem } from "@/types/landing";

export const MOCKUPS: MockupItem[] = [
  { icon: User, title: "Perfil Personal", rotation: 3, color: "from-blue-500 to-blue-600", barColor: "bg-blue-500" },
  { icon: Calendar, title: "Rutina del Día", rotation: -2, color: "from-green-500 to-green-600", barColor: "bg-green-500" },
  { icon: BarChart3, title: "Progreso", rotation: 2, color: "from-purple-500 to-purple-600", barColor: "bg-purple-500" },
];
