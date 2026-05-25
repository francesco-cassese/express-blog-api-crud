import posts from '../data/posts.js';
import { validateId, checkPosts } from '../utils/serverUtils.js'


const index = (request, response) => {
    response.json(posts)
}

const show = (request, response) => {
    const { id } = request.params;

    const checkedId = validateId(id);

    if (checkedId.error) {
        return response.status(400)
            .json(checkedId);
    }

    const postFound = checkPosts(posts, checkedId.results);

    if (postFound.error) {
        return response.status(404)
            .json(postFound);
    }

    return response.json({
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
        return response.status(400)
            .json(checkedId);
    }

    const postFound = checkPosts(posts, checkedId.results);

    if (postFound.error) {
        return response.status(404)
            .json(postFound);
    }

    response.json({
        error: null,
        results: `Modificare iteramente l'elemento ${checkedId.results}`
    })
}

const modify = (request, response) => {

    const { id } = request.params;

    const checkedId = validateId(id);

    if (checkedId.error) {
        return response.status(400)
            .json(checkedId);
    }

    const postFound = checkPosts(posts, checkedId.results);

    if (postFound.error) {
        return response.status(404)
            .json(postFound);
    }

    response.json({
        error: null,
        results: `Modificare parzialmente l'elemento ${checkedId.results}`
    })
}

const destroy = (request, response) => {

    const { id } = request.params;

    const checkedId = validateId(id);

    if (checkedId.error) {
        return response.status(400)
            .json(checkedId);
    }

    const results = checkPosts(posts, checkedId.results);

    if (results.error) {
        return response.status(404)
            .json(results);
    }

    response.json({
        error: null,
        results: `Vuoi eliminare l'elemento con id ${checkedId.results}`
    })
}

export { index, show, store, update, modify, destroy }