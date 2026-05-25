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

export { validateId, checkPosts };