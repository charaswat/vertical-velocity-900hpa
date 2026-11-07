const options = {
    key: 'ZbPEsInKrQBIeDWTjxKCUwBLXn6gWldb',
    verbose: false,
    lat: 13.9918,
    lon: 110.6035,
    zoom: 5,
};

async function getWeatherData(lat, lon, env) {
  const apiKey = env.WINDY_API_KEY; // ดึงจาก Environment Variable ที่เราตั้งไว้
  const url = `https://api.windy.com/api/point-forecast/v2`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lat: lat,
      lon: lon,
      model: "gfs",
      parameters: ["temp", "precip", "wind"],
      key: apiKey
    })
  });
  return await response.json();
};
    //key: 'ZbPEsInKrQBIeDWTjxKCUwBLXn6gWldb',
windyInit(options, windyAPI => {
    const { map, store } = windyAPI;
    let isDrawingMode = false;
    let tempCircle = null;

    // 1. ระบบจัดการโหมดวาด (Double Click เพื่อเข้าโหมด / Single Click เพื่อออก)
    map.on('dblclick', e => {
        if (!isDrawingMode) {
            isDrawingMode = true;
            map.dragging.disable();
            map.doubleClickZoom.disable();
            document.body.style.cursor = 'crosshair';
            console.log("Mode: Drawing enabled");
        }
    });

    map.on('click', e => {
        if (isDrawingMode) {
            isDrawingMode = false;
            map.dragging.enable();
            map.doubleClickZoom.enable();
            document.body.style.cursor = '';
            console.log("Mode: Navigation enabled");
        }
    });

    // 2. ระบบวาดวงกลม และคลิกขวาเพื่อลบ
    map.on('mousedown', e => {
        if (!isDrawingMode) return;

        const { lat, lng } = e.latlng;
        tempCircle = L.circle([lat, lng], {
            color: 'yellow',
            weight: 1.5,
            fill: false,
            interactive: true
        }).addTo(map);

        const onMouseMove = (me) => {
            if (tempCircle) {
                const radius = map.distance(e.latlng, me.latlng);
                tempCircle.setRadius(radius);
            }
        };

        const onMouseUp = () => {
            map.off('mousemove', onMouseMove);
            map.off('mouseup', onMouseUp);
            
            if (tempCircle) {
                if (tempCircle.getRadius() < 100) {
                    map.removeLayer(tempCircle);
                }
                    tempCircle.bindPopup("Stagnation Footprint<br><small>Right-click line to remove</small>");
                
                //tempCircle = null;
				tempCircle.on('contextmenu', function() { map.removeLayer(this); });
            }
        };

        map.on('mousemove', onMouseMove);
        map.on('mouseup', onMouseUp);
    });

    // ปิดเมนูคลิกขวาปกติของเบราว์เซอร์ในโหมดวาด
    map.on('contextmenu', e => { 
        if (isDrawingMode) L.DomEvent.preventDefault(e); 
    });

    // 3. การตั้งค่าเลเยอร์เริ่มต้น
    store.set('overlay', 'vvel');
    store.set('level', '900h');
    store.set('particlesAnim', 'slow');

    // 4. ฟังก์ชันสำหรับปุ่มกด (Global Functions)
    window.checkStagnation = (level) => {
        store.set('level', level + 'h');
    };

    window.runStagnationAnalyzer = async () => {
        const btn = document.getElementById('stagnation-btn');
        const levels = [
            { h: 900, label: '900hPa' },
            { h: 850, label: '850hPa' },
            { h: 500, label: '500hPa' },
            { h: 200, label: '200hPa' }
        ];

        btn.disabled = true;
        for (const level of levels) {
            btn.innerText = `Checking ${level.label}...`;
            window.checkStagnation(level.h);
            await new Promise(r => setTimeout(r, 3000));
		}	

        btn.disabled = false;
        btn.innerText = 'Start Analyzer';
		alert("Analysis Complete");
	};
});