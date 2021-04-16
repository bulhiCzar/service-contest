import './App.css';
import Header from "./components/Header";
import {useRotes} from "./router";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer, toast, useToast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const router = useRotes()

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                {router}
            </div>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;
