import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signin from "./components/signin/Signin";
import MotoServices from "./components/moto-services/MotoServices";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/login" component={Login} />
          {/* <Route path="/services" component={MotoServices} /> */}
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
