import Svg from '../components/svg/Svg'
import { getArtworkById } from "../services/artwork";
import { Form, useLoaderData, Link, redirect} from "react-router-dom";
import { getAuthData } from "../services/auth";
import { createArtwork } from "../services/artwork";

const loader = async ( {params}) => {
    const artwork = await getArtworkById(params.id);
    console.log("artwork", artwork);

    const { user } = getAuthData();
    return { artwork, user };
 }

const action = async ({ request }) => {
  const formData = await request.formData();
  const randomisation = formData.get('randomisation');
  
  const data = Object.fromEntries(formData);

  data.svg = JSON.parse(data.svg);
  data.randomisation = randomisation;
  console.log("formdata3", data);

  await createArtwork(data);
  return redirect(`/`);
};

const ArtworkDetail = () => {
    const { artwork, user } = useLoaderData();


    return (
        <div className="detailWrapper">
       <div>Created by {artwork.owner?.data ? 
        <Link className="owner" to={`/user/${artwork.owner?.data.id}`}>
                  {artwork.owner.data.attributes.username}
                </Link>
       : 
       `Anonymous`}</div>
       {(artwork.owner?.data?.attributes.username === user?.username) && (
        <Link className="button" to={`/artwork/edit/${artwork.id}`}>Edit</Link>)}
        { (artwork.owner?.data?.attributes.username !== user?.username ) && (
    <Form method="POST">
      <div>
        <input type="text" id="hidden" name="svg" value={JSON.stringify(artwork.svg)} readOnly={true} />
        <input  type="number" step="any" id="hidden" name="randomisation" value={artwork.randomisation} readOnly={true} />
         <input
        className="button"
        type="submit"
        value="Save duplicate to your collection"
      />
      </div>
    </Form>
        )}
       <p>created on {artwork.createdAt.split('T')[0]}</p>
        <Svg svg = {artwork.svg} randomisation={artwork.randomisation}/>
        </div>
    )
}

export default ArtworkDetail;

ArtworkDetail.loader = loader;
ArtworkDetail.action = action;