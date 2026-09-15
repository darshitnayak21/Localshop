import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import CategoryCard from '../components/ui/CategoryCard';
import StreetCard from '../components/ui/StreetCard';
import ShopCard from '../components/ui/ShopCard';
import { categories, streets, shops } from '../data/mockData';
import { searchShops } from '../utils/filterUtils';
import { Shop } from '../types';

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Shop[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setSearchResults([]);
    setShowSearchResults(false);
  }, []);
  
  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    const results = searchShops(shops, term);
    setSearchResults(results);
    setShowSearchResults(true);
  };
  
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      navigate(`/categories/${categoryId}`);
    }
  };
  
  const handleStreetClick = (streetId: string) => {
    navigate(`/streets/${streetId}`);
  };
  
  const featuredCategories = [
    categories.find(c => c.id === 'fancy'),
    categories.find(c => c.id === 'bikerepair'),
    categories.find(c => c.id === 'dairy'),
    categories.find(c => c.id === 'stationery'),
    categories.find(c => c.id === 'bakery'),
    categories.find(c => c.id === 'vegetables'),
    categories.find(c => c.id === 'tiffin'),
  ].filter(Boolean);
  
  const popularStreets = streets.slice(0, 4);
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-teal-700 py-20 md:py-32">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Local Shops in Your Neighborhood
            </h1>
            <p className="text-teal-100 text-lg mb-8">
              Discover the best stores, restaurants, and services sorted by categories and streets
            </p>
            <div className="mt-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Results */}
      {showSearchResults && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Search Results
              <span className="ml-2 text-gray-500 text-lg font-normal">
                ({searchResults.length} shops found)
              </span>
            </h2>
            {searchResults.length === 0 && (
              <p className="text-gray-600">No shops found matching your search criteria.</p>
            )}
          </div>
          
          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}
        </section>
      )}
      
      {!showSearchResults && (
        <>
          {/* Featured Categories */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featuredCategories.map(category => (
                category && (
                  <CategoryCard 
                    key={category.id} 
                    category={category} 
                    isActive={selectedCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)} 
                  />
                )
              ))}
            </div>
          </section>
          
          {/* Popular Streets */}
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Popular Streets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularStreets.map(street => (
                  <StreetCard 
                    key={street.id} 
                    street={street} 
                    onClick={() => handleStreetClick(street.id)} 
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <button 
                  onClick={() => navigate('/streets')}
                  className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  <span>View all streets</span>
                  <MapPin size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </section>
          
          <div className="text-center mt-10 mb-12">
            <button 
              onClick={() => navigate('/enquire')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Order Online
            </button>
          </div>
        </>
      )}
      
      {/* CTA Section */}
      <section className="bg-orange-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Place your order online from your favorite local shops!
          </p>
          <button 
            onClick={() => navigate('/enquire')}
            className="px-6 py-3 bg-white hover:bg-gray-100 text-orange-600 font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Order Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;