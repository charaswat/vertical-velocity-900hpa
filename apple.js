// ==========================================
// 1. Base Layers: Google Hybrid & Google Terrain
// ==========================================
const googleHybrid = new L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&subdomains=mt0,mt1,mt2,mt3', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Hybrid'
});

const googleTerrain = new L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&subdomains=mt0,mt1,mt2,mt3', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Terrain'
});



// จัดเรียง 4 ระดับความสูงจากบนลงล่าง: 900 -> 850 -> 500 -> 200 HPA

const hpa_900 = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
});
const hpa_850 = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
});
const hpa_500 = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
});
const hpa_200 = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
});

// ==========================================
// 3. Initialize Map
// ==========================================

//MAP
const map = L.map('map', {
    center: [13.736717, 100.523186],
    zoom: 6,
    zoomControl: true,
    layers: [googleHybrid],
});

const Map_BaseLayer = {
    'Google Hybrid': googleHybrid,
    'Google Terrain': googleTerrain,
};

//AddLayer
const Map_AddLayer = {
    '900 hpa': hpa_900,
    '850 hpa': hpa_850,
    '500 hpa': hpa_500,
    '200 hpa': hpa_200	
};

//LayerControl
L.control
    .layers(Map_BaseLayer, Map_AddLayer, {
        collapsed: false,
    })
    .addTo(map);

//OpacityControl
L.control
    .opacity(Map_AddLayer, {
        label: 'Layers Opacity',
    })
    .addTo(map);

// ==========================================
// 3. Layer Tree Control (เมนูหลัก 4 ระดับ พร้อม 7 พารามิเตอร์ย่อย)
// ==========================================
var myLayerTree = [
    {
        name: "900 HPA",
        code: "layer_900",
        active: false,
        selectType: "SINGLE",
        openByDefault: false,
        childLayers: [
            { name: "ลม (Wind)", code: "hpa900_wind", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "อุณหภูมิ (Temperature)", code: "hpa900_temp", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความชื้น (Relative Humidity)", code: "hpa900_rh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความสูงภูมิประเทศ (Geopotential Height)", code: "hpa900_gh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ปริมาณฝน (Rain)", code: "hpa900_rain", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "เมฆ (Clouds)", code: "hpa900_clouds", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความกดอากาศ (Pressure)", code: "hpa900_pressure", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } }
        ]
    },
    {
        name: "850 HPA",
        code: "layer_850",
        active: false,
        selectType: "SINGLE",
        openByDefault: false,
        childLayers: [
            { name: "ลม (Wind)", code: "hpa850_wind", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "อุณหภูมิ (Temperature)", code: "hpa850_temp", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความชื้น (Relative Humidity)", code: "hpa850_rh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความสูงภูมิประเทศ (Geopotential Height)", code: "hpa850_gh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ปริมาณฝน (Rain)", code: "hpa850_rain", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "เมฆ (Clouds)", code: "hpa850_clouds", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความกดอากาศ (Pressure)", code: "hpa850_pressure", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } }
        ]
    },
    {
        name: "500 HPA",
        code: "layer_500",
        active: false,
        selectType: "SINGLE",
        openByDefault: false,
        childLayers: [
            { name: "ลม (Wind)", code: "hpa500_wind", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "อุณหภูมิ (Temperature)", code: "hpa500_temp", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความชื้น (Relative Humidity)", code: "hpa500_rh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความสูงภูมิประเทศ (Geopotential Height)", code: "hpa500_gh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ปริมาณฝน (Rain)", code: "hpa500_rain", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "เมฆ (Clouds)", code: "hpa500_clouds", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความกดอากาศ (Pressure)", code: "hpa500_pressure", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } }
        ]
    },
    {
        name: "200 HPA",
        code: "layer_200",
        active: false,
        selectType: "SINGLE",
        openByDefault: false,
        childLayers: [
            { name: "ลม (Wind)", code: "hpa200_wind", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "อุณหภูมิ (Temperature)", code: "hpa200_temp", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความชื้น (Relative Humidity)", code: "hpa200_rh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความสูงภูมิประเทศ (Geopotential Height)", code: "hpa200_gh", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ปริมาณฝน (Rain)", code: "hpa200_rain", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "เมฆ (Clouds)", code: "hpa200_clouds", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } },
            { name: "ความกดอากาศ (Pressure)", code: "hpa200_pressure", active: false, selectType: "NONE", serviceType: "TILE", params: { url: "" } }
        ]
    }
];

var layerTreeControl = new L.Control.LayerTreeControl({
    position: "topright",
    openByDefault: true,
    layerTree: myLayerTree
});

layerTreeControl.addTo(map);
