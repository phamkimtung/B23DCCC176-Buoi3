import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    if (!productName || isNaN(parseFloat(price)) || price === '') {
      alert("Vui lòng nhập thông tin hợp lệ");
      return;
    }
    dispatch(addProduct({ name: productName, price: parseFloat(price) }));
    navigate('/');
  };

  return (
    <div>
      <h2>Thêm Hàng Hóa</h2>
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Giá sản phẩm"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAddProduct}>Thêm</button>
      <Link to="/">
        <button className="btn-secondary mt-2">Quay Lại</button>
      </Link>
    </div>
  );
}

export default AddProduct;
