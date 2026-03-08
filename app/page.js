import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function getPageMarkup() {
  const filePath = path.join(process.cwd(), "index.html");
  const html = fs.readFileSync(filePath, "utf8");
  const match = html.match(/<body>([\s\S]*?)<script src="script\.js"><\/script>\s*<\/body>/i);

  if (!match) {
    throw new Error("Could not extract body markup from index.html");
  }

  return match[1].trim();
}

export default function Page() {
  const pageMarkup = getPageMarkup();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
