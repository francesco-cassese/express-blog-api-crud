import posts from '../data/posts.js';
import { validateId, checkPosts, deletePost } from '../utils/serverUtils.js'


const index = (request, response) => {
    const { name } = request.query;

    if (!name) {
        response.json(posts)
        return;
    }

    if (!isNaN(name)) {
        response.status(400).json({
            error: "il nome non può essere un numero",
            results: null
        })
        return;
    }

    const cleanName = name.trim().toLowerCase();

    if (cleanName === "") {
        response.status(400).json({
            error: `name non può essere vuoto.`,
            results: null
        })
        return;
    }

    const postsFiltered = posts.filter(post => {
        return post.title.toLocaleLowerCase().includes(cleanName)
    })

    if (postsFiltered.length === 0) {
        return response.status(404).json(
            {
                error: "Nessun post trovato",
                results: null
            });
    }

    response.json(postsFiltered);

}

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
    response.json({
        error: null,
        results: 'Creare un nuovo elemento'
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