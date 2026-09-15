import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import ShopCard from '../components/ui/ShopCard';
import { categories, shops } from '../data/mockData';
import { getShopsByCategory, searchShops } from '../utils/filterUtils';
import { Shop } from '../types';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryShops, setCategoryShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('bg-teal-500');
  
  useEffect(() => {
    if (categoryId) {
      const categoryData = categories.find(c => c.id === categoryId);
      const shopsInCategory = getShopsByCategory(shops, categoryId);
      
      setCategoryName(categoryData?.name || 'Unknown Category');
      setCategoryColor(categoryData?.color || 'bg-teal-500');
      setCategoryShops(shopsInCategory);
      setFilteredShops(shopsInCategory);
    }
  }, [categoryId]);
  
  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredShops(categoryShops);
      return;
    }
    
    const results = searchShops(categoryShops, term);
    setFilteredShops(results);
  };
  
  const textColorClass = 'text-white';
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className={`${categoryColor} py-16`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/categories" 
            className={`inline-flex items-center ${textColorClass} opacity-80 hover:opacity-100 transition-colors mb-4`}
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to all categories</span>
          </Link>
          
          <h1 className={`text-3xl md:text-4xl font-bold ${textColorClass}`}>{categoryName}</h1>
          <p className={`${textColorClass} opacity-90 mt-2`}>
            {filteredShops.length} shops in this category
          </p>
        </div>
      </section>
      
      {/* Search */}
      <section className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-10">
        <div className="container mx-auto px-4 py-4">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={`Search ${categoryName} shops...`} 
          />
        </div>
      </section>
      
      {/* Shops List */}
      <section className="container mx-auto px-4 py-12">
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-800">No shops found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;