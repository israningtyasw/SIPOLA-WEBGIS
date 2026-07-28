/* ==========================================================
   SI-POLA v1.0
   Application Controller
========================================================== */


/* ==========================================================
   HELPER
========================================================== */

const $ = (id) => document.getElementById(id);


/* ==========================================================
   BRIDGE
   Menghubungkan index.html dengan map.html
========================================================== */

const Bridge = {

    get frame() {
        return $("mapframe").contentWindow;
    },

    get map() {
        return this.frame.map;
    },

    get locateControl() {
    return this.frame.locateControl;
},

    get bounds() {
        return this.frame.bounds_group;
    },

    layers: {

    get rtrw() {
        return Bridge.frame.layer_PolaRuangRTRW_2;
    },

    get kecamatan() {
        return Bridge.frame.layer_BatasKecamatan_3;
    },

    get kelurahan() {
        return Bridge.frame.layer_BatasKelurahan_4;
    },

    get osm() {
        return Bridge.frame.layer_OSMStandard_1;
    },

    get satellite() {
        return Bridge.frame.layer_ESRISatellite_0;
    }

}

};


/* ==========================================================
   UI
========================================================== */

const UI = {

    panel: $("side-panel"),

    title: $("panel-title"),

    body: $("panel-body"),

    modal: $("about-modal")

};

/* ==========================================================
   STRUKTUR KATEGORI RTRW
========================================================== */

const RTRW_TREE = [

{
    title:"Kawasan Lindung",

    children:[

        "Badan Air",
        "Kawasan Perlindungan Setempat"

    ]

},

{
    title:"Ruang Terbuka Hijau",

    children:[

        "Rimba Kota",
        "Taman Kota",
        "Taman Kecamatan",
        "Taman Kelurahan",
        "Pemakaman"

    ]

},

{
    title:"Kawasan Budidaya",

    children:[

        "Badan Jalan",

        "Kawasan Tanaman Pangan",

        "Kawasan Peruntukan Industri",

        "Kawasan Perumahan",

        "Kawasan Fasilitas Umum dan Fasilitas Sosial",

        "Kawasan Perdagangan dan Jasa",

        "Kawasan Perkantoran",

        "Kawasan Transportasi",

        "Kawasan Pertahanan dan Keamanan"

    ]

}

];
const RTRW_COLOR = {

    "Badan Air":"#97DBF2",

    "Badan Jalan":"#EB1E1E",

    "Kawasan Fasilitas Umum dan Fasilitas Sosial":"#5F005F",

    "Kawasan Perdagangan dan Jasa":"#FF4646",

    "Kawasan Perkantoran":"#B3B3B3",

    "Kawasan Perlindungan Setempat":"#00CFCF",

    "Kawasan Pertahanan dan Keamanan":"#9A00FF",

    "Kawasan Perumahan":"#FFA500",

    "Kawasan Peruntukan Industri":"#7A0000",

    "Kawasan Tanaman Pangan":"#BFFF00",

    "Kawasan Transportasi":"#D83B01",

    "Pemakaman":"#39FF14",

    "Rimba Kota":"#4A6F12",

    "Taman Kecamatan":"#5A8F18",

    "Taman Kelurahan":"#6CAF1E",

    "Taman Kota":"#5B8E23"

};
function buildRTRWTree(){

    let html="";

    RTRW_TREE.forEach(function(section){

        html+=`
        <div class="tree-section">

            <div class="tree-title">

                ${section.title}

            </div>
        `;

        if(section.children){

            section.children.forEach(function(item){

                html+=`

                <label class="setting-item rtrw-item">
                <input
                type="checkbox"
                class="chk-rtrw-item"
                value="${item}"
                checked>
                
                <span class="rtrw-label">
                <span
                class="legend-color"
                style="background:${RTRW_COLOR[item] || '#cccccc'}">
                </span>
                
                <span class="legend-text">
                
                ${item}

    </span>

</span>

</label>

                `;

            });

        }

        if(section.groups){

            section.groups.forEach(function(group){

                html+=`

                <div class="tree-group">

                    <div class="tree-subtitle">

                        ${group.title}

                    </div>

                `;

                group.children.forEach(function(item){

                    html+=`

                    <label class="setting-item rtrw-item">
                    <input
                    type="checkbox"
                    class="chk-rtrw-item"
                    value="${item}"
                    checked>
                    
                    <span class="rtrw-label">
                    <span
                    class="legend-color"
                    style="background:${RTRW_COLOR[item] || '#cccccc'}">
                    </span>
                    <span class="legend-text">
                    
                    ${item}

    </span>

</span>

</label>

                    `;

                });

                html+=`</div>`;

            });

        }

        html+=`</div>`;

    });

    return html;

}
/* ==========================================================
   BUILD LAYER PANEL
========================================================== */

