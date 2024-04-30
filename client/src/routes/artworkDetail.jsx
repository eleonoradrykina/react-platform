import Svg from '../components/svg/Svg'
import { getArtworkById } from "../services/artwork";
import { useLoaderData, Link} from "react-router-dom";
import { getAuthData } from "../services/auth";

const loader = async ( {params}) => {
    const artwork = await getArtworkById(params.id);
    console.log("artwork", artwork);

    const { user } = getAuthData();
    return { artwork, user };
 }

const ArtworkDetail = () => {
    const { artwork, user } = useLoaderData();


    return (
        <>
       <div>Created by {artwork.owner?.data ? 
        <Link to={`/user/${artwork.owner?.data.id}`}>
                  {artwork.owner.data.attributes.username}
                </Link>
       : 
       `Anonymous`}</div>
       {(artwork.owner?.data?.attributes.username === user?.username) && (
        <Link to={`/artwork/edit/${artwork.id}`}>Edit</Link>)}
       <p>created on {artwork.createdAt.split('T')[0]}</p>
        <Svg svg = {artwork.svg} randomisation={artwork.randomisation}/>
        </>
    )
}

export default ArtworkDetail;

ArtworkDetail.loader = loader;