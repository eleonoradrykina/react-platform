import { getToken } from "./auth";
import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
    const artworks = await fetchApi({ endpoint: "artworks" });
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

const getArtworkById = async (id) => {
    const artwork = await fetchApi({
        endpoint: `artworks/${id}`,
        query: { populate: ["owner"] },
        wrappedByKey: "data",
    });
    return unwrapAtributes(artwork);
};

export { getArtworks, createArtwork, getArtworkById };
