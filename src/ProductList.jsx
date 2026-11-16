import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving sleep quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_640.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_640.jpg", description: "Removes toxins and adds humidity to rooms.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/28/19/39/boston-fern-5114414_640.jpg", description: "Natural humidifier and excellent air purifier.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/09/17/04/flower-4850729_640.jpg", description: "Easy to grow with striking glossy dark leaves.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/03/30/15/11/aloe-vera-3275935_640.jpg", description: "Healing soothing gel properties with low water needs.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1589296986498-28cd9406425d?auto=format&fit=crop&w=640&q=80", description: "Calming scent that promotes relaxation and sleep.", cost: "$22" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?auto=format&fit=crop&w=640&q=80", description: "Sweet fragrance blooming throughout the evening.", cost: "$25" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Aromatic culinary herb with needle-like leaves.", cost: "$12" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing fragrance and great for herbal teas.", cost: "$8" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrus scent known to reduce stress and anxiety.", cost: "$15" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/11/20/09/hyacinth-4121087_640.jpg", description: "Beautiful vibrant blooms with a rich sweet aroma.", cost: "$19" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Boosts immune system and helps fight colds.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Soothes digestive discomfort and headaches.", cost: "$11" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Produces calming tea to aid peaceful sleep.", cost: "$13" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", description: "Anti-inflammatory properties for skin healing.", cost: "$14" },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2015/09/09/17/38/basil-932079_1280.jpg", description: "Rich in antioxidants with antibacterial benefits.", cost: "$9" },
        { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description: "Natural remedy historically used for mild sedation.", cost: "$10" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({
      ...prevState,
      [plant.name]: true
    }));
  };

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#333', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="tag">
          <a href="#" onClick={handleHomeClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div>
              <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
              <i style={{ color: 'white', fontSize: '14px' }}>Where Green Meets Serenity</i>
            </div>
          </a>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" onClick={handleHomeClick} style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Home</a>
          <a href="#" onClick={handlePlantsClick} style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Plants</a>
          <a href="#" onClick={handleCartClick} style={{ color: 'white', fontSize: '24px', textDecoration: 'none', position: 'relative' }}>
            🛒
            {totalCartCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px' }}>
                {totalCartCount}
              </span>
            )}
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((category, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h2 style={{ borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>{category.category}</h2>
              <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <img className="product-image" src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px' }} />
                    <div className="product-title" style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>{plant.name}</div>
                    <div className="product-description" style={{ fontSize: '14px', color: '#666', height: '40px' }}>{plant.description}</div>
                    <div className="product-cost" style={{ fontSize: '16px', fontWeight: 'bold', color: '#2e7d32', margin: '10px 0' }}>{plant.cost}</div>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      style={{
                        backgroundColor: addedToCart[plant.name] ? '#9e9e9e' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;