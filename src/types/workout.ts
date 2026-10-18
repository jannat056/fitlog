export interface Workout {
  id: string;
  name: string;
  equipment: string;
  categories: string[];
  duration: number; // minutes
  calories: number;
  rating: number;
  image: string;
}