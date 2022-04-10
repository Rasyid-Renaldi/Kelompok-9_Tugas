import React, { Component } from 'react';
import BlogPost from '../layout/BlogPost';

class Blog extends Component {
  state = {
    // komponen state dari React untuk statedull component
    listBlog: [], // variable array yang digunakan untuk menyimpan data API
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
    fetch('http://localhost:3001/blog') // alamat URL API yang akan di ambil
      .then((response) => response.json()) // response dari API dalam bentuk JSON
      .then((jsonHasilAmbilDariAPI) => {
        this.setState({
          listBlog: jsonHasilAmbilDariAPI,
        });
      });
  };

  componentDidMount() {
    // fungsi yang akan dijalankan ketika component telah di mount
    this.ambilDataDariServerAPI(); // ambil data dari server API lokal
  }

  // handle delete button
  handleDeleteBlog = (data) => {
    // fungsi yang akan di panggil ketika tombol hapus di klik
    fetch(`http://localhost:3001/blog/${data}`, { method: 'delete' }) // alamat URL API yang akan di ambil
      .then((res) => {
        // response dari API dalam bentuk JSON
        this.ambilDataDariServerAPI();
      });
  };

  handleTambahBlog = (event) => {
    // fungsi yang akan di panggil ketika tombol tambah di klik
    let formInsertBlog = { ...this.state.InsertBlog }; // cara membuat variabel baru dengan mengambil value dari state InsertMahasiswa
    let timestamp = new Date().getTime(); // digunakan untuk mengambil nilai timestamp pada saat proses insert data
    formInsertBlog['id'] = timestamp; // mengisi field id dengan nilai timestamp
    formInsertBlog[event.target.name] = event.target.value; // mengisi kolom dengan name inputan dan value inputan
    this.setState({
      InsertBlog: formInsertBlog,
    });
  };

  // tombol simpan
  handleTombolSimpan = () => {
    //fungsi untuk menghandle tombol simpan
    fetch('http://localhost:3001/Blog', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.InsertBlog),
    }).then((res) => {
      // response dari API dalam bentuk JSON
      this.ambilDataDariServerAPI(); //reload atau refresh data
    });
  };

  render() {
    return (
      <div className="blog">
        <h2>Tambah Blog</h2>
        <div className="form pb-2 border-bottom">
          <div className="form-group row">
            <label htmlFor="nomer unik" className="col-sm-2 col-form-label">
              Nomer Unik
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="uniqueNo" name="uniqueNo" placeholder="Nomer Unik" onChange={this.handleTambahBlog} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Nama
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="name" name="name" placeholder="Nama" onChange={this.handleTambahBlog} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="brand" className="col-sm-2 col-form-label">
              Brand
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="brand" name="brand" placeholder="Brand" onChange={this.handleTambahBlog} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="status" className="col-sm-2 col-form-label">
              Status
            </label>
            <div className="col-sm-10">
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
            <div className="col-sm-10">
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
            // looping data mahasiswa yang ada di state
            return <BlogPost key={blog.id} name={blog.name} uniqueNo={blog.uniqueNo} brand={blog.brand} status={blog.status} hapusBlog={this.handleDeleteBlog} idBlog={blog.id} />; // menampilkan data mahasiswa yang ada di state
          })}
        </table>
      </div>
    );
  }
}
export default Blog;
