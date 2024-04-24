import { getUserById } from "../services/user";
import { Link, useLoaderData } from "react-router-dom";

const loader = async ({ params }) => {
  const user = await getUserById(params.id);
//   console.log("user", user)
  return { user };
};

const User = () => {
  const { user } = useLoaderData();
  return (
    <>
      <h2>{user.username}</h2>
      <p>Creating mountains since {user.createdAt}</p>

      <section>
        <h3>Mountains</h3>
        <ul>
          {user.artwork.map((artwork) => (
            <li key={artwork.id}>
              <Link to={`/artwork/${artwork.id}`}>{artwork.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

User.loader = loader;

export default User;
