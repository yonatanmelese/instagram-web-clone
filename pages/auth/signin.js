import React from "react";
import { getProviders, signIn } from "next-auth/react";

const SignIn = ({ providers }) => {
  return (
    <>
      <div className="grid place-items-center min-h-screen">
        <img
          className="h-32 object-contain"
          src="https://links.papareact.com/ocw"
          alt=""
        />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-blue-500 text-white px-5 py-3 rounded-lg"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SignIn;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
