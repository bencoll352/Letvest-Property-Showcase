import { siteConfig, pageHref } from "@/site-config";
export const verificationLinks = {
  gas: "https://www.hse.gov.uk/gas/gas-safe-register-check.htm",
  prs: "https://www.propertyredress.co.uk/agent-finder",
  ico: "https://ico.org.uk/about-the-ico/what-we-do/register-of-fee-payers/",
};
export function TrustBadges({ compact = false }: { compact?: boolean }) {
  const reg = siteConfig.registrations;
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  if (compact)
    return (
      <div
        className="footer-badges"
        aria-label="Registrations and property safety"
      >
        {reg.prs.verified && (
          <a className="footer-badge" href={verificationLinks.prs}>
            <img src={asset("prs-logo.jpg")} alt="Property Redress Scheme" />
            <span>
              Property Redress Scheme<strong>{reg.prs.number}</strong>
            </span>
          </a>
        )}
        <a className="footer-badge" href={verificationLinks.gas}>
          <img src={asset("gas-safe-logo.png")} alt="Gas Safe Register" />
          <span>
            Gas safety<strong>Check your engineer’s registration</strong>
          </span>
        </a>
        <a
          className="footer-badge"
          href={reg.icoVerified ? verificationLinks.ico : pageHref("privacy")}
        >
          <img src={asset("ico-logo.png")} alt="Information Commissioner's Office" />
          <span>
            Data protection
            <strong>
              {reg.icoVerified && reg.icoNumber
                ? reg.icoNumber
                : "Read our privacy notice"}
            </strong>
          </span>
        </a>
      </div>
    );
  return (
    <div
      className={`trust-badges ${compact ? "trust-badges-compact" : "trust-badges-expanded"}`}
      aria-label="Professional registration information"
    >
      {reg.prs.verified && (
        <article className="trust-badge">
          <img
            src={asset("prs-logo.jpg")}
            alt="Property Redress Scheme"
            width="4696"
            height="1968"
            loading="lazy"
          />
          <div>
            <h3>Property Redress Scheme</h3>
            <p>
              Membership reference: <strong>{reg.prs.number}</strong>. Property
              Redress considers eligible complaints about its member agents.
              Check the member listing and scheme scope.
            </p>
            <a href={verificationLinks.prs}>
              Check Property Redress membership
            </a>
          </div>
        </article>
      )}
      <article className="trust-badge">
        <img
          src={asset("gas-safe-logo.png")}
          alt="Gas Safe Register"
          width="148"
          height="148"
          loading="lazy"
        />
        <div>
          <h3>Gas safety</h3>
          <p>
            Check the appointed engineer’s Gas Safe registration and
            qualifications for the proposed work. This badge refers to that
            engineer, not a gas-work registration held by JM LetVest.
          </p>
          <a href={verificationLinks.gas}>How to check a Gas Safe engineer</a>
        </div>
      </article>
      {reg.icoNumber && reg.icoVerified ? (
        <article className="trust-badge">
          <img
            src={asset("ico-logo.png")}
            alt="Information Commissioner's Office"
            width="160"
            height="90"
            style={{ objectFit: "contain", maxHeight: "70px" }}
            loading="lazy"
          />
          <div>
            <h3>Data protection registration</h3>
            <p>
              ICO registration reference: <strong>{reg.icoNumber}</strong>. This
              records a data protection fee registration; it is not an
              accreditation or endorsement of JM LetVest or its services.
            </p>
            <a href={verificationLinks.ico}>
              Check the ICO register of fee payers
            </a>
          </div>
        </article>
      ) : (
        <article className="trust-badge">
          <img
            src={asset("ico-logo.png")}
            alt="Information Commissioner's Office"
            width="160"
            height="90"
            style={{ objectFit: "contain", maxHeight: "70px" }}
            loading="lazy"
          />
          <div>
            <h3>Privacy and the ICO</h3>
            <p>
              The ICO maintains a public register of organisations that pay the
              data protection fee. No ICO registration is claimed here while JM
              LetVest’s reference is awaiting confirmation. Registration is not
              an accreditation or endorsement.
            </p>
            <p>
              <a href={pageHref("privacy")}>Read our privacy notice</a>
            </p>
            <a href={verificationLinks.ico}>
              Search the ICO register of fee payers
            </a>
          </div>
        </article>
      )}
    </div>
  );
}
