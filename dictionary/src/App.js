import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import DetailedView from "./Components/DetailedView";
import CreateWord from "./Components/CreateWord";

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
