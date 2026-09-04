import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function DynamicIcon({ name, ...props }) {
  // Fallback to Zap icon if the specified icon does not exist
  const Icon = LucideIcons[name] || LucideIcons.Zap;
  return <Icon {...props} />;
}
