import React, { use } from "react";

const CarDetails = ({ params }: any) => {
  const { id } = params;

  return (
    <div>
      <h1>Car Details</h1>
      <p>{id}</p>
    </div>
  );
};

export default CarDetails;
