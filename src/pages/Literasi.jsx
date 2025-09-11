import React from "react";

export default function Literasi(){
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-[#003366]">Artikel Singkat</h2>
          <article className="mt-3 bg-white p-5 rounded-2xl shadow">
            <h3 className="font-semibold text-[#003366]">Tips Aman Menggunakan Media Sosial</h3>
            <ul className="list-disc pl-5 mt-2 text-[#003366]/80"><li>Aktifkan 2FA</li><li>Gunakan password kuat</li></ul>
          </article>
          <h2 className="mt-6 text-2xl font-bold text-[#003366]">Infografis</h2>
          <div className="mt-3 grid md:grid-cols-3 gap-4">
            <div className="h-36 rounded-xl bg-blue-50 p-4 text-center">Infografis 1</div>
            <div className="h-36 rounded-xl bg-blue-50 p-4 text-center">Infografis 2</div>
            <div className="h-36 rounded-xl bg-blue-50 p-4 text-center">Infografis 3</div>
          </div>
        </section>

        <aside>
          <h2 className="text-2xl font-bold text-[#003366]">Video</h2>
          <div className="mt-3 aspect-video rounded-2xl overflow-hidden shadow">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video" allowFullScreen/>
          </div>
        </aside>
      </div>
    </div>
  );
}
