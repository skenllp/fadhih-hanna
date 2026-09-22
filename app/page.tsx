'use client';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import Cover from '@/components/Cover';
import MusicPlayer from '@/components/MusicPlayer';
const asset = (name: string) => `/assets/${name}.png`;
const labels = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
const weddingTime = new Date('2026-10-25T17:00:00+05:30').getTime();
function remaining() {
  const seconds = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}
function Fade({ children, delay, className = '', active = true }: { children: React.ReactNode; delay: number; className?: string; active?: boolean }) {
  return <div className={`${active ? 'fade-up' : 'opacity-0'} ${className}`} style={active ? { animationDelay: `${delay}ms` } : undefined}>{children}</div>;
}
function Countdown() {
  const [time, setTime] = useState([0, 0, 0, 0]);
  useEffect(() => { setTime(remaining()); const interval = setInterval(() => setTime(remaining()), 1000); return () => clearInterval(interval); }, []);
  return <div className="countdown" aria-label="Wedding countdown">{labels.map((label, i) => <div className="count-unit" key={label}><div className="count-tile"><span key={time[i]}>{String(time[i]).padStart(2, '0')}</span></div><span className="count-label">{label}</span></div>)}</div>;
}
function Wishes() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('full_name') || '').trim();
    const wishes = String(data.get('wishes') || '').trim();
    if (!name || !wishes) { setError('Please enter your name and wishes.'); return; }
    try {
      const entries = JSON.parse(localStorage.getItem('fadhih-hanna-wishes') || '[]');
      localStorage.setItem('fadhih-hanna-wishes', JSON.stringify([...entries, { name, wishes, createdAt: new Date().toISOString() }]));
    } catch {}
    const message = `*Wedding Wishes for Fadhih & Hanna* 💍✨\n\n*From:* ${name}\n\n*Wishes:* ${wishes}`;
    const whatsappUrl = `https://wa.me/919446587480?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSaved(true);
    setError('');
  }
  return <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (value) { setSaved(false); setError(''); } }}>
    <DialogTrigger className="invitation-button primary"><Heart size={16} strokeWidth={1.5} />SEND YOUR WISHES</DialogTrigger>
    <DialogContent className="wishes-dialog" showCloseButton={false}>
      <div className="dialog-ornament" aria-hidden="true"><span /><i /><span /></div>
      <DialogTitle className="wishes-title">{saved ? 'Thank You for Your Wishes' : 'Send Your Wishes'}</DialogTitle>
      <DialogDescription className="wishes-description">{saved ? 'Your blessing has been forwarded to the couple on WhatsApp.' : 'A blessing from you means the world to us.'}</DialogDescription>
      {saved ? <div className="wishes-success"><Heart size={28} strokeWidth={1.2} /><p>Your blessings have been opened in WhatsApp to send to the couple.</p><DialogClose className="invitation-button primary">CLOSE</DialogClose></div> : <form onSubmit={submit} className="wishes-form">
        <div><label htmlFor="full-name">FULL NAME</label><input id="full-name" name="full_name" autoComplete="name" maxLength={80} placeholder="Your name" required /></div>
        <div><label htmlFor="wishes">YOUR WISHES</label><textarea id="wishes" name="wishes" rows={5} maxLength={1000} placeholder="Write your blessings for the couple…" required /></div>
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="form-actions"><button type="submit" className="invitation-button primary">SEND VIA WHATSAPP</button><DialogClose className="invitation-button">CLOSE</DialogClose></div>
      </form>}
    </DialogContent>
  </Dialog>;
}
function OurStory() {
  return (
    <section className="story-section" aria-label="Our story">
      <Fade active delay={0} className="story-heading-block">
        <h3 className="story-eyebrow">OUR STORY</h3>
        <h4 className="story-title">A BEGINNING, BY HIS GRACE</h4>
      </Fade>
      <Fade active delay={150} className="story-copy">
        <p>
          Every story is written before it is lived. Ours began quietly, in
          ordinary days that slowly turned into something we could not imagine
          apart from one another.
        </p>
        <p>
          With gratitude to Allah for bringing our families together, we now
          begin the next chapter — one built on faith, patience and love — and
          we would be honoured to have you beside us as we take this first
          step.
        </p>
      </Fade>
      <p className="story-signature">Fadhih &amp; Hanna</p>
    </section>
  );
}
function Envelope() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.18 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={`envelope ${visible ? 'revealed' : ''}`} aria-label="Save the date keepsake"><div className="envelope-scene">
    <img className="envelope-layer envelope-back" src={asset('envelope-back')} alt="" />
    <div className="envelope-piece date-card"><img src={asset('envelope-card')} alt="Save the Date 25.10.26" /></div>
    <img className="envelope-layer envelope-front" src={asset('envelope-front')} alt="" />
  </div></section>;
}
export default function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Cover onOpen={() => setOpened(true)} />
      <MusicPlayer playTrigger={opened} />
      <main className="paper-bg">
        <h1 className="sr-only">Fadhih & Hanna — Wedding Invitation</h1>
        <div className="petals" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              style={
                {
                  left: `${(i * 37 + 16) % 100}%`,
                  width: `${9 + (i % 9)}px`,
                  height: `${6 + (i % 5)}px`,
                  animationDelay: `${(i * 1.7) % 12}s`,
                  animationDuration: `${15 + (i % 12)}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="invitation">
          <Fade active={opened} delay={300} className="monogram">
            <img src={asset('logo-2')} alt="Fadhih &amp; Hanna monogram" />
          </Fade>
          <Fade active={opened} delay={600} className="parent-details groom-parents">
            <p>S/O K. ABDUL LATHEEF &amp; FOUSIYA LATHEEF</p>
          </Fade>
          <Fade active={opened} delay={900} className="couple-names-block">
            <h2 className="couple-name">Fadhih</h2>
            <span className="couple-ampersand">&amp;</span>
            <h2 className="couple-name">Hanna</h2>
          </Fade>
          <Fade active={opened} delay={1200} className="parent-details bride-parents">
            <p>D/O LATE HASSAN NELLIYOT &amp; SUHARA</p>
          </Fade>
          <Fade active={opened} delay={1500} className="portrait">
            <div className="portrait-frame">
              {/* Decorative rings SVG */}
              <svg className="portrait-rings-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="gld" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c8a458" />
                    <stop offset="45%" stopColor="#eacf7c" />
                    <stop offset="100%" stopColor="#a07832" />
                  </linearGradient>
                </defs>
                {/* Outer thin gold ring */}
                {/* <circle cx="50" cy="50" r="48.5" fill="none" stroke="url(#gld)" strokeWidth="0.85" /> */}
                {/* Inner thin gold ring */}
                {/* <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gld)" strokeWidth="0.6" opacity="0.75" /> */}
              </svg>
              {/* Calligraphy — multiply blend lets gold float over rings */}
              <div className="calligraphy-img-wrap">
                <img src="/assets/arabic-monogram.png" alt="Fadhih &amp; Hanna Arabic calligraphy monogram" />
              </div>
              {/* Stars on top */}
              <svg className="portrait-stars-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {/* <defs>
                  <linearGradient id="gld2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c8a458" />
                    <stop offset="50%" stopColor="#eacf7c" />
                    <stop offset="100%" stopColor="#a07832" />
                  </linearGradient>
                </defs> */}
                {/* Top 4-pointed star */}
                <path d="M50 -5.5 L51.5 1.5 L58.5 3 L51.5 4.5 L50 11.5 L48.5 4.5 L41.5 3 L48.5 1.5 Z" fill="url(#gld2)" />
                {/* Bottom 4-pointed star */}
                <path d="M50 88.5 L51.5 95.5 L58.5 97 L51.5 98.5 L50 105.5 L48.5 98.5 L41.5 97 L48.5 95.5 Z" fill="url(#gld2)" />
              </svg>
            </div>
          </Fade>
          <div className="lace-panel">
            <img className="lace-art" src={asset('lace3')} alt="" aria-hidden="true" />
            <div className="event-content">
              <Fade active={opened} delay={1800} className="event-date">
                <h3 className="event-date-text">OCTOBER 25, 2026</h3>
              </Fade>
              <Fade active={opened} delay={2100} className="nikkah-details">
                <p className="event-copy">
                  RECEPTION ON OCT 25, 2026 FROM <span className="time">5:00</span> PM TO <span className="time">9:00</span> PM,<br />
                  FAYIZ MAHAL, KAMMILI, ATHOLI
                </p>
              </Fade>
              <Fade active={opened} delay={2200} className="location">
                <a className="invitation-button" href="https://maps.app.goo.gl/VmupYHovYmJointc9" target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} strokeWidth={1.5} />
                  RECEPTION LOCATION
                </a>
              </Fade>
              <Fade active={opened} delay={2700} className="countdown-wrap">
                <Countdown />
              </Fade>
            </div>
          </div>
          <Fade active={opened} delay={3150} className="wishes-section">
            {/* <Wishes /> */}
            <p className="honour-text">We would be honoured by your presence and prayers as we begin this new chapter.</p>
            <p>
              WE SEEK YOUR DUAS AND WARMLY<br />
              INVITE YOU TO CELEBRATE THIS<br />
              SPECIAL OCCASION WITH US.
            </p>
          </Fade>
          <Fade active={opened} delay={3150} className="dua">
            <img src={asset('dua')} alt="Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair" />
          </Fade>
          <OurStory />
          <Envelope />
        </div>
      </main>
    </>
  );
}
