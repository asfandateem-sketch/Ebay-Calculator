import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface FormState {
  name: string;
  email: string;
  subject: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INQUIRY_TYPES = [
  'General Question',
  'Fee Data Correction',
  'Calculator Issue',
  'Feature Request',
  'Partnership',
  'Business Inquiry',
  'SEO / Content',
  'Other',
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'General Question',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length > 3000) {
      errs.message = 'Message must be under 3,000 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Anonymous analytics tracking without personal data
    trackEvent('contact_form_submit_attempt', {
      inquiry_type: formData.inquiryType,
    });

    const emailTo = 'asfandateem@gmail.com';
    const emailSubject = encodeURIComponent(`[Seller Margin Calculator - ${formData.inquiryType}] ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Inquiry Type: ${formData.inquiryType}\n\n` +
      `Message:\n${formData.message}\n`
    );

    const mailtoUrl = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
    setSubmitted(true);

    // Open native email client
    window.location.href = mailtoUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="calc-card" style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)' }}>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <CheckCircle size={28} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '8px' }}>
            Preparing Your Message
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--color-text-body)', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            Your default email client has been prompted to send your inquiry to <strong>asfandateem@gmail.com</strong>. If your email application didn't open automatically, you can email us directly.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setSubmitted(false)}
            style={{ minHeight: '44px', padding: '10px 24px' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <MessageSquare size={20} color="var(--color-primary)" />
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', margin: 0 }}>
              Send an Inquiry
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {/* Name */}
            <div>
              <label htmlFor="contact-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '6px' }}>
                Your Name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Jenkins"
                className="input-field"
                style={{ width: '100%', minHeight: '44px', fontSize: '15px', borderColor: errors.name ? '#dc2626' : undefined }}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <div id="contact-name-error" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                  <AlertCircle size={12} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '6px' }}>
                Email Address <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sarah@example.com"
                className="input-field"
                style={{ width: '100%', minHeight: '44px', fontSize: '15px', borderColor: errors.email ? '#dc2626' : undefined }}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <div id="contact-email-error" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                  <AlertCircle size={12} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {/* Inquiry Type */}
            <div>
              <label htmlFor="contact-inquiry-type" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '6px' }}>
                Inquiry Type
              </label>
              <select
                id="contact-inquiry-type"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="select-field"
                style={{ width: '100%', minHeight: '44px', fontSize: '15px' }}
              >
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '6px' }}>
                Subject <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief summary of your inquiry"
                className="input-field"
                style={{ width: '100%', minHeight: '44px', fontSize: '15px', borderColor: errors.subject ? '#dc2626' : undefined }}
                aria-required="true"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
              />
              {errors.subject && (
                <div id="contact-subject-error" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                  <AlertCircle size={12} />
                  <span>{errors.subject}</span>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="contact-message" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '6px' }}>
              Message <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Provide as much detail as possible..."
              className="input-field"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '15px',
                lineHeight: 1.6,
                borderColor: errors.message ? '#dc2626' : undefined,
                resize: 'vertical',
              }}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && (
              <div id="contact-message-error" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
                <AlertCircle size={12} />
                <span>{errors.message}</span>
              </div>
            )}
          </div>

          {/* Privacy Note */}
          <div
            style={{
              padding: '12px 16px',
              background: 'var(--color-soft-gray)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}
          >
            <strong>Privacy Note:</strong> Your message will open in your email client. We do not currently store contact-form submissions on our servers.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            <Send size={16} />
            <span>Open in Email Client</span>
          </button>
        </form>
      )}
    </div>
  );
};
