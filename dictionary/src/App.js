import { BrowserRouter, Route, Switch } from "react-router-dom"; //used to make routing between different pages
import Home from "./Components/Home"; //imports Home Component
import DetailedView from "./Components/DetailedView"; //imports DetailedView Component
import CreateWord from "./Components/CreateWord"; //imports CreateWord Component
import "./App.css"; //imports css

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/word-details/:id" exact component={DetailedView} />
          <Route path="/create" exact component={CreateWord} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
