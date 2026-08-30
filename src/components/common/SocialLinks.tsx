import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { socials } from "@/lib/socials";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        href={socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <Instagram className="size-5" />
      </a>

      <a
        href={socials.youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
      >
        <Youtube className="size-5" />
      </a>

      <a
        href={socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <MessageCircle className="size-5" />
      </a>
    </div>
  );
}