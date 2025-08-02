import { auth } from "@/../auth";
import Image from "next/image";
import Signin from "./Signin";
import Signout from "./Signout";

const Header = async () => {
  const session = await auth();
  console.log("session", session);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between">
        <h2>Logo</h2>

        {session?.user ? (
          <div className="flex gap-2">
            <p>{session.user.name}</p> |
            <Image
              src={session.user.image}
              alt={session.user.name || "user"}
              width={32}
              height={32}
              className="rounded-full"
            />
            <Signout />
          </div>
        ) : (
          <Signin />
        )}
      </div>
    </div>
  );
};

export default Header;
