import React from 'react';
import { ShieldCheck, HelpCircle, ArrowRightLeft } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: '100% Verified Portal',
      description: 'Fully authorized digital services provider complying with PCI-DSS guidelines for secure banking transfers.',
      colorClass: 'text-emerald-500 bg-emerald-50'
    },
    {
      icon: ArrowRightLeft,
      title: 'Secure & Assisted Payments',
      description: 'Choose instant online checkout or request agent manual assistance for high-amount transfers.',
      colorClass: 'text-amber-500 bg-amber-50'
    },
    {
      icon: HelpCircle,
      title: '24x7 Support Helpline',
      description: 'Dedicated support ticket resolving system for fast transaction corrections and cashbacks.',
      colorClass: 'text-blue-500 bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {badges.map((badge, idx) => {
        const IconComponent = badge.icon;
        return (
          <div 
            key={idx} 
            className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${badge.colorClass}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">{badge.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}
