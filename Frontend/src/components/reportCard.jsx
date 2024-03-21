import React from "react";
import clsx from "clsx";

function ReportCard({ title, subTitle, Icon, color, value }) {
  const classes = clsx(
    "flex items-center",
    color === "sky" && "text-sky-400",
    color === "violet" && "text-violet-400",
    color === "rose" && "text-rose-400",
    color === "green" && "text-green-400"
  );
  return (
    <div className="bg-white w-56 h-40 p-3 rounded-xl text-center shadow-md m-3 hover:shadow-xl hover:scale-110 transition-transform cursor-pointer">
      <div className={classes}>
        <Icon size={30} />
        {title}
      </div>
      <p className="mt-4 text-3xl text-cyan-900 font-bold">{value}</p>
      <p className="mt-1 text-cyan-900">{subTitle}</p>
    </div>
  );
}

export default ReportCard;
