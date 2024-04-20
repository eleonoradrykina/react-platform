import { useLoaderData } from "react-router-dom";
import { getArtworks } from "../services/artwork";
// import ArtworkCard from "../components/CheeseCard";

// import styles from "./index.module.css";

const loader = async () => {
  const artworks = await getArtworks();
  return { artworks};
};

const Index = () => {
  const { artworks } = useLoaderData();
  return (
    <>
    <ul className={``}>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
  
        </li>
      ))}
    </ul>
    </>
  );
};

Index.loader = loader;

export default Index;
