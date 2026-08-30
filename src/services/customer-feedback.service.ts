import { supabase } from "@/lib/supabase";

export interface CustomerFeedback {
  id: string;
  name: string;
  message: string;
  rating: number;
  allow_publish: boolean;
  created_at: string;
}


/* ============================================================
   CUSTOMER — SUBMIT
============================================================ */

export async function submitCustomerFeedback(input: {
  name: string;
  message: string;
  rating: number;
  allowPublish: boolean;
}) {
  const { error } = await supabase
    .from("customer_feedback")
    .insert({
      name: input.name.trim(),
      message: input.message.trim(),
      rating: input.rating,
      allow_publish: input.allowPublish,
    });

  if (error) {
    throw error;
  }
}


/* ============================================================
   ADMIN — GET
============================================================ */

export async function getCustomerFeedback(): Promise<
  CustomerFeedback[]
> {
  const { data, error } = await supabase
    .from("customer_feedback")
    .select(
      "id, name, message, rating, allow_publish, created_at",
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as CustomerFeedback[];
}


/* ============================================================
   ADMIN — DELETE
============================================================ */

export async function deleteCustomerFeedback(
  id: string,
) {
  const { error } = await supabase
    .from("customer_feedback")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}