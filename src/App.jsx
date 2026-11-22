import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Search, Sparkles, Tag, ShoppingCart, Star, Clock, MapPin, Plus, ArrowLeft, Heart, ChevronDown, CheckCircle, Share2, Gift, User, ShieldCheck, X, Copy, Coffee, Pizza, IceCream, Beef, CloudRain, Sun, Home as HomeIcon } from 'lucide-react';
import './index.css';

const GWALIOR_RESTAURANTS = [
  { id: 1, name: 'Panchvati Gaurav', cuisine: 'Rajasthani • North Indian', rating: 4.5, time: '25–35 min', priceForTwo: '₹600 for two', location: 'City Centre', offer: 'Flat ₹150 OFF', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800', menu: [{ id: 101, name: 'Premium Rajasthani Thali', price: 350, desc: 'Authentic dal baati churma.', dietary: 'Veg' }, { id: 102, name: 'Gatte ki Sabzi', price: 220, desc: 'Traditional gram flour dumplings.', dietary: 'Veg' }, { id: 103, name: 'Malpua', price: 150, desc: 'Sweet pancake dessert.', dietary: 'Veg' }] },
  { id: 2, name: 'SS Kachoriwala', cuisine: 'Street Food • Snacks', rating: 4.8, time: '15–20 min', priceForTwo: '₹150 for two', location: 'Naya Bazaar', offer: '20% OFF', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800', menu: [{ id: 201, name: 'Khasta Kachori', price: 40, desc: 'Famous crispy kachori.', dietary: 'Vegan' }, { id: 202, name: 'Samosa', price: 25, desc: 'Hot potato stuffed pastry.', dietary: 'Vegan' }, { id: 203, name: 'Jalebi', price: 50, desc: 'Hot crispy sweets.', dietary: 'Veg' }] },
  { id: 3, name: 'Kwality Restaurant', cuisine: 'North Indian • Mughlai', rating: 4.3, time: '30–40 min', priceForTwo: '₹800 for two', location: 'Phoolbagh', offer: 'Free dessert', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800', menu: [{ id: 301, name: 'Butter Chicken', price: 420, desc: 'Classic creamy tomato gravy.', dietary: 'Non-Veg' }, { id: 302, name: 'Paneer Tikka Masala', price: 350, desc: 'Smoky paneer in rich gravy.', dietary: 'Veg' }, { id: 303, name: 'Garlic Naan', price: 60, desc: 'Fresh tandoori bread.', dietary: 'Veg' }] },
  { id: 4, name: 'Param Food Complex', cuisine: 'South Indian', rating: 4.4, time: '20–30 min', priceForTwo: '₹400 for two', location: 'DB Mall Area', offer: '₹100 OFF', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800', menu: [{ id: 401, name: 'Masala Dosa', price: 150, desc: 'Crispy dosa.', dietary: 'Veg' }, { id: 402, name: 'Idli Sambar', price: 90, desc: 'Soft steamed rice cakes.', dietary: 'Vegan' }, { id: 403, name: 'Vada Sambar', price: 100, desc: 'Crispy lentil donuts.', dietary: 'Vegan' }] },
  { id: 5, name: 'Indian Coffee House', cuisine: 'South Indian • Beverages', rating: 4.2, time: '20–35 min', priceForTwo: '₹300 for two', location: 'Lashkar', offer: '10% OFF', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=800', menu: [{ id: 501, name: 'Filter Coffee', price: 60, desc: 'Strong filter coffee.', dietary: 'Veg' }, { id: 502, name: 'Egg Sandwich', price: 120, desc: 'Classic egg toast.', dietary: 'Eggetarian' }, { id: 503, name: 'Cold Coffee', price: 110, desc: 'Creamy iced coffee.', dietary: 'Veg' }] },
  { id: 6, name: 'Alfanzo', cuisine: 'Bakery • Desserts', rating: 4.6, time: '15–25 min', priceForTwo: '₹500 for two', location: 'City Centre', offer: 'Free Pastry', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800', menu: [{ id: 601, name: 'Truffle Cake', price: 550, desc: 'Rich chocolate truffle.', dietary: 'Eggetarian' }, { id: 602, name: 'Cheese Croissant', price: 120, desc: 'Flaky buttery pastry.', dietary: 'Eggetarian' }, { id: 603, name: 'Red Velvet Pastry', price: 150, desc: 'Premium layer cake.', dietary: 'Eggetarian' }] },
  { id: 7, name: 'Victorian Vantage', cuisine: 'Continental • Italian', rating: 4.4, time: '35–45 min', priceForTwo: '₹1000 for two', location: 'Gwalior Fort Area', offer: '20% OFF', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800', menu: [{ id: 701, name: 'Pasta Alfredo', price: 350, desc: 'Creamy white sauce pasta.', dietary: 'Veg' }, { id: 702, name: 'Woodfired Pizza', price: 450, desc: 'Authentic Italian pizza.', dietary: 'Veg' }, { id: 703, name: 'Garlic Bread', price: 180, desc: 'Cheese stuffed bread.', dietary: 'Veg' }] },
  { id: 8, name: 'Bamboo Restaurant', cuisine: 'Chinese • Thai', rating: 4.1, time: '30–40 min', priceForTwo: '₹700 for two', location: 'Lashkar', offer: 'Free Momos', image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800', menu: [{ id: 801, name: 'Chicken Hakka Noodles', price: 250, desc: 'Wok tossed noodles.', dietary: 'Non-Veg' }, { id: 802, name: 'Veg Momos', price: 150, desc: 'Steamed dumplings.', dietary: 'Vegan' }, { id: 803, name: 'Chilli Paneer', price: 280, desc: 'Spicy soy tossed paneer.', dietary: 'Veg' }] },
  { id: 9, name: 'Boulevard 69', cuisine: 'Cafe • Healthy Food', rating: 4.5, time: '20–30 min', priceForTwo: '₹600 for two', location: 'City Centre', offer: '15% OFF', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', menu: [{ id: 901, name: 'Quinoa Salad', price: 280, desc: 'Fresh healthy salad.', dietary: 'Vegan' }, { id: 902, name: 'Avocado Toast', price: 320, desc: 'Smashed avocado on sourdough.', dietary: 'Vegan' }, { id: 903, name: 'Berry Smoothie', price: 190, desc: 'Mixed berries blend.', dietary: 'Veg' }] },
  { id: 10, name: 'Shere Punjab', cuisine: 'Punjabi • North Indian', rating: 4.3, time: '25–35 min', priceForTwo: '₹550 for two', location: 'Padav', offer: 'Flat ₹100 OFF', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1001, name: 'Sarson Da Saag', price: 220, desc: 'With makki ki roti.', dietary: 'Veg' }, { id: 1002, name: 'Amritsari Kulcha', price: 150, desc: 'Stuffed spicy bread.', dietary: 'Veg' }, { id: 1003, name: 'Lassi', price: 80, desc: 'Thick sweet yogurt drink.', dietary: 'Veg' }] },
  { id: 11, name: 'Bikanervala', cuisine: 'Sweets • North Indian', rating: 4.6, time: '20–30 min', priceForTwo: '₹400 for two', location: 'City Centre', offer: 'Free Rasgulla', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1101, name: 'Raj Kachori', price: 120, desc: 'Crispy chaat bowl.', dietary: 'Veg' }, { id: 1102, name: 'Chole Bhature', price: 180, desc: 'Spicy chickpea curry.', dietary: 'Veg' }, { id: 1103, name: 'Rasmalai', price: 90, desc: 'Milk sweets.', dietary: 'Veg' }] },
  { id: 12, name: 'Hungroo', cuisine: 'Burgers • Fast Food', rating: 4.2, time: '15–25 min', priceForTwo: '₹350 for two', location: 'DB Mall', offer: 'BOGO', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1201, name: 'Crispy Chicken Burger', price: 180, desc: 'Spicy fried chicken.', dietary: 'Non-Veg' }, { id: 1202, name: 'Peri Peri Fries', price: 110, desc: 'Spicy french fries.', dietary: 'Vegan' }, { id: 1203, name: 'Veg Cheese Burger', price: 140, desc: 'Cheesy patty.', dietary: 'Veg' }] },
  { id: 13, name: 'Chotiwala', cuisine: 'Thali • North Indian', rating: 4.0, time: '30–40 min', priceForTwo: '₹400 for two', location: 'Railway Station', offer: '25% OFF', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1301, name: 'Deluxe Thali', price: 250, desc: 'Complete meal.', dietary: 'Veg' }, { id: 1302, name: 'Paneer Butter Masala', price: 220, desc: 'Sweet and rich gravy.', dietary: 'Veg' }, { id: 1303, name: 'Jeera Rice', price: 120, desc: 'Cumin flavoured rice.', dietary: 'Vegan' }] },
  { id: 14, name: 'The Mansingh', cuisine: 'Fine Dining • Mughlai', rating: 4.7, time: '40–50 min', priceForTwo: '₹1500 for two', location: 'Taj Usha Kiran', offer: 'Complimentary Mocktail', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1401, name: 'Mutton Rogan Josh', price: 650, desc: 'Tender lamb curry.', dietary: 'Non-Veg' }, { id: 1402, name: 'Chicken Tikka', price: 450, desc: 'Tandoori starter.', dietary: 'Non-Veg' }, { id: 1403, name: 'Dal Makhani', price: 380, desc: 'Overnight slow cooked.', dietary: 'Veg' }] },
  { id: 15, name: 'Yellow Chilli', cuisine: 'North Indian', rating: 4.5, time: '30–40 min', priceForTwo: '₹1200 for two', location: 'City Centre', offer: '15% OFF', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1501, name: 'Lalla Mussa Dal', price: 350, desc: 'Signature black dal.', dietary: 'Veg' }, { id: 1502, name: 'Shaam Savera', price: 420, desc: 'Spinach and paneer kofta.', dietary: 'Veg' }, { id: 1503, name: 'Puran Singh da Tariwala Murgh', price: 550, desc: 'Spicy chicken curry.', dietary: 'Non-Veg' }] },
  { id: 16, name: 'Cafe Quba', cuisine: 'Cafe • Italian', rating: 4.3, time: '25–35 min', priceForTwo: '₹700 for two', location: 'Lashkar', offer: 'Free Garlic Bread', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1601, name: 'Margherita Pizza', price: 300, desc: 'Classic cheese pizza.', dietary: 'Veg' }, { id: 1602, name: 'Penne Arrabiata', price: 280, desc: 'Spicy red sauce pasta.', dietary: 'Veg' }, { id: 1603, name: 'Hazelnut Frappe', price: 210, desc: 'Cold blended coffee.', dietary: 'Veg' }] },
  { id: 17, name: 'Captains Cafe', cuisine: 'Continental • Shakes', rating: 4.4, time: '20–30 min', priceForTwo: '₹500 for two', location: 'Phoolbagh', offer: 'Flat ₹50 OFF', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1701, name: 'Oreo Shake', price: 150, desc: 'Thick chocolate shake.', dietary: 'Eggetarian' }, { id: 1702, name: 'Club Sandwich', price: 220, desc: 'Triple layer sandwich.', dietary: 'Veg' }, { id: 1703, name: 'Loaded Nachos', price: 190, desc: 'With cheese and salsa.', dietary: 'Veg' }] },
  { id: 18, name: 'Silver Saloon', cuisine: 'Luxury • Multi-Cuisine', rating: 4.8, time: '45–60 min', priceForTwo: '₹2500 for two', location: 'Taj Usha Kiran', offer: 'No Offers', image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1801, name: 'Galouti Kebab', price: 850, desc: 'Melt in mouth lamb.', dietary: 'Non-Veg' }, { id: 1802, name: 'Truffle Mushroom Risotto', price: 950, desc: 'Italian classic.', dietary: 'Veg' }, { id: 1803, name: 'Crème Brûlée', price: 550, desc: 'French vanilla dessert.', dietary: 'Eggetarian' }] },
  { id: 19, name: 'Jain Family Restaurant', cuisine: 'Pure Veg • Jain Food', rating: 4.7, time: '25–35 min', priceForTwo: '₹400 for two', location: 'Naya Bazaar', offer: '20% OFF', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800', menu: [{ id: 1901, name: 'Jain Paneer Tikka', price: 280, desc: 'No onion, no garlic.', dietary: 'Veg' }, { id: 1902, name: 'Jain Dal Fry', price: 150, desc: 'Simple lentil curry.', dietary: 'Veg' }, { id: 1903, name: 'Tandoori Roti', price: 20, desc: 'Clay oven bread.', dietary: 'Vegan' }] }
];

