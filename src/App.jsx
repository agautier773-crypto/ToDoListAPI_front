import { useState, useEffect } from "react";
import { tacheService } from "./services/api.js";
import TacheList from "./components/TacheList.jsx";
import TacheForm from "./components/TacheForm.jsx";

function App() {
    const [taches, setTaches] = useState([]);
    const [tacheEnEdition, setTacheEnEdition] = useState(null);

    // recupere toutes les taches depuis l'API
    const chargerTaches = () => {
        tacheService.getAll().then(setTaches);
    };

    // lors du premier appel de l'url (en GET) on affiche les taches
    useEffect(() => {
        chargerTaches();
    }, []);

    // detecte si on doit executer une creation ou une modification grace a tacheEnEdition
    const handleSubmit = (form) => {
        const action = tacheEnEdition
            ? tacheService.update(tacheEnEdition.id, form)
            : tacheService.create(form);
        // on met a jour les données
        action.then(() => {
            chargerTaches();
            setTacheEnEdition(null);
        });
    };

    // on supprime puis on recharge les données
    const handleDelete = (id) => {
        tacheService.delete(id).then(chargerTaches);
    };

    return (
        <div className="container">
            <h1 className="mb-4 text-center">ToDo List</h1>
            <TacheForm
                onSubmit={handleSubmit}
                tacheEnEdition={tacheEnEdition}
                onAnnuler={() => setTacheEnEdition(null)}
            />
            <TacheList
                taches={taches}
                onEdit={setTacheEnEdition}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;
