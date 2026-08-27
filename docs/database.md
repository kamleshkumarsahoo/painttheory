# Database Design

## Version

v1.0

---

# Tables

1. Customers
2. Artworks
3. Inquiries
4. Payments
5. Addresses
6. Testimonials
7. Activity Logs

---

# Relationships

Customers
    │
    ├──────────────┐
    │              │
    ▼              ▼
Inquiries      Testimonials
    │
    ├──────────────┐
    │              │
    ▼              ▼
Payments     Addresses
    │
    ▼
Activity Logs

Artworks
    │
    ├──────────────┐
    │              │
    ▼              ▼
Inquiries      Testimonials