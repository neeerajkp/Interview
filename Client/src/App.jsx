import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:8000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentProducts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentProducts.map(product => product.id));
    }
  };

  const handleDelete = () => {
    setProducts(products.filter(product => !selectedRows.includes(product.id)));
    setSelectedRows([]);
  };

  return (
    <div className="App">
      <div className='top'>
        <input
          type="text"
          className='search'
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleSelectAll} /></th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id} style={{ backgroundColor: selectedRows.includes(product.id) ? 'gray' : '' }}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(product.id)}
                  onChange={() => handleSelectRow(product.id)}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>₹{product.price}</td>
              <td>{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='top'>
        <button className='search' onClick={handleDelete}>Delete selected</button>
      </div>

      <div className="pagination">
        <div className='top'>
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{'<<'}</button>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 3).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? 'active' : ''}>
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
        </div>
      </div>
    </div>
  );
};

export default App;
