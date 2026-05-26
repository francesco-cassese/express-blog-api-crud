const validateId = id => {

    if (!id) {
        return {
            error: "ID mancante nella richiesta",
            results: null
        };
    }

    const numId = Number(id.trim());

    if (isNaN(numId)) {
        return {
            error: "Valore dell'id non conforme o inesistente",
            results: null
        };
    }

    if (!Number.isInteger(numId)) {
        return {
            error: "L'ID deve essere un numero intero",
            results: null
        };
    }

    if (numId <= 0) {
        return {
            error: "Non esistono elementi con id minori o uguali a zero nel sistema",
            results: null
        };
    }

    return {
        error: null,
        results: numId
    };
};

const checkPosts = (posts, id) => {

    const postFound = posts.find(post => post.id === id);

    if (!postFound) {
        return {
            error: `Post con ID ${id} non trovato nel sistema`,
            results: null
        };
    }

    return {
        error: null,
        results: postFound
    };
};

const deletePost = (posts, id) => {
    const indexOfPosts = posts.findIndex(post => post.id === id);

    if (indexOfPosts === -1) {
        return {
            error: `Post con ID ${id} non trovato`,
            results: null
        };
    }

    const removedPost = posts.splice(indexOfPosts, 1);

    return {
        error: null,
        results: `rimozione di ${removedPost[0].title} avvenuta con successo`
    };
};

const validatePostData = data => {
    const { title, content, prep_time, } = data;

    if (!title || title.trim() === "") {
        return {
            error: "Il titolo è obbligatorio",
            results: null
        };
    }

    if (!content || content.trim() === "") {
        return {
            error: "Il contenuto è obbligatorio",
            results: null
        };
    }

    const numPrepTime = Number(prep_time);
    if (isNaN(numPrepTime) || numPrepTime < 0) {
        return {
            error: "Il tempo di preparazione deve essere un numero positivo",
            results: null
        };
    }

    return {
        error: null,
        results: { ...data, prep_time: numPrepTime }
    };
}

export { validateId, checkPosts, deletePost, validatePostData };