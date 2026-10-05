import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="content-page">
      <h1>My Profile</h1>
      <p className="muted">Your authenticated user information.</p>

      <div className="profile-card">
        {user?.image && (
          <img className="profile-image" src={user.image} alt="" />
        )}

        <h2>
          {user?.firstName} {user?.lastName}
        </h2>

        <dl className="profile-details">
          <dt>Username</dt>
          <dd>{user?.username || "—"}</dd>

          <dt>Email</dt>
          <dd>{user?.email || "—"}</dd>

          <dt>User ID</dt>
          <dd>{user?.id ?? "—"}</dd>
        </dl>
      </div>
    </section>
  );
};

export default Profile;
