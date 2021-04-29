import 'index.css';
import css from './App.module.css';

import Header from './Header';
import Navbar from './Navbar';
import Home from './Home';

function App() {
    return (
        <div className={css.container}>
            <Header/>
            <div className={css.content}>
                <Home/>
            </div>
            <Navbar/>
        </div>
    );
}

export default App;
