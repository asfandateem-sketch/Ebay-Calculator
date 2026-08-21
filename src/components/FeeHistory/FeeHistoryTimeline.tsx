import React from 'react';
import { feeHistoryData } from '../../data/feeHistory';
import { History, ExternalLink, Calendar } from 'lucide-react';

export const FeeHistoryTimeline: React.FC = () => {
  return (
    <div id="fee-history-timeline-wrapper" className="calc-card">
      <div className="calc-card-header">
        <div className="calc-title-badge">
          <History size={20} color="var(--color-primary)" />
          <div>
            <h3 className="calc-title">eBay Fee Policy History & Rate Archives</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Authoritative timeline of fee changes, Managed Payments shifts, and category structure updates.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {feeHistoryData.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              backgroundColor: 'var(--color-white)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="nav-tag-pill" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {item.country} • {item.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  {item.date}
                </span>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor:
                    item.changeType === 'reduction'
                      ? 'rgba(16, 185, 129, 0.1)'
                      : item.changeType === 'increase'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                  color:
                    item.changeType === 'reduction'
                      ? '#10b981'
                      : item.changeType === 'increase'
                      ? '#ef4444'
                      : 'var(--color-primary)',
                }}
              >
                {item.changeType.replace('_', ' ')}
              </span>
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>
              {item.title}
            </h4>

            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-muted)', marginBottom: '14px' }}>
              {item.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '12px',
                backgroundColor: 'var(--color-soft-gray)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                marginBottom: '12px',
              }}
            >
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Previous Fee: </span>
                <strong>{item.previousFee}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Updated Fee: </span>
                <strong>{item.newFee}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: 'var(--color-primary)' }}
              >
                <span>{item.officialSource}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
