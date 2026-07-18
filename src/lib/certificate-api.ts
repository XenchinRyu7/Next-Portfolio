export type CertificateFile = {
  url: string;
  path: string;
  filename: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  credentialId?: string;
  credentialUrl?: string;
  issueDate: string;
  expiryDate?: string;
  file: CertificateFile;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

const DEFAULT_API_BASE_URL = "https://api.saefulrohman.dev";

function getApiBaseUrl() {
  const isDev = process.env.NODE_ENV === "development";
  const defaultUrl = isDev ? "http://localhost:3001" : DEFAULT_API_BASE_URL;
  return (
    process.env.PORTFOLIO_API_URL ??
    process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ??
    defaultUrl
  ).replace(/\/$/, "");
}

// Fallback mockup certificates
const fallbackCertificates: Certificate[] = [
  {
    id: "fb-cert-1",
    title: "Dev Certification for Android (DCA)",
    issuer: "devcert.id",
    credentialId: "8Y09Z1G024",
    credentialUrl: "https://devcert.id/certificate/verify/8Y09Z1G024",
    issueDate: "2025-04-11",
    expiryDate: "2028-04-11",
    file: {
      url: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1470&auto=format&fit=crop",
      path: "certificates/android.pdf",
      filename: "android.pdf"
    },
    createdAt: "2026-07-18T22:31:33.151Z",
    updatedAt: "2026-07-18T22:31:33.151Z"
  },
  {
    id: "fb-cert-2",
    title: "Architecting on AWS (Membangun Arsitektur Cloud di AWS)",
    issuer: "Dicoding Indonesia",
    credentialId: "QLZ9QM0R9Z5D",
    credentialUrl: "https://www.dicoding.com/certificates/QLZ9QM0R9Z5D",
    issueDate: "2023-08-19",
    expiryDate: "2026-08-19",
    file: {
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
      path: "certificates/aws.pdf",
      filename: "aws.pdf"
    },
    createdAt: "2026-07-18T22:34:00.330Z",
    updatedAt: "2026-07-18T22:34:00.330Z"
  },
  {
    id: "fb-cert-3",
    title: "Google Cloud Certified Associate Cloud Engineer",
    issuer: "Google Cloud",
    credentialId: "GCP-ACE-982736",
    credentialUrl: "https://www.credential.net/verify/google-cloud-ace",
    issueDate: "2024-11-05",
    expiryDate: "2027-11-05",
    file: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1470&auto=format&fit=crop",
      path: "certificates/gcp.pdf",
      filename: "gcp.pdf"
    },
    createdAt: "2026-07-18T22:35:00.000Z",
    updatedAt: "2026-07-18T22:35:00.000Z"
  }
];

export async function getCertificates(): Promise<Certificate[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/certificates`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn("Backend API certificates response not OK, using mock fallback.");
      return fallbackCertificates;
    }

    const json = (await response.json()) as ApiResponse<Certificate[]>;

    if (json.status !== "success" || !Array.isArray(json.data) || json.data.length === 0) {
      return fallbackCertificates;
    }

    return json.data;
  } catch (error) {
    console.error("Failed to fetch certificates from API, using fallback data:", error);
    return fallbackCertificates;
  } finally {
    clearTimeout(timeout);
  }
}
