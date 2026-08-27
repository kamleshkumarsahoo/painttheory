export function inquiryPrice(inquiry: any) {
  return inquiry.artwork_price_snapshot ?? inquiry.artworks?.price ?? 0;
}