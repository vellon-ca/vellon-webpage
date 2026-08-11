import { redirect } from "next/navigation";
import { dispatchAppUrl } from "@/lib/site";

/* The reserved front door for a Vellon account.

   Vellon runs several products; a Vellon-level sign-in is meant to be one staff
   identity (customer staff and Vellon staff — never passengers or drivers, who
   belong to a customer's service, not to us), with an org above the product and
   entitlements deciding which products you land in. That doesn't exist yet:
   Dispatch authenticates phone+OTP against its own Supabase project, and Vellon
   Ops has a separate one. Consolidating those is the open decision.

   So this stays a route rather than a hard link to the dispatch app: today it's
   a redirect because there's one product to send people to, later it becomes
   the authenticate-then-launch page — and the affordances pointing here (navbar,
   mobile menu, footer) never have to change either way.

   There is deliberately no form here. A form would promise a Vellon credential
   that can't authenticate anyone, and the real one gets built against whatever
   identity provider wins the fork above — not hand-rolled ahead of it. */
export default function SignInPage() {
  redirect(dispatchAppUrl);
}
