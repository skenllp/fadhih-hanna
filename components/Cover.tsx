'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CoverProps {
  onOpen?: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isGateMounted, setIsGateMounted] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_LOADER_MS = 1600;
    let timer: NodeJS.Timeout;
    let unmountTimer: NodeJS.Timeout;

    const hideLoader = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      timer = setTimeout(() => {
        setLoaderHidden(true);
        unmountTimer = setTimeout(() => {
          setLoaderMounted(false);
        }, 1400);
      }, remaining);
    };

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(hideLoader).catch(hideLoader);
    } else {
      hideLoader();
    }

    // Safety fallback
    const safetyTimer = setTimeout(hideLoader, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) return;

    // Trigger ripple animation on button
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const ripple = document.createElement('span');
      ripple.className = 'cv-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    }

    setIsOpen(true);
    onOpen?.();

    setTimeout(() => {
      document.body.style.overflow = '';
      document.dispatchEvent(new CustomEvent('invitation:opened'));
    }, 600);

    // After fade-out blur transition completes, remove from DOM
    setTimeout(() => {
      setIsGateMounted(false);
    }, 1500);
  };

  return (
    <>
      {/* ============ LOADER ============ */}
      {loaderMounted && (
        <div
          className={`cv-loader ${loaderHidden ? 'is-hidden' : ''}`}
          id="cv-loader"
          aria-hidden="true"
        >
          <div className="cv-loader__monogram">F &amp; H</div>
          <div className="cv-loader__tagline">Wedding Invitation</div>
          <div className="cv-loader__bar-wrap">
            <div className="cv-loader__bar" />
          </div>
        </div>
      )}

      {/* ============ COVER / GATE ============ */}
      {isGateMounted && (
        <div
          className={`cv-gate ${isOpen ? 'is-open' : ''}`}
          id="cv-gate"
          role="dialog"
          aria-label="Opening wedding invitation"
        >
          <div className="cv-gate__floral cv-gate__floral--tl" aria-hidden="true">
            <img src="/images/floral-corner.svg" alt="" />
          </div>
          <div className="cv-gate__floral cv-gate__floral--br" aria-hidden="true">
            <img src="/images/floral-corner.svg" alt="" />
          </div>

          <div className="cv-gate__inner">
            <p className="cv-gate__arabic" dir="rtl" lang="ar">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="cv-gate__eyebrow">By the Grace of Allah</p>
            <h1 className="cv-gate__names">
              Fadhih <span className="cv-gate__amp">&amp;</span> Hanna
            </h1>
            
            <p className="cv-gate__date">Sunday · October 25, 2026 · 5:00 PM</p>
            <div className="cv-gate__venue">Fayiz Mahal, Atholi</div>
            <button
              ref={buttonRef}
              type="button"
              className="cv-btn cv-btn--gate cv-btn--ripple"
              id="cv-open-btn"
              onClick={handleOpenClick}
            >
              <span className="cv-btn__icon">✦</span>
              Open Invitation
            </button>
          </div>

          <div className="cv-gate__divider" aria-hidden="true">
            <span />
            <span className="cv-gate__divider-glyph">❋</span>
            <span />
          </div>
        </div>
      )}
    </>
  );
}
