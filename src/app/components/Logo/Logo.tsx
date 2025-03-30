import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <img src="/logo.svg" alt="logo" />
    </Link>
  );
};

export default Logo;
