import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAllArtworks } from "@/services/artwork.service";

export const Route = createFileRoute("/testxxx")({
  component: TestPage,
});

function TestPage() {
  const [artworks, setArtworks] = useState<any[]>([]);

  useEffect(() => {
    getAllArtworks().then(setArtworks);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Database Test</h1>

      {artworks.map((art) => (
        <div key={art.id} style={{ marginBottom: 20 }}>
          <h2>{art.title}</h2>
          <p>₹{art.price}</p>
          <p>{art.availability_status}</p>
        </div>
      ))}
    </div>
  );
}