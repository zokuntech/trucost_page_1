'use client'; // Required for components using hooks

import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiTag, FiSearch, FiLoader, FiCornerDownLeft } from 'react-icons/fi';
// Note: FiDownload was removed from imports as the button was commented out

// Import placeholder images (Assuming assets folder is at project root)
import barSoapImage from '@/public/assets/soap.png'; 
import lipBalmImage from '@/public/assets/lotion.png';
import cleanerImage from '@/public/assets/aloe_vera.png';
import itemsGridImage from '@/public/assets/items.png'; // Import the new grid image

// Import product suggestions (Assuming data folder is at project root)
import productCategories from '@/app/data/productCategories.json';
import { StaticImageData } from 'next/image';

// Flatten the suggestions into a single array for filtering
const allProductSuggestions = Object.values(productCategories).flat().sort() as string[]; 

// --- ProductCard Component --- 
interface ProductCardProps {
  name: string;
  image: StaticImageData;
  description: string;
  votesCount: number;
  votesNeeded: number;
  onVote: (productName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  description,
  votesCount,
  votesNeeded,
  onVote
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center text-black shadow-sm">
        <img src={image.src} alt={name} className="h-48 w-48 object-contain mb-4" />
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-600 text-center mb-6" dangerouslySetInnerHTML={{ __html: description.replace(/\\n/g, '<br />') }} />
      <button 
        className="bg-[#e0e0e0] text-black py-2 px-8 rounded-full font-semibold mb-4 hover:bg-gray-300"
        onClick={() => onVote(name)}
      >
        Vote
      </button>
      <div className="text-sm text-gray-500">
        <span>{votesCount}</span> of {votesNeeded} needed to unlock
      </div>
    </div>
  );
};
// --- End ProductCard Component ---

