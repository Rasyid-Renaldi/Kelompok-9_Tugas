import React from 'react';

const BlogPost = (props) => {
  return (
    <tbody>
      <tr>
        <td> {props.uniqueNo} </td>
        <td> {props.name} </td>
        <td> {props.brand} </td>
        <td> {props.status} </td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={() => props.hapusBlog(props.idBlog)}>
            Hapus
          </button>
        </td>
      </tr>
    </tbody>
  );
};
export default BlogPost;
