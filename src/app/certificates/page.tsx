import React from "react";
import type { Metadata } from "next";
import { getCertificates } from "@/lib/certificate-api";
import CertificatesList from "@/components/certificates-list";

export const metadata: Metadata = {
  title: "Credentials & Certificates — Saeful Rohman",
  description: "Official verified cloud, mobile, and software engineering certificates from AWS, Dicoding, devcert.id, and Google.",
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  // Sort certificates descending by issueDate (newest first)
  const sortedCertificates = [...certificates].sort((a, b) =>
    b.issueDate.localeCompare(a.issueDate)
  );

  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="label text-[var(--mute)]">§ Credentials Desk</p>
          <h1 className="display-1 mt-6 text-[clamp(3rem,11vw,9rem)]">
            Verified
            <br />
            <span className="not-italic">credentials.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-[var(--ink)]/75 md:text-xl">
            A verified catalog of official software engineering certifications, cloud architecture validation, and academic credentials.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:px-10 pb-24 md:pb-32">
        <div className="border-t border-[var(--rule)] pt-12">
          <CertificatesList initialItems={sortedCertificates} />
        </div>
      </section>
    </>
  );
}
