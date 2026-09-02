import React, { useState } from 'react';
import ArchProductCard from '../components/ArchProductCard';
import FilterBar from '../components/FilterBar';
import { products } from '../data/products';

const Perfumes = ({ onSelectProduct, onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  let filteredProducts = products.filter(p => p.category === 'perfumes');

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-[#0D0D0D] min-h-screen px-8 md:px-16 py-12">
      <div className="text-center mb-12">
        <span className="text-xs uppercase text-[#D4AF37] tracking-[0.3em]">LUXURY SCENT COLLECTION</span>
        <h1 className="text-4xl md:text-5xl font-serif text-[#F4E07B] tracking-widest uppercase mt-2">
          تشكيلة العطور الحصرية
        </h1>
      </div>

      <FilterBar 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ArchProductCard 
            key={product.id} 
            product={product} 
            onSelectProduct={onSelectProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Perfumes;