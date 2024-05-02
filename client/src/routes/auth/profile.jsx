import { Link, redirect, useLoaderData } from "react-router-dom";
import { getAuthData, getMe } from "../../services/auth";
import { deleteArtwork } from "../../services/artwork";

const loader = async ({ request }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  const profile = await getMe();
  
    console.log("profile", profile);
  return { profile };

};

const Profile = () => {
  const { profile } = useLoaderData();

  const handleDelete = async (id) => {
    await deleteArtwork(id);
    window.location.reload();
    
  }

  return (
    <>
      <h2>Welcome back, {profile.username}!</h2>
      <dl>
        <dt>Your email:</dt>
        <dd>{profile.email}</dd>
      </dl>
        <p>Creating mountains since {profile.createdAt.slice(0, 10)}</p>
      <section >
        <h3>Your artworks:</h3>
        <ul className="list-artworks">
          {profile.artworks.map((artwork) => (
            <li className="list-artwork-item" key={artwork.id}>
              <Link to={`/artwork/${artwork.id}`}>Mountains no. {artwork.id} with randomisation {artwork.randomisation}</Link>
              <button className={'delete'} onClick={() => handleDelete(artwork.id)}>X DELETE</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Profile.loader = loader;

export default Profile;
