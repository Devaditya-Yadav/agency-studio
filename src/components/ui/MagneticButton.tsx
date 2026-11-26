import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'terracotta' | 'olive' | 'outline';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'terracotta',
  href,
  onClick,
  type = 'button',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.18);
    y.set((e.clientY - centerY) * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles: Record<NonNullable<MagneticButtonProps['variant']>, string> = {
    terracotta:
      'bg-[var(--action-cta-bg)] hover:bg-[var(--action-cta-hover)] text-[var(--action-cta-fg)] shadow-whisper',
    olive:
      'bg-[var(--action-primary-bg)] hover:opacity-90 text-[var(--action-primary-fg)]',
    outline:
      'bg-transparent border border-[var(--border-strong)] hover:border-[var(--text-heading)] text-[var(--text-heading)] hover:bg-[var(--bg-surface)]',
  };

  const baseClass = `inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--action-cta-bg)] ${variantStyles[variant]} ${className}`;

  const isExternal = Boolean(href && /^https?:\/\//i.test(href));

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={baseClass}
        >
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={baseClass}>
          {children}
        </button>
      )}
    </motion.div>
  );
};
