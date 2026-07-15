"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { FiX, FiMaximize2 } from "react-icons/fi";

type ProjectImage = {
  url: string;
  alt?: string;
};

export default function ProjectGallery({
  images,
  title,
}: {
  images: ProjectImage[];
  title: string;
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Esc key listener and body scroll lock
  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <>
      <div
        className={clsx(
          "grid gap-4",
          images.length === 1 && "grid-cols-1",
          images.length === 2 && "grid-cols-1 md:grid-cols-2",
          images.length === 3 && "grid-cols-1 md:grid-cols-3",
          images.length >= 4 && "grid-cols-1 md:grid-cols-2"
        )}
      >
        {images.slice(0, 4).map((image, index) => (
          <div
            key={`${image.url}-${index}`}
            onClick={() => setActiveImage(image.url)}
            className={clsx(
              "group relative overflow-hidden border border-[var(--ink)] bg-[var(--ink)] cursor-zoom-in",
              images.length === 1 ? "aspect-[21/9]" : "aspect-[16/10]"
            )}
          >
            <div
              aria-label={image.alt ?? `${title} image ${index + 1}`}
              role="img"
              className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            {/* Hover overlay with maximize icon */}
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <div className="rounded-full bg-black/40 backdrop-blur-md p-3 text-white border border-white/10 transition-transform duration-300 scale-90 group-hover:scale-100">
                <FiMaximize2 className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300"
          style={{ animation: "fadeIn 0.25s ease-out" }}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-5 right-5 z-[110] rounded-full bg-white/10 backdrop-blur-md p-3 text-white border border-white/10 transition-colors hover:bg-white/20"
            aria-label="Close image popup"
          >
            <FiX className="h-5 w-5" />
          </button>

          {/* Lightbox image */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-full flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={`${title} screenshot`}
              className="max-w-[95vw] max-h-[90vh] md:max-w-[90vw] md:max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
