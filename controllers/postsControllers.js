import posts from '../data/posts.js';
import { validateId, checkPosts, deletePost, validatePostData, createSlug, checkPostsBySlug } from '../utils/serverUtils.js'

/*
   ============================================================
   INDEX (GET)
   ============================================================
 */
const index = (request, response) => {
    const { name, prep_time: prepTime, slug } = request.query;

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
        if (name) {
            const cleanName = name.trim().toLowerCase();
            if (!post.title.toLowerCase().includes(cleanName)) return false;
        }

        if (!isNaN(prepTimeLimit)) {
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

/*
   ============================================================
   SHOW (GET/:slug)
   ============================================================
 */

const show = (request, response) => {

    const { slug } = request.params;

    const postFound = checkPostsBySlug(posts, slug);

    if (postFound.error) {
        return response.status(404).json(postFound);
    }

    response.status(200).json({
        error: null,
        results: postFound.results
    });
};

/*
   ============================================================
   STORE (POST)
   ============================================================
 */

const store = (request, response) => {
    console.log(request.body);
    const { title, content, published, prep_time, } = request.body;

    const resultsValidateData = validatePostData(request.body, posts);

    if (resultsValidateData.error) {
        response.status(400).json(resultsValidateData);
        return;
    }

    const newId = posts.length + 1;

    const slug = createSlug({ title })

    const newPost = {
        id: newId,
        ...request.body,
        slug: slug,
        created_at: new Date().toISOString()
    }

    posts.push(newPost);

    response.status(201).json({
        error: null,
        results: {
            "messaggio": "post aggiunto con successo",
            "dati": { newPost }
        }
    })
}

/*
   ============================================================
   UPDATE (PUT/:id)
   ============================================================
 */

const update = (request, response) => {

    const oldPost = request.post;
    const newBody = request.body;

    const updatedPost = {
        id: oldPost.id,
        ...newBody,
        slug: createSlug(newBody.title),
        updated_at: new Date().toISOString()
    };

    const index = posts.findIndex(post => post.id === oldPost.id);
    posts[index] = updatedPost;

    response.status(200).json({
        error: null,
        messaggio: "Post sostituito con successo",
        results: updatedPost
    });
}
/*
   ============================================================
   MODIFY (PATCH:id)
   ============================================================
 */

const modify = (request, response) => {

    const oldPost = request.post;
    const body = request.body;

    const modificatedPost = {
        ...oldPost,
        title: body.title || oldPost.title,
        content: body.content || oldPost.content,
        tags: body.tags || oldPost.tags,
        prep_time: body.prep_time || oldPost.prep_time,
        slug: body.title ? createSlug(body.title) : oldPost.slug,
        updated_at: new Date().toISOString()
    };

    const index = posts.findIndex(post => post.id === oldPost.id);
    posts[index] = modificatedPost;

    response.status(200).json({
        error: null,
        messaggio: "Post modificato con successo",
        results: modificatedPost,
    });
}

/*
   ============================================================
   DESTROY (DELETE/:id)
   ============================================================
 */

const destroy = (request, response) => {

    const postFound = request.post;

    const deletedPost = deletePost(posts, postFound)

    if (deletedPost.error) {
        response.status(404).json(deletedPost.error)
        return;
    }

    response.sendStatus(204);
    console.log(posts);
}

export { index, show, store, update, modify, destroy }