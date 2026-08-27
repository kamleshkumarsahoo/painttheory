import { getEffectiveInquiryStatus } from "@/lib/inquiry-status";
import { inquiryPrice } from "@/lib/inquiry";

export function getDashboardInquiries(inquiries: any[]) {
  const sorted = [...inquiries].sort(
    (a, b) =>
      +new Date(b.created_at) - +new Date(a.created_at)
  );

  const newRequests = sorted.filter(
    (i) => getEffectiveInquiryStatus(i) === "NEW"
  );

  const inProgress = sorted.filter((i) => {
    const status = getEffectiveInquiryStatus(i);

    return (
      status !== "NEW" &&
      status !== "DELIVERED" &&
      status !== "DISCARDED"
    );
  });

  const completed = sorted.filter(
    (i) => getEffectiveInquiryStatus(i) === "DELIVERED"
  );

  const discarded = sorted.filter(
    (i) => getEffectiveInquiryStatus(i) === "DISCARDED"
  );

  const pipelineValue = [...newRequests, ...inProgress].reduce(
    (sum, i) => sum + inquiryPrice(i),
    0
  );

  return {
    newRequests,
    inProgress,
    completed,
    discarded,
    pipelineValue,
  };
}