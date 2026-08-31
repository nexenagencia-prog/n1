'use client';

import type { CSSProperties, ReactNode } from 'react';
import styles from './ReferenceDashboard.module.css';

type Props = {
  label: string;
  style: CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
};

export function Hotspot({ label, style, onClick, children }: Props) {
  return (
    <button className={styles.hotspot} style={style} aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  );
}
