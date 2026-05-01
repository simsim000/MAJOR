import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, Briefcase, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">Alumni+</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="/login">
            Log In
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="/register">
            Register
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                  Connect. Mentor. Grow.
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                  The exclusive network for students and alumni. Unlock verified opportunities, mentorship, and professional connections.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-8">
                    Join Network <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-slate-700 hover:bg-slate-800 h-11 px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg border border-slate-800 bg-slate-950/50 hover:border-blue-500/50 transition-colors">
                <div className="p-3 rounded-full bg-blue-900/20 text-blue-400">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Exclusive Opportunities</h2>
                <p className="text-slate-400">
                  Access jobs and internships posted directly by alumni working in top companies.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg border border-slate-800 bg-slate-950/50 hover:border-violet-500/50 transition-colors">
                <div className="p-3 rounded-full bg-violet-900/20 text-violet-400">
                  <Users className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Mentorship</h2>
                <p className="text-slate-400">
                  Connect with experienced seniors for guidance, career advice, and mock interviews.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg border border-slate-800 bg-slate-950/50 hover:border-green-500/50 transition-colors">
                <div className="p-3 rounded-full bg-green-900/20 text-green-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Verified Community</h2>
                <p className="text-slate-400">
                  A safe space with strict ID verification ensures you are connecting with real students and alumni.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-100">
                  Ready to accelerate your career?
                </h2>
                <p className="mx-auto max-w-[600px] text-slate-400 md:text-xl">
                  Join thousands of students and alumni building the future together.
                </p>
              </div>
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 border-0">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-800">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © 2024 Alumni+ Network. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4 text-slate-500 hover:text-slate-300" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-slate-500 hover:text-slate-300" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
