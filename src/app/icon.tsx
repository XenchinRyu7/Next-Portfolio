import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          background: "#101010",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fbfbfa",
          fontFamily: "serif",
          fontStyle: "italic",
          fontWeight: "bold",
          borderRadius: "20%",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
