export interface ICategoryOut {
  id: number;
  name: string;
  image: string;
  created_at: string;
  parentCategory: number | null;
}
