import { useLoaderData, Link } from "react-router-dom";
import { getArtworks } from "../services/artwork";
import indexStyles from "./index.module.css";

// import styles from "./index.module.css";

const loader = async () => {
  const artworks = await getArtworks();
    console.log("artworks", artworks);
  return { artworks};

};

const Index = () => {
  const { artworks } = useLoaderData();
  return (
    <>
    <ul className={indexStyles.list}>
      {artworks.map((artwork) => (
        <li key={artwork.id} className={indexStyles.listItem}>
          <Link to={`/artwork/${artwork.id}`}>
         <p>Mountains no. {artwork.id} with randomisation {artwork.randomisation}</p>
         <div> <span>{artwork.fav || 0} {(artwork.fav === 1) ? 'like' : 'likes'}</span></div>
         </Link>
  
        </li>
      ))}
    </ul>
    </>
  );
};

Index.loader = loader;

export default Index;
