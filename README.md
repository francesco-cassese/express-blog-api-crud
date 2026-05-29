# Esercitazione: Express Blog - API CRUD
**nome repo:** `express-blog-api-crud`

> 🎓 **Nota:** Questa esercitazione riguarda lo sviluppo di un'API RESTful con Express.js per la gestione di un blog. L'obiettivo didattico è implementare le operazioni CRUD (Create, Read, Update, Delete) complete, con gestione del body-parsing, validazione dei dati e logiche di filtraggio.

## 📝 Obiettivo
L'obiettivo di questa esercitazione è definire un'architettura modulare (controller/router) per gestire le risorse "post" del blog, assicurando la corretta manipolazione dei dati e la gestione delle risposte HTTP in conformità agli standard REST.

---

## 📂 Struttura del Progetto

```text
express-blog-api-crud/
├── data/
│   └── posts.js           # Dataset iniziale
├── public/posts/          # Asset statici (immagini dei post)
│
├── src/
│   ├── controllers/       # Logica di business
│   ├── middlewares/       # Validazione e gestione richieste
│   ├── routers/           # Definizione endpoint API
│   └── utils/             # Funzioni di utilità
│
├── .env                   # Variabili d'ambiente (non versionate)
├── .env.example           # Template variabili d'ambiente
├── .gitignore             # Esclusioni per Git
├── package.json           # Dipendenze e script npm
├── pnpm-lock.yaml         # Lockfile per le dipendenze
├── README.md              # Documentazione del progetto
└── server.js              # Entry point dell'applicazione
```

## 🛠️ Funzionalità implementate
### Operazioni CRUD
* **Index (GET):** Recupero lista post con supporto a filtri personalizzati.
* **Show (GET):** Recupero di un singolo post tramite ID (o slug).
* **Store (POST):** Creazione di un nuovo post con validazione dei dati in ingresso.
* **Update (PUT/PATCH):** Modifica di una risorsa esistente.
* **Destroy (DELETE):** Eliminazione di un post (con supporto a logica di soft-delete).

### Tecnologie e Tools
* **Framework:** Express.js
* **Test:** Postman (per validazione endpoint e gestione casi limite).
* **Validazione:** Implementazione di controlli lato backend per garantire l'integrità dei dati.

## 🚀 Note tecniche
* **Parsing:** Utilizzo di `express.json()` per la gestione delle richieste in formato JSON.
* **Architettura:** Separazione netta tra la definizione delle rotte e la logica di controllo per migliorare la manutenibilità del codice.
* **Gestione Errori:** Implementazione di risposte HTTP appropriate (es. 200, 201, 400, 404) basate sull'esito delle operazioni.

---
*Esercizio Boolean - Corso Full Stack Web Development.* 🚀