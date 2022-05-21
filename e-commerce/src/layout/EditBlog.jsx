import React from 'react';

function EditBlog(props) {
  return (
    <div className="blog">
      <h2>Tambah Blog</h2>
      <div className="form pb-2 border-bottom">
        <div className="form-group row">
          <label htmlFor="nomer unik" className="col-sm-2 col-form-label">
            Nomer Unik
          </label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="uniqueNo" name="uniqueNo" placeholder="Nomer Unik" onChange={this.handleTambahBlog} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Nama
          </label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="name" name="name" placeholder="Nama" onChange={this.handleTambahBlog} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="brand" className="col-sm-2 col-form-label">
            Brand
          </label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="brand" name="brand" placeholder="Brand" onChange={this.handleTambahBlog} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="status" className="col-sm-2 col-form-label">
            Status
          </label>
          <div className="col-sm-5">
            <select className="form-control" id="status" name="status" onChange={this.handleTambahBlog}>
              <option value="">Pilih Status</option>
              <option value="Ready">Ready</option>
              <option value="no ready">No Ready</option>
              {/* <option value="cuti">Cuti</option> */}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="status" className="col-sm-2 col-form-label"></label>
          <div className="col-sm-5">
            <button className="btn btn-primary" onClick={this.handleTombolSimpan}>
              Tambah
            </button>
            <button className="btn btn-sm btn-success" onClick={() => props.editBlog(props.idBlog)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