const CATEGORIES = [
  { name: 'Biryani', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=200&q=80' },
  { name: 'Pizza', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=200&q=80' },
  { name: 'Burger', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80' },
  { name: 'Thali', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80' },
  { name: 'Sweets', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80' },
  { name: 'South Indian', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=200&q=80' },
  { name: 'Coffee', img: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=200&q=80' }
];

const getDietaryColor = (diet) => {
  switch(diet) {
    case 'Veg': return '#24963F';
    case 'Non-Veg': return '#E23744';
    case 'Eggetarian': return '#F59E0B';
    case 'Vegan': return '#10B981';
    default: return '#696969';
  }
};

// --- Modals & Generic Pages ---
function AuthModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', cursor: 'pointer'}}>
          <X size={24} />
        </button>
        <h2 style={{marginBottom: '0.5rem'}}>Login</h2>
        <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>or create an account</p>
        <input type="text" placeholder="Phone Number" className="input-field" />
        <button className="btn btn-primary" style={{width: '100%'}} onClick={onClose}>Login</button>
        <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem', textAlign: 'center'}}>
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

function GenericPage({ title, description }) {
  return (
    <div className="center-page animate-fade-in" style={{minHeight: '60vh'}}>
      <h1 className="section-title" style={{fontSize: '3rem', marginBottom: '1rem'}}>{title}</h1>
      <p style={{fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto'}}>
        {description || `This is the official ${title} page for CravelNest. We are working hard to bring you the best food delivery experience in Gwalior.`}
      </p>
      <Link to="/" className="btn btn-primary" style={{marginTop: '2rem'}}>Back to Home</Link>
    </div>
  );
}

// --- Layout ---
function Layout({ children, cartItems, orderPlaced }) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="page-container">
      <header className="header">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <a href="/" className="logo-section" style={{textDecoration: 'none'}}>
            <img src="/logo-mark.svg" alt="CravelNest Logo" className="logo-img" />
            <div className="logo-text">
              <div className="logo">Cravel<span className="logo-accent">Nest</span></div>
              <div className="tagline">An Initiative by Aditya Shivam's World</div>
            </div>
          </a>
          <div className="location-selector">
            <MapPin size={18} color="var(--primary)" />
            <span>Gwalior</span>
            <ChevronDown size={16} color="var(--text-secondary)" />
          </div>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-item"><HomeIcon size={20} /><span>Home</span></Link>
          <Link to="/discover" className="nav-item"><Sparkles size={20} /><span>AI Picks</span></Link>
          <Link to="/offers" className="nav-item"><Tag size={20} /><span>Offers</span></Link>
          {orderPlaced && <Link to="/track" className="nav-item"><CheckCircle size={20} /><span>Track Order</span></Link>}
          <Link to="/cart" className="nav-item">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && <div className="cart-badge">{cartItems.length}</div>}
            <span>Cart</span>
          </Link>
          <button className="nav-item" onClick={() => setShowAuth(true)}>
            <User size={20} /><span>Sign In</span>
          </button>
        </nav>
      </header>
      
      {children}

      {/* Footer */}
      <footer className="footer">
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem'}}>
          <div>
            <h2 style={{fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1rem'}}>CravelNest</h2>
            <p style={{color: '#999'}}>An Initiative by Aditya Shivam's World<br/>© 2026 CravelNest Technologies Pvt. Ltd</p>
          </div>
          <div>
            <h3 style={{marginBottom: '1rem'}}>Company</h3>
            <ul style={{listStyle: 'none', color: '#999', display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
              <li><Link to="/about" style={{color: 'inherit'}}>About Us</Link></li>
              <li><Link to="/careers" style={{color: 'inherit'}}>Careers</Link></li>
              <li><Link to="/team" style={{color: 'inherit'}}>Team</Link></li>
              <li><Link to="/prime" style={{color: 'inherit', color: 'var(--primary)', fontWeight: 'bold'}}>CravelNest Prime</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{marginBottom: '1rem'}}>Contact us</h3>
            <ul style={{listStyle: 'none', color: '#999', display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
              <li><Link to="/support" style={{color: 'inherit'}}>Help & Support</Link></li>
              <li><Link to="/partner" style={{color: 'inherit'}}>Partner with us</Link></li>
              <li><Link to="/ride" style={{color: 'inherit'}}>Ride with us</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      
      {/* Voice Agent rendered only when inside the app */}
      <elevenlabs-convai agent-id="agent_3301m3dc7dt4eksvtzs54z51kq46"></elevenlabs-convai>
    </div>
  );
}

// --- Home Route ---
function Home({ addToCart }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [weather, setWeather] = useState(null);
  
  const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80", // Pizza
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", // Burger
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", // Thali
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", // Sweets
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=800&q=80", // South Indian
    "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80", // Coffee
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"  // Biryani
  ];
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIdx(prev => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroNext = () => {
    setCurrentHeroIdx(prev => (prev + 1) % HERO_IMAGES.length);
  };

  // Fetch Gwalior Weather
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=26.2183&longitude=78.1828&current_weather=true')
      .then(res => res.json())
      .then(data => setWeather(data.current_weather))
      .catch(err => console.error("Weather fetch failed:", err));
  }, []);

  const filteredRestaurants = GWALIOR_RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' ? true : r.rating >= 4.5;
    return matchesSearch && matchesFilter;
  });

  const foodSearchResults = search.trim() ? GWALIOR_RESTAURANTS.flatMap(r => 
    r.menu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase()))
      .map(item => ({...item, restaurantName: r.name, restaurantId: r.id, image: r.image}))
  ) : [];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fade-in delay-1">
          <div className="hero-badges">
            <div className="badge">
              <Heart size={14} fill="currentColor" /> CRAVE IT. NEST IT. TASTE THE BEST.
            </div>
            {weather && (
              <div className="badge" style={{textTransform: 'none', letterSpacing: 'normal'}}>
                {weather.temperature > 30 ? <Sun size={14}/> : <CloudRain size={14}/>}
                It's {weather.temperature}°C in Gwalior. Perfect time to order!
              </div>
            )}
          </div>
          <h1>Aaj kya khaoge?<br/>Scene hum set karenge.</h1>
          <p>From craving to checkout—Gwalior's finest restaurants, exclusive deals, and lightning-fast delivery.</p>
          
          <div className="hero-search">
            <div className="hero-search-wrapper">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search 'kachori', 'poha', 'butter chicken'" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button onClick={() => {}}>Search</button>
          </div>
        </div>
        
        <div className="hero-image-container animate-slide-right delay-2" onClick={handleHeroNext} onMouseEnter={handleHeroNext} style={{cursor: 'pointer', position: 'relative', height: '400px', width: '100%', maxWidth: '600px', borderRadius: '16px', overflow: 'hidden'}}>
          {HERO_IMAGES.map((img, idx) => (
             <img 
               key={idx}
               src={img} 
               alt="Delicious Food" 
               className="hero-image" 
               style={{
                 opacity: currentHeroIdx === idx ? 1 : 0,
                 position: 'absolute',
                 top: 0, left: 0,
                 width: '100%', height: '100%',
                 objectFit: 'cover',
                 transition: 'opacity 1s ease-in-out'
               }} 
             />
          ))}
        </div>
      </section>

      {/* What's on your mind? */}
      <section className="categories-section animate-fade-in delay-2">
        <h2 className="section-title" style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>What's on your mind?</h2>
        <div className="categories-scroll">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="category-item" onClick={() => setSearch(cat.name)}>
              <img src={cat.img} alt={cat.name} className="category-img" />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Food Search Results */}
      {search.trim() && foodSearchResults.length > 0 && (
        <section className="section-container animate-fade-in" style={{marginBottom: '2rem'}}>
          <div className="section-header">
            <h2 className="section-title">Dishes matching "{search}"</h2>
          </div>
          <div className="menu-list" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem'}}>
            {foodSearchResults.map((item, idx) => (
              <div key={`${item.restaurantId}-${item.id}-${idx}`} className="menu-item" style={{background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)'}}>
                <div style={{flex: 1}}>
                  <h3 style={{margin: 0, fontSize: '1.1rem'}}>{item.name}</h3>
                  <p style={{margin: '0.2rem 0', fontSize: '0.85rem', color: 'var(--text-light)'}}>{item.desc}</p>
                  <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.5rem'}}>
                     <span style={{fontWeight: 700}}>₹{item.price}</span>
                     <span style={{fontSize: '0.75rem', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', color: 'var(--primary)'}} onClick={() => navigate(`/restaurant/${item.restaurantId}`)}>{item.restaurantName}</span>
                  </div>
                </div>
                <button className="add-button" style={{padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '1rem'}} onClick={() => {
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    restaurantName: item.restaurantName,
                    image: item.image
                  });
                }}>ADD</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="section-container animate-fade-in delay-3">
        <div className="section-header">
          <h2 className="section-title">Restaurants with online food delivery in Gwalior</h2>
          <div className="filters-bar" style={{marginTop: '1.5rem'}}>
            <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All Restaurants</button>
            <button className={`filter-btn ${filter === 'Rating 4.5+' ? 'active' : ''}`} onClick={() => setFilter('Rating 4.5+')}>Rating 4.5+</button>
            <button className="filter-btn">Pure Veg</button>
            <button className="filter-btn">Offers</button>
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="center-page" style={{minHeight: '30vh'}}>
            <h3>No restaurants found</h3>
            <p>Try searching for something else in Gwalior.</p>
          </div>
        ) : (
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant, index) => (
              <div key={restaurant.id} className="restaurant-card" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                <div className="card-image-container">
                  <img src={restaurant.image} alt={restaurant.name} className="card-image" />
                  <div className="card-offer">{restaurant.offer}</div>
                </div>
                <div className="card-content">
                  <div className="card-title-row">
                    <div className="card-title">{restaurant.name}</div>
                    <div className="card-rating"><span>{restaurant.rating}</span><Star size={14} fill="currentColor" /></div>
                  </div>
                  <div className="card-cuisine">{restaurant.cuisine}</div>
                  <div className="card-meta">
                    <div className="meta-item"><Clock size={14} /> {restaurant.time}</div>
                    <div className="meta-item">• {restaurant.priceForTwo}</div>
                    <div className="meta-item"><MapPin size={14} /> {restaurant.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// --- Restaurant Route ---
function Restaurant({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const restaurant = GWALIOR_RESTAURANTS.find(r => r.id === parseInt(id));

  // Fetch Random User Reviews API
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=3&nat=in')
      .then(res => res.json())
      .then(data => {
        const reviewsWithText = data.results.map(user => {
          // ensure the restaurant has a menu before picking random dish
          const randomDish = restaurant.menu && restaurant.menu.length > 0 
            ? restaurant.menu[Math.floor(Math.random() * restaurant.menu.length)] 
            : { name: 'the food' };
          
          const templates = [
            `The ${randomDish.name} here is incredible! Best in Gwalior.`,
            `I absolutely loved the ${randomDish.name}. Delivered fresh and hot!`,
            `Their ${randomDish.name} is a must-try. Highly recommend it!`,
            `Such a great experience. The ${randomDish.name} hit the spot.`
          ];
          
          return {
            ...user,
            customReview: templates[Math.floor(Math.random() * templates.length)]
          };
        });
        setReviews(reviewsWithText);
      })
      .catch(err => console.error("Reviews fetch failed:", err));
  }, [id, restaurant]);

  if (!restaurant) return <div className="center-page">Restaurant not found.</div>;

  return (
    <div className="animate-fade-in">
      <img src={restaurant.image} alt={restaurant.name} className="restaurant-banner" style={{height: '300px', width: '100%', objectFit: 'cover'}} />
      <div className="section-container" style={{maxWidth: '800px'}}>
        <button className="btn btn-secondary" style={{marginBottom: '1.5rem'}} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="section-title">{restaurant.name}</h1>
        <p className="section-subtitle">{restaurant.cuisine} • {restaurant.location}</p>
        
        <div style={{background: 'rgba(36, 150, 63, 0.1)', padding: '1rem', borderRadius: '12px', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <Star color="#24963F" size={24} />
          <div>
            <div style={{fontWeight: 700, color: '#24963F'}}>Top Rated - {restaurant.rating}</div>
            <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Highly recommended by Gwalior locals.</div>
          </div>
        </div>

        <h2 style={{marginTop: '3rem', marginBottom: '1rem'}}>Menu</h2>
        <div className="menu-list" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {restaurant.menu.map(item => (
            <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: '16px'}}>
              <div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <h3 style={{fontSize: '1.2rem', margin: 0}}>{item.name}</h3>
                  <span style={{fontSize: '0.7rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', border: `1px solid ${getDietaryColor(item.dietary)}`, color: getDietaryColor(item.dietary)}}>
                    {item.dietary.toUpperCase()}
                  </span>
                </div>
                <div style={{fontWeight: '700', margin: '0.5rem 0'}}>₹{item.price}</div>
                <div style={{color: 'var(--text-secondary)'}}>{item.desc}</div>
              </div>
              <button className="btn btn-primary" onClick={() => addToCart({ ...item, restaurantName: restaurant.name })}>
                ADD <Plus size={16}/>
              </button>
            </div>
          ))}
        </div>

        {reviews.length > 0 && (
          <div style={{marginTop: '3rem'}}>
            <h2>Live Reviews</h2>
            <div style={{display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '1rem'}}>
              {reviews.map((user, i) => (
                <div key={i} style={{minWidth: '250px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem'}}>
                    <img src={user.picture.thumbnail} alt="User" style={{width: 32, height: 32, borderRadius: '50%'}}/>
                    <div style={{fontWeight: 600, fontSize: '0.9rem'}}>{user.name.first} {user.name.last}</div>
                  </div>
                  <div style={{display: 'flex', gap: '2px', color: '#F59E0B', marginBottom: '0.5rem'}}><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                  <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>{user.customReview}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Offers Route ---
const Offers = () => (
  <div className="section-container animate-fade-in">
    <div style={{textAlign: 'center', marginBottom: '3rem'}}>
      <Tag size={48} color="var(--primary)" style={{marginBottom: '1rem'}} />
      <h2 className="section-title">Gwalior Specials</h2>
      <p className="section-subtitle">Best offers curated just for you.</p>
    </div>
    
    <div className="offers-grid">
      <div className="offer-card">
        <h3 style={{fontSize: '1.5rem', color: 'var(--primary)'}}>Flat ₹150 OFF</h3>
        <p style={{color: 'var(--text-secondary)'}}>Valid on orders above ₹499. Treat yourself.</p>
        <div className="offer-code" onClick={() => alert('Code CRAVELNEST150 copied to clipboard!')}>
          CRAVELNEST150 <Copy size={14} style={{marginLeft: '8px'}}/>
        </div>
      </div>
      <div className="offer-card">
        <h3 style={{fontSize: '1.5rem', color: 'var(--primary)'}}>20% OFF</h3>
        <p style={{color: 'var(--text-secondary)'}}>Valid on all Street Food and Snacks.</p>
        <div className="offer-code" onClick={() => alert('Code GWALIOR20 copied to clipboard!')}>
          GWALIOR20 <Copy size={14} style={{marginLeft: '8px'}}/>
        </div>
      </div>
      <div className="offer-card">
        <h3 style={{fontSize: '1.5rem', color: 'var(--primary)'}}>Free Delivery</h3>
        <p style={{color: 'var(--text-secondary)'}}>On your first 3 orders anywhere in Gwalior.</p>
        <div className="offer-code" onClick={() => alert('Code FREEDEL copied to clipboard!')}>
          FREEDEL <Copy size={14} style={{marginLeft: '8px'}}/>
        </div>
      </div>
    </div>
  </div>
);

// --- Discover Route ---
const Discover = ({ addToCart }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [foodMatches, setFoodMatches] = useState([]);
  const navigate = useNavigate();
  
  const handleAI = async () => {
    if(!query) return;
    setLoading(true);
    setResult('');
    
    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 1200));
    
    const q = query.trim().toLowerCase();
    
    // Smart local filtering across all menus and cuisines
    const matches = GWALIOR_RESTAURANTS.filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.cuisine.toLowerCase().includes(q) ||
      r.menu.some(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q))
    );

    const fMatches = GWALIOR_RESTAURANTS.flatMap(r => 
      r.menu.filter(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q))
            .map(m => ({ ...m, restaurantName: r.name, restaurantId: r.id }))
    );
    setFoodMatches(fMatches);

    let response = "";
    if (matches.length > 0) {
      const top = matches[0];
      const second = matches[1];
      const greetings = ["Ooh, nice choice!", "I know just the place!", "Craving that? I've got you covered.", "Let's get that sorted!"];
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      
      if (matches.length > 1) {
        response = `${greeting} For the best ${query}, you should definitely try ${top.name} or ${second.name}. They are famous in Gwalior for their amazing options!`;
      } else {
        response = `${greeting} There is no better place in Gwalior for this than ${top.name}! Their ${top.cuisine} will totally hit the spot.`;
      }
    } else {
      response = `Hmm, I couldn't find a direct match for "${query}" right now. How about exploring some authentic South Indian from Indian Coffee House or a rich North Indian Thali?`;
    }
    
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="center-page animate-fade-in" style={{padding: '2rem'}}>
      <Sparkles size={48} color="var(--primary)" style={{marginBottom: '1rem'}} />
      <h2>AI se Poochho in Gwalior</h2>
      <p>Tell me what you are craving, and I'll find the perfect match.</p>
      
      <div className="hero-search" style={{width: '100%', maxWidth: '600px', border: '1px solid var(--border)', marginTop: '2rem'}}>
        <div className="hero-search-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="e.g. 'Spicy momos near Lashkar'" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAI()}
          />
        </div>
        <button onClick={handleAI} disabled={loading} style={{opacity: loading ? 0.7 : 1}}>
          {loading ? 'Thinking...' : 'Find'}
        </button>
      </div>
      
      {result && (
        <div className="animate-fade-in" style={{marginTop: '2rem', padding: '1.5rem', background: '#f5f7ff', borderRadius: '12px', border: '1px solid #e0e6ff', maxWidth: '600px', textAlign: 'left', lineHeight: '1.6', width: '100%'}}>
          <strong style={{color: 'var(--primary)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Sparkles size={18} /> AI Suggestion:
          </strong>
          <p style={{marginTop: '0.8rem', fontSize: '1.05rem'}}>{result}</p>
        </div>
      )}

      {result && foodMatches.length > 0 && (
        <div className="animate-fade-in" style={{marginTop: '2rem', width: '100%', maxWidth: '600px'}}>
          <h3 style={{textAlign: 'left', marginBottom: '1rem'}}>Matched Dishes</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {foodMatches.map((item, idx) => (
              <div key={`${item.restaurantId}-${item.id}-${idx}`} style={{background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', textAlign: 'left'}}>
                <div style={{flex: 1}}>
                  <h4 style={{margin: 0, fontSize: '1.1rem'}}>{item.name}</h4>
                  <p style={{margin: '0.2rem 0', fontSize: '0.85rem', color: 'var(--text-light)'}}>{item.desc}</p>
                  <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.5rem'}}>
                     <span style={{fontWeight: 700}}>₹{item.price}</span>
                     <span style={{fontSize: '0.75rem', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', color: 'var(--primary)'}} onClick={() => navigate(`/restaurant/${item.restaurantId}`)}>from {item.restaurantName}</span>
                  </div>
                </div>
                <button className="add-button" style={{padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '1rem'}} onClick={() => {
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    restaurantName: item.restaurantName,
                    image: item.image
                  });
                }}>ADD</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!result && !loading && (
        <div style={{display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          <button className="btn btn-secondary" onClick={() => { setQuery('Authentic Italian Pasta'); }}><Pizza size={16}/> Italian</button>
          <button className="btn btn-secondary" onClick={() => { setQuery('Spicy Non-Veg curries'); }}><Beef size={16}/> Non-Veg</button>
          <button className="btn btn-secondary" onClick={() => { setQuery('A nice cafe to hang out'); }}><Coffee size={16}/> Cafe</button>
          <button className="btn btn-secondary" onClick={() => { setQuery('Delicious chocolate desserts'); }}><IceCream size={16}/> Desserts</button>
        </div>
      )}
    </div>
  );
};

// --- Track & Cart Routes ---
const Track = ({ orderPlaced }) => {
  const navigate = useNavigate();

  if (!orderPlaced) {
    return (
      <div className="center-page animate-fade-in">
        <CheckCircle size={64} color="var(--text-secondary)" style={{marginBottom: '1rem'}} />
        <h2>No Active Orders</h2>
        <p>You haven't placed an order yet.</p>
        <button className="btn btn-primary" style={{marginTop: '1rem'}} onClick={() => navigate('/')}>Order Now</button>
      </div>
    );
  }

  return (
  <div className="section-container animate-fade-in">
    <div style={{background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', maxWidth: '600px', margin: '0 auto'}}>
      <h2 className="section-title" style={{textAlign: 'center', marginBottom: '2rem'}}>Track Your Order</h2>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <div style={{background: 'var(--primary)', color: 'white', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CheckCircle size={24}/></div>
          <div>
            <div style={{fontWeight: 700, fontSize: '1.1rem'}}>Order Accepted</div>
            <div style={{fontSize: '0.95rem', color: 'var(--text-secondary)'}}>Restaurant has started preparing your food.</div>
          </div>
        </div>
        <div style={{width: '2px', height: '30px', background: 'var(--border)', margin: '-1.5rem 0 -1.5rem 23px'}}></div>
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <div style={{background: 'var(--surface-elevated)', color: 'var(--text-secondary)', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Clock size={24}/></div>
          <div>
            <div style={{fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-secondary)'}}>Valet Assigned</div>
            <div style={{fontSize: '0.95rem', color: 'var(--text-secondary)'}}>Ramesh is heading to the restaurant.</div>
          </div>
        </div>
      </div>
      
      <div style={{marginTop: '3rem', display: 'flex', gap: '1rem'}}>
        <button className="btn btn-secondary" style={{flex: 1}} onClick={() => alert("Tracking link copied!")}><Share2 size={16}/> Share Tracking Link</button>
      </div>
    </div>
  </div>
  );
};

const Cart = ({ cartItems, clearCart, setOrderPlaced }) => {
  const navigate = useNavigate();
  const [isGift, setIsGift] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="center-page animate-fade-in">
        <ShoppingCart size={64} color="var(--text-secondary)" style={{marginBottom: '1rem'}} />
        <h2>Your cart is empty</h2>
        <p>You can go to home page to view more restaurants.</p>
        <button className="btn btn-primary" style={{marginTop: '1rem'}} onClick={() => navigate('/')}>See Restaurants</button>
      </div>
    );
  }

  return (
    <div className="section-container animate-fade-in" style={{maxWidth: '800px'}}>
      <h2 className="section-title">Secure Checkout</h2>
      
      <div style={{background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem'}}>
        {cartItems.map((item, i) => (
          <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px dashed var(--border)'}}>
            <div>
              <div style={{fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{width: '14px', height: '14px', borderRadius: '50%', border: `1px solid ${getDietaryColor(item.dietary)}`, background: getDietaryColor(item.dietary), display: 'inline-block'}}></span>
                {item.name}
              </div>
              <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px'}}>{item.restaurantName}</div>
            </div>
            <div style={{fontWeight: 600}}>₹{item.price}</div>
          </div>
        ))}
        <div style={{fontSize: '1.5rem', fontWeight: 800, marginTop: '1.5rem', textAlign: 'right'}}>Total To Pay: ₹{total}</div>
      </div>

      <div style={{background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{background: '#E0F2FE', padding: '10px', borderRadius: '50%'}}><Gift size={24} color="#0284C7"/></div>
          <div>
            <div style={{fontWeight: 700, color: '#0369A1'}}>Sending a gift?</div>
            <div style={{fontSize: '0.9rem', color: '#0284C7'}}>Add recipient details and a special message.</div>
          </div>
        </div>
        <button className="btn" style={{background: isGift ? '#0284C7' : 'white', color: isGift ? 'white' : '#0369A1', border: '1px solid #BAE6FD'}} onClick={() => setIsGift(!isGift)}>
          {isGift ? 'Gift Added' : 'Add Gift'}
        </button>
      </div>

      <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
        <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
        <button className="btn btn-primary" style={{padding: '1rem 3rem'}} onClick={() => {
          document.getElementById('processing-overlay').style.display = 'flex';
          setTimeout(() => {
            document.getElementById('processing-overlay').style.display = 'none';
            setOrderPlaced(true);
            clearCart();
            navigate('/track');
          }, 2500);
        }}>
          <ShieldCheck size={20}/> Pay Securely
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cravelnest_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [orderPlaced, setOrderPlaced] = useState(() => {
    return (localStorage.getItem('cravelnest_order') === 'true');
  });

  useEffect(() => {
    localStorage.setItem('cravelnest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cravelnest_order', orderPlaced);
  }, [orderPlaced]);
  
  const [toast, setToast] = useState('');
  
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setToast(`Added ${item.name} to cart!`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <Router>
      <Layout cartItems={cartItems} orderPlaced={orderPlaced}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/discover" element={<Discover addToCart={addToCart} />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/track" element={<Track orderPlaced={orderPlaced} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} clearCart={() => setCartItems([])} setOrderPlaced={setOrderPlaced} />} />
          <Route path="/restaurant/:id" element={<Restaurant addToCart={addToCart} />} />
          
          {/* Footer Pages */}
          <Route path="/about" element={<GenericPage title="About CravelNest" />} />
          <Route path="/careers" element={<GenericPage title="Careers at CravelNest" description="Join our mission to revolutionize food delivery in Gwalior." />} />
          <Route path="/team" element={<GenericPage title="Our Team" />} />
          <Route path="/prime" element={<GenericPage title="CravelNest Prime" description="Get free delivery on all orders, exclusive discounts, and priority support for just ₹199/month." />} />
          <Route path="/support" element={<GenericPage title="Help & Support" description="Need help with your order? Our support team is available 24/7." />} />
          <Route path="/partner" element={<GenericPage title="Partner with CravelNest" description="Grow your restaurant business in Gwalior by partnering with us." />} />
          <Route path="/ride" element={<GenericPage title="Ride with CravelNest" description="Become a delivery partner and earn on your own schedule." />} />
        </Routes>
      </Layout>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--primary)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '50px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          zIndex: 9999,
          fontWeight: 'bold',
          animation: 'toast-slide-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {toast}
        </div>
      )}

      {/* Checkout Processing Overlay */}
      <div id="processing-overlay" style={{
        display: 'none',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(255,255,255,0.95)',
        zIndex: 10000,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px', height: '60px',
          border: '6px solid #e0e6ff',
          borderTop: '6px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h2 style={{color: 'var(--primary)', marginBottom: '10px'}}>Processing secure payment...</h2>
        <p style={{color: 'var(--text-secondary)'}}>Please do not close or refresh this page.</p>
      </div>

      {/* Global Animations Style Block */}
      <style>{`
        @keyframes toast-slide-up {
          from { opacity: 0; transform: translate(-50%, 50px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Router>
  );
}
