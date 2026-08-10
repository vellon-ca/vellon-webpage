import type { Metadata } from "next";
import { SignInForm } from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Vellon account.",
};

export default function SignInPage() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden px-6 pt-32 pb-24 md:px-10">
      <div className="mx-auto w-full max-w-[86rem]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-5 md:col-start-4">
            <SignInForm />
          </div>
        </div>
      </div>
    </section>
  );
}
