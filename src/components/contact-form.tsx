"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqvlvnq";
const CONTACT_EMAIL = "busanteam_business@naver.com";

type TopicKey =
  | "starter"
  | "standard"
  | "complex"
  | "hire"
  | "collab"
  | "other";

export function ContactForm() {
  const { t } = useI18n();
  const c = t.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<TopicKey | "">("");
  const [topicOther, setTopicOther] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const topicOptions = useMemo(
    () =>
      [
        { key: "starter" as const, label: c.topics.starter },
        { key: "standard" as const, label: c.topics.standard },
        { key: "complex" as const, label: c.topics.complex },
        { key: "hire" as const, label: c.topics.hire },
        { key: "collab" as const, label: c.topics.collab },
        { key: "other" as const, label: c.topics.other },
      ] as const,
    [c.topics],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const submittedName = String(formData.get("name") ?? "").trim();
    const submittedEmail = String(formData.get("email") ?? "").trim();
    const submittedTopic = String(formData.get("topic") ?? "") as TopicKey | "";
    const submittedOther = String(formData.get("topicOther") ?? "").trim();
    const submittedDetails = String(formData.get("message") ?? "").trim();

    // Read the submitted form directly so a just-finished select/input change
    // cannot require a second click while React state catches up.
    if (!submittedTopic || !submittedDetails) return;
    if (submittedTopic === "other" && !submittedOther) return;

    const submittedTopicLabel =
      submittedTopic === "other"
        ? submittedOther
        : topicOptions.find((option) => option.key === submittedTopic)?.label ??
          submittedTopic;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: submittedName,
          email: submittedEmail,
          topic: submittedTopicLabel,
          message: submittedDetails,
          _replyto: submittedEmail,
          _subject: `[SpareHand] ${submittedTopicLabel}`,
          source: "sparehand.vercel.app",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("ok");
      setName("");
      setEmail("");
      setTopic("");
      setTopicOther("");
      setDetails("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl border-t border-[var(--line)] px-6 py-16 pb-24"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl"
      >
        {c.title}
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">{c.desc}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {c.directMail}{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 max-w-xl space-y-4"
        aria-label={c.title}
      >
        <label className="block text-sm text-[var(--muted)]">
          {c.name}
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={c.namePlaceholder}
            className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          />
        </label>

        <label className="block text-sm text-[var(--muted)]">
          {c.email}
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={c.emailPlaceholder}
            className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          />
        </label>

        <label className="block text-sm text-[var(--muted)]">
          {c.topicLabel}
          <select
            name="topic"
            className="sh-select mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] py-3 pl-4 text-[var(--ink)]"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value as TopicKey | "")}
          >
            <option value="">{c.topicPlaceholder}</option>
            {topicOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        {topic === "other" ? (
          <label className="block text-sm text-[var(--muted)]">
            {c.topicOtherLabel}
            <input
              type="text"
              name="topicOther"
              required
              value={topicOther}
              onChange={(e) => setTopicOther(e.target.value)}
              placeholder={c.topicOtherPlaceholder}
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            />
          </label>
        ) : null}

        <label className="block text-sm text-[var(--muted)]">
          {c.detailsLabel}
          <textarea
            name="message"
            required
            rows={5}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={c.detailsPlaceholder}
            className="mt-1.5 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-contrast)] disabled:opacity-60"
        >
          {status === "sending" ? c.sending : c.send}
        </button>

        {status === "ok" ? (
          <p className="text-sm text-[var(--accent)]">{c.success}</p>
        ) : null}
        {status === "err" ? (
          <p className="text-sm text-[var(--warn)]">
            {c.error}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        ) : null}
      </form>
    </section>
  );
}
