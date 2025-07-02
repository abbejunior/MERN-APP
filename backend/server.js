require('dotenv').config(); // Charger les variables d'environnement en premier
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001; // Utilise le port fourni par Render ou 5000 par défaut

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser les corps de requête JSON

// Connexion à MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
    .catch(err => console.error('Erreur de connexion à MongoDB Atlas :', err));

// Définir un schéma et un modèle Mongoose pour les tâches
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

// Routes API
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text, completed: req.body.completed },
            { new: true } // Retourne le document modifié
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.json({ message: 'Tâche supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Pour la production : servir le frontend React statique
// Important : Ceci doit être après vos routes API
if (process.env.NODE_ENV === 'production') {
    // Si votre frontend est construit dans un dossier 'dist' ou 'build' à la racine du backend
    app.use(express.static(path.join(__dirname, '../frontend/build'))); // Adaptez ce chemin !

    // Pour toute requête non API, renvoyer le fichier index.html du frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html')); // Adaptez ce chemin !
    });
}


app.listen(port, () => {
    console.log(`Serveur Node.js démarré sur le port : ${port}`);
});