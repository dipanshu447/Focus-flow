import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen text-[#111] dark:text-[#e5e5e5] font-sans selection:bg-black/10 dark:selection:bg-white/20 flex flex-col items-center transition-colors duration-500 border-b border-black/10 dark:border-white/10 mb-20">
      <main className="w-full max-w-3xl px-6 py-20 md:py-32">
        <motion.header 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24">
          <h1 className="mt-8 md:mt-10 text-4xl md:text-5xl font-light tracking-tight text-black/90 dark:text-white/90 mb-4">
            Privacy Policy
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
              At FocusFlow, we believe that your focus is your most valuable asset, and your privacy is just as important. This Privacy Policy outlines how we collect, use, and protect your information when you use our web application. We are committed to being transparent about our data practices and treating your personal information with respect.
            </p>
          </section>
          <div className="w-full h-px bg-black/10 dark:bg-white/10" />
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Information We Collect</h2>
            <div className="flex flex-col gap-4 text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              <p>We only collect the information necessary to provide and improve the FocusFlow experience. This includes:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li><strong className="font-medium text-black/80 dark:text-white/80">Account Information:</strong> When you sign up, we collect your name and email address.</li>
                <li><strong className="font-medium text-black/80 dark:text-white/80">App Data:</strong> We store your focus sessions, tasks, active objectives, and user preferences so you can access your productivity history across devices.</li>
                <li><strong className="font-medium text-black/80 dark:text-white/80">Basic Analytics:</strong> We log basic session information and interaction events to help us understand how the app is used and to identify areas for improvement.</li>
              </ul>
            </div>
          </section>        
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">How We Use Information</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              Your data is used strictly to provide, maintain, and improve the FocusFlow service. We use your focus history to generate your analytics and personalized productivity insights. 
              <br /><br />
              <strong className="font-medium text-black/80 dark:text-white/80">We never sell your personal data.</strong> Your focus metrics, email, and task lists are private and are never monetized or shared with data brokers.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Authentication & Security</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              Securing your data is a top priority. All account passwords are securely hashed before being stored in our database; we never store or see your password in plain text. We also offer Google OAuth as a secure, frictionless authentication alternative.
              <br /><br />
              While we implement industry-standard security measures to protect your data, no service or network can guarantee absolute security. You are responsible for protecting your account credentials and ensuring the device you use to access FocusFlow is secure.
            </p>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Third-Party Services</h2>
            <div className="flex flex-col gap-4 text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              <p>To run FocusFlow securely and reliably, we utilize a modern technology stack supported by trusted third-party infrastructure providers:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li><strong className="font-medium text-black/80 dark:text-white/80">Google OAuth:</strong> For seamless and secure social authentication.</li>
                <li><strong className="font-medium text-black/80 dark:text-white/80">PostgreSQL via Neon:</strong> For secure, scalable database storage.</li>
                <li><strong className="font-medium text-black/80 dark:text-white/80">Render:</strong> For hosting our backend architecture.</li>
                <li><strong className="font-medium text-black/80 dark:text-white/80">Resend:</strong> For delivering transactional emails, such as password resets, account verifications, and important account-related communications.</li>
              </ul>
              <p className="mt-2 text-xs md:text-sm text-black/60 dark:text-white/40 italic">
                These providers process data on our behalf and are bound by stringent privacy and security agreements.
              </p>
            </div>
          </section>
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Data Retention & Your Rights</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              We retain your data only for as long as your account is active or as needed to provide you with the FocusFlow service. 
              <br /><br />
              You have total control over your digital identity. You have the right to view, modify, or permanently delete your account and all associated focus data at any time. If you request account deletion, your tasks, session history, and credentials will be permanently erased from our active databases.
            </p>
          </section>
          <div className="w-full h-px bg-black/10 dark:bg-white/10" />
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-black/90 dark:text-white/90">Contact</h2>
            <p className="text-black/80 dark:text-white/60 font-light leading-relaxed text-sm md:text-base">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please reach out to us directly. We are an indie team building tools for deep work, and we are always happy to help.
            </p>
            <div className="mt-2">
              <a 
                href="mailto:teamfocusfloow@gmail.com" 
                className="inline-block text-black/90 dark:text-white/90 font-medium border-b border-black/20 dark:border-white/20 hover:border-black/90 dark:hover:border-white/90 transition-colors pb-1 text-sm md:text-base">
                teamfocusfloow@gmail.com
              </a>
            </div>
          </section>
        </motion.article>
      </main>
    </div>
  );
}