import React from 'react';

function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      {/* <p>This is the Contact page</p> */}
      <form>
        <div class="form-group">
          <div class="col-md-4">
            <label for="InputName" class="form-label">
              Name
            </label>
            <input type="name" class="form-control" id="InputName" aria-describedby="namelHelp" placeholder="Masukkan nama" />
            <label for="InputEmail">Alamat Email</label>
            <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Masukkan email" />
            <label for="ControlMessage" class="form-label">
              Pesan
            </label>
            <textarea class="form-control" id="ControlMessage" rows="3"></textarea>
            <small id="emailHelp" class="form-text text-muted">
              Kami tidak akan menyebarkan email anda ke yang lain.
            </small>
            <p />
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Contact;
