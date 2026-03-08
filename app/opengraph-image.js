import { ImageResponse } from "next/og";

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(140deg, #f8f4f1 0%, #efe6dc 55%, #e6d8f4 100%)",
          color: "#130a1f",
          fontFamily: "Inter, Segoe UI, sans-serif"
        }}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#3ea28f"
          }}>
          Arituza
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.02,
              fontWeight: 800,
              maxWidth: 980
            }}>
            AI-ready technology systems for Alabama businesses.
          </div>
          <div
            style={{
              fontSize: 30,
              opacity: 0.8
            }}>
            Managed IT, cybersecurity, cloud, software, and automation.
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
