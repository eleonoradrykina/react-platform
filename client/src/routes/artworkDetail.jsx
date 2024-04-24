import Svg from '../components/svg/Svg'
import { getArtworkById } from "../services/artwork";
import { useLoaderData, Link} from "react-router-dom";

const loader = async ( {params}) => {
    const artwork = await getArtworkById(params.id);
    console.log("artwork", artwork)
    return { artwork };
 }

const ArtworkDetail = () => {
    const { artwork } = useLoaderData();

    return (
        <>
       <div>Created by {artwork.owner.data ? 
        <Link to={`/user/${artwork.owner.data.id}`}>
                  {artwork.owner.data.attributes.username}
                </Link>
       : 
       `Anonymous`}</div>
       <p>created on {artwork.createdAt.split('T')[0]}</p>
        <Svg svg = {artwork.svg} randomisation={artwork.randomisation}/>
        </>
    )
}

export default ArtworkDetail;

ArtworkDetail.loader = loader;