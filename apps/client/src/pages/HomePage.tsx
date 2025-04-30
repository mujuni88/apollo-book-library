import React from 'react';
import { Books } from "../components/Books";
import { Categories } from "../components/Categories";
import { Logo } from "../components/Logo";
import { SeedData } from "../components/SeedData";

export const HomePage: React.FC = () => {
  return (
    <div className="container pb-20">
      <div className="grid grid-cols-[1fr_auto] py-5">
        <Logo />
        <SeedData />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-5 mt-10">
        <Books />
        <Categories />
      </div>
    </div>
  );
};
