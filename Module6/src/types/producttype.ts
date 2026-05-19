export interface Iproduct{
  prodID: number;
  item: string;
  category: string;
  price: number;
  unit: string;
  inStock: boolean;
  stockCount: number;
  description?: string; // (Optional) যদি প্রোডাক্টের বিস্তারিত বিবরণ দিতে চান
  imageURL?: string;
}