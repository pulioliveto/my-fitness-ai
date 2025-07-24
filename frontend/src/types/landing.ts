import { LucideIcon } from "lucide-react";

export interface StatItem {
  icon: LucideIcon;
  text: string;
  color: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  colors: string;
  tagColors: string[];
}

export interface MockupItem {
  icon: LucideIcon;
  title: string;
  rotation: number;
  color: string;
}

export interface FloatingIcon {
  icon: LucideIcon;
  x: string;
  y: string;
  size: number;
  delay: number;
}
