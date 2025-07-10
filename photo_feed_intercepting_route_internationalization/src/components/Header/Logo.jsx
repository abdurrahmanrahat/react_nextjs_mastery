import SiteLogo from "@/asserts/lws_logo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="max-w-[100px] md:max-w-[165px]"
        src={SiteLogo}
        width={165}
        height={100}
        alt="Lws"
      />
    </Link>
  );
};

export default Logo;
