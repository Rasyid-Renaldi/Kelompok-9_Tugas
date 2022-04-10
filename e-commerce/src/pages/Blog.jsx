import React, { Component } from 'react';
import BlogPost from '../layout/BlogPost';

class Blog extends Component {
  state = {
    listBlog: [],
    InsertBlog: {
      BlogId: 1,
      id: 1,
      uniqueNo: '',
      name: '',
      brand: '',
      status: '',
    },
  };

  ambilDataDariServerAPI = () => {
    fetch('http://localhost:3001/blog')
      .then((response) => response.json())
      .then((jsonHasilAmbilDariAPI) => {
        this.setState({
          listBlog: jsonHasilAmbilDariAPI,
        });
      });
  };

  componentDidMount() {
    this.ambilDataDariServerAPI();
  }

  handleDeleteBlog = (data) => {
    fetch(`http://localhost:3001/blog/${data}`, { method: 'delete' }).then((res) => {
      this.ambilDataDariServerAPI();
    });
  };

  handleTambahBlog = (event) => {
    let formInsertBlog = { ...this.state.InsertBlog };
    let timestamp = new Date().getTime();
    formInsertBlog['id'] = timestamp;
    formInsertBlog[event.target.name] = event.target.value;
    this.setState({
      InsertBlog: formInsertBlog,
    });
  };

  handleTombolSimpan = () => {
    fetch('http://localhost:3001/blog', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.InsertBlog),
    }).then((res) => {
      this.ambilDataDariServerAPI();
    });
  };

  handleUpdateBlog(event) {
    event.preventDefault();
    this.state.InsertBlog = this.state.InsertBlog;
    this.setState({
      formInsertBlog: this.state.InsertBlog,
    });
    return fetch('http://localhost:3001/blog' + this.state.InsertBlog.id, {
      method: 'PUT',
      mode: 'CORS',
      body: this.state.InsertBlog,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  }

  render() {
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
            </div>
          </div>
        </div>
        <h2>Daftar Blog</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th> Nomer Unik </th>
              <th> Nama </th>
              <th> Brand </th>
              <th> Status</th>
              <th> Aksi </th>
            </tr>
          </thead>
          {this.state.listBlog.map((blog) => {
            return <BlogPost key={blog.id} name={blog.name} uniqueNo={blog.uniqueNo} brand={blog.brand} status={blog.status} hapusBlog={this.handleDeleteBlog} idBlog={blog.id} />;
          })}
        </table>
      </div>
    );
  }
}
export default Blog;
