import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiDownload, FiCheck, FiTag, FiSearch, FiLoader, FiCornerDownLeft } from 'react-icons/fi';

// Import placeholder images
import barSoapImage from '../assets/bar-soap.png';
import lipBalmImage from '../assets/lotion-bottle.png';
import cleanerImage from '../assets/vera.png';

// Import product suggestions from categories
import productCategories from '../data/productCategories.json';

// Flatten the suggestions into a single array for filtering
const allProductSuggestions = Object.values(productCategories).flat().sort(); // Initial master list, sorted

// ProductCard Component
interface ProductCardProps {
  name: string;
  image: string;
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
    <div className="border border-white border-2 rounded-lg py-8 px-4 flex flex-col items-center">
      <div className="mb-4 w-48 h-48 flex items-center justify-center">
        <img src={image} alt={name} className="h-48 w-48 object-contain" />
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-400 text-center mb-6">
        {description}
      </p>
      <button 
        className="bg-[#e0e0e0] text-black py-2 px-8 rounded-full font-medium mb-4"
        onClick={() => onVote(name)}
      >
        Vote to unlock
      </button>
      <div className="text-sm">
        <span>{votesCount}</span> of {votesNeeded} needed to unlock
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [currentSuggestion, setCurrentSuggestion] = useState('');
  const [submittedSuggestions, setSubmittedSuggestions] = useState<string[]>([]);
  const [availableSuggestions, setAvailableSuggestions] = useState<string[]>(allProductSuggestions);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for final submit
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter available suggestions based on input
  const filteredSuggestions = currentSuggestion
    ? availableSuggestions.filter(
        (item) =>
          item.toLowerCase().includes(currentSuggestion.toLowerCase())
      ).slice(0, 8) // Limit to 8 suggestions
    : [];

