import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addProduct, deleteProduct, editProduct } from '../redux/productSlice';
import Modal from 'react-modal';
import './styles.css';

interface Product {
  name: string;
  price: number;
}

function ProductList() {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!selectedProduct) return;
    console.log('Selected Product: ', selectedProduct);
  }, [selectedProduct]);

  const handleEditClick = (product: Product) => {
    setSelectedProduct({ ...product }); // Chắc chắn sao chép đối tượng, tránh sửa trực tiếp.
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedProduct && selectedProduct.name && !isNaN(selectedProduct.price)) {
      const index = products.findIndex((product) => product.name === selectedProduct.name);
      if (index !== -1) {
        console.log('Dispatching editProduct action', selectedProduct);
        dispatch(editProduct({ index, product: selectedProduct }));
        setIsModalOpen(false); // Đóng modal sau khi lưu
      }
    } else {
      alert("Vui lòng nhập thông tin hợp lệ");
    }
  };

  const handleAddProduct = () => {
    if (!selectedProduct || !selectedProduct.name || isNaN(selectedProduct.price)) {
      alert("Vui lòng nhập thông tin hợp lệ");
      return;
    }
    dispatch(addProduct(selectedProduct));
    setIsAddModalOpen(false);
  };

  return (
    <div className="container mt-4">
      <h2>Danh Sách Hàng Hóa</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Tìm kiếm hàng hóa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProducts.length === 0 ? (
        <p>Không tìm thấy hàng hóa nào!</p>
      ) : (
        <ul className="list-group">
          {filteredProducts.map((product, index) => (
            <li key={index} className="list-group-item">
              {product.name} - {product.price} VNĐ
              <div className="button-container">
                <button onClick={() => handleEditClick(product)} className="btn btn-primary">
                  Sửa
                </button>
                <button onClick={() => dispatch(deleteProduct(index))} className="btn btn-danger">
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn-success mt-3" onClick={() => setIsAddModalOpen(true)}>
        Thêm Hàng Hóa
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        {selectedProduct && (
          <div>
            <h2>Sửa Hàng Hóa</h2>
            <input
              type="text"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              placeholder="Tên sản phẩm"
            />
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
              placeholder="Giá sản phẩm"
            />
            <button onClick={handleSaveEdit} className="btn btn-primary">Lưu</button>
            <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary ml-2">Hủy</button>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div>
          <h2>Thêm Hàng Hóa</h2>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            onChange={(e) => setSelectedProduct({ ...selectedProduct!, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Giá sản phẩm"
            onChange={(e) => setSelectedProduct({ ...selectedProduct!, price: parseFloat(e.target.value) })}
          />
          <button onClick={handleAddProduct} className="btn btn-primary">Thêm</button>
          <button onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary ml-2">Hủy</button>
        </div>
      </Modal>
    </div>
  );
}

export default ProductList;
