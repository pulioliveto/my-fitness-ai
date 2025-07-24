import { Activity, Dumbbell, Heart, Target, Zap } from "lucide-react";
import { FloatingIcon } from "@/types/landing";

export const FLOATING_ICONS: FloatingIcon[] = [
  { icon: Dumbbell, x: "10%", y: "20%", size: 32, delay: 0 },
  { icon: Dumbbell, x: "85%", y: "15%", size: 28, delay: 2 },
  { icon: Dumbbell, x: "15%", y: "70%", size: 36, delay: 4 },
  // ... (el resto de los que ya tenías)
  { icon: Heart, x: "5%", y: "60%", size: 24, delay: 6.2 },
];
