/** Builds per-route head() metadata with consistent title suffix and social tags. */
export function pageHead(title: string, description: string) {
  const full = `${title} · Ekosistem Sepak Bola Usia Dini`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
