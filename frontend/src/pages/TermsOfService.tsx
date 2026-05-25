import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="w-full min-h-screen text-[#111] dark:text-[#e5e5e5] font-sans selection:bg-black/10 dark:selection:bg-white/20 flex flex-col items-center transition-colors duration-500 border-b border-black/10 dark:border-white/10 mb-20">
      <main className="w-full max-w-3xl px-6 py-20 md:py-32">
        <motion.header 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24">
          <h1 className="mt-8 md:mt-10 text-4xl md:text-5xl font-light tracking-tight text-black/90 dark:text-white/90 mb-4">
            Terms of Service
          </h1>
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-black/40 dark:text-white/30">
            Last updated: May 2026
          </p>
        </motion.header>
        <motion.article 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-12 md:gap-16">
          <section className="flex flex-col gap-4">
            <p className="text-base md:text-lg font-light text-black/80 dark:text-white/60 leading-relaxed">
              Welcome to FocusFlow. We build tools designed to help you protect your attention and achieve deep work. By using our application, you agree to these Terms of Service. We have kept them as simple and transparent as possible.
            </p>
          </section>
          <div className="w-full h-px bg-black/10 dark:bg-white/10" />
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Acceptance of Terms</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              By accessing or using FocusFlow, you agree to be bound by these terms. If you do not agree with any part of these terms, you may not use our service. You may stop using FocusFlow at any time by deleting your account.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">User Accounts</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              To use FocusFlow, you must create an account. You are responsible for safeguarding your login credentials and for any activity that occurs under your account. If you realize your account has been compromised, please contact us immediately so we can help secure your data.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Acceptable Use</h2>
            <div className="flex flex-col gap-4 text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              <p>FocusFlow is built to enhance productivity. We ask that you respect the platform and our community. You agree not to:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-black/70 dark:text-white/70">
                <li>Reverse-engineer, exploit, or attempt to harm the platform's infrastructure.</li>
                <li>Use the service to store or transmit malicious code, spam, or illegal content.</li>
                <li>Automate interactions with our service in a way that creates an unreasonable load on our servers.</li>
              </ul>
              <p>If we determine that an account is violating these rules or abusing the platform, we reserve the right to suspend or terminate the account immediately without prior notice.</p>
            </div>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">User Content & Data</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              Your focus sessions, objectives, and personal data belong to you. We claim no intellectual property rights over the material you provide to the service. We only process your data to provide you with the FocusFlow application and generate your personal insights.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Intellectual Property</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              While you own your content, FocusFlow owns the app. The visual design, source code, branding, and overall "look and feel" of FocusFlow are protected by intellectual property laws. You may not copy, reproduce, or reuse our code or design elements without our explicit written permission.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Service Availability</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              We are constantly working to improve FocusFlow. The service may evolve, change, or temporarily go offline for maintenance. While we strive for maximum reliability, FocusFlow is provided on an <span className="italic">"as is"</span> and <span className="italic">"as available"</span> basis. We do not guarantee that the service will be uninterrupted, error-free, or entirely bug-free.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Limitation of Liability</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              To the maximum extent permitted by law, FocusFlow and its creators shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service. This includes, but is not limited to, loss of data, loss of productivity, or temporary inability to access your focus history.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Changes to These Terms</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              As FocusFlow grows, we may update these Terms of Service. If we make significant material changes, we will notify you via email or a prominent notice within the app. Your continued use of the service after those changes are made constitutes your acceptance of the new terms.
            </p>
          </section>
          <div className="w-full h-px bg-black/10 dark:bg-white/10" />
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Contact</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              If you have any questions about these terms, or if you just want to say hi, feel free to reach out. We are always listening.
            </p>
            <div className="mt-2">
              <a 
                href="mailto:dipanshusahu447@gmail.com" 
                className="inline-block text-black/90 dark:text-white/90 font-medium border-b border-black/20 dark:border-white/20 hover:border-black/90 dark:hover:border-white/90 transition-colors pb-1 text-sm md:text-base">
                dipanshusahu447@gmail.com
              </a>
            </div>
          </section>
        </motion.article>
      </main>
    </div>
  );
}