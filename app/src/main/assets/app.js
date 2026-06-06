(function(){
'use strict';

const PLANET_OPTIONS=[['sun','Matahari / Syams'],['moon','Bulan / Qamar'],['mercury','Merkurius / ‘Utharid'],['venus','Venus / Zuhrah'],['mars','Mars / Mirrikh'],['jupiter','Jupiter / Musytari'],['saturn','Saturnus / Zuhal'],['uranus','Uranus'],['neptune','Neptunus'],['pluto','Pluto'],['ac','AC / Ascendant'],['mc','MC / Midheaven']];
const ASPEK_OPTIONS=['conjunction','sextile','trine','square','opposition'];
const PLANET_ASPEK=['sun','moon','venus','mars','jupiter','saturn','uranus','neptune','pluto','ac','mc'];
const ZODIAK_IDS=['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
const CONTOH_EVENT_CHART=[
  {nomor:1,zodiak:'leo',statusPlanet:'ada',planetInput:['ac'],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:2,zodiak:'virgo',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:3,zodiak:'libra',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:4,zodiak:'scorpio',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:5,zodiak:'sagittarius',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:6,zodiak:'capricorn',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:7,zodiak:'aquarius',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:8,zodiak:'pisces',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:9,zodiak:'aries',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:10,zodiak:'taurus',statusPlanet:'ada',planetInput:['mc'],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:11,zodiak:'gemini',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'},
  {nomor:12,zodiak:'cancer',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'}
];
let baytData=buatBaytManualKosong();
let eventChartAktif=[];
let planetDariBulan=[];
let hasilDalil=[];

function $(id){return document.getElementById(id)}
function escapeHTML(x){ if(typeof window.escapeHTML==='function') return window.escapeHTML(x); return String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function formatPoin(n){ if(typeof window.formatPoin==='function') return window.formatPoin(n); n=Number(n)||0; return n>0?'+'+n:String(n)}
function unique(arr){return Array.from(new Set((arr||[]).filter(Boolean)))}
function labelPlanet(id){ const p=window.getPoinPlanet?window.getPoinPlanet(id):null; if(p&&p.nama)return p.nama; if(id==='mercury')return 'Merkurius'; const f=PLANET_OPTIONS.find(x=>x[0]===id); return f?f[1].split(' / ')[0]:String(id||'-')}
function zodiakLabel(id){ if(window.getNamaZodiak){const n=window.getNamaZodiak(id); if(n)return n} return String(id||'-')}
function getPenguasa(z){ if(window.getPenguasaZodiak){const r=window.getPenguasaZodiak(z); return Array.isArray(r)?r:[]} const d=window.DB_ZODIAK_PENGUASA?.[z]; return d?.penguasa||[] }
function badgeClass(status){status=String(status||'').toLowerCase(); if(status.includes('saad')||status.includes('sa‘ad')||status==='saad')return 'saad'; if(status.includes('nahas')||status==='nahas')return 'nahas'; if(status.includes('campuran'))return 'campuran'; return 'netral'}
function buatBaytManualKosong(){return Array.from({length:12},(_,i)=>({nomor:i+1,zodiak:ZODIAK_IDS[i]||'aries',statusPlanet:'tidak_ada',planetInput:[],mercuryAspek:'square',mercuryPlanetAspek:'saturn'}))}
function optionHTML(list,selected){return list.map(item=>Array.isArray(item)?`<option value="${item[0]}" ${item[0]===selected?'selected':''}>${item[1]}</option>`:`<option value="${item}" ${item===selected?'selected':''}>${item}</option>`).join('')}

function initBaytCards(){
  if(!baytData.length) baytData=buatBaytManualKosong();
  const c=$('baytContainer'); if(!c)return; c.innerHTML='';
  baytData.forEach((b,i)=>{
    const el=document.createElement('div'); el.className='bayt-card';
    el.innerHTML=`<h3>Bayt ${b.nomor}</h3>
      <div><label>Zodiak</label><select onchange="updateBayt(${i},'zodiak',this.value)">${ZODIAK_IDS.map(z=>`<option value="${z}" ${b.zodiak===z?'selected':''}>${zodiakLabel(z)}</option>`).join('')}</select></div>
      <div id="planetArea-${i}" class="planet-extra"></div>
      <div id="noteArea-${i}" class="small-note"></div>`;
    c.appendChild(el); renderPlanetArea(i);
  });
}
function renderPlanetArea(i){
  const b=baytData[i]; const area=$(`planetArea-${i}`); const note=$(`noteArea-${i}`); if(!area)return;
  const rulers=getPenguasa(b.zodiak); if(b.statusPlanet==='tidak_ada') b.planetInput=[]; if(b.statusPlanet==='ada'&&!b.planetInput.length)b.planetInput=['sun'];
  area.innerHTML=`<div class="planet-row">
    <div><label>Planet</label><select onchange="updateStatusPlanet(${i},this.value)"><option value="tidak_ada" ${b.statusPlanet==='tidak_ada'?'selected':''}>Tidak Ada</option><option value="ada" ${b.statusPlanet==='ada'?'selected':''}>Ada</option></select></div>
    <div><label>Ada/Tidak Ada</label><input readonly value="${b.statusPlanet==='ada'?'Ada planet/titik manual':'Tidak ada, pakai penguasa zodiak'}"></div>
    <div><label>Pilih Planet</label>${b.statusPlanet==='ada'?`<select onchange="updatePlanetInput(${i},0,this.value)">${optionHTML(PLANET_OPTIONS,b.planetInput[0]||'sun')}</select>`:`<input readonly value="${rulers.map(labelPlanet).join(', ')}">`}</div>
    <div>${b.statusPlanet==='ada'?`<button class="small-btn" type="button" onclick="tambahPlanetInput(${i})">+ Tambah</button>`:''}</div>
  </div><div id="tambahan-${i}"></div><div id="mercury-${i}"></div>`;
  renderTambahan(i); renderMercury(i);
  if(note) note.innerHTML=buatCatatanInputBayt(b).map(x=>`<div>${escapeHTML(x)}</div>`).join('');
}
function renderTambahan(i){ const b=baytData[i], box=$(`tambahan-${i}`); if(!box||b.statusPlanet!=='ada')return; box.innerHTML=b.planetInput.slice(1).map((pid,idx)=>{const j=idx+1;return `<div class="planet-row"><div><label>Planet Tambahan</label><input readonly value="Tambahan ${j}"></div><div><label>Pilih Planet</label><select onchange="updatePlanetInput(${i},${j},this.value)">${optionHTML(PLANET_OPTIONS,pid)}</select></div><div></div><div><button class="small-btn" type="button" onclick="hapusPlanetInput(${i},${j})">Hapus</button></div></div>`}).join('') }
function renderMercury(i){ const b=baytData[i], box=$(`mercury-${i}`); if(!box)return; const aktif=hitungPlanetAktifBayt(b).planetAktif; const hanya=aktif.length===1&&aktif[0]==='mercury'; if(!hanya){box.innerHTML='';return} box.innerHTML=`<div class="mercury-row"><div><label>Pilihan Aspek Merkurius</label><select onchange="updateBayt(${i},'mercuryAspek',this.value)">${optionHTML(ASPEK_OPTIONS,b.mercuryAspek)}</select></div><div><label>Planet Aspeknya</label><select onchange="updateBayt(${i},'mercuryPlanetAspek',this.value)">${PLANET_ASPEK.map(p=>`<option value="${p}" ${b.mercuryPlanetAspek===p?'selected':''}>${labelPlanet(p)}</option>`).join('')}</select></div></div>` }
function buatCatatanInputBayt(b){ const rulers=getPenguasa(b.zodiak), zl=zodiakLabel(b.zodiak); if(b.statusPlanet==='tidak_ada') return [`${rulers.map(labelPlanet).join(', ')} otomatis dipakai karena penguasa ${zl}.`]; let out=[]; if(b.planetInput.includes('ac')) out.push(`AC berada di ${zl}, maka penguasanya ikut dibaca: ${rulers.map(labelPlanet).join(', ')}.`); if(b.planetInput.includes('mc')) out.push(`MC berada di ${zl}, maka penguasanya ikut dibaca: ${rulers.map(labelPlanet).join(', ')}.`); return out }
window.updateBayt=(i,k,v)=>{baytData[i][k]=v;renderPlanetArea(i)};
window.updateStatusPlanet=(i,v)=>{baytData[i].statusPlanet=v;if(v==='ada'&&!baytData[i].planetInput.length)baytData[i].planetInput=['sun']; if(v==='tidak_ada')baytData[i].planetInput=[]; renderPlanetArea(i)};
window.updatePlanetInput=(i,j,v)=>{baytData[i].planetInput[j]=v;renderPlanetArea(i)};
window.tambahPlanetInput=(i)=>{baytData[i].planetInput.push('moon');renderPlanetArea(i)};
window.hapusPlanetInput=(i,j)=>{baytData[i].planetInput.splice(j,1);renderPlanetArea(i)};

function sumberPlanetBayt(b,pid){ const zl=zodiakLabel(b.zodiak), rulers=getPenguasa(b.zodiak); if(b.statusPlanet==='tidak_ada'&&rulers.includes(pid)) return `${labelPlanet(pid)} (Penguasa Bayt | ${zl})`; if(b.statusPlanet==='ada'){ if(b.planetInput.includes(pid)){ if(pid==='ac')return `AC (Planet/Titik manual | ${zl})`; if(pid==='mc')return `MC (Planet/Titik manual | ${zl})`; return `${labelPlanet(pid)} (Planet manual | ${zl})` } if(b.planetInput.includes('ac')&&rulers.includes(pid))return `${labelPlanet(pid)} (Tambahan dari AC | ${zl})`; if(b.planetInput.includes('mc')&&rulers.includes(pid))return `${labelPlanet(pid)} (Tambahan dari MC | ${zl})` } return `${labelPlanet(pid)} (${zl})` }
function hitungPlanetAktifBayt(b){ const rulers=getPenguasa(b.zodiak); let planetAktif=[], ket=[]; if(b.statusPlanet==='tidak_ada'){planetAktif=[...rulers];ket.push(`${rulers.map(labelPlanet).join(', ')} penguasa ${zodiakLabel(b.zodiak)}`)} else {planetAktif=[...b.planetInput]; if(b.planetInput.includes('ac')){planetAktif.push(...rulers);ket.push(`AC | ${zodiakLabel(b.zodiak)} | planet penguasanya: ${rulers.map(labelPlanet).join(', ')}`)} if(b.planetInput.includes('mc')){planetAktif.push(...rulers);ket.push(`MC | ${zodiakLabel(b.zodiak)} | planet penguasanya: ${rulers.map(labelPlanet).join(', ')}`)}} return {planetAktif:unique(planetAktif),keterangan:ket} }
function getPoinPlanetAktif(pid,b){ if(pid==='mercury'){ let h=window.hakimMerkurius?window.hakimMerkurius(b.mercuryAspek,b.mercuryPlanetAspek):null; if(h){return {id:'mercury',nama:'Merkurius',keadaan:h.status==='saad'?'Sa‘ad':h.status==='nahas'?'Nahas':'Netral',status:h.status,poin:Number(h.poin)||0,keterangan:h.keterangan,label:h.label}} }
  const p=window.getPoinPlanet?window.getPoinPlanet(pid):null; if(p) return {id:pid,nama:p.nama,keadaan:p.keadaan,status:p.status,poin:Number(p.poin)||0,keterangan:p.keterangan}; return {id:pid,nama:labelPlanet(pid),keadaan:'Netral',status:'netral',poin:0,keterangan:''} }
function buildEventChart(){ return baytData.map(b=>{const h=hitungPlanetAktifBayt(b); const poinPlanet=h.planetAktif.map(pid=>({...getPoinPlanetAktif(pid,b),sumber:sumberPlanetBayt(b,pid)})); const analisa=analisaDominasi(poinPlanet); return {...b,planetAktif:h.planetAktif,planetSumber:h.planetAktif.map(pid=>sumberPlanetBayt(b,pid)),poinPlanet,keterangan:h.keterangan,analisa}}) }
function analisaDominasi(poinPlanet){ if(window.analisaDominasiPlanet){ const a=window.analisaDominasiPlanet(poinPlanet); return {...a,label:a.status}; } let s=0,n=0; (poinPlanet||[]).forEach(p=>{if(p.poin>0)s+=p.poin; if(p.poin<0)n+=Math.abs(p.poin)}); const total=s-n; if(s>0&&n>0&&s===n)return{status:'Sa‘ad dan Nahas',label:'Sa‘ad dan Nahas',kelas:'campuran',total,totalSaad:s,totalNahas:n,tafsirMode:'berimbang'}; if(s>n)return{status:s&&n?'Sa‘ad dominan':'Sa‘ad',label:s&&n?'Sa‘ad dominan':'Sa‘ad',kelas:'saad',total,totalSaad:s,totalNahas:n}; if(n>s)return{status:s&&n?'Nahas dominan':'Nahas',label:s&&n?'Nahas dominan':'Nahas',kelas:'nahas',total,totalSaad:s,totalNahas:n}; return{status:'Netral',label:'Netral',kelas:'netral',total,totalSaad:s,totalNahas:n} }
function hitungRumahDariBayt(start,rumah){return ((Number(start)+Number(rumah)-2)%12)+1}
function buildPlanetDariBulan(){ const posisi=eventChartAktif.find(b=>b.planetAktif.includes('moon')); if(!posisi)return[]; return Array.from({length:12},(_,idx)=>{const rumahKe=idx+1, nomor=hitungRumahDariBayt(posisi.nomor,rumahKe), d=eventChartAktif.find(x=>x.nomor===nomor); return {label:rumahKe===1?'Posisi Bulan':`Rumah ke-${rumahKe} dari Bulan`,rumahKe,baytKe:nomor,zodiak:d?.zodiak,zodiakLabel:zodiakLabel(d?.zodiak),planetAktif:d?.planetAktif||[],planetSumber:d?.planetSumber||[],poinPlanet:d?.poinPlanet||[],keterangan:d?.keterangan||[],analisa:d?.analisa||analisaDominasi([])}}) }
function ambilDataUntukDalil(dalil){
  if(dalil.sumberBaca==='dari_bulan'){const row=planetDariBulan.find(x=>x.rumahKe===Number(dalil.rumahDariBulan));return {...row,sumberLabel:'Planet dari Posisi Bulan',detailLabel:row?.label,keteranganDalil:dalil.keteranganDalil}}
  if(dalil.sumberBaca==='planet_langsung'&&dalil.planetLangsung){const b=eventChartAktif.find(x=>x.planetAktif.includes(dalil.planetLangsung)); if(!b)return emptyData(dalil,'Planet langsung'); const poin=b.poinPlanet.filter(p=>p.id===dalil.planetLangsung); const idx=b.planetAktif.indexOf(dalil.planetLangsung); return {baytKe:b.nomor,zodiak:b.zodiak,zodiakLabel:b.zodiakLabel,planetAktif:[dalil.planetLangsung],planetSumber:[b.planetSumber[idx]||labelPlanet(dalil.planetLangsung)],poinPlanet:poin,keterangan:b.keterangan,sumberLabel:'Planet langsung',detailLabel:`${labelPlanet(dalil.planetLangsung)} sebagai indikator`,keteranganDalil:dalil.keteranganDalil}}
  if(dalil.gunakanPenguasaBaytPlanet&&dalil.baytTempatPlanet){const b=eventChartAktif.find(x=>x.planetAktif.includes(dalil.baytTempatPlanet)); if(!b)return emptyData(dalil,'Event Chart'); const rulers=getPenguasa(b.zodiak); const poin=rulers.map(pid=>({...getPoinPlanetAktif(pid,b),sumber:`${labelPlanet(pid)} (Penguasa rumah tempat ${labelPlanet(dalil.baytTempatPlanet)} berada | ${zodiakLabel(b.zodiak)})`})); return {baytKe:b.nomor,zodiak:b.zodiak,zodiakLabel:b.zodiakLabel,planetAktif:rulers,planetSumber:poin.map(p=>p.sumber),poinPlanet:poin,keterangan:[`Penguasa ${zodiakLabel(b.zodiak)} sebagai akhir urusan majelis`],sumberLabel:'Event Chart',detailLabel:`Penguasa Bayt tempat ${labelPlanet(dalil.baytTempatPlanet)} berada`,keteranganDalil:dalil.keteranganDalil}}
  const b=eventChartAktif.find(x=>x.nomor===Number(dalil.baytUtama)); if(!b)return emptyData(dalil,'Event Chart'); return {baytKe:b.nomor,zodiak:b.zodiak,zodiakLabel:b.zodiakLabel,planetAktif:b.planetAktif,planetSumber:b.planetSumber,poinPlanet:b.poinPlanet,keterangan:b.keterangan,sumberLabel:'Event Chart',detailLabel:`Bayt ${b.nomor}`,keteranganDalil:dalil.keteranganDalil}
}
function emptyData(dalil,sumber){return{baytKe:'-',zodiak:'',zodiakLabel:'-',planetAktif:[],planetSumber:[],poinPlanet:[],keterangan:['Data belum ditemukan'],sumberLabel:sumber,detailLabel:'-',keteranganDalil:dalil.keteranganDalil}}
function susunTafsir(dalil,analisa){ if(window.susunTafsirKunciDalil)return window.susunTafsirKunciDalil(dalil,analisa); const tk=dalil.tafsirKunci||{}; if(analisa.tafsirMode==='berimbang')return `<b>Berita Sa‘ad:</b> ${escapeHTML(tk.saad||'')}<br><br><b>Berita Nahas:</b> ${escapeHTML(tk.nahas||'')}`; if(analisa.kelas==='saad')return escapeHTML(tk.saad||''); if(analisa.kelas==='nahas')return escapeHTML(tk.nahas||''); return escapeHTML(tk.netral||'') }

function enterInput(){
  eventChartAktif=buildEventChart(); planetDariBulan=buildPlanetDariBulan(); hasilDalil=buildHasilDalil();
  $('identitasHasil').innerHTML=`<strong>Kegiatan:</strong> ${escapeHTML($('namaKegiatan').value||'-')}<br><strong>Penanya:</strong> ${escapeHTML($('namaPenanya').value||'-')}`;
  renderEventChart(); renderMoon(); renderDalil(); renderResume(); renderStatistik(); renderPendukungData(); showPage('mainPage','hasilSection');
}
function buildHasilDalil(){ const dalils=window.getSemuaDalilJamuan?window.getSemuaDalilJamuan():(window.DB_TAFSIR_25_DALIL||[]); return dalils.map(dalil=>{const data=ambilDataUntukDalil(dalil); const analisa=analisaDominasi(data.poinPlanet); const tafsir=susunTafsir(dalil,analisa); return {dalil,data,analisa,tafsir,nilai:analisa.total}})}
function renderEventChart(){
  const html = eventChartAktif.map(b => `
    <div class="data-mini-card event-mini-card">
      <div class="mini-head">
        <h4>Bayt ${b.nomor}</h4>
        <span class="mini-badge">${escapeHTML(zodiakLabel(b.zodiak))}</span>
      </div>

      <div class="mini-row">
        <b>Zodiak</b>
        <span>${escapeHTML(zodiakLabel(b.zodiak))}</span>
      </div>

      <div class="mini-row">
        <b>Planet Aktif</b>
        <div class="mini-stack">
          ${b.planetSumber.map(s => `<span class="tag">${escapeHTML(s)}</span>`).join('')}
        </div>
      </div>

      <div class="mini-row">
        <b>Sa‘ad/Nahas</b>
        <div class="mini-stack">
          ${b.poinPlanet.map(p => `<span class="badge ${badgeClass(p.status)}">${escapeHTML(p.keadaan)} (${formatPoin(p.poin)})</span>`).join('')}
        </div>
      </div>

      <div class="mini-row">
        <b>Keterangan</b>
        <span>${escapeHTML((b.keterangan || []).join('; ') || 'Planet manual / input')}</span>
      </div>
    </div>
  `).join('');

  $('eventChartOutput').innerHTML = `<div class="mobile-card-list">${html}</div>`;
}

function renderMoon(){
  const posisi = eventChartAktif.find(b => b.planetAktif.includes('moon'));

  if(!posisi){
    $('moonOutput').innerHTML = '<p class="empty-note">Bulan belum ditemukan.</p>';
    return;
  }

  const rows = planetDariBulan.map(r => `
    <div class="data-mini-card moon-mini-card">
      <div class="mini-head">
        <h4>${escapeHTML(r.label)}</h4>
        <span class="mini-badge">Bayt ${r.baytKe}</span>
      </div>

      <div class="mini-row">
        <b>Bayt ke</b>
        <span>Bayt ${r.baytKe}</span>
      </div>

      <div class="mini-row">
        <b>Zodiak</b>
        <span>${escapeHTML(r.zodiakLabel)}</span>
      </div>

      <div class="mini-row">
        <b>Planet Aktif</b>
        <div class="mini-stack">
          ${r.planetSumber.map(s => `<span class="tag">${escapeHTML(s)}</span>`).join('')}
        </div>
      </div>

      <div class="mini-row">
        <b>Sa‘ad/Nahas</b>
        <div class="mini-stack">
          ${r.poinPlanet.map(p => `<span class="badge ${badgeClass(p.status)}">${escapeHTML(p.keadaan)} (${formatPoin(p.poin)})</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  $('moonOutput').innerHTML = `
    <div class="moon-position-note">
      <strong>Bulan berada di Bayt ${posisi.nomor}</strong><br>
      Zodiak: ${escapeHTML(zodiakLabel(posisi.zodiak))}<br>
      Planet aktif: ${posisi.planetSumber.map(escapeHTML).join(', ')}
    </div>
    <div class="mobile-card-list">${rows}</div>
  `;
}

function renderDalil(){ $('dalilContainer').innerHTML=hasilDalil.map(h=>{const id='detailDalil'+h.dalil.id; return `<article class="dalil-card"><div class="dalil-head"><h4>${h.dalil.id}. ${escapeHTML(h.dalil.judul)}</h4><span class="badge ${h.analisa.kelas}">${escapeHTML(h.analisa.status)}</span></div><div class="score">${formatPoin(h.nilai)}</div><div class="tafsir-kunci"><b>Tafsir Kunci</b><br>${h.tafsir}${renderTafsirPlanet(h.data.planetAktif)}</div><div class="action-row"><button class="small-btn" type="button" onclick="toggleBox('${id}',this)">Open Data yang Dibaca</button></div><div id="${id}" class="detail-box hidden">${dataYangDibacaHTML(h)}</div></article>`}).join('') }
function renderTafsirPlanet(ids){ const arr=unique(ids).filter(x=>!['ac','mc'].includes(x)); if(!arr.length)return ''; const text=arr.map(id=>{const t=window.getTafsirPlanetJamuan?window.getTafsirPlanetJamuan(id):window.DB_TAFSIR_PLANET_JAMUAN?.[id]; return t?`<p><b>${escapeHTML(t.planet||labelPlanet(id))}:</b> ${escapeHTML(t.interpretasiJamuan)}</p>`:''}).join(''); return text?`<div style="margin-top:8px">${text}</div>`:'' }
function dataYangDibacaHTML(h){ const d=h.data; return `<b>Data yang Dibaca</b><br>Sumber Data: ${escapeHTML(d.sumberLabel)}<br>Label: ${escapeHTML(d.detailLabel)}<br>Peruntukan: ${escapeHTML(d.keteranganDalil||'')}<br>Jatuh pada: Bayt ${escapeHTML(d.baytKe)}<br>Zodiak: ${escapeHTML(d.zodiakLabel||zodiakLabel(d.zodiak))}<br>Planet Aktif: ${d.planetSumber.length?d.planetSumber.map(escapeHTML).join(', '):'Info: Tidak ada planet aktif yang terbaca.'}<br>Sa‘ad/Nahas: ${d.poinPlanet.map(p=>`${escapeHTML(p.nama)} = ${escapeHTML(p.keadaan)} (${formatPoin(p.poin)})`).join('; ')}<br>Poin: ${formatPoin(h.nilai)}<br>Dominasi: Sa‘ad ${h.analisa.totalSaad} | Nahas ${h.analisa.totalNahas}<br>Sumber/Keterangan: ${escapeHTML((d.keterangan||[]).join('; ')||'Planet manual / input')}` }
function renderResume(){ $('printDalilSummaryOutput').innerHTML=hasilDalil.map(h=>`<div class="resume-item"><h4>${h.dalil.id}. ${escapeHTML(h.dalil.judul)}</h4><p>${h.tafsir.replace(/<[^>]+>/g,'')}</p></div>`).join('') }
function renderStatistik(){ let total=0,s=0,n=0,ne=0; hasilDalil.forEach(h=>{total+=h.nilai; if(h.analisa.kelas==='saad')s++; else if(h.analisa.kelas==='nahas')n++; else ne++;}); $('totalNilai').textContent=formatPoin(total); $('jumlahSaad').textContent=s; $('jumlahNahas').textContent=n; $('jumlahNetral').textContent=ne; }
function renderPendukungData(){ renderPoin(); renderZodiak(); renderTafsirPendukung() }
function renderPoin(){
  const rows = Object.values(window.DB_POIN_PLANET || {}).map(p => `
    <div class="support-item">
      <h4>${escapeHTML(p.nama)} ${p.arab ? '/ ' + escapeHTML(p.arab) : ''}</h4>
      <p><b>Keadaan:</b> ${escapeHTML(p.keadaan)}</p>
      <p><b>Status:</b> ${escapeHTML(p.status)}</p>
      <p><b>Poin:</b> ${formatPoin(p.poin)}</p>
    </div>
  `).join('');

  $('pdPoin').innerHTML = `<div class="support-list">${rows}</div>`;
}

function renderZodiak(){
  const rows = Object.values(window.DB_ZODIAK_PENGUASA || {}).map(z => `
    <div class="support-item">
      <h4>${escapeHTML(z.nama)} ${z.arab ? '/ ' + escapeHTML(z.arab) : ''}</h4>
      <p><b>Planet Penguasa:</b> ${(z.penguasa || []).map(labelPlanet).join(', ')}</p>
      <p>${escapeHTML(z.keterangan || '')}</p>
    </div>
  `).join('');

  $('pdZodiak').innerHTML = `<div class="support-list">${rows}</div>`;
}

function renderTafsirPendukung(){
  const rows = Object.values(window.DB_TAFSIR_PLANET_JAMUAN || {}).map(t => `
    <div class="support-item tafsir-support-item">
      <h4>${escapeHTML(t.planet)} ${t.arab ? '/ ' + escapeHTML(t.arab) : ''}</h4>
      <p><b>Interpretasi Umum:</b><br>${escapeHTML(t.interpretasiUmum)}</p>
      <p><b>Interpretasi Jamuan:</b><br>${escapeHTML(t.interpretasiJamuan)}</p>
    </div>
  `).join('');

  $('pdTafsir').innerHTML = `<div class="support-list">${rows}</div>`;
}

function resetOutput(){eventChartAktif=[];planetDariBulan=[];hasilDalil=[];$('identitasHasil').innerHTML='Belum ada hasil. Tekan Isi Contoh Event Chart lalu Enter Input.';$('eventChartOutput').innerHTML='';$('moonOutput').innerHTML='';$('dalilContainer').innerHTML='';$('printDalilSummaryOutput').innerHTML='';$('totalNilai').textContent='0';$('jumlahSaad').textContent='0';$('jumlahNetral').textContent='0';$('jumlahNahas').textContent='0'}
window.isiContohEventChart=()=>{ $('namaKegiatan').value='Pernikahan'; $('namaPenanya').value='Ali'; baytData=JSON.parse(JSON.stringify(CONTOH_EVENT_CHART)); initBaytCards(); $('inputCardContent').classList.remove('hidden'); $('inputCardBtn').textContent='Close'; enterInput(); };
window.resetInput=()=>{ $('namaKegiatan').value=''; $('namaPenanya').value=''; baytData=buatBaytManualKosong(); initBaytCards(); resetOutput(); };
window.enterInput=enterInput;
window.toggleBox=(id,btnOrId)=>{ const el=$(id); if(!el)return; el.classList.toggle('hidden'); const btn=typeof btnOrId==='string'?$(btnOrId):btnOrId; if(btn) btn.textContent=el.classList.contains('hidden')?(String(btn.textContent).includes('Data')?'Open Data yang Dibaca':'Open'):(String(btn.textContent).includes('Data')?'Close Data yang Dibaca':'Close') };
window.showPage=(pageId,anchorId)=>{document.querySelectorAll('.page-section').forEach(p=>p.classList.remove('active')); const p=$(pageId); if(p)p.classList.add('active'); setTimeout(()=>{const a=$(anchorId)||p; if(a)a.scrollIntoView({behavior:'smooth',block:'start'})},40)};
window.printHasil=()=>{const pc=$('printDalilSummaryContent'); if(pc)pc.classList.remove('hidden'); if(window.AndroidPrint&&typeof window.AndroidPrint.printPage==='function')window.AndroidPrint.printPage(); else window.print();};

document.addEventListener('DOMContentLoaded',()=>{
  initBaytCards();
  renderPendukungData();
  resetOutput();

  // Revisi: Resume Tafsir default hide.
  // Tetap terbuka otomatis saat tombol Print dipakai melalui printHasil().
  const resumeContent = $('printDalilSummaryContent');
  const resumeBtn = $('printSummaryBtn');

  if (resumeContent) {
    resumeContent.classList.add('hidden');
  }

  if (resumeBtn) {
    resumeBtn.textContent = 'Open';
  }
});
})();
