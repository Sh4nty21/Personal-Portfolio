import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Link-preview card (LinkedIn, Messenger, Slack…) in the dark Obsidian style. */

export const alt =
  "Sean Marcus V. Tomas — Computer Engineer, full-stack & mobile developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(
    join(process.cwd(), "public/images/profile/sean-formal.jpg"),
    "base64",
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 64,
        padding: "0 88px",
        background:
          "radial-gradient(circle at 15% 20%, #2a1a52 0%, #0a0a0f 55%)",
        color: "#f8fafc",
        fontFamily: "sans-serif",
      }}
    >
      {/* ImageResponse renders plain <img> only; next/image doesn't apply here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={`data:image/jpeg;base64,${photo}`}
        width={300}
        height={300}
        style={{
          borderRadius: 9999,
          objectFit: "cover",
          objectPosition: "top",
          border: "6px solid #7c3aed",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
        <div style={{ fontSize: 26, color: "#fb7185", letterSpacing: 2 }}>
          {"// COMPUTER ENGINEER"}
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 16,
          }}
        >
          Sean Marcus V. Tomas
        </div>
        <div style={{ fontSize: 34, color: "#a78bfa", marginTop: 20 }}>
          Full-Stack &amp; Mobile Developer
        </div>
        <div style={{ fontSize: 26, color: "#94a3b8", marginTop: 28 }}>
          Next.js · TypeScript · Flutter · FastAPI · PostgreSQL
        </div>
      </div>
    </div>,
    size,
  );
}
