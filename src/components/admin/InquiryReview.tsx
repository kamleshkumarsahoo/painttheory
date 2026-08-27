import { ArtPurchaseReview } from "@/components/admin/ArtPurchaseReview";
import { CommissionReview } from "@/components/admin/CommissionReview";

type InquiryReviewProps = {
  inquiry: any;
  artwork: any;
  requestedPrice: number;
  effectiveStatus: string;
  nextStatus?: string;
  receivedDate: string;
  customerMessage: string;
  whatsappUrl: string;
  customerAddress: string;
  hasShippingAddress: boolean;

  pendingStatus: string;
  artistNotes: string;
  savingNotes: boolean;

  onBack: () => void;
  onChangeStatus: (status: string) => Promise<void>;
  onSaveNotes: () => Promise<void>;
  onGenerateCustomerLink: () => Promise<any>;
  onSendEmail: () => Promise<void>;

  onPendingStatusChange: (value: string) => void;
  onArtistNotesChange: (value: string) => void;

  formatPrice: (price?: number | null) => string;
};

export function InquiryReview(props: InquiryReviewProps) {
  const isCommission =
    props.inquiry.inquiry_type === "COMMISSION";

  if (isCommission) {
    return <CommissionReview inquiry={props.inquiry} />;
  }

  return <ArtPurchaseReview {...props} />;
}