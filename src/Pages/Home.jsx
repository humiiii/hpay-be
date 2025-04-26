import React from "react";

function Home() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
          Welcome to MyApp 🚀
        </h2>
        <p className="text-gray-600 max-w-xl">
          Simplify get started with our user-friendly platform.
        </p>
      </div>
    </div>
  );
}

export default Home;
