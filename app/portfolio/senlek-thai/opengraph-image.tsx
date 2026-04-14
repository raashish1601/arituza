import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top, rgba(240,199,94,0.28), transparent 35%), linear-gradient(135deg, #1a237e 0%, #283593 100%)",
          color: "white",
          padding: "56px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#f0c75e",
            fontSize: 28,
            letterSpacing: "0.32em",
            textTransform: "uppercase"
          }}
        >
          <span>Authentic Thai Street Food</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02 }}>Senlek Thai Rice & Noodles</div>
          <div style={{ maxWidth: 930, fontSize: 34, color: "#f5f0ea", lineHeight: 1.35 }}>
            Bold noodle soups, rice bowls, curries, and house-made Thai flavors in Hoover, Alabama.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#f0c75e" }}>
          <span>1843 Montgomery Hwy, Suite 107, Hoover, AL</span>
          <span>Order Online</span>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
