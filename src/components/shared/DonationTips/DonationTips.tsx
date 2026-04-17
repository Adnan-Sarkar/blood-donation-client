'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, Heart, Coffee, ClipboardCheck } from 'lucide-react';

type TabKey = 'before' | 'during' | 'after' | 'requirements';

const TIPS: Record<TabKey, string[]> = {
  before: [
    'Get a full night of sleep (7–8 hours) before your donation day.',
    'Drink at least 500ml of water in the 2 hours before donating.',
    'Eat a healthy, iron-rich meal — avoid fatty foods on donation day.',
    'Avoid alcohol for at least 24 hours before donating.',
    'Wear comfortable clothing with sleeves that roll up easily.',
    'Bring a valid photo ID and any required medical forms.',
  ],
  during: [
    'Stay relaxed — the needle prick lasts only a second.',
    'Squeeze a stress ball regularly to keep blood flowing.',
    'Tell the nurse immediately if you feel dizzy or unwell.',
    'The whole donation takes around 8–10 minutes.',
    'You can listen to music or chat with the staff to stay calm.',
  ],
  after: [
    'Sit for 10–15 minutes and enjoy the provided refreshments.',
    'Avoid strenuous exercise or heavy lifting for 24 hours.',
    'Drink extra fluids throughout the day to rehydrate.',
    'Keep the bandage on for at least 4 hours.',
    'Avoid smoking for at least one hour after donation.',
    'Contact the donation centre if you feel unwell in the days after.',
  ],
  requirements: [
    'You must be between 18 and 65 years old.',
    'Your weight must be at least 50 kg (110 lbs).',
    'Hemoglobin level must be at or above 12.5 g/dL.',
    'You must not have donated blood in the past 56 days (3 months).',
    'You should be in good general health with no active infections.',
    'You must not be pregnant or have given birth in the past 6 months.',
  ],
};

const TABS: { value: TabKey; label: string; Icon: React.ElementType }[] = [
  { value: 'before', label: 'Before', Icon: Clock },
  { value: 'during', label: 'During', Icon: Heart },
  { value: 'after', label: 'After', Icon: Coffee },
  { value: 'requirements', label: 'Eligibility', Icon: ClipboardCheck },
];

const DonationTips = () => {
  const [active, setActive] = useState<TabKey>('before');

  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Donor Guide
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Everything you need to know
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Follow these evidence-based tips to ensure a safe, comfortable donation experience.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {TABS.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                active === value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground border border-border hover:text-foreground hover:border-primary/40'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* Tips grid */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {TIPS[active].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-foreground">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationTips;
