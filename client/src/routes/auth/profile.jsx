import { Link, redirect, useFetcher, useLoaderData } from "react-router-dom";
import { getAuthData, getMe } from "../../services/auth";

const loader = async ({ request }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }

  const profile = await getMe();
  return { profile };
};

const Profile = () => {
  const { profile } = useLoaderData();
  const fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;

  return (
    <>
      <h2>About Me</h2>
      <dl>
        <dt>name</dt>
        <dd>{profile.username}</dd>
        <dt>email</dt>
        <dd>{profile.email}</dd>
        <dt>Authentication</dt>
        <dd>
          <fetcher.Form method="post" action="/auth/logout">
            <button type="submit" disabled={isLoggingOut}>
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </fetcher.Form>
        </dd>
      </dl>
      <section>
        <h3>My artworks:</h3>
        <ul>
          {profile.artworks.map((artwork) => (
            <li key={artwork.id}>
              <Link to={`/artwork/${artwork.id}`}>{artwork.randomisation}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Profile.loader = loader;

export default Profile;
