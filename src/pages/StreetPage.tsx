import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import ShopCard from '../components/ui/ShopCard';
import { streets, shops } from '../data/mockData';
import { getShopsByStreet, searchShops } from '../utils/filterUtils';
import { Shop } from '../types';

const StreetPage: React.FC = () => {
  const { streetId } = useParams<{ streetId: string }>();
  const [streetShops, setStreetShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [streetName, setStreetName] = useState('');
  
  useEffect(() => {
    if (streetId) {
      const streetData = streets.find(s => s.id === streetId);
      const shopsOnStreet = getShopsByStreet(shops, streetId);
      
      setStreetName(streetData?.name || 'Unknown Street');
      setStreetShops(shopsOnStreet);
      setFilteredShops(shopsOnStreet);
    }
  }, [streetId]);
  
  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredShops(streetShops);
      return;
    }
    
    const results = searchShops(streetShops, term);
    setFilteredShops(results);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/streets" 
            className="inline-flex items-center text-indigo-200 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to all streets</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <MapPin size={24} className="text-indigo-200 mr-2" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">{streetName}</h1>
              </div>
              <p className="text-indigo-200 mt-2">
                {filteredShops.length} shops on this street
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search */}
      <section className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-10">
        <div className="container mx-auto px-4 py-4">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={`Search shops on ${streetName}...`} 
          />
        </div>
      </section>
      
      {/* Shops List */}
      <section className="container mx-auto px-4 py-12">
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} showStreet={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-800">No shops found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </section>
      
      {/* Map Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Street Map</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-300">
              {/* Map placeholder - in a real app, this would be an actual map */}
              <div className="flex items-center justify-center h-full bg-indigo-50">
                <div className="text-center">
                  <MapPin size={48} className="text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">{streetName}</h3>
                  <p className="text-gray-600">Interactive map would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StreetPage;