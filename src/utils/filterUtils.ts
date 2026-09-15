import { Shop, Category, Street } from '../types';

export const filterShopsByCategory = (shops: Shop[], category: string | null): Shop[] => {
  if (!category) return shops;
  return shops.filter(shop => shop.category === category);
};

export const filterShopsByStreet = (shops: Shop[], streetId: string | null): Shop[] => {
  if (!streetId) return shops;
  return shops.filter(shop => shop.street === streetId);
};

export const searchShops = (shops: Shop[], searchTerm: string): Shop[] => {
  if (!searchTerm) return shops;
  
  const normalizedTerm = searchTerm.toLowerCase().trim();
  return shops.filter(shop => 
    shop.name.toLowerCase().includes(normalizedTerm) ||
    shop.category.toLowerCase().includes(normalizedTerm) ||
    shop.address.toLowerCase().includes(normalizedTerm)
  );
};

export const getCategoryNameById = (categoryId: string, categories: Category[]): string => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};

export const getStreetNameById = (streetId: string, streets: Street[]): string => {
  const street = streets.find(s => s.id === streetId);
  return street ? street.name : 'Unknown';
};

export const getShopsByCategory = (shops: Shop[], categoryId: string): Shop[] => {
  return shops.filter(shop => shop.category === categoryId);
};

export const getShopsByStreet = (shops: Shop[], streetId: string): Shop[] => {
  return shops.filter(shop => shop.street === streetId);
};

export const getCategoryColor = (categoryId: string, categories: Category[]): string => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.color : 'bg-gray-500';
};