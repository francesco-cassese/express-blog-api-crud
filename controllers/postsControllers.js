import posts from '../data/posts.js';
import { validateId, checkPosts, deletePost } from '../utils/serverUtils.js'


const index = (request, response) => {
    const { name, prep_time: prepTime } = request.query;

    const prepTimeLimit = parseInt(prepTime);

    if (name) {
        const cleanName = name.trim();

        if (cleanName === "") {
            response.status(400).json({
                error: "Il nome non può essere vuoto",
                results: null
            });
            return;
        }

        if (!isNaN(cleanName)) {
            response.status(400).json({
                error: "Il nome non può essere un numero",
                results: null
            });
            return;
        }
    }

    if (prepTime && isNaN(prepTimeLimit)) {
        return response.status(400).json({
            error: "Il tempo di preparazione deve essere un numero",
            results: null
        });
    }

    const postsFiltered = posts.filter(post => {
        console.log("Post in esame:", post.title, "Tempo:", post.prep_time);
        if (name) {
            const cleanName = name.trim().toLowerCase();
            if (!post.title.toLowerCase().includes(cleanName)) return false;
        }

        if (!isNaN(prepTimeLimit)) {
            console.log("Confronto:", post.prep_time, ">", prepTimeLimit);
            if (post.prep_time > prepTimeLimit) return false;
        }

        return true;
    });

    if (postsFiltered.length === 0) {
        response.status(404).json({
            error: "Nessun post trovato",
            results: null
        })
        return;
    }

    response.json(postsFiltered);
};

const show = (request, response) => {
    const { id } = request.params;

    const checkedId = validateId(id);

    if (checkedId.error) {
        response.status(400)
            .json(checkedId);
    }

    const postFound = checkPosts(posts, checkedId.results);

    if (postFound.error) {
        response.status(404)
            .json(postFound);
    }

    response.json({
        error: null,
        results: postFound.results
    });
};

const store = (request, response) => {
    console.log(request.body);
    const { title, content } = request.body;

    response.json({
        error: null,
        results: {
            "messaggio": "Stai provando a creare dei dati",
            "dati": {
                "title": title,
                "content": content
            }
        }
    })
}

const update = (request, response) => {
    const { id } = request.params;

    const checkedId = validateId(id);

    if (checkedId.error) {
        response.status(400)
            .json(checkedId);
    }

    const postFound = checkPosts(posts, checkedId.results);

    if (postFound.error) {
        response.status(404)
            .json(postFound);
    }

    response.json({
        error: null,
        results: `Modificare iteramente l'elemento ${checkedId.results}`
    })
}

const modify = (request, response) => {

    const { id } = request.params;

    const resultscheckedId = validateId(id);

    if (resultscheckedId.error) {
        response.status(400)
            .json(resultscheckedId);
    }

    const resultsPostFound = checkPosts(posts, resultscheckedId.results);

    if (resultsPostFound.error) {
        response.status(404)
            .json(resultsPostFound);
    }

    response.json({
        error: null,
        results: `Modificare parzialmente l'elemento ${resultscheckedId.results}`
    })
}

const destroy = (request, response) => {

    const { id } = request.params;

    const resultsCheckedId = validateId(id);

    if (resultsCheckedId.error) {
        response.status(400)
            .json(resultsCheckedId);
        return;
    }

    const resultsPostFound = checkPosts(posts, resultsCheckedId.results);

    if (resultsPostFound.error) {
        response.status(404)
            .json(resultsPostFound);
        return;
    }

    const deletedPost = deletePost(posts, resultsCheckedId.results)

    if (deletedPost.error) {
        response.status(404).json(deletedPost.error)
        return;
    }

    response.sendStatus(204);
    console.log(posts);
}

export { index, show, store, update, modify, destroy }