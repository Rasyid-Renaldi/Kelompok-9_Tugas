import React, { useContext, createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import About from '../pages/About';
import Contact from '../pages/Contact';
// import Image from './layout/Images';

export default function Home() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <div class="container">
            <div class="position-relative">
              <ul class="list-group list-group-horizontal">
                <li class="list-group-item">
                  <Link to="/public"> Home</Link>
                </li>
                <li class="list-group-item">
                  <Link to="/private"> Private</Link>
                </li>
                <li class="list-group-item">
                  <Link to="/about"> About</Link>
                </li>
                <li class="list-group-item">
                  <Link to="/contact"> Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* </div> */}

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/private">
              <ProtectedPage />
            </PrivateRoute>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser('user');
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p class="fw-bold">
      Selamat Datang!{' '}
      <button
        className="btn btn-danger"
        onClick={() => {
          auth.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>Kamu telah login.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Halaman Beranda</h2>
      <ul>
        <li>
          <Link to={`${url}/vans`}>Vans Shoes</Link>
          {/* <Image src="https://www.vans.co.id/content/dam/vans/images/products/shoes/vans-shoes-logo-shoes-white-1.png" alt="Vans Shoes" /> */}
        </li>
        <li>
          <Link to={`${url}/airjordan`}>Air Jordan Shoes</Link>
        </li>
        <li>
          <Link to={`${url}/adidas`}>Adidas Shoes</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <p class="fw-bold">Please select a Shoes</p>
        </Route>
        <Route path={`${path}/:shoesId`}>
          <PublicPages />
        </Route>
      </Switch>
    </div>
  );
}

function PublicPages() {
  let { shoesId } = useParams();
  return (
    <div>
      <p>{shoesId}</p>
      {/* <img src="https://www.ncrsport.com/berita/wp-content/uploads/2021/03/57699_500_A.jpg" class="img-fluid" alt="Vans Shoes"></img> */}
    </div>
  );
}

function ProtectedPage() {
  return (
    <div>
      <p class="fst-italic"> What's happen with shoes!? </p>
    </div>
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: '/' } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>Harus login dulu di {from.pathname}</p>
      <button class="btn btn-success" onClick={login}>
        Log in
      </button>
    </div>
  );
}

// function About() {
//   return (
//     <div>
//       <h1>About</h1>
//       <p>This is the about page</p>
//     </div>
//   );
// }
