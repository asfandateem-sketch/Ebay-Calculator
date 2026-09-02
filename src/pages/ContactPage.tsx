import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { Mail, Phone, MessageSquare, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { RouterLink } from '../components/RouterLink';
import { ContactForm } from '../components/Contact/ContactForm';
import { SITE_CONFIG } from '../config/site';
import { trackEvent } from '../utils/analytics';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  useSEO({
    title: `Contact ${SITE_CONFIG.name} | Questions, Corrections & Business Inquiries`,
    description: `Contact ${SITE_CONFIG.name} for calculator questions, fee-data corrections, feature requests, partnerships, and business inquiries.`,
    keywords: 'contact seller margin calculator, seller margin calculator support, ebay fee calculator feedback, business inquiries seller margin calculator',
    canonical: '/contact',
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${SITE_CONFIG.name}`,
      description: `Get in touch with the ${SITE_CONFIG.name} team for support, corrections, or inquiries.`,
      url: `${SITE_CONFIG.url}/contact`,
      provider: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    },
  });

  const handleEmailClick = () => {
    trackEvent('contact_email_click');
  };

  const handlePhoneClick = () => {
    trackEvent('contact_phone_click');
  };

  const handleWhatsAppClick = () => {
    trackEvent('contact_whatsapp_click');
  };

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '96px', background: 'var(--color-bg)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Navigation Pill */}
        <RouterLink
          to="/"
          className="nav-tag-pill"
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={13} />
          <span>Back to Calculator</span>
        </RouterLink>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="section-title" style={{ marginBottom: '12px', fontSize: '32px', fontWeight: 800 }}>
            Contact {SITE_CONFIG.name}
          </h1>
          <p className="section-subtitle" style={{ fontSize: '16px', lineHeight: 1.6, maxWidth: '720px' }}>
            Have a question, found a fee-data issue, want to suggest a feature, or interested in working with us? Get in touch with our team.
          </p>
        </div>

        {/* 2-Column Grid: Contact Cards & Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          {/* Left Column: Direct Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Card */}
            <div className="calc-card" style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '4px' }}>
                    Email Us Directly
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>
                    For general support, feedback, partnerships, and fee rate corrections.
                  </p>
                  <a
                    href="mailto:asfandateem@gmail.com"
                    onClick={handleEmailClick}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--color-primary)',
                      minHeight: '44px',
                      textDecoration: 'none',
                    }}
                  >
                    asfandateem@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="calc-card" style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '4px' }}>
                    Phone & WhatsApp
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>
                    Direct line for quick inquiries and developer correspondence.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                    <a
                      href="tel:+923189967087"
                      onClick={handlePhoneClick}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-text-title)',
                        minHeight: '44px',
                        textDecoration: 'none',
                      }}
                    >
                      +92 318 996 7087
                    </a>
                    <a
                      href="https://wa.me/923189967087"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                      className="nav-tag-pill"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#25D366',
                        color: '#ffffff',
                        borderColor: '#25D366',
                        minHeight: '36px',
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      <MessageSquare size={14} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time & Independent Badge */}
            <div
              style={{
                padding: '16px',
                background: 'var(--color-soft-gray)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '13px',
                color: 'var(--color-text-body)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--color-primary)" />
                <span>Typical response time: <strong>Within 24–48 hours</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Independent Platform:</strong> {SITE_CONFIG.name} is an independent fee estimation utility. We are not eBay Inc. and cannot modify your official eBay account or transactions.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
