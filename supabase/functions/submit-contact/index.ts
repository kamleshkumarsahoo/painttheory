import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const phone =
      String(body.phone ?? "").trim() || null;
    const message = String(body.message ?? "").trim();

    if (!name) {
      throw new Error("Name is required.");
    }

    if (!email) {
      throw new Error("Email is required.");
    }

    if (!message) {
      throw new Error("Message is required.");
    }

    if (name.length > 120) {
      throw new Error("Name is too long.");
    }

    if (email.length > 254) {
      throw new Error("Email is too long.");
    }

    if (phone && phone.length > 30) {
      throw new Error("Phone number is too long.");
    }

    if (message.length > 5000) {
      throw new Error("Message is too long.");
    }

    /*
     * Save the contact message.
     *
     * The database is the source of truth.
     * Admin notification is handled separately
     * by the contact_messages INSERT webhook.
     */
    const {
      data: contactMessage,
      error,
    } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone,
        message,
        status: "NEW",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        messageId: contactMessage.id,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(
      "SUBMIT CONTACT ERROR:",
      error,
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit your message.",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});