  // Re-add useEffect for click outside
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
  }, []);

  const handleVote = (productName: string) => {
    setSelectedProduct(productName);
    setShowPopup(true);
  };

  // Function to add a suggestion badge (minor update for clarity)
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

  // Updated removeSuggestion to potentially add back to available list
  const removeSuggestion = (suggestionToRemove: string) => {
    setSubmittedSuggestions(submittedSuggestions.filter(s => s !== suggestionToRemove));
    // Check if it was an original suggestion and not already available
    if (allProductSuggestions.includes(suggestionToRemove) && !availableSuggestions.includes(suggestionToRemove)) {
      // Add back and re-sort
      setAvailableSuggestions([...availableSuggestions, suggestionToRemove].sort());
    }
  };

  // NEW Handler for the FINAL Submit button
  const handleFinalSubmit = async () => {
    if (submittedSuggestions.length === 0) return; // Should be disabled, but safety check

    setIsSubmitting(true); // Set loading state
    console.log("Submitting suggestions to API:", submittedSuggestions);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); // Wait 1.5 seconds

    console.log("API call successful!");
    setIsSubmitting(false); // Reset loading state
    
    setToastMessage("Suggestions submitted successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Clear the submitted list and restore available suggestions
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
      name: "Lotion",
      image: lipBalmImage,
      description: "Moisturizing lotion.",
      votesCount: 90,
      votesNeeded: 250
    },
    {
      name: "Aloe Vera",
      image: cleanerImage,
      description: "Versatile household cleaner.",
      votesCount: 180,
      votesNeeded: 250
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-8 py-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="text-2xl font-medium">Trucost</div>
      </header>

      {/* Hero Section */}
      <section className="mt-14 mb-12 max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-5xl font-bold leading-tight mb-4 capitalize">
            Pay what it costs. <br />
            Not what they mark it up to.
        </h1>
        <p className="text-xl mb-8">
          Trucost shows you the real cost of everyday goods<br />
          direct from U.S. manufacturers. No retail markup.
        </p>
        {/* <button className="bg-[#a3b18a] text-black py-3 px-8 rounded-full font-medium text-lg">
          Learn more
        </button> */}
      </section>

      {/* Products Section */}
      <section className="mt-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 md:px-8">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              image={product.image}
              description={product.description}
              votesCount={product.votesCount}
              votesNeeded={product.votesNeeded}
              onVote={handleVote}
            />
          ))}
        </div>
      </section>

      {/* What Should We Add Next Section - Updated Input UI */}
      <section className="mb-36 mt-12 max-w-3xl mx-auto text-center px-4">
        <h2 className="text-5xl font-bold mb-6">What Should We Add Next?</h2>
        <p className="text-xl mb-8">
          Suggest products below. Add multiple, then submit your list. (Press Enter to add)
        </p>
        <div className="max-w-xl mx-auto">
          {/* Container for input, dropdown, and badges */} 
          <div className="relative mb-4" ref={suggestionRef}> 
            {/* Input field container - Now takes full width */} 
            <div className="relative"> 
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Suggest a product and press Enter..." 
                className="bg-gray-900 text-white w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3b18a] placeholder-gray-500 pr-10" // Added right padding for icon
                value={currentSuggestion}
                onChange={(e) => {
                  setCurrentSuggestion(e.target.value);
                  // Logic to show/hide suggestions
                  setShowSuggestions(e.target.value.length > 0 && availableSuggestions.some(s => s.toLowerCase().includes(e.target.value.toLowerCase())));
                }}
                onFocus={() => {
                  // Show suggestions on focus if input has text and matches are available
                  if (currentSuggestion.length > 0 && filteredSuggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onKeyPress={(e) => {
                  // Use addSuggestionBadge directly on Enter
                  if (e.key === 'Enter') {
                    addSuggestionBadge(currentSuggestion);
                  }
                }}
                disabled={isSubmitting} // Disable input while submitting
              />
              {/* Enter Icon Indicator */} 
              {currentSuggestion.trim().length > 0 && !isSubmitting && (
                <FiCornerDownLeft 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" // Icon indicating Enter
                  title="Press Enter to add suggestion"
                />
              )}
              {/* Clear Button - Keep if desired, might be redundant with Enter icon 
              {currentSuggestion.length > 0 && !isSubmitting && (
                <button  
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white" // Adjusted position if keeping
                  onClick={() => { ... }}
                >
                  <FiX className="h-5 w-5" />
                </button>
              )} */} 
            </div>
            
            {/* Suggestion Dropdown (Positioned relative to the input container) */} 
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div 
                className="absolute z-10 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto text-left w-full" // Set width to 100% of parent
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center text-white"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    <FiSearch className="mr-3 text-gray-400" />
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Display Badges */} 
          <div className="flex flex-wrap gap-2 justify-center mt-4 min-h-[36px]"> {/* Added min-height */} 
            {submittedSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 cursor-default"
              >
                <FiTag className="w-4 h-4 text-gray-400" />
                <span>{suggestion}</span>
                <button 
                  onClick={() => !isSubmitting && removeSuggestion(suggestion)} // Prevent removal during submit
                  className={`text-gray-400 hover:text-white ml-1 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                  aria-label={`Remove ${suggestion}`}
                  disabled={isSubmitting}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* NEW Final Submit Button */} 
          {submittedSuggestions.length > 0 && (
            <div className="mt-6">
              <button 
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-wait w-full flex items-center justify-center gap-2"
                onClick={handleFinalSubmit}
                disabled={isSubmitting} // Disable only during submission
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
      <section className="my-20 max-w-4xl mx-auto">
        <h2 className="text-6xl font-bold mb-16 text-center">How It Works</h2>
        
        <div className="space-y-16 relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-700 hidden md:block"></div>
          
          {/* Step 1 */}
          <div className="flex items-start gap-8 ">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-black text-white border-2 border-white flex items-center z-10 justify-center text-2xl font-bold">1</div>
            <div>
              <h3 className="text-3xl font-bold mb-3">You Vote For Products</h3>
              <p className="text-xl text-gray-300">Choose the essentials you want stocked—bar soap, lotion, cleaning products, etc.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-black text-white border-2 border-white z-10 flex items-center justify-center text-2xl font-bold">2</div>
            <div>
              <h3 className="text-3xl font-bold mb-3">We Source from U.S. Manufacturers</h3>
              <p className="text-xl text-gray-300">No middlemen. No hidden costs. Just real products at real cost.</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-black text-white border-2 border-white z-10 flex items-center justify-center text-2xl font-bold">3</div>
            <div>
              <h3 className="text-3xl font-bold mb-3">You Pay the Manufacturing Price</h3>
              <p className="text-xl text-gray-300">We charge a small platform fee (15–30%), that's it.</p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-black text-white border-2 border-white z-10 flex items-center justify-center text-2xl font-bold">4</div>
            <div>
              <h3 className="text-3xl font-bold mb-3">Support Local. Receive Quality.
              </h3>
              <p className="text-xl text-gray-300">Every order supports a U.S. manufacturer and gets shipped directly to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Be the first to know when we launch
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-transparent border border-gray-700 rounded-lg px-4 py-3 w-full sm:w-auto flex-grow"
          />
          <button className="bg-[#e0e0e0] text-black py-3 px-6 rounded-lg font-medium">
            Submit
          </button>
        </div>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center z-50 transition-all duration-300 ease-in-out">
          <FiCheck className="mr-2 h-5 w-5" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="mb-2 text-green-600 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900">Thanks for your vote!</h3>
              <p className="text-gray-600 mb-4">
                You voted for {selectedProduct}
              </p>
              <p className="text-gray-800 font-medium">
                Get notified when this product is unlocked and ready to purchase.
              </p>
            </div>
            
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button 
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium"
                onClick={() => setShowPopup(false)}
              >
                Notify Me
              </button>
              <button 
                className="w-full text-gray-600 py-2 rounded-lg font-medium text-sm"
                onClick={() => setShowPopup(false)}
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 