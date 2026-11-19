"use client";

import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { site } from "@/lib/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    "w-full rounded-xl border border-navy/15 bg-white/60 px-4 py-3.5 text-navy placeholder:text-navy/40 transition-colors focus:border-amber focus:outline-2 focus:outline-amber";

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-deep">
            Say hello
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-tight md:text-6xl">
            Let&rsquo;s make something{" "}
            <em className="italic text-amber-deep">enchanted</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-navy/70">
            Questions about an order, a custom scent, wedding favours or
            wholesale? Write to us — a human (usually Margheritta herself)
            always replies.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-navy/10 bg-sand/60 px-5 py-4 transition-colors hover:border-amber"
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-amber-deep" aria-hidden />
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-sm text-navy/60">
                  Fastest reply — usually within the hour
                </p>
              </div>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 rounded-2xl border border-navy/10 bg-sand/60 px-5 py-4 transition-colors hover:border-amber"
            >
              <Mail className="h-5 w-5 shrink-0 text-amber-deep" aria-hidden />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-navy/60">{site.email}</p>
              </div>
            </a>
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-navy/10 bg-sand/60 px-5 py-4 transition-colors hover:border-amber"
              >
                <InstagramIcon className="h-5 w-5 shrink-0 text-amber-deep" />
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-sm text-navy/60">
                    Behind the scenes, new scents &amp; restock news
                  </p>
                </div>
              </a>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-navy/10 bg-sand/40 p-6 md:p-10"
        >
          <h2 className="font-display text-3xl font-semibold">Send a message</h2>
          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Your email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you're dreaming of…"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              <Send className="h-4 w-4" aria-hidden />
              Send message
            </button>
            <p className="text-center text-xs text-navy/50">
              This opens your email app with the message ready to send.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}