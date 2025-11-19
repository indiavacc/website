import { BASE_URL } from "@/lib/api";

interface FormData {
  cid: string;
  email: string;
  discord: string;
  hours: number;
  reason: string;
  familiarity: string;
  aviationBg: boolean;
  bgDetails: string;
  monthlyTime: string;
}

export const submitApplication = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: formData }),
  });
  return await res.json();
};
