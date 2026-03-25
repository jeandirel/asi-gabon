import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #165ca9 0%, #3a75c4 65%, #7bf7b0 100%)",
          color: "#ffffff",
          fontFamily: "Manrope",
        }}
      >
        <span style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3 }}>
          ASI
        </span>
      </div>
    ),
    size,
  );
}
