import type {
  DocumentResult,
  InboxResult,
  MeetingResult,
  QuoteResult,
  RateItem,
} from "./schemas";

/** Deterministic offline drafts so the UI is demoable without an API key. */

export function mockInbox(text: string): InboxResult {
  const lower = text.toLowerCase();
  const urgent =
    lower.includes("urgent") ||
    lower.includes("asap") ||
    lower.includes("leak") ||
    lower.includes("긴급");
  return {
    urgency: urgent ? "high" : "medium",
    category: lower.includes("quote") || lower.includes("견적") ? "quote_request" : "general_enquiry",
    summary: text.slice(0, 180).trim() || "Customer enquiry",
    draftReply:
      "Thanks for getting in touch. We’ve reviewed your message and will confirm the next step shortly. If this is urgent, reply with a phone number and the best time to call.",
    actions: [
      "Confirm suburb and site access",
      "Check diary for the next available slot",
      "Send a draft quote if scope is clear",
    ],
    customerName: undefined,
  };
}

export function mockMeeting(text: string): MeetingResult {
  return {
    title: "Team catch-up",
    summary: text.slice(0, 240).trim() || "Meeting notes captured.",
    decisions: ["Proceed with the agreed next steps"],
    actionItems: [
      { task: "Circulate notes to attendees", owner: "Ops", due: "This week" },
      { task: "Follow up on open customer items", owner: "Owner" },
    ],
  };
}

export function mockDocument(): DocumentResult {
  return {
    documentType: "receipt",
    vendor: "Sample Hardware",
    date: new Date().toISOString().slice(0, 10),
    abn: "12 345 678 901",
    currency: "AUD",
    subtotalExGst: 100,
    gst: 10,
    totalIncGst: 110,
    lineItems: [
      {
        description: "Materials",
        quantity: 1,
        unitPriceExGst: 100,
        amountExGst: 100,
      },
    ],
    notes: "Offline mock extraction — connect OPENAI_API_KEY for real OCR.",
  };
}

export function mockQuote(job: string, rates: RateItem[]): QuoteResult {
  const labour = rates.find((r) => r.code.toLowerCase().includes("labour")) ?? rates[0];
  const material = rates.find((r) => r.code.toLowerCase().includes("mat")) ?? rates[1];
  const lineItems = [];
  if (labour) {
    lineItems.push({
      code: labour.code,
      description: labour.label,
      quantity: 2,
      unit: labour.unit,
      unitPriceExGst: labour.unitPriceExGst,
    });
  }
  if (material) {
    lineItems.push({
      code: material.code,
      description: material.label,
      quantity: 1,
      unit: material.unit,
      unitPriceExGst: material.unitPriceExGst,
    });
  }
  if (lineItems.length === 0) {
    lineItems.push({
      description: "Labour — call-out and first hour",
      quantity: 1,
      unit: "job",
      unitPriceExGst: 180,
    });
  }
  return {
    jobTitle: job.slice(0, 80) || "Service job",
    assumptions: [
      "Access during business hours",
      "Existing fittings are compatible unless noted",
    ],
    lineItems,
    notesForClient:
      "This is a draft estimate only. Final price may change after site inspection.",
  };
}
