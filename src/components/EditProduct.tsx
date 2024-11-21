import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { editProduct } from '../redux/productSlice';
import { RootState } from '../redux/store';
import Modal from 'react-modal';
import './styles.css';

function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const productIndex = id ? parseInt(id) : 0;
  const product = products[productIndex];

  const [productName, setProductName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? product.price.toString() : '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleEditProduct = () => {
    if (!productName || isNaN(parseFloat(price)) || price === '') {
      alert('Vui lòng nhập thông tin hợp lệ');
      return;
    }
    const updatedProduct = { name: productName, price: parseFloat(price) };
    dispatch(editProduct({ index: productIndex, product: updatedProduct }));
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Chỉnh Sửa Hàng Hóa</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Tên sản phẩm"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Giá sản phẩm"
      />
      <button onClick={handleEditProduct} className="btn-primary">Sửa</button>

      <Link to="/">
        <button className="btn-secondary mt-2">Quay Lại</button>
      </Link>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <h2>Sửa Hàng Hóa Thành Công</h2>
        <button
          onClick={() => {
            setIsModalOpen(false);
            navigate('/');
          }}
          className="btn-primary"
        >
          Quay lại trang chủ
        </button>
      </Modal>
    </div>
  );
}

export default EditProduct;