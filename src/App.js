import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
import './App.css';
import Loader from "./loader/loader";



// instead of this katong sa ubos na pra nanay loading effect
// import Login from './login/login';

// kanang wait(4000) mao na syang duration delay after ma load ang page. so load then delay
const Login  = lazy(() =>
  wait(4000).then(() => import("./login/login"))
);


const Main  = lazy(() =>
  wait(400).then(() => import("./main/main"))
);


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="" element={<Navigate replace to="/login" />} />
        
        
        <Route
          path="/login"
          element={
            <>
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            </>
          }
        />

        <Route
          path="/main"
          element={
            <>
              <Suspense fallback={<Loader />}>
                <Main />
              </Suspense>
            </>
          }
        />

      </Routes>
    </Router>
  );
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
export default App;
