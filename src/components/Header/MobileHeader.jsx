// src/components/Header/MobileHeader.jsx
export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="md:hidden flex justify-between items-center bg-white h-14 px-4 shadow">
      <img src="/assets/logo-kominfo.png" alt="Logo Kominfo" className="h-8" />
      <button onClick={onMenuClick} aria-label="Open menu" className="text-biru-tua">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}