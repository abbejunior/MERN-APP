# Application MERN: Ma Liste de Tâches

---

## Description du Projet

Ceci est une application de liste de tâches simple (Todo List) construite avec la pile MERN (MongoDB, Express.js, React, Node.js). Elle permet aux utilisateurs d'ajouter, de consulter, de modifier et de supprimer des tâches.

-   **Frontend**: Développé avec React.js, offrant une interface utilisateur interactive.
-   **Backend**: Construit avec Node.js et Express.js, fournissant une API RESTful pour la gestion des tâches.
-   **Base de Données**: MongoDB, une base de données NoSQL, hébergée sur MongoDB Atlas.

---

## Fonctionnalités

-   Ajouter de nouvelles tâches.
-   Afficher toutes les tâches existantes.
-   Marquer une tâche comme complétée/non complétée.
-   Modifier le texte d'une tâche.
-   Supprimer des tâches.

---

## Technologies Utilisées

### Frontend

* **React.js**: Bibliothèque JavaScript pour construire les interfaces utilisateur.
* **Axios**: Client HTTP pour faire des requêtes vers l'API backend.
* **CSS**: Pour le style de l'application.

### Backend

* **Node.js**: Environnement d'exécution JavaScript côté serveur.
* **Express.js**: Framework web pour Node.js.
* **Mongoose**: ODM (Object Data Modeling) pour MongoDB et Node.js.
* **CORS**: Middleware Express pour gérer la politique de sécurité des requêtes cross-origin.
* **Dotenv**: Pour charger les variables d'environnement.

### Base de Données

* **MongoDB Atlas**: Service de base de données MongoDB hébergé dans le cloud.

---

## Installation et Exécution en Local

Suivez ces étapes pour faire tourner l'application sur votre machine locale.

### Prérequis

* Node.js (version 14 ou supérieure recommandée)
* npm (normalement inclus avec Node.js)
* Un compte MongoDB Atlas avec un cluster configuré et une chaîne de connexion (URI). Assurez-vous que l'accès réseau est configuré pour inclure votre adresse IP locale (`0.0.0.0/0` pour un accès universel pendant le développement).

### 1. Cloner le Dépôt

```bash
git clone <URL_DE_VOTRE_DEPOT_GITHUB>
cd mern-todo-app