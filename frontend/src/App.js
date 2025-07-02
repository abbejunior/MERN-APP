import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Assurez-vous que ce fichier existe ou supprimez-le si non utilisé

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodo, setEditingTodo] = useState(null); // Tâche en cours d'édition
  const [editText, setEditText] = useState(''); // Texte du champ d'édition

  // La base URL de votre API. Pour le développement local, c'est votre port backend.
  // Pour la production sur Render, ce sera l'URL de votre service backend.
  // Render utilise la variable d'environnement REACT_APP_API_BASE_URL configurée lors du déploiement frontend.
  // MODIFICATION ICI : Le port pour le développement local est maintenant 5001 pour correspondre à votre backend.
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodoText.trim()) return;
    try {
      const response = await axios.post(`${API_BASE_URL}/api/todos`, { text: newTodoText });
      setTodos([...todos, response.data]);
      setNewTodoText('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/todos/${id}`, updatedFields);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      setEditingTodo(null); // Quitter le mode édition
      setEditText(''); // Réinitialiser le texte d'édition
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  const toggleComplete = (todo) => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.text);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = (todo) => {
    if (!editText.trim()) return;
    updateTodo(todo._id, { text: editText });
  };

  return (
    <div className="App">
      <h1>Ma Liste de Tâches MERN</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Ajouter une nouvelle tâche"
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            {editingTodo === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleEditSave(todo)}>Enregistrer</button>
                <button onClick={() => setEditingTodo(null)}>Annuler</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(todo)}>
                  {todo.text}
                </span>
                <button onClick={() => startEditing(todo)}>Modifier</button>
                <button onClick={() => deleteTodo(todo._id)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;