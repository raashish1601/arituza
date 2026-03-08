export default function manifest() {
  return {
    name: "Arituza",
    short_name: "Arituza",
    description: "AI-ready IT services for Alabama businesses.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f4f1",
    theme_color: "#3ea28f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
