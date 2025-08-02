export type ExerciseType = {
  name: string;
  sets: number;
  reps: string; // Puede ser "8-12" o "30 segundos"
  rest: string;
  description?: string;
  muscleGroup: string;
};

export type WorkoutDay = {
  day: string;
  focus: string;
  exercises: ExerciseType[];
  notes?: string;
};

export type NutritionTip = {
  title: string;
  description: string;
};

export type BeginnerTip = {
  title: string;
  description: string;
};

export type GeneratedRoutine = {
  weeklyPlan: WorkoutDay[];
  nutritionTips: NutritionTip[];
  beginnerTips: BeginnerTip[];
};

export type UserProfile = {
  height: number | null;
  weight: number | null;
  age: number | null;
  gender: string | null;
  fitness_goals: string[];
  activity_level: string;
};

export type GenerateRoutineRequest = UserProfile;

export type GenerateRoutineResponse = {
  routine: GeneratedRoutine;
};