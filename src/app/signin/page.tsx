import { redirect } from "next/navigation";
import { dispatchAppUrl } from "@/lib/site";

/* There is no Vellon-wide account yet — the only thing anyone can sign in to
   is the dispatch board, which runs as its own app off this site. So /signin
   is a door, not a form: every sign-in affordance on the site (navbar, mobile
   menu, the two on /dispatch) lands on the same place.

   `SignInForm` is left in the repo, unrouted. If Vellon ever has accounts of
   its own, this file goes back to rendering it and the product-specific doors
   keep pointing at their own apps. */
export default function SignInPage() {
  redirect(dispatchAppUrl);
}
