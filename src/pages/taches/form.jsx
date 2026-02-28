import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { tacheService } from "../../services/api.js";

const FORM_VIDE = { titre: "", description: "", statut: "A_FAIRE", categorie: { id: 1 } };

function TacheFormPage() {
    const { id } = useParams();         // undefined si creation, sinon id de la tâche
    const navigate = useNavigate();
    const [form, setForm] = useState(FORM_VIDE);
    const isEditing = !!id;             // vrai si on est sur /taches/:id/edit

    // Si édition → pré-remplir le formulaire
    useEffect(() => {
        if (isEditing) {
            tacheService.getById(id).then(setForm);
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isEditing
            ? tacheService.update(id, form)
            : tacheService.create(form);

        action.then(() => navigate("/"));   // retour liste apres submit
    };

    return (
        <div className="container py-4">
            <Link to="/" className="btn btn-secondary mb-4">
                ← Retour à la liste
            </Link>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title mb-4">
                        {isEditing ? "Modifier la tâche" : "Nouvelle tâche"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Titre</label>
                            <input
                                className="form-control"
                                name="titre"
                                value={form.titre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                className="form-control"
                                name="description"
                                value={form.description ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Statut</label>
                            <select
                                className="form-select"
                                name="statut"
                                value={form.statut}
                                onChange={handleChange}
                            >
                                <option value="A_FAIRE">À faire</option>
                                <option value="EN_COURS">En cours</option>
                                <option value="TERMINE">Terminé</option>
                            </select>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" type="submit">
                                {isEditing ? "Modifier" : "Ajouter"}
                            </button>
                            <Link to="/" className="btn btn-outline-secondary">
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TacheFormPage;
