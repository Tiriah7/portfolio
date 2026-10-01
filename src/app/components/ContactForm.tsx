import { submitContact } from "@/app/actions/contact";

export default function ContactForm() {
  return (
    <form action={submitContact} className="space-y-4">
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send</button>
    </form>
  );
}
