import { useState, useEffect } from "react";

const FORM_VIDE = { titre: "", description: "", statut: "A_FAIRE", categorie: { id: 1 } };

// logique qui permet d'ajouter ou de modifier une tache
function TacheForm({ onSubmit, tacheEnEdition, onAnnuler }) {
    const [form, setForm] = useState(FORM_VIDE);

    // pre remplir le formulaire si on modifie une tache qui existe
    useEffect(() => {
        setForm(tacheEnEdition ?? FORM_VIDE);
    }, [tacheEnEdition]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(FORM_VIDE);
    };

    // generation du HTML
return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">
                    {tacheEnEdition ? "Modifier la tâche" : "Nouvelle tâche"}
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="row g-2">
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                name="titre"
                                placeholder="Titre"
                                value={form.titre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                name="description"
                                placeholder="Description"
                                value={form.description ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-2">
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
                        <div className="col-md-2 d-flex gap-2">
                            <button className="btn btn-primary w-100" type="submit">
                                {tacheEnEdition ? "Modifier" : "Ajouter"}
                            </button>
                            {tacheEnEdition && (
                                <button
                                    className="btn btn-secondary w-100"
                                    type="button"
                                    onClick={onAnnuler}
                                >
                                    Annuler
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TacheForm;
