export interface Workout {
  id: string;
  name: string;
  equipment: string;
  categories: string[];
  duration: number; // minutes (e.g., 25)
  calories: number; // kcal (e.g., 180)
  rating: number;
  image: string;
  // Optional parameters for detailed modal view
  difficulty?: string;
  sets?: string;
  reps?: string;
  description?: string;
}