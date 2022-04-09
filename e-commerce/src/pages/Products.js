import React from 'react';

function Products(props) {
  return (
    <div>
      {/* <h1>Products</h1> */}
      <h2>{props.name}</h2>
      <p>{props.deskripsi}</p>
      <p>{props.harga}</p>
      <p>This is the Products page</p>
    </div>
  );
}

export default Products;
