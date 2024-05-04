import { getToken } from "./auth";
import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
    const artworks = await fetchApi({
        endpoint: "artworks",
        query: { populate: ["owner", "likes"] },
        wrappedByKey: "data"
    });
    if (!artworks) return [];
    return artworks.map(unwrapAtributes);
};

const createArtwork = async (data) => {
    const artwork = await fetchApi(
        {
            endpoint: "artworks",
        },
        {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return unwrapAtributes(artwork);
};
const updateArtwork = async (id, data) => {
    const response = await fetchApi(
        {
            endpoint: `artworks/${id}`,
        },
        {
            method: "PUT",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response;
};

const deleteArtwork = async (id) => {
    const response = await fetchApi(
        {
            endpoint: `artworks/${id}`,
        },
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response;
};

const getArtworkById = async (id) => {
    const artwork = await fetchApi({
        endpoint: `artworks/${id}`,
        query: { populate: ["owner"] },
        wrappedByKey: "data",
    });
    return unwrapAtributes(artwork);
};


const likeArtwork = async (artworkId, userId) => {
    try {
        // Step 1: Create the Like
        const likeResponse = await fetchApi(
            {
                endpoint: `likes`,
                query: {
                    populate: {
                        user: true,
                        artwork: {
                            populate: {
                                owner: {
                                    populate: 'username' // Populate the username from the user
                                }
                            }
                        }
                    }
                },

            },
            {
                method: "POST",
                body: {
                    data: {
                        artwork: artworkId,
                        user: userId
                    }
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );

        if (!likeResponse || !likeResponse.data || !likeResponse.data.id) {
            throw new Error('Failed to create like');
        }

        // Step 2: Update the Artwork to include the new Like
        const updateResponse = await fetchApi(
            {
                endpoint: `artworks/${artworkId}`,
            },
            {
                method: "PUT",
                body: {
                    data: {
                        likes: [likeResponse.data.id] // Assuming we're directly setting the new like
                    }
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );

        return updateResponse;

    } catch (error) {
        console.error('Error in likeArtwork:', error);
        throw error;
    }
};

// const fetchLikeWithPopulatedData = async (likeId) => {
//     return await fetchApi({
//         endpoint: `likes/${likeId}`,
//         query: { populate: { user: '*', artwork: '*' } },
//         wrappedByKey: "data",
//     });
// };
export { getArtworks, createArtwork, getArtworkById, updateArtwork, deleteArtwork, likeArtwork };
