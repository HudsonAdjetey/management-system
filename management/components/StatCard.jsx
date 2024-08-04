import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatCard = ({ type, icon, count, label }) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-students": type === "students",
        "bg-teachers": type === "teachers",
        "bg-classes": type === "classes",
        "bg-faculties": type === "faculties",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={`${type} card`}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;