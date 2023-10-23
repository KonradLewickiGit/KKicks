// CategoryList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importuj Link
import '../Categories/CategoryList.css';
interface Category {
    id: number;
    categoryName: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Wyślij żądanie GET do serwera backendowego
        fetch('http://localhost:8080/category/findAll')
            .then(response => response.json())
            .then(data => {
                console.log('Odpowiedź z serwera:', data);
                setCategories(data); // Ustaw otrzymane dane w stanie komponentu
            })
            .catch(error => console.error('Błąd podczas żądania do backendu:', error));
    }, []);

    return (
        <div>
            <div className="category-list">
                {categories.map(category => (
                    <div key={category.id}>
                        <Link to={`/manufacturers/${category.id}/products`}
                         style={{ textDecoration: 'none' }}>
                            <span className="category-name">
                                {category.categoryName}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
