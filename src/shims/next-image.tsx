import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className, fill, priority, ...props }) => {
  const style: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: "cover",
      }
    : {};

  return (
    <img
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      {...props}
      className={className}
      style={{ ...style, ...props.style }}
    />
  );
};

export default Image;
