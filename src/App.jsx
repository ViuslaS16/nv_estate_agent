import { HashRouter, Routes, Route } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import Header from './components/Header/Header';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './styles/App.css';

function App() {
    return (
        <HashRouter>
            <FavouritesProvider>
                <div className="app">
                    <Header />
                    <main className="mainContent">
                        <Routes>
                            <Route path="/" element={<SearchPage />} />
                            <Route path="/property/:id" element={<PropertyPage />} />
                        </Routes>
                    </main>
                    <footer className="footer">
                        <div className="container">
                            <p>&copy; 2025 NV Estate Agents. University of Westminster Coursework.</p>
                        </div>
                    </footer>
                </div>
            </FavouritesProvider>
        </HashRouter>
    );
}

export default App;
