import React from 'react'
import './Dashboard.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Carousel from '../../components/Carousel/Carousel'
import CatGrid from '../../components/CategoryGrid/Category'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getCat();
    }, [])

    const getCat = async () => {
        try {
            const result = await axios.get('/customer/products');
            const distinctCategories = [...new Set(result.data.map(product => product.Category))];
            setCategory(distinctCategories);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelectCategory = (selectedCategory) => {
        navigate(`/products/${selectedCategory}`); 
    };

  return (
    <div className='dashboard'>
        <div className='dashboard-welcome'>
            <div>
                <h1>Welcome!</h1>
                <p>The Nexus of Distribution</p>
            </div>
            <Carousel/>
        </div>
        <div className='dashboard-products'>
            <h1>Lets Shop With NEXI</h1>
            <div className='dashboard-products-grid'>
                <CatGrid category={category} onSelectCategory={handleSelectCategory}/>
            </div>
        </div>
    </div>
  )
}
