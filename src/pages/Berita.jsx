import React, { useState } from "react";
export default function Berita(){
  const [filter,setFilter] = useState("");
  const news = [
    {id:1,title:"Peluncuran e-Lapor",cat:"Inovasi", img:"/news1.jpg"},
    {id:2,title:"Sosialisasi Literasi",cat:"Literasi", img:"/news2.jpg"},
    {id:3,title:"Upgrade Jaringan",cat:"Infrastruktur", img:"/news3.jpg"},
  ];
  const filtered = filter ? news.filter(n=>n.cat===filter) : news;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <label className="text-sm text-[#003366]">Kategori:</label>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="rounded border px-3 py-2 text-sm">
          <option value="">Semua</option>
          <option>Inovasi</option>
          <option>Literasi</option>
          <option>Infrastruktur</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <article className="md:col-span-2">
          <div className="rounded-2xl bg-white shadow overflow-hidden">
            <img src={filtered[0]?.img} className="h-64 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#003366]">{filtered[0]?.title}</h3>
              <p className="text-sm text-[#003366]/70">Kategori: {filtered[0]?.cat}</p>
            </div>
          </div>
        </article>

        <aside>
          {filtered.slice(1).map(n=>(
            <div key={n.id} className="flex gap-3 items-center bg-white p-3 rounded-xl shadow">
              <img src={n.img} className="h-16 w-20 object-cover rounded" />
              <div><div className="font-medium text-[#003366]">{n.title}</div><div className="text-xs text-[#003366]/60">{n.cat}</div></div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
