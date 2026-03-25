import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
            "linear-gradient(135deg, #165ca9 0%, #3a75c4 60%, #7bf7b0 100%)",
          color: "#ffffff",
          fontFamily: "Manrope",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 320,
            width: 320,
            borderRadius: 96,
            background: "rgba(255,255,255,0.15)",
            alignItems: "center",
            justifyContent: "center",
            border: "10px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1,
            }}
          >
            <span style={{ fontSize: 140, fontWeight: 800, letterSpacing: -8 }}>
              ASI
            </span>
            <span
              style={{
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: 10,
                marginTop: 18,
              }}
            >
              GABON
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
