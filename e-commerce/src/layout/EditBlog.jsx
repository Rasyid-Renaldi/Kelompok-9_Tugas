import React from 'react';

function EditBlog(props) {
  return (
    <tbody>
      <tr>
        <td> {props.uniqueNo} </td>
        <td> {props.name} </td>
        <td> {props.brand} </td>
        <td> {props.status} </td>
        <td>
          <button className="btn btn-sm btn-success" onClick={() => props.editBlog(props.idBlog)}>
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  );
}
export default EditBlog;
