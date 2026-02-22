import { getUser } from "../utils/auth";

export default function Profile() {
  const user = getUser();

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>

      <p className="text-sm text-slate-500 mt-4">
        (Editing backend can be added later)
      </p>
    </div>
  );
}
