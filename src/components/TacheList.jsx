import {Link} from "react-router-dom";

// logique qui permet de recuperer les taches et de les afficher
const BADGE = {
    A_FAIRE: "badge bg-primary",
    EN_COURS: "badge bg-warning text-dark",
    TERMINE: "badge bg-success"
};

const LABEL = {
    A_FAIRE: "À faire",
    EN_COURS: "En cours",
    TERMINE: "Terminé"
};

function TacheList({taches, onEdit, onDelete}) {
    if (taches.length === 0) {
        return <p className="text-muted">Aucune tâche pour le moment.</p>;
    }

    return (
        <table className="table table-striped table-hover align-middle">
            <thead>
            <tr>
                <th>#</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {taches.map(tache => (
                <tr key={tache.id}>
                    <td>{tache.id}</td>
                    <td>
                        <Link to={`/taches/${tache.id}`}>{tache.titre}</Link>
                    </td>
                    <td>{tache.description ?? "—"}</td>
                    <td>
                            <span className={BADGE[tache.statut]}>
                                {LABEL[tache.statut]}
                            </span>
                    </td>
                    <td className="d-flex gap-2">
                        <Link
                            to={`/taches/${tache.id}/edit`}
                            className="btn btn-sm btn-outline-warning"
                        >
                            Modifier
                        </Link>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(tache.id)}
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TacheList;
