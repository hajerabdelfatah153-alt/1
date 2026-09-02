import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { products } from '../data/products';

const Clothing = ({ onSelectProduct, onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  let filteredProducts = products.filter(p => p.category === 'clothing');

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
    <div className="bg-[#0D0D0D] min-h-screen px-12 py-12">
      <h1 className="text-4xl font-serif text-[#D4AF37] text-center mb-10 tracking-widest uppercase">
        تشكيلة الملابس الفاخرة
      </h1>

      <FilterBar 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
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

export default Clothing;