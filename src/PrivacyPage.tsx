import { LegalPage } from './LegalPage'

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated: August 24, 2026</p>
      <p>
        This Privacy Policy explains how Silly Bon collects and uses information when you join the
        waitlist, apply for closed beta, or use the Silly Bon App.
      </p>
      <h2>What we collect</h2>
      <p>
        Waitlist: your email address. Beta: names, emails, and whether each person uses Android or
        iOS. We also store the time of signup.
      </p>
      <h2>How we use it</h2>
      <p>
        To run the waitlist and beta, contact selected testers, and operate and improve Silly Bon.
        We do not sell your personal information.
      </p>
      <h2>Where it is stored</h2>
      <p>
        Signups are stored in our Firebase project. Access is limited to people running Silly Bon.
      </p>
      <h2>Retention</h2>
      <p>
        We keep waitlist and beta records as long as needed for launch and support, then delete or
        anonymize them when they are no longer required.
      </p>
      <h2>Your choices</h2>
      <p>
        To correct or delete your signup, contact us through the details published on sillybon.com
        or in the App.
      </p>
      <p>
        A fuller Privacy Policy will ship with the Silly Bon App. We may update this page; the
        “Last updated” date will change when we do.
      </p>
    </LegalPage>
  )
}
