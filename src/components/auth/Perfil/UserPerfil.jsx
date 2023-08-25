import React from "react";

// components

import PerfilSettings from "./PerfilSettings";
import PerfilUser from "./PerfilUser";

export default function UserPerfil() {
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full lg:w-8/12 px-4">
          <PerfilSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4 ">
          <PerfilUser />
        </div>
      </div>
      
    </>
  );
}
