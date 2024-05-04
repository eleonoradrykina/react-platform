import Svg from '../components/svg/Svg'
import { getArtworkById } from "../services/artwork";
import { Form, useLoaderData, Link, redirect} from "react-router-dom";
import { getAuthData } from "../services/auth";
import { createArtwork} from "../services/artwork";
// import { updateArtwork} from "../services/artwork";

const loader = async ( {params}) => {
    const artwork = await getArtworkById(params.id);
    console.log("artwork", artwork);

    const { user } = getAuthData();
    return { artwork, user };
 }

const action = async ({ request, params }) => {
  const formData = await request.formData();
  const formId = formData.get('formId');
  console.log("formId", formId);
  const randomisation = formData.get('randomisation');
  const data = Object.fromEntries(formData);
  data.svg = JSON.parse(data.svg);
  data.randomisation = randomisation;
  
  if (formId === 'formDuplicate') {
    console.log("formdata3", data);
    await createArtwork(data);
    return redirect(`/auth/profile`);
  } 
  else if (formId === 'formLike') 
   {
    //I really tried but it does not work
    // console.log('formLike')
    // const likes = formData.get('favs');
    // data.fav = likes + 1;

    // console.log("formdata3", data);

    // await updateArtwork(params.id, data);
    return redirect(`/artwork/${params.id}`);
   }
     return redirect(`/artwork/${params.id}`);
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
       <div className='like-wrapper'>
            <Form method="POST" id="formLike">
        <input type="hidden" name="formId" value="formLike" />
        <input type="text" id="hidden" name="svg" value={JSON.stringify(artwork.svg)} readOnly={true} />
        <input  type="number" step="any" id="hidden" name="randomisation" value={artwork.randomisation} readOnly={true} />
        <input  type="number" step="any" id="hidden" name="favs" value={artwork.favs} readOnly={true} />
         <input
        className="button"
        type="submit"
        value="FAV"
      />
    </Form>
      <span>{artwork.fav || 0} {(artwork.fav === 1) ? 'like' : 'likes'}</span>
      </div>
       {(artwork.owner?.data?.attributes.username === user?.username) && (
        <Link className="button" to={`/artwork/edit/${artwork.id}`}>Edit</Link>)}
        { (artwork.owner?.data?.attributes.username !== user?.username ) && (
   <Form method="POST" id="formDuplicate">
      <div>
        <input type="hidden" name="formId" value="formDuplicate" />
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