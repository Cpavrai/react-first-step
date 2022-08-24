# Pré-requis

Node et npm d'installé. Les ports 3000 et 5000 ouverts et accessibles sur la machine.

# Création du projet

Pour créer le projet, on va se servir de create-react-app, un module-script JS installable via `npm` et exécutable via `npx`. Celui-ci va nous créer notre projet dans un dossier dont on va spécifier le nom.

De plus, nous voulons employer le typescript à la place du javascript, donc nous lançons la commande suivante:

`npx create-react-app front --template typescript`

> Si on n'avait pas create-react-app d'installé, il suffit alors de lancer l'installation via npm globalement comme ceci (en étant sudo) : `npm install -g create-react-app`

# Initialiser le projet

## SASS

Dans le projet, nous installons le module sass:

`npm install sass`

Ainsi, plus besoin de .css !

## Linter

Tout d'abord installer les modules nécessaires :

```
npm install --save-dev prettier
npx mrm@2 lint-staged
```

Maintenant que tout est installé, nous souhaitons qu'il prenne en compte notre config (qui n'est pas juste du js et css, mais du ts et scss). On modifie donc la condition de lint-staged dans package.json:

```
-    "*.{js,css,md}": "prettier --write"
+    "*.{js,jsx,ts,tsx,json,css,scss,md}": "prettier --write"
```

# Architecture

## En root :

- .husky : où on stocke les precommit npx script
- public : où est stocké la partie statique (comme les medias, les icones, …)
- src : les fichiers source

Une fois qu'on aura lancé la commande de build (`npm run build`) on aura :

- build : le résultat de la compilation (prêt à l'emploi en production donc)

## En src :

Plusieurs architectures possibles. Parmi elles, je privilégie le besoin->dossier. Ainsi, on se retrouve avec:

- `components` : les DOM Elements réutilisables
- `models` : les modèles/ structures de données
- `pages` : les pages pointées par le router
- `services` : les services employées

Pour les components et les pages, je privilégie l'utilisation de dossier indiqué.

> Exemple: pour un ModalButton, qui serait un DOMelement réutilisable avec son code JS et son SCSS, je ferai donc un dossier ModalButton dans `components`, où serait logé `ModalButton.tsx` et `ModalButton.scss`.

# Mise en place du projet

## Installation du router

On installe en root du projet le module router:

`npm install react-router-dom@6`

## Initialisation du router

On édite le main page App.tsx en implémentant le `<BrowserRouter>` avec les `<Route>` (embed dans un `<Routes>`) afin de gérer les différentes routes.

Dans les plus génériques:

- "/" pour le root pathname
- "\*" pour le fallback (qui peut servir de not-found)

On peut aussi s'en servir pour récupérer des éléments dynamiques de la route. Par exemple "/date/:date" ou "/user/:userId".

Ou encore pour faire un routage nested. Par exemple, dans "/date" on met "/" en index, et ":dateId" pour la gestion d'enfant direct.

# Customisation du projet

## Identité

Changer dans `public/index.html` toutes les meta dont on a besoin de personnaliser (title, meta description…).

## Logo

On crée notre logo et on va sur https://realfavicongenerator.net/ pour générer tous les assets nécessaires autour de ce logo. Ensuite suivre tout ce qui est indiqué sur le site.

## Une page

On crée en premier un dossier `HomePage` dans `src/pages`. Dedans, on y met un HomePage.tsx (et un HomePage.scss si besoin).

## Un component

On crée maintenant un dossier `Button` dans `src/pages`. Dedans, on y met un Button.tsx (et un Button.scss si besoin). Ce component va nous servir de button à utiliser à chaque call-to-action.

## CI/CD

On peut rajouter du CI pour tester les différents fichiers `.test.ts`. Ces fichiers de test existent pour les pages pour faire du e2e (end-to-end), et pour les components en tant que test unitaire.

## Les variables d'environnement

Toutes les variables d'environnement sont stockées dans le fichier `.env`, et suit une logique de nomenclature précise: le nom doit commencer par REACT*APP*. Ainsi, pour une variable d'URL d'API, on utilisera la variable d'environnement REACT_APP_URL_API.

> À noter: plusieurs fichiers dotenv sont possibles et ils ont un ordre de priorité. Le fichier `.env.local` passera toujours avant le fichier `.env` (sauf pour les tests, dans ce cas-là on privilégiera un fichier `.env.test`), c'est pourquoi on l'emploiera lorsqu'on travaillera en local sur notre machine.

# Développement d'un projet

Nous allons maintenant voir ensemble un développement d'une solution de client d'une API de la NASA:

- Ajout d'un style global

Dans App.scss:

```
body {
  background: linear-gradient(to left, rgb(23, 97, 143), rgb(84, 13, 151));
  height: 100vh;
  width: 100vw;
}

.bg-white {
  background-color: white;
}
```

- Ajout d'une page HomePage

HomePage.tsx:

```
import Button from "../../components/Button/Button";
import "./HomePage.scss";

const HomePage = () => <section className="bg-white" id="home">
  <h1>Bienvenue</h1>
  <Button text="se connecter" link={"login"} style={{backgroundColor: 'darkblue'}} />
</section>

export default HomePage;
```

HomePage.scss:

```
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  > * {
    margin: 20px 0;
  }
}
```

- Ajout d'un component Button

Button.tsx:

```
import { Link } from "react-router-dom";
import './Button.scss';

const Button = ({text="", link="", clickFunction=() => {}, style={}}) => (
  link ?
  (<Link to={link}>
    <button style={{...style}}>{text}</button>
  </Link>)
  :
  (<button onClick={() => clickFunction ? clickFunction() : null} style={{...style}}>{text}</button>)
)

export default Button;
```

Button.scss:

```
button {
  padding: 10px 20px;
  color: white;
  background-color: purple;
  border: none;
  font-family: sans-serif;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(0.9);
  }
}
```

- Ajout d'une page Login:

Login.tsx:

```
const Login = () => (
  <section id="login" className="bg-white">
    <h2>Connexion</h2>
    <input type="text" placeholder="Username" id="username" />
    <input type="password" placeholder="password" id="password" />
  </section>
)

export default Login;
```

Login.scss:

```
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  input {
    margin: 20px 0;
    padding: 10px 17px;
  }
}
```

On se rend compte qu'on a un besoin similaire pour deux pages, on va donc faire un component de rendu: "SectionCenter".

SectionCenter.tsx:

```
import { ReactNode } from "react";
import "./SectionCenter.scss";

const SectionCenter = ({ children }: { children: ReactNode }) => (
  <section id="section-center">{children}</section>
);

export default SectionCenter;

```

SectionCenter.scss:

```
#section-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  max-width: 50vw;
  max-height: 100vh;
  text-align: center;
}
```

- Ajout d'un service APIService

On utilisera fetch (mais on pouvait aussi utiliser axios). On utilisera aussi la variable d'environnement REACT_APP_API_URL (qu'on aura stocké dans le fichier `.env`).

```
import Data from "../models/Data";

class APIService {
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then((resp) => {
          localStorage.setItem("token", resp.access_token);
          resolve("");
        })
        .catch((err) => reject(err));
    });
  }

  fetchData(date?: string): Promise<Data> {
    return new Promise((resolve, reject) => {
      const userToken = localStorage.getItem("token");

      if (!userToken) return reject("Forbidden");
      fetch(`http://localhost:3000/data${date ? `?date=${date}` : ""}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }
}

export default new APIService();
```

# Déploiement

## Build

Il suffit de lancer la commande `npm run build`.

## Serve

Avec le dossier `dist` créé par l'étape Build, nous allons le render avec un nginx. Pour avoir le routing fonctionnel avec Nginx, il suffit d'un nginx classique comportant l'ordre suivant:

```
  location / {
    try_files $uri$args $uri$args/ /index.html;
  }
```

# Pour aller plus loin

## Hooks

Avec le système de hook qu'on a utilisé, plusieurs méthodes (ou "références") de React nous sont proposés, dont useContext, useRef, useState (qu'on a utilisé ici). Ce sont des fonctions très importantes dans le lifecycle d'un projet React et je vous invite à jeter un oeil sur la doc car certaines méthodes sont très intéressantes : [https://fr.reactjs.org/docs/hooks-reference.html](https://fr.reactjs.org/docs/hooks-reference.html).

## Les tests

Chaque component **devrait** avoir un fichier `.test.tsx` afin de pouvoir tester chaque comportement, notamment sur l'aspect, l'affichage ou le contenu.

De plus, dans `App.test.tsx`, on y loge fréquemment des tests e2e (end-to-end) afin de vérifier les différents scénarios d'user du début à la fin.

## React Native

Le React et le React Native sont la même techno, quelques approches diffèrent néanmoins. C'est très intéressant de regarder les nouvelles pratiques d'un côté comme de l'autre.
