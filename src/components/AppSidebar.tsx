"use client";
import { Bolt, Home, Key, Users2 } from "lucide-react";

import React, { useState } from "react";
import { AppMenuItem } from "./AppMenuItem";
import { useAppDispatch, useAppSelelector } from "@/data/redux/useRedux";
import { setCurrentPage } from "@/feature/global/AppSlice";

const AppSidebar = () => {
  const { currentPage } = useAppSelelector((state) => state.appReducer);

  const dispatch = useAppDispatch();
  return (
    <aside className="flex w-72 flex-col border-r bg-primary p-6 rounded-r-2xl">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold text-white">Sistema </h3>
          <div className="grid grid-cols-1 gap-8">
            <AppMenuItem
              href="/"
              label="Dashboard"
              icon={<Bolt />}
              active={currentPage === "dashboard" ? true : false}
              onSelect={() => dispatch(setCurrentPage("dashboard"))}
            />
            <AppMenuItem
              href="/compartimentos"
              label="Compartimentos"
              icon={<Home />}
              active={currentPage === "compartments" ? true : false}
              onSelect={() => dispatch(setCurrentPage("compartments"))}
            />
            <AppMenuItem
              href="/equipamentos"
              label="Equipamentos"
              icon={<Key />}
              active={currentPage === "equipments" ? true : false}
              onSelect={() => dispatch(setCurrentPage("equipments"))}
            />
            <AppMenuItem
              href="/utilizadores"
              label="Utilizadores"
              icon={<Users2 />}
              active={currentPage === "users" ? true : false}
              onSelect={() => dispatch(setCurrentPage("users"))}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
