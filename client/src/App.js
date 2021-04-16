import './App.css';
import Header from "./components/Header";
import {useRotes} from "./router";
import {BrowserRouter} from "react-router-dom";


function App() {

    const router = useRotes()

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                {router}
            </div>
        </BrowserRouter>
    );
}

export default App;