function buildLayerPanel(){

return `

<h3 class="panel-subtitle">
LAYER
</h3>

<label class="setting-item">
<input
type="checkbox"
id="chk-rtrw"
checked>

<span>Pola Ruang RTRW</span>
</label>

<label class="setting-item">
<input
type="checkbox"
id="chk-kecamatan"
checked>

<span>Batas Kecamatan</span>
</label>

<label class="setting-item">
<input
type="checkbox"
id="chk-kelurahan"
checked>

<span>Batas Kelurahan</span>
</label>

<hr class="panel-divider">

<h3 class="panel-subtitle">
BASEMAP
</h3>

<label class="setting-item">

<input
type="radio"
name="basemap"
id="bm-osm"
checked>

<span>OpenStreetMap</span>

</label>

<label class="setting-item">

<input
type="radio"
name="basemap"
id="bm-satellite">

<span>ESRI Satellite</span>

</label>
<hr class="panel-divider">

<h3 class="panel-subtitle">
TRANSPARANSI
</h3>

<input
type="range"
id="opacity-slider"
min="0"
max="100"
value="100">

<div class="opacity-label">

<span>0%</span>

<span id="opacity-value">100%</span>

</div>
<hr class="panel-divider">

<h3 class="panel-subtitle">
LEGENDA RTRW
</h3>

${buildRTRWTree()}

`;

}
/* ==========================================================
   REGISTER RTRW EVENTS
========================================================== */

function registerRTRWEvents(){

    document.querySelectorAll(".chk-rtrw-item").forEach(function(chk){

        chk.addEventListener("change", updateRTRWFilter);

    });

}
/* ==========================================================
   UPDATE RTRW FILTER
========================================================== */

function updateRTRWFilter(){

    const aktif=[];

    document.querySelectorAll(".chk-rtrw-item").forEach(function(chk){

        if(chk.checked){

            aktif.push(chk.value);

        }

    });

    Bridge.frame.filterRTRW(aktif);

}
/* ==========================================================
   CONTROLLER
========================================================== */

const Sipola = {

    init() {

    this.bindEvents();

    this.closePanel();
    window.addEventListener("message", (e) => {

    if (e.data.type !== "MAP_INFO") return;

    $("status-coordinate").textContent =
        "Koordinat : " +
        e.data.lat.toFixed(6) +
        ", " +
        e.data.lng.toFixed(6);

    $("status-zoom").textContent =
        "Zoom : " + e.data.zoom;

});

   let searchInitialized = false;

$("mapframe").addEventListener("load", () => {


    if (searchInitialized) return;

    searchInitialized = true;

    this.initSearch();
    this.updateStatistics();

    /* =======================================
       TUTUP LOADING SCREEN
    ======================================= */

    const loading = $("loading-screen");

    if (loading) {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.remove();

        }, 600);

    }

});

},
updateStatistics() {

    const frame = $("mapframe").contentWindow;

    if (!frame) return;

    /* ===============================
       Kecamatan
    =============================== */

    const kecamatan = frame.getDaftarKecamatan
        ? frame.getDaftarKecamatan()
        : [];

    $("status-kecamatan").innerHTML = `
        <i class="fa-solid fa-building"></i>
        <span class="status-number">${kecamatan.length}</span>
        Kecamatan
    `;

    /* ===============================
       Kelurahan
    =============================== */

    const kelurahan = frame.getDaftarKelurahan
        ? frame.getDaftarKelurahan()
        : [];

    $("status-kelurahan").innerHTML = `
        <i class="fa-solid fa-map-location-dot"></i>
        <span class="status-number">${kelurahan.length}</span>
        Kelurahan
    `;

    /* ===============================
       RTRW
    =============================== */

    const rtrw = frame.getKategoriRTRW
        ? frame.getKategoriRTRW()
        : [];

    $("status-rtrw").innerHTML = `
        <i class="fa-solid fa-layer-group"></i>
        <span class="status-number">${rtrw.length}</span>
        Kategori RTRW
    `;

},


    bindEvents() {

    $("tool-home").addEventListener("click", () => this.home());

    $("btn-layer").addEventListener("click", () => {


        this.layerPanel();

    });
    $("btn-locate").addEventListener("click", () => this.locateMe());
    $("btn-measure").addEventListener("click", () => this.measure());
    $("btn-about").addEventListener("click", () => this.openAbout());
    $("btn-print").addEventListener("click", () => {


    this.printMap();

});

$("btn-export").addEventListener("click", () => {


    this.exportPDF();

});

    $("about-close").addEventListener("click", () => this.closeAbout());
    $("feature-close").addEventListener("click", () => this.closeFeature());

    $("panel-close").addEventListener("click", () => this.closePanel());

},



    /* =======================================
       HOME
    ======================================= */

    home() {

        Bridge.map.fitBounds(

            Bridge.bounds.getBounds()

        );

    },
    locateMe() {


    Bridge.locateControl.start();

},
measure() {

    // Tambahkan control jika belum ada
    if (!Bridge.frame.measureControl._container) {
        Bridge.frame.measureControl.addTo(Bridge.map);
    }

    // Klik otomatis tombol Measure
    Bridge.frame.measureControl
        ._container
        .querySelector("a")
        .click();

},
printMap(){

    this.openFeature(

        "Cetak Peta",

        `Fitur <strong>Cetak Peta</strong> belum tersedia pada
        <strong>SI-POLA Versi 1.0</strong>.<br><br>

        Fitur ini akan tersedia pada
        pembaruan versi berikutnya.`

    );

},
exportPDF(){

    this.openFeature(

        "Ekspor PDF",

        `Fitur <strong>Ekspor PDF</strong> belum tersedia pada
        <strong>SI-POLA Versi 1.0</strong>.<br><br>

        Fitur ini akan tersedia pada
        pembaruan versi berikutnya.`

    );

},



    /* =======================================
       PANEL
======================================= */