// --- Main Page Component --- 
export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(''); 
  const [currentSuggestion, setCurrentSuggestion] = useState('');
  const [submittedSuggestions, setSubmittedSuggestions] = useState<string[]>([]);
  const [availableSuggestions, setAvailableSuggestions] = useState<string[]>(allProductSuggestions);
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); 

  // Filter available suggestions based on input
  const filteredSuggestions = currentSuggestion
    ? availableSuggestions.filter(
        (item) =>
          item.toLowerCase().includes(currentSuggestion.toLowerCase())
      ).slice(0, 8)
    : [];

  // useEffect for click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    console.log("selectedProduct", selectedProduct);
  }, []);

  const handleVote = (productName: string) => {
    setSelectedProduct(productName);
    setModalMessage(`Thanks for your vote for ${productName}! Get notified when this product is unlocked and ready to purchase.`);
    setShowPopup(true);
  };

  // Function to add a suggestion badge
  const addSuggestionBadge = (suggestion: string) => {
    const trimmed = suggestion.trim();
    if (trimmed && !submittedSuggestions.includes(trimmed)) {
      setSubmittedSuggestions([...submittedSuggestions, trimmed]);
      if (availableSuggestions.includes(trimmed)) {
        setAvailableSuggestions(availableSuggestions.filter(s => s !== trimmed));
      }
      setCurrentSuggestion(''); 
      setShowSuggestions(false);
    } else if (submittedSuggestions.includes(trimmed)) {
      // Use toast for duplicate error
      setToastMessage(`"${trimmed}" already suggested!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setCurrentSuggestion(''); 
      setShowSuggestions(false);
    }
  };

  // Handler for selecting from the dropdown
  const handleSuggestionSelect = (suggestion: string) => {
    addSuggestionBadge(suggestion);
    inputRef.current?.focus(); 
  };

  // Updated removeSuggestion
  const removeSuggestion = (suggestionToRemove: string) => {
    setSubmittedSuggestions(submittedSuggestions.filter(s => s !== suggestionToRemove));
    if (allProductSuggestions.includes(suggestionToRemove) && !availableSuggestions.includes(suggestionToRemove)) {
      setAvailableSuggestions([...availableSuggestions, suggestionToRemove].sort());
    }
  };

  // Handler for the FINAL Submit button
  const handleFinalSubmit = async () => {
    if (submittedSuggestions.length === 0) return;
    setIsSubmitting(true);
    console.log("Submitting suggestions to API:", submittedSuggestions);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("API call successful!");
    setIsSubmitting(false);
    setModalMessage("Thanks for your suggestions! Enter your email to get notified about new product updates."); 
    setShowPopup(true);
    setSubmittedSuggestions([]);
    setAvailableSuggestions(allProductSuggestions); 
  };

  // Product data 
  const products = [
    {
      name: "Bar Soap",
      image: barSoapImage, 
      description: "A gentle cleansing bar.",
      votesCount: 120,
      votesNeeded: 250
    },
    {
      name: "Lip Balm", 
      image: lipBalmImage,
      description: "Moisturizing lip care\nproduct.",
      votesCount: 90,
      votesNeeded: 250
    },
    {
      name: "All-Purpose Cleaner", 
      image: cleanerImage,
      description: "Versatile household cleaner.",
      votesCount: 180,
      votesNeeded: 250
    }
  ];

  return (
    <main className="min-h-screen text-black px-6 md:px-8 py-8 bg-white">
      <header className="flex justify-between items-center  max-w-7xl mx-auto">
        <div className="text-2xl font-bold">Trucost</div>
      </header>

      <section className="max-w-6xl mx-auto mb-20"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Shop Smarter.<br /> Spend Less.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              High-quality everyday essentials<br />direct from the source.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 cursor-pointer">
                Shop Top Picks
              </button>
              <button className="border border-gray-300 text-black py-3 px-6 rounded-lg font-semibold text-lg hover:bg-gray-100 cursor-pointer">
                How it Works
              </button>
            </div>
          </div>

          <div className="relative">
            <img 
              src={itemsGridImage.src} 
              alt="Grid of product item illustrations" 
              className="rounded-lg object-cover w-full h-auto" 
            />
          </div>
        </div>
      </section>
      {/* --- End NEW Hero Section --- */} 

      {/* Products Section */}
      <section className="mb-28 pt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 md:px-8">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              {...product} 
              onVote={handleVote}
            />
          ))}
        </div>
      </section>

      {/* What Should We Add Next Section */}
      <section className="mb-20 max-w-3xl mx-auto text-center px-4">
         <h2 className="text-4xl font-bold mb-6">What Should We Add Next?</h2>
         <p className="text-xl mb-8">
           Suggest products below. Add multiple, then submit your list. (Press Enter to add)
         </p>
        <div className="max-w-xl mx-auto">
          <div className="relative mb-4" ref={suggestionRef}> 
            <div className="relative"> 
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Suggest a product and press Enter..." 
                className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3b18a] placeholder-gray-500 pr-10"
                value={currentSuggestion}
                onChange={(e) => {
                  setCurrentSuggestion(e.target.value);
                  setShowSuggestions(e.target.value.length > 0 && availableSuggestions.some(s => s.toLowerCase().includes(e.target.value.toLowerCase())));
                }}
                onFocus={() => {
                  if (currentSuggestion.length > 0 && filteredSuggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSuggestionBadge(currentSuggestion);
                  }
                }}
                disabled={isSubmitting}
              />
              {currentSuggestion.trim().length > 0 && !isSubmitting && (
                <FiCornerDownLeft 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  title="Press Enter to add suggestion"
                />
              )}
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div 
                className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto text-left w-full"
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-black"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    <FiSearch className="mr-3 text-gray-500" />
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Display Badges */} 
          <div className="flex flex-wrap gap-2 justify-center mt-4 min-h-[36px]"> 
            {submittedSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 cursor-default"
              >
                <FiTag className="w-4 h-4 text-gray-500" />
                <span>{suggestion}</span>
                <button 
                  onClick={() => !isSubmitting && removeSuggestion(suggestion)}
                  className={`text-gray-500 hover:text-black ml-1 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                  aria-label={`Remove ${suggestion}`}
                  disabled={isSubmitting}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Final Submit Button */} 
          {submittedSuggestions.length > 0 && (
            <div className="mt-6">
              <button 
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-wait w-full flex items-center justify-center gap-2"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin h-5 w-5" /> Submitting...
                  </>
                ) : (
                  `Submit ${submittedSuggestions.length} Suggestion${submittedSuggestions.length > 1 ? 's' : ''}`
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="my-20 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>
        <div className="relative">
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-300 transform -translate-x-1/2 hidden md:block"></div>
          <div className="space-y-16">
            {[ 
              { num: 1, title: "You Vote", desc: "Choose the essentials you want stocked—bar soap, lotion, cleaning products, etc." },
              { num: 2, title: "We Source from U.S. Manufacturers", desc: "No middlemen. No hidden costs. Just real products at real cost." },
              { num: 3, title: "You Pay the Manufacturing Price", desc: "We charge a small platform fee (15–30%)—that's it." },
              { num: 4, title: "You Get Your Order. Fast. Fair. Simple.", desc: "Free shipping over $50. Or pick it up when we open our warehouse model." }
            ].map((step) => (
              <div key={step.num} className="relative flex items-start gap-8 pl-16 md:pl-20">
                <div className="absolute left-0 top-0">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white text-black border-2 border-black flex items-center justify-center text-2xl font-bold z-10">
                    {step.num}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{step.title}</h3>
                  <p className="text-lg md:text-xl text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16 max-w-xl mx-auto text-center px-4">
        <h2 className="text-3xl font-semibold mb-6">
          Be the first to know when we launch
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-4 py-3 w-full sm:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
          />
          <button className="bg-[#a3b18a] text-black py-3 px-6 rounded-lg font-medium hover:bg-[#8a9a5b]">
            Sign Up
          </button>
        </div>
      </section>

      {/* Toast Notification */} 
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center z-50 transition-all duration-300 ease-in-out"> {/* Changed to red for errors */} 
          <FiX className="mr-2 h-5 w-5" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
      )}
      {/* Popup Modal */} 
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-md w-full relative text-gray-900">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <div className="mb-4 text-green-600 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium">
                {modalMessage} 
              </p>
            </div>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button 
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-700"
                onClick={() => setShowPopup(false)}
              >
                Notify Me
              </button>
              <button 
                className="w-full text-gray-600 py-2 rounded-lg font-medium text-sm hover:bg-gray-100"
                onClick={() => setShowPopup(false)}
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
// --- End Page Component --- 
