import React from "react";

type Props = {
  title: string;
};

const ResponsibleEmployeer = ({ title }: Props) => {
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ResponsibleEmployeer;
