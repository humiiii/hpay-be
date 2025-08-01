import React from "react";

const Home = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50">
      <div className="text-center mt-20 max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
          Welcome to MyApp 🚀
        </h1>
        <p className="text-lg text-gray-600">
          Simplify get started with our user-friendly platform.
        </p>
      </div>
    </main>
  );
};

export default Home;
