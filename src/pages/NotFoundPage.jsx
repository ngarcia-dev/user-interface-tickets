import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen" style={{ height: "calc(100vh - 100px)" }}>
      <div className="h-full flex items-center justify-center">
        <p className="text-3xl text-zinc-300 font-mono">404 - Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
