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
  return (
    process.env.PORTFOLIO_API_URL ??
    process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ??
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
}

const fallbackCertificates: Certificate[] = [];

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
  } catch (error: unknown) {
    const err = error as { digest?: string; message?: string };
    if (err.digest === "DYNAMIC_SERVER_USAGE" || err.message?.includes("Dynamic server usage")) {
      throw error;
    }
    console.error("Failed to fetch certificates from API, using fallback data:", error);
    return fallbackCertificates;
  } finally {
    clearTimeout(timeout);
  }
}
