import { useEffect } from "react";

interface DocumentMetadataProps {
  description: string;
  title: string;
}

function updateMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

export function DocumentMetadata({ description, title }: DocumentMetadataProps) {
  useEffect(() => {
    document.title = title;
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', window.location.href);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
  }, [description, title]);

  return null;
}
