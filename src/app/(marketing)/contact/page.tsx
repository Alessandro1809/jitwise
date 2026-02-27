import { submitContact } from "./actions";

interface ContactPageProps {
  searchParams?: { sent?: string };
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const sent = searchParams?.sent === "1";

  return (
    <main className="container mx-auto max-w-3xl px-4 pt-28 pb-20">
      <h1 className="text-5xl font-black text-center">Contact</h1>
      <p className="mt-6 text-center text-lg text-white/80">
        Send a message and we will get back to you shortly.
      </p>

      {sent && (
        <p className="mt-6 rounded-2xl border border-jityellow/40 bg-jitblue/70 px-4 py-3 text-center text-sm text-jityellow">
          Thanks. Your message has been sent.
        </p>
      )}

      <form
        action={submitContact}
        className="mt-10 flex flex-col gap-5 rounded-3xl border border-jitcyan/30 bg-jitblue/60 p-6 backdrop-blur"
      >
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            className="h-11 rounded-xl border border-white/10 bg-jitbluedark/70 px-4 text-sm text-white outline-none transition focus:border-jitcyan/70"
            placeholder="Your name"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 rounded-xl border border-white/10 bg-jitbluedark/70 px-4 text-sm text-white outline-none transition focus:border-jitcyan/70"
            placeholder="you@company.com"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold">
          Message
          <textarea
            name="message"
            required
            rows={5}
            className="rounded-xl border border-white/10 bg-jitbluedark/70 px-4 py-3 text-sm text-white outline-none transition focus:border-jitcyan/70"
            placeholder="Tell us what you need."
          />
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full border border-jitcyan/50 bg-jitblue/70 text-sm font-semibold text-white/95 backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-jitcyan hover:bg-jitblue/90 hover:shadow-[0_0_20px_rgba(0,172,255,0.35)] active:translate-y-0 active:shadow-[0_0_12px_rgba(0,172,255,0.25)]"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
