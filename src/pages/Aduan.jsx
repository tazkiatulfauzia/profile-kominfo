import React, { useState } from "react";

export default function Aduan(){
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e){
    e.preventDefault();
    setSubmitted(true);
  }
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="text-2xl font-bold text-[#003366]">Layanan Aduan</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-2xl shadow space-y-4">
          <input required placeholder="Nama" className="w-full rounded border px-3 py-2"/>
          <input required type="email" placeholder="Email" className="w-full rounded border px-3 py-2"/>
          <input required placeholder="Nomor HP" className="w-full rounded border px-3 py-2"/>
          <textarea required placeholder="Isi Aduan" rows={5} className="w-full rounded border px-3 py-2"></textarea>
          <button className="w-full rounded-xl bg-[#FFB800] px-4 py-3 text-white font-semibold">Kirim</button>
        </form>
      ) : (
        <div className="rounded-2xl bg-green-50 p-6 text-green-800">Aduan Anda telah dikirim, terima kasih.</div>
      )}
      <div className="mt-3 text-xs text-[#003366]/70">Alternatif: Hotline (0752) 123456 · Email: diskominfo@bukittinggikota.go.id</div>
    </div>
  );
}
