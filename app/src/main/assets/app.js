const PLANET_OPTIONS=[["sun","Matahari / Syams"],["moon","Bulan / Qamar"],["mercury","Merkurius / ‘Utharid"],["venus","Venus / Zuhrah"],["mars","Mars / Mirrikh"],["jupiter","Jupiter / Musytari"],["saturn","Saturnus / Zuhal"],["uranus","Uranus"],["neptune","Neptunus"],["pluto","Pluto"],["ac","AC / Ascendant"],["mc","MC / Midheaven"]];
    const ASPEK_MERKURIUS_OPTIONS=[["trine","Trine"],["sextile","Sextile"],["conjunction","Conjunction"],["square","Square"],["opposition","Opposition"]];
    const CONTOH_EVENT_CHART=[
      {nomor:1,zodiak:"leo",statusPlanet:"ada",planetInput:["ac"],mercuryAspek:"square",mercuryPlanetAspek:"saturn"},
      {nomor:2,zodiak:"virgo",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"square",mercuryPlanetAspek:"saturn"},
      {nomor:3,zodiak:"libra",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:4,zodiak:"scorpio",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:5,zodiak:"sagittarius",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:6,zodiak:"capricorn",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:7,zodiak:"aquarius",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:8,zodiak:"pisces",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:9,zodiak:"aries",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:10,zodiak:"taurus",statusPlanet:"ada",planetInput:["mc"],mercuryAspek:"",mercuryPlanetAspek:""},
      {nomor:11,zodiak:"gemini",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"square",mercuryPlanetAspek:"saturn"},
      {nomor:12,zodiak:"cancer",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"",mercuryPlanetAspek:""}
    ];
    function buatBaytManualKosong(){return Array.from({length:12},(_,i)=>({nomor:i+1,zodiak:"",statusPlanet:"tidak_ada",planetInput:[],mercuryAspek:"square",mercuryPlanetAspek:"saturn"}))}
    let baytData=buatBaytManualKosong();let eventChartAktif=[];let planetDariBulan=[];

    function escapeHTML(x){return String(x??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
    function labelPlanet(id){if(id==="mercury")return"Merkurius";const p=DB_POIN_PLANET[id]||{};return p.nama||id||"-"}
    function zodiakLabel(id){return id ? (DB_ZODIAK_PENGUASA[id]?.nama||id) : "-"}
    function getPenguasaZodiak(zodiak){return DB_ZODIAK_PENGUASA[zodiak]?.penguasa||[]}
    function unique(arr){return Array.from(new Set(arr.filter(Boolean)))}
    function formatPoin(n){return Number(n)>0 ? "+"+n : String(n)}
    function sumberPlanetBayt(b, pid){
      const zLabel = zodiakLabel(b.zodiak);
      const rulers = getPenguasaZodiak(b.zodiak);
      if(b.statusPlanet === "tidak_ada" && rulers.includes(pid)){
        return `${labelPlanet(pid)} (Penguasa Bayt | ${zLabel})`;
      }
      if(b.statusPlanet === "ada"){
        if(b.planetInput.includes(pid)){
          if(pid === "ac") return `AC (Planet/Titik manual | ${zLabel})`;
          if(pid === "mc") return `MC (Planet/Titik manual | ${zLabel})`;
          return `${labelPlanet(pid)} (Planet manual | ${zLabel})`;
        }
        if(b.planetInput.includes("ac") && rulers.includes(pid)){
          return `${labelPlanet(pid)} (Tambahan dari AC | ${zLabel})`;
        }
        if(b.planetInput.includes("mc") && rulers.includes(pid)){
          return `${labelPlanet(pid)} (Tambahan dari MC | ${zLabel})`;
        }
      }
      return `${labelPlanet(pid)} (${zLabel})`;
    }
    function statusKelas(status){return status==="saad"?"saad":status==="nahas"?"nahas":status==="campuran"?"campuran":"netral"}
    function analisaDominasiPlanet(poinPlanet){
      const positif=(poinPlanet||[]).filter(p=>p.poin>0);
      const negatif=(poinPlanet||[]).filter(p=>p.poin<0);
      const totalSaad=positif.reduce((s,p)=>s+p.poin,0);
      const totalNahas=Math.abs(negatif.reduce((s,p)=>s+p.poin,0));
      const total=totalSaad-totalNahas;

      if(totalSaad>0 && totalNahas>0){
        if(totalSaad===totalNahas){
          return{status:"Sa‘ad dan Nahas",kelas:"campuran",total,totalSaad,totalNahas,tafsirMode:"berimbang"};
        }
        if(totalSaad>totalNahas){
          return{status:"Sa‘ad dominan",kelas:"saad",total,totalSaad,totalNahas,tafsirMode:"saad_dominan"};
        }
        return{status:"Nahas dominan",kelas:"nahas",total,totalSaad,totalNahas,tafsirMode:"nahas_dominan"};
      }
      if(totalSaad>0)return{status:"Sa‘ad",kelas:"saad",total,totalSaad,totalNahas,tafsirMode:"saad"};
      if(totalNahas>0)return{status:"Nahas",kelas:"nahas",total,totalSaad,totalNahas,tafsirMode:"nahas"};
      return{status:"Netral",kelas:"netral",total,totalSaad,totalNahas,tafsirMode:"netral"};
    }
    function susunTafsirKunciDalil(dalil,analisa){
      const tk=dalil.tafsirKunci||{};
      if(analisa.tafsirMode==="berimbang"){
        return `<b>Berita Sa‘ad:</b> ${escapeHTML(tk.saad||"")}<br><br><b>Berita Nahas:</b> ${escapeHTML(tk.nahas||"")}`;
      }
      if(analisa.kelas==="saad")return escapeHTML(tk.saad||tk.netral||"");
      if(analisa.kelas==="nahas")return escapeHTML(tk.nahas||tk.netral||"");
      return escapeHTML(tk.netral||"");
    }

    function initBaytCards(){const c=document.getElementById("baytContainer");c.innerHTML="";if(!baytData.length){baytData=buatBaytManualKosong();}baytData.forEach((b,i)=>{const card=document.createElement("div");card.className="bayt-card";card.innerHTML=`<h3>Bayt ${b.nomor}</h3><div><label>Zodiak</label><select onchange="updateBayt(${i},'zodiak',this.value)"><option value="" ${!b.zodiak?'selected':''}>Pilih Zodiak</option>${Object.keys(DB_ZODIAK_PENGUASA).map(k=>`<option value="${k}" ${b.zodiak===k?'selected':''}>${zodiakLabel(k)}</option>`).join("")}</select></div><div style="height:10px"></div><div id="planetArea-${i}"></div><div id="noteArea-${i}" class="small-note"></div>`;c.appendChild(card);renderPlanetArea(i)})}
    function renderPlanetArea(i){const b=baytData[i];const area=document.getElementById(`planetArea-${i}`);const note=document.getElementById(`noteArea-${i}`);const firstPlanet=b.planetInput[0]||"";const rulers=getPenguasaZodiak(b.zodiak);if(b.statusPlanet==="tidak_ada")b.planetInput=[];area.innerHTML=`<div class="planet-row"><div><label>Planet</label><select onchange="updateStatusPlanet(${i},this.value)"><option value="tidak_ada" ${b.statusPlanet==="tidak_ada"?'selected':''}>Tidak Ada</option><option value="ada" ${b.statusPlanet==="ada"?'selected':''}>Ada</option></select></div><div><label>Ada/Tidak Ada</label><input readonly value="${b.statusPlanet==='ada'?'Ada planet/titik manual':'Tidak ada, pakai penguasa zodiak'}"></div><div><label>Pilih Planet</label>${b.statusPlanet==="ada"?`<select onchange="updatePlanetInput(${i},0,this.value)">${PLANET_OPTIONS.map(([id,label])=>`<option value="${id}" ${firstPlanet===id?'selected':''}>${label}</option>`).join("")}</select>`:`<input readonly value="${rulers.length ? rulers.map(labelPlanet).join(', ') : 'Pilih zodiak dulu'}">`}</div><div>${b.statusPlanet==="ada"?`<button class="small-btn" onclick="tambahPlanetInput(${i})">+ Tambah</button>`:``}</div></div><div id="planetTambahan-${i}"></div><div id="mercuryArea-${i}"></div>`;renderTambahanPlanet(i);renderMercuryArea(i);note.innerHTML=buatCatatanInputBayt(b).map(x=>`<div>${escapeHTML(x)}</div>`).join("")}
    function renderTambahanPlanet(i){const b=baytData[i];const box=document.getElementById(`planetTambahan-${i}`);if(!box||b.statusPlanet!=="ada")return;box.innerHTML=b.planetInput.slice(1).map((pid,idx)=>{const j=idx+1;return`<div class="planet-row" style="grid-template-columns:1fr 1.2fr auto"><div><label>Planet Tambahan</label><input readonly value="Tambahan ${j}"></div><div><label>Pilih Planet Tambahan</label><select onchange="updatePlanetInput(${i},${j},this.value)">${PLANET_OPTIONS.map(([id,label])=>`<option value="${id}" ${pid===id?'selected':''}>${label}</option>`).join("")}</select></div><div><button class="small-btn" onclick="hapusPlanetInput(${i},${j})">Hapus</button></div></div>`}).join("")}
    function renderMercuryArea(i){const b=baytData[i];const box=document.getElementById(`mercuryArea-${i}`);if(!box)return;const aktif=hitungPlanetAktifBayt(b);const hanyaMerkurius=aktif.planetAktif.length===1&&aktif.planetAktif[0]==="mercury";if(!hanyaMerkurius){box.innerHTML="";return}box.innerHTML=`<div class="mercury-row"><div><label>Pilihan Aspek Merkurius</label><select onchange="updateBayt(${i},'mercuryAspek',this.value)">${ASPEK_MERKURIUS_OPTIONS.map(([id,label])=>`<option value="${id}" ${b.mercuryAspek===id?'selected':''}>${label}</option>`).join("")}</select></div><div><label>Planet Aspeknya</label><select onchange="updateBayt(${i},'mercuryPlanetAspek',this.value)">${PLANET_OPTIONS.filter(([id])=>!["mercury","ac","mc"].includes(id)).map(([id,label])=>`<option value="${id}" ${b.mercuryPlanetAspek===id?'selected':''}>${label}</option>`).join("")}</select></div></div><div class="small-note">Kolom ini khusus untuk menghakimi Merkurius menjadi Sa‘ad/Nahas.</div>`}
    function buatCatatanInputBayt(b){const rulers=getPenguasaZodiak(b.zodiak);if(!b.zodiak)return["Pilih zodiak terlebih dahulu. Jika Planet = Tidak Ada, penguasa zodiak akan otomatis terisi."];if(b.statusPlanet==="tidak_ada")return[`${rulers.map(labelPlanet).join(", ")} otomatis dipakai karena penguasa ${zodiakLabel(b.zodiak)}.`];const notes=[];if(b.planetInput.includes("ac"))notes.push(`AC berada di ${zodiakLabel(b.zodiak)}, maka penguasanya ikut dibaca: ${rulers.map(labelPlanet).join(", ")}.`);if(b.planetInput.includes("mc"))notes.push(`MC berada di ${zodiakLabel(b.zodiak)}, maka penguasanya ikut dibaca: ${rulers.map(labelPlanet).join(", ")}.`);return notes}
    function updateBayt(i,key,value){baytData[i][key]=value;renderPlanetArea(i)}
    function updateStatusPlanet(i,value){baytData[i].statusPlanet=value;if(value==="ada"&&baytData[i].planetInput.length===0)baytData[i].planetInput=["sun"];if(value==="tidak_ada")baytData[i].planetInput=[];renderPlanetArea(i)}
    function updatePlanetInput(i,j,value){baytData[i].planetInput[j]=value;renderPlanetArea(i)}
    function tambahPlanetInput(i){baytData[i].planetInput.push("moon");renderPlanetArea(i)}
    function hapusPlanetInput(i,j){baytData[i].planetInput.splice(j,1);renderPlanetArea(i)}
    function isiContohEventChart(){document.getElementById("namaKegiatan").value="Pernikahan";document.getElementById("namaPenanya").value="Ali";baytData=JSON.parse(JSON.stringify(CONTOH_EVENT_CHART));initBaytCards();const inputContent=document.getElementById("inputCardContent");const inputBtn=document.getElementById("inputCardBtn");if(inputContent){inputContent.classList.remove("hidden");}if(inputBtn){inputBtn.textContent="Close";}enterInput()}
    function resetInput(){document.getElementById("namaKegiatan").value="";document.getElementById("namaPenanya").value="";baytData=buatBaytManualKosong();eventChartAktif=[];planetDariBulan=[];initBaytCards();document.getElementById("identitasHasil").innerHTML="Belum ada hasil. Silakan isi manual 12 Bayt lalu tekan Enter Input, atau gunakan tombol contoh.";document.getElementById("eventChartOutput").innerHTML="";document.getElementById("moonOutput").innerHTML="";document.getElementById("dalilContainer").innerHTML="";document.getElementById("printDalilSummaryOutput").innerHTML="";}
    function hitungPlanetAktifBayt(b){const rulers=getPenguasaZodiak(b.zodiak);let planetAktif=[];let keterangan=[];if(!b.zodiak){return{planetAktif:[],keterangan:["Zodiak belum dipilih"]}}if(b.statusPlanet==="tidak_ada"){planetAktif=[...rulers];keterangan.push(`${rulers.map(labelPlanet).join(", ")} penguasa ${zodiakLabel(b.zodiak)}`)}else{planetAktif=[...b.planetInput];if(b.planetInput.includes("ac")){planetAktif.push(...rulers);keterangan.push(`AC | ${zodiakLabel(b.zodiak)} | planet penguasanya: ${rulers.map(labelPlanet).join(", ")}`)}if(b.planetInput.includes("mc")){planetAktif.push(...rulers);keterangan.push(`MC | ${zodiakLabel(b.zodiak)} | planet penguasanya: ${rulers.map(labelPlanet).join(", ")}`)}}return{planetAktif:unique(planetAktif),keterangan}}
    function getPoinPlanet(pid,b){if(pid==="mercury"){const data=cariAspekMerkurius(b?.mercuryAspek,b?.mercuryPlanetAspek);if(data)return{nama:"Merkurius",status:data.statusMerkurius,keadaan:data.statusMerkurius==="saad"?"Sa‘ad":data.statusMerkurius==="nahas"?"Nahas":"Netral",poin:data.poinMerkurius,keterangan:data.keterangan};return{...DB_POIN_PLANET.mercury_netral,keterangan:"Merkurius belum dihukumi oleh aspek khusus."}}return DB_POIN_PLANET[pid]||{nama:pid,status:"netral",keadaan:"Netral",poin:0,keterangan:""}}
    function buildEventChartAktif(){return baytData.map(b=>{const hasil=hitungPlanetAktifBayt(b);const poinPlanet=hasil.planetAktif.map(pid=>({id:pid,...getPoinPlanet(pid,b)}));return{...b,planetAktif:hasil.planetAktif,planetSumber:hasil.planetAktif.map(pid=>sumberPlanetBayt(b,pid)),keterangan:hasil.keterangan,poinPlanet}})}
    function hitungRumahDariBayt(baytAwal,rumahKe){return((Number(baytAwal)+Number(rumahKe)-2)%12)+1}
    function buatPlanetDariPosisiBulan(){const posisi=eventChartAktif.find(b=>b.planetAktif.includes("moon"));if(!posisi)return[];return Array.from({length:12},(_,idx)=>{const rumahKe=idx+1;const nomor=hitungRumahDariBayt(posisi.nomor,rumahKe);const data=eventChartAktif.find(b=>b.nomor===nomor);return{label:rumahKe===1?"Posisi Bulan":`Rumah ke-${rumahKe} dari Bulan`,rumahKe,baytKe:nomor,zodiak:data.zodiak,planetAktif:data.planetAktif,planetSumber:data.planetSumber,poinPlanet:data.poinPlanet,keterangan:data.keterangan}})}
    function enterInput(){if(!baytData.length){baytData=buatBaytManualKosong();initBaytCards();}eventChartAktif=buildEventChartAktif();planetDariBulan=buatPlanetDariPosisiBulan();document.getElementById("identitasHasil").innerHTML=`<strong>Kegiatan:</strong> ${escapeHTML(document.getElementById("namaKegiatan").value||"-")}<br><strong>Penanya:</strong> ${escapeHTML(document.getElementById("namaPenanya").value||"-")}`;renderEventChart();renderMoonPosition();renderDalil();renderPrintDalilSummary();renderPendukungData();document.getElementById("hasilSection").scrollIntoView({behavior:"smooth"})}
    function renderEventChart(){const rows=eventChartAktif.map(b=>{const status=b.poinPlanet.map(p=>`<span class="badge ${statusKelas(p.status)}">${escapeHTML(p.keadaan)} (${formatPoin(p.poin)})</span>`).join(" ");const planets=(b.planetSumber||b.planetAktif.map(pid=>labelPlanet(pid))).map(txt=>`<span class="tag">${escapeHTML(txt)}</span>`).join("");return`<tr><td>Bayt ${b.nomor}</td><td>${escapeHTML(zodiakLabel(b.zodiak))}</td><td>${planets}</td><td>${status}</td><td>${escapeHTML(b.keterangan.join("; ")||"Planet manual / data input")}</td></tr>`}).join("");document.getElementById("eventChartOutput").innerHTML=`<table><thead><tr><th>Bayt ke</th><th>Zodiak</th><th>Planet Aktif</th><th>Sa‘ad/Nahas</th><th>Keterangan</th></tr></thead><tbody>${rows}</tbody></table>`}
    function renderMoonPosition(){const posisi=eventChartAktif.find(b=>b.planetAktif.includes("moon"));if(!posisi){document.getElementById("moonOutput").innerHTML="Bulan tidak ditemukan dalam Event Chart.";return}const rows=planetDariBulan.map(row=>`<tr><td>${escapeHTML(row.label)}</td><td>Bayt ${row.baytKe}</td><td>${escapeHTML(zodiakLabel(row.zodiak))}</td><td>${(row.planetSumber||row.planetAktif.map(pid=>labelPlanet(pid))).map(txt=>`<span class="tag">${escapeHTML(txt)}</span>`).join("")}</td><td>${row.poinPlanet.map(p=>`<span class="badge ${statusKelas(p.status)}">${escapeHTML(p.keadaan)} (${formatPoin(p.poin)})</span>`).join(" ")}</td></tr>`).join("");document.getElementById("moonOutput").innerHTML=`<p class="section-sub"><strong>Bulan berada di Bayt ${posisi.nomor}</strong><br>Zodiak: ${escapeHTML(zodiakLabel(posisi.zodiak))}<br>Planet aktif: ${posisi.planetAktif.map(labelPlanet).join(", ")}</p><table><thead><tr><th>Label</th><th>Bayt ke</th><th>Zodiak</th><th>Planet Aktif</th><th>Sa‘ad/Nahas</th></tr></thead><tbody>${rows}</tbody></table>`}
    function ambilDataUntukDalil(dalil){
      if(dalil.sumberBaca==="dari_bulan"){
        const row=planetDariBulan.find(x=>x.rumahKe===dalil.rumahDariBulan);
        return{...row,sumberLabel:"Planet dari Posisi Bulan",detailLabel:row?.label,keteranganDalil:dalil.keteranganDalil};
      }

      if(dalil.sumberBaca==="planet_langsung" && dalil.planetLangsung){
        const b=eventChartAktif.find(x=>x.planetAktif.includes(dalil.planetLangsung));
        if(!b)return{baytKe:"-",zodiak:"",planetAktif:[],planetSumber:[],poinPlanet:[],keterangan:["Planet acuan tidak ditemukan"],sumberLabel:"Planet langsung",detailLabel:dalil.planetLangsung,keteranganDalil:dalil.keteranganDalil};
        const idx=b.planetAktif.indexOf(dalil.planetLangsung);
        const sumber=b.planetSumber?.[idx] || labelPlanet(dalil.planetLangsung);
        const poin=b.poinPlanet.filter(p=>p.id===dalil.planetLangsung);
        return{baytKe:b.nomor,zodiak:b.zodiak,planetAktif:[dalil.planetLangsung],planetSumber:[sumber],poinPlanet:poin,keterangan:b.keterangan,sumberLabel:"Planet langsung",detailLabel:`${labelPlanet(dalil.planetLangsung)} sebagai indikator`,keteranganDalil:dalil.keteranganDalil};
      }

      if(dalil.gunakanPenguasaBaytPlanet && dalil.baytTempatPlanet){
        const bPlanet=eventChartAktif.find(x=>x.planetAktif.includes(dalil.baytTempatPlanet));
        const rulers=getPenguasaZodiak(bPlanet?.zodiak);
        const poinPlanet=rulers.map(pid=>({id:pid,...getPoinPlanet(pid,bPlanet)}));
        return{baytKe:bPlanet?.nomor,zodiak:bPlanet?.zodiak,planetAktif:rulers,planetSumber:rulers.map(pid=>`${labelPlanet(pid)} (Penguasa rumah tempat ${labelPlanet(dalil.baytTempatPlanet)} berada | ${zodiakLabel(bPlanet?.zodiak)})`),poinPlanet,keterangan:[`Penguasa ${zodiakLabel(bPlanet?.zodiak)} sebagai akhir urusan majelis`],sumberLabel:"Event Chart",detailLabel:`Penguasa Bayt tempat ${labelPlanet(dalil.baytTempatPlanet)} berada`,keteranganDalil:dalil.keteranganDalil};
      }

      const b=eventChartAktif.find(x=>x.nomor===dalil.baytUtama);
      return{baytKe:b?.nomor,zodiak:b?.zodiak,planetAktif:b?.planetAktif||[],planetSumber:b?.planetSumber||[],poinPlanet:b?.poinPlanet||[],keterangan:b?.keterangan||[],sumberLabel:"Event Chart",detailLabel:`Bayt ${b?.nomor||"-"}`,keteranganDalil:dalil.keteranganDalil};
    }
    function renderDalil(){const c=document.getElementById("dalilContainer");c.innerHTML="";let total=0,saad=0,nahas=0,netral=0;DB_TAFSIR_25_DALIL.forEach(dalil=>{const data=ambilDataUntukDalil(dalil);const analisa=analisaDominasiPlanet(data.poinPlanet||[]);const nilai=analisa.total;const st={status:analisa.status,kelas:analisa.kelas};total+=nilai;if(st.kelas==="saad")saad++;else if(st.kelas==="nahas")nahas++;else netral++;const tafsirHTML=susunTafsirKunciDalil(dalil,analisa);const detailId=`detailDalil${dalil.id}`;const btnId=`btnDalil${dalil.id}`;const planetJamuan=(data.planetAktif||[]).map(pid=>{const taf=DB_TAFSIR_PLANET_JAMUAN[pid==="mercury"?"mercury":pid];return taf?`<p><b>${escapeHTML(taf.planet)}:</b> ${escapeHTML(taf.interpretasiJamuan)}</p>`:""}).join("");const el=document.createElement("div");el.className="dalil-card";el.innerHTML=`<div class="dalil-head"><h3>${dalil.id}. ${escapeHTML(dalil.judul)}</h3><span class="badge ${st.kelas}">${st.status}</span></div><div class="score">${nilai>0?"+":""}${nilai}</div><div class="tafsir-kunci"><b>Tafsir Kunci</b><br>${tafsirHTML}${planetJamuan?`<div style="margin-top:8px">${planetJamuan}</div>`:""}</div><div style="margin-top:10px"><button id="${btnId}" class="small-btn" onclick="toggleBox('${detailId}','${btnId}')">Open Data yang Dibaca</button></div><div id="${detailId}" class="detail-box hidden"><b>Data yang Dibaca</b><br>Sumber Data: ${escapeHTML(data.sumberLabel)}<br>Label: ${escapeHTML(data.detailLabel)}<br>Peruntukan: ${escapeHTML(data.keteranganDalil||"")}<br>Jatuh pada: Bayt ${data.baytKe||"-"}<br>Zodiak: ${escapeHTML(zodiakLabel(data.zodiak))}<br>Planet Aktif: ${(data.planetSumber&&data.planetSumber.length?data.planetSumber:(data.planetAktif||[]).map(labelPlanet)).join(", ")}<br>
            ${((data.planetAktif||[]).length===0) ? "Info: Tidak ada planet aktif yang terbaca.<br>" : ""}
            Sa‘ad/Nahas: ${(data.poinPlanet||[]).map(p=>`${p.nama} = ${p.keadaan} (${formatPoin(p.poin)})`).join("; ")}<br>
            Poin: ${formatPoin(nilai)}<br>
            Dominasi: Sa‘ad ${analisa.totalSaad} | Nahas ${analisa.totalNahas}<br>Sumber/Keterangan: ${escapeHTML((data.keterangan||[]).join("; ")||"Planet manual / input")}</div>`;c.appendChild(el)});document.getElementById("totalNilai").textContent=total>0?"+"+total:String(total);document.getElementById("jumlahSaad").textContent=saad;document.getElementById("jumlahNetral").textContent=netral;document.getElementById("jumlahNahas").textContent=nahas}

    function renderPrintDalilSummary(){
      const out=document.getElementById("printDalilSummaryOutput");
      if(!out)return;
      out.innerHTML="";
      DB_TAFSIR_25_DALIL.forEach(dalil=>{
        const data=ambilDataUntukDalil(dalil);
        const analisa=analisaDominasiPlanet(data.poinPlanet||[]);
        const tafsirHTML=susunTafsirKunciDalil(dalil,analisa);
        const div=document.createElement("div");
        div.className="print-summary-item";
        div.innerHTML=`<h4>${dalil.id}. ${escapeHTML(dalil.judul)}</h4><p>${tafsirHTML}</p>`;
        out.appendChild(div);
      });
    }

    function renderPendukungData(){const poinRows=Object.values(DB_POIN_PLANET).filter(p=>!["ac","mc","mercury_netral"].includes(p.id)).map(p=>`<tr><td>${escapeHTML(p.nama)} ${p.arab?"/ "+escapeHTML(p.arab):""}</td><td>${escapeHTML(p.keadaan)}</td><td>${formatPoin(p.poin)}</td></tr>`).join("");document.getElementById("pdPoin").innerHTML=`<table><thead><tr><th>Planet</th><th>Keadaan</th><th>Poin</th></tr></thead><tbody>${poinRows}</tbody></table>`;const zRows=Object.entries(DB_ZODIAK_PENGUASA).map(([k,v])=>`<tr><td>${escapeHTML(v.nama)}</td><td>${v.penguasa.map(labelPlanet).join(", ")}</td></tr>`).join("");document.getElementById("pdZodiak").innerHTML=`<table><thead><tr><th>Zodiak</th><th>Planet Penguasa</th></tr></thead><tbody>${zRows}</tbody></table>`;const tRows=Object.values(DB_TAFSIR_PLANET_JAMUAN).map(t=>`<tr><td>${escapeHTML(t.planet)} ${t.arab?"/ "+escapeHTML(t.arab):""}</td><td>${escapeHTML(t.interpretasiUmum)}</td><td>${escapeHTML(t.interpretasiJamuan)}</td></tr>`).join("");document.getElementById("pdTafsir").innerHTML=`<table><thead><tr><th>Planet</th><th>Interpretasi Umum</th><th>Interpretasi Jamuan</th></tr></thead><tbody>${tRows}</tbody></table>`}
    function toggleBox(id,btnId){const el=document.getElementById(id);const btn=document.getElementById(btnId);if(!el)return;el.classList.toggle("hidden");if(btn)btn.textContent=el.classList.contains("hidden")?(btn.textContent.includes("Data")?"Open Data yang Dibaca":"Open"):(btn.textContent.includes("Data")?"Close Data yang Dibaca":"Close")}
    function showPage(pageId, anchorId){
      document.querySelectorAll(".page-section").forEach(p=>p.classList.remove("active"));
      const page=document.getElementById(pageId);
      if(page)page.classList.add("active");
      setTimeout(()=>{
        const anchor=document.getElementById(anchorId);
        if(anchor)anchor.scrollIntoView({behavior:"smooth",block:"start"});
        else window.scrollTo({top:0,behavior:"smooth"});
      },50);
    }
    function printHasil(){showPage("mainPage","hasilSection");renderPrintDalilSummary();const pc=document.getElementById("printDalilSummaryContent");if(pc)pc.classList.remove("hidden");if(window.AndroidPrint&&typeof window.AndroidPrint.printPage==="function")window.AndroidPrint.printPage();else window.print()}
    document.addEventListener("DOMContentLoaded",()=>{initBaytCards();renderPendukungData();});