openPanel(title, html) {

    UI.title.innerHTML = title;

    UI.body.innerHTML = html;

    UI.panel.classList.remove("hidden");

    document.getElementById("app").style.gridTemplateColumns =
        "250px 1fr 320px";

},



   closePanel() {

    UI.panel.classList.add("hidden");

    document.getElementById("app").style.gridTemplateColumns =
        "250px 1fr 0px";

},
   initSearch() {

    const daftarKecamatan = Bridge.frame.getDaftarKecamatan();
    const daftarKelurahan = Bridge.frame.getDaftarKelurahan();

    const daftar = [];

    daftarKecamatan.forEach(nama => {
        daftar.push({
            nama: nama,
            tipe: "kecamatan"
        });
    });

    daftarKelurahan.forEach(nama => {
        daftar.push({
            nama: nama,
            tipe: "kelurahan"
        });
    });

    const input = $("search-input");
    const result = $("search-result");

    input.addEventListener("input", () => {

        const keyword = input.value.trim().toLowerCase();

        result.innerHTML = "";

        if(keyword === ""){

            result.style.display = "none";
            return;

        }

        const hasil = daftar.filter(item =>
            item.nama.toLowerCase().includes(keyword)
        );

        hasil.forEach(item=>{

            const div = document.createElement("div");

            div.className = "search-item";

            div.innerHTML = `
                <strong>${item.nama}</strong><br>
                <small>${item.tipe === "kecamatan" ? "Kecamatan" : "Kelurahan"}</small>
            `;

            div.addEventListener("click",()=>{

                input.value = item.nama;

                result.style.display = "none";

                if(item.tipe === "kecamatan"){

                    Bridge.frame.searchKecamatan(item.nama);

                }else{

                    Bridge.frame.searchKelurahan(item.nama);

                }

            });

            result.appendChild(div);

        });

        result.style.display = hasil.length ? "block" : "none";

    });

},



    /* =======================================
       ABOUT
    ======================================= */

    openAbout() {

    UI.modal.classList.remove("hidden-modal");
    UI.modal.classList.add("show");

},
openFeature(title, message){

    $("feature-title").textContent = title;

    $("feature-message").innerHTML = message;

    $("feature-modal").classList.remove("hidden-modal");

    $("feature-modal").classList.add("show");

},

closeFeature(){

    $("feature-modal").classList.remove("show");

    $("feature-modal").classList.add("hidden-modal");

},

closeAbout() {

    UI.modal.classList.remove("show");
    UI.modal.classList.add("hidden-modal");

},



    /* =======================================
       LAYER PANEL
    ======================================= */

    layerPanel() {

    this.openPanel(
        "Pengaturan Peta",
        buildLayerPanel()
    );

    // ======================
    // Layer
    // ======================

    $("chk-rtrw").addEventListener("change", (e) => {

        if (e.target.checked) {
            Bridge.map.addLayer(Bridge.layers.rtrw);
        } else {
            Bridge.map.removeLayer(Bridge.layers.rtrw);
        }

    });

    $("chk-kecamatan").addEventListener("change", (e) => {

        if (e.target.checked) {
            Bridge.map.addLayer(Bridge.layers.kecamatan);
        } else {
            Bridge.map.removeLayer(Bridge.layers.kecamatan);
        }

    });

    $("chk-kelurahan").addEventListener("change", (e) => {

        if (e.target.checked) {
            Bridge.map.addLayer(Bridge.layers.kelurahan);
        } else {
            Bridge.map.removeLayer(Bridge.layers.kelurahan);
        }

    });

    // ======================
    // Basemap
    // ======================

    $("bm-osm").addEventListener("change", () => {

        if ($("bm-osm").checked) {

            Bridge.map.removeLayer(Bridge.layers.satellite);
            Bridge.map.addLayer(Bridge.layers.osm);

        }

    });

    $("bm-satellite").addEventListener("change", () => {

        if ($("bm-satellite").checked) {

            Bridge.map.removeLayer(Bridge.layers.osm);
            Bridge.map.addLayer(Bridge.layers.satellite);

        }

    });

    // ======================
    // Transparansi
    // ======================

    $("opacity-slider").addEventListener("input", (e) => {

        const opacity = Number(e.target.value) / 100;

        $("opacity-value").textContent = e.target.value + "%";

        Bridge.frame.setRTRWOpacity(opacity);

    });

    registerRTRWEvents();

    updateRTRWFilter();

}

};



/* ==========================================================
   START
========================================================== */

window.addEventListener("load", () => {

    Sipola.init();

});