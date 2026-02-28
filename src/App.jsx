import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/taches/index.jsx";
import TacheForm from "./pages/taches/form.jsx";
import Show from "./pages/taches/show.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/taches/create" element={<TacheForm />} />
                <Route path="/taches/:id" element={<Show />} />
                <Route path="/taches/:id/edit" element={<TacheForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
