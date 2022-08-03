import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./Main.css";
import SpellList from "./SpellList";
import SpellDetails from "./SpellDetails";
import Sidebar from "./Sidebar";
import SpellFavourites from "./SpellFavourites";

function App() {
    return (
        <Router>
            <div className="main">
                <Sidebar />
                <Switch>
                    <Route exact path="/">
                        <SpellList />
                    </Route>
                    <Route path="/spell/:index">
                        <SpellDetails />
                    </Route>
                    <Route path="/favourites">
                        <SpellList />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
