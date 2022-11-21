import React from "react";
import { signIn as SignIntoProvider, getProviders } from "next-auth/react";
import Header from "../../components/Header";

//This is running on the BROWSER

const signIn = ({ providers }) => {
  return (
    <div className="min-h-screen h-auto bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 overflow-y-scroll scrollbar-hide text-white">
      <Header />
      <div className="mt-40 max-w-6xl flex flex-col items-center justify-center mx-auto text-white">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="bg-rose-500 p-4 rounded-lg">
            <button onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default signIn;

//This is running on the SERVER

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      // Will be passed to the page component as props
      providers,
    },
  };
}
