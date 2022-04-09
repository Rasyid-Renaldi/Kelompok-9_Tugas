import React from 'react';

function Products(props) {
  return (
    <div>
      {/* <h1>Products</h1> */}
      <h2>{props.name}</h2>
      <p>{props.deskripsi}</p>
      <p>{props.harga}</p>
    </div>
  );
}

export default Products;
