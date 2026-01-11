"use client";
import { useEffect } from "react";

const Policies = () => {
  useEffect(() => {
    // Scroll to section based on hash
    const hash = window.location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-warm py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
            Policies & Delivery Info
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Important information about our services
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-6">
        {/* Terms of Service */}
        <section id="terms" className="scroll-mt-8">
          <div className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-warm md:text-3xl">
              Terms of Service
            </h2>
            <p className="mb-4 text-muted-foreground">
              Please read these terms carefully before placing your order.
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>All sales are final.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  We do not provide refunds under any circumstances, including
                  failed deliveries due to incorrect information or lack of
                  response to courier communication.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  It is the customer&apos;s responsibility to ensure that all
                  delivery information provided (name, address, and contact
                  number) is complete and accurate.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  If a package is undeliverable due to incorrect contact details
                  or failure to answer courier calls, we will not be held
                  responsible and no refund will be issued.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  If you receive an incorrect or damaged item, please contact us
                  within 48 hours of receiving your order.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  We will assess the situation and do our best to resolve the
                  issue fairly and promptly.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Our goal is to provide you with the best possible experience and
              service. If you have questions before ordering, feel free to reach
              out via our Contact page.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy" className="scroll-mt-8">
          <div className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-warm md:text-3xl">
              Privacy Policy
            </h2>
            <p className="mb-4 text-muted-foreground">
              We value your privacy and are committed to protecting your
              personal information.
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  We only collect the information needed to process your orders
                  and communicate with you effectively. This includes your name,
                  delivery address, email address, and contact number.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  Your information is never sold or shared with third-party
                  marketers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  Data may be shared only with trusted partners such as courier
                  services, and only for the purpose of fulfilling your
                  delivery.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  If you choose to subscribe to our newsletter or promotional
                  messages, you can unsubscribe at any time using the link
                  provided in the email.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                <span>
                  All transactions and customer data are handled securely.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              By using our website and placing an order, you agree to this
              privacy policy.
            </p>
          </div>
        </section>

        {/* Delivery Information */}
        <section id="delivery" className="scroll-mt-8">
          <div className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-warm md:text-3xl">
              Delivery Information
            </h2>
            <p className="mb-6 text-muted-foreground">
              We provide reliable and efficient delivery both locally and
              internationally.
            </p>

            {/* Island-wide Delivery */}
            <div className="mb-8">
              <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
                Island-wide Delivery (Sri Lanka)
              </h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>Orders are delivered within 2 to 4 working days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>We use Domex for all local deliveries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>
                    Products are freshly prepared and securely vacuum-packed
                    before dispatch
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>
                    Deliveries are handled by trusted couriers to ensure safe
                    and timely arrival
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>
                    We deliver to homes, offices, and gift recipients across Sri
                    Lanka
                  </span>
                </li>
              </ul>
            </div>

            {/* International Shipping */}
            <div className="mb-8">
              <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
                International Shipping
              </h3>
              <p className="mb-3 text-muted-foreground">
                We ship worldwide using DHL, covering countries including:
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["Australia", "United Kingdom", "Germany", "Canada"].map(
                  (country) => (
                    <span
                      key={country}
                      className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {country}
                    </span>
                  )
                )}
                <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  And many more
                </span>
              </div>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>
                    All products are vacuum-sealed to maintain freshness and
                    shelf life during transit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>
                    Typical delivery time ranges from 5 to 15 working days,
                    depending on your location
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>
                    DHL offers reliable international tracking and secure
                    handling
                  </span>
                </li>
              </ul>
            </div>

            {/* Important Notes */}
            <div className="rounded-lg bg-destructive/10 p-4">
              <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                  <span>
                    Please ensure that food items are allowed into your country
                    before placing an order
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                  <span>
                    We are not responsible for customs-related delays or
                    rejections
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                  <span>
                    It is your responsibility to provide accurate and complete
                    delivery information, including name, address, and contact
                    number
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                  <span>
                    If the provided details are incorrect or incomplete, and the
                    delivery fails as a result, we are not responsible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                  <span>
                    The courier service may attempt to contact you. If you miss
                    their calls or fail to respond, and the package cannot be
                    delivered because of this, we will not be held responsible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                  <span>
                    We do not offer refunds under any of these circumstances
                  </span>
                </li>
              </ul>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              If you have any questions before placing your order or require
              special handling, feel free to reach out to us via the contact
              page.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Policies;
