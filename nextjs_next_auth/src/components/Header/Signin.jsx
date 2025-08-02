import { doSignIn } from "@/services/actions";

const Signin = () => {
  return (
    <form action={doSignIn}>
      <button type="submit">Signin with Google</button>
    </form>
  );
};

export default Signin;
