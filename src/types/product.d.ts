export interface ProductType {
  id: string;
  name: string;
  price: number;
  tags: string[];
  imageUrl: string;
  description: string;
  releaseDate: number;
  developer: string;
  publisher: string;
  metacriticScore: number;
}
