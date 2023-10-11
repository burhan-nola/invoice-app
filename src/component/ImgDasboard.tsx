import React from "react";

interface Props {
  src: string;
}

const ImgDasboard: React.FC<Props> = ({ src }) => {
  return <img src={src} alt="" />;
};

export default ImgDasboard;
