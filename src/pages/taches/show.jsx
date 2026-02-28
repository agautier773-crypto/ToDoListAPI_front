import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {tacheService} from "../../services/api.js";

const BADGE = {
    A_FAIRE:  "badge bg-primary",
    EN_COURS: "badge bg-warning text-dark",
    TERMINE:  "badge bg-success"
};

const LABEL = {
    A_FAIRE:  "À faire",
    EN_COURS: "En cours",
    TERMINE:  "Terminé"
};

function Show() {
    const { id } = useParams();       // recupere l'id dans l'URL
    const navigate = useNavigate();   // pour rediriger apres suppression
    const [tache, setTache] = useState(null);

    useEffect(() => {
        tacheService.getById(id).then(setTache);
    }, [id]);

    const handleDelete = () => {
        tacheService.delete(id).then(() => navigate("/"));
    };

    if (!tache) return <div className="container py-4">Chargement...</div>;

    return (
        <div className="container py-4">
            <Link to="/" className="btn btn-secondary mb-4">
                Retour à la liste
            </Link>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{tache.titre}</h2>
                    <p className="card-text">{tache.description ?? "—"}</p>
                    <span className={BADGE[tache.statut]}>
                        {LABEL[tache.statut]}
                    </span>
                </div>
                <div className="card-footer d-flex gap-2">
                    <Link
                        to="/"
                        className="btn btn-outline-warning"
                    >
                       Modifier
                    </Link>
                    <button
                        className="btn btn-outline-danger"
                        onClick={handleDelete}
                    >
                       Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Show;