import { doSignOut } from "@/services/actions";

const Signout = () => {
  return (
    <form action={doSignOut}>
      <button type="submit">Signout</button>
    </form>
  );
};

export default Signout;
