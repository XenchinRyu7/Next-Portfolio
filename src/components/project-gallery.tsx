"use client";

import Image from "next/image";
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
  maxImages,
}: {
  images: ProjectImage[];
  title: string;
  maxImages?: number;
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const displayImages = maxImages ? images.slice(0, maxImages) : images;

  // Esc key listener and body scroll lock
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayImages.map((image, index) => {
          return (
            <div
              key={`${image.url}-${index}`}
              onClick={() => setActiveImage(image.url)}
              className="group relative overflow-hidden border border-[var(--ink)] bg-[var(--ink)] cursor-zoom-in aspect-[16/10] w-full"
            >
              <Image
                src={image.url}
                alt={image.alt ?? `${title} showcase screenshot ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              />
              {/* Hover overlay with maximize icon */}
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <div className="rounded-full bg-black/40 backdrop-blur-md p-3 text-white border border-white/10 transition-transform duration-300 scale-90 group-hover:scale-100">
                  <FiMaximize2 className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
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
