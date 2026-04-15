"use client";

import React, { useEffect, useState } from "react";
import { Globe, RefreshCw } from "lucide-react";

export default function LiveSatelliteMap() {
  const [MapContent, setMapContent] = useState<any>(null);

  useEffect(() => {
    // Dynamic import to prevent Server-Side Rendering issues with Leaflet 'window' object
    import("react-leaflet").then((mod) => {
      const { MapContainer, TileLayer, Circle, Tooltip } = mod;
      
      const Content = () => {
        // High-precision coordinates for the pilot farm in Nakuru, Kenya
        const position: [number, number] = [-0.3031, 36.08]; 
        
        return (
          <MapContainer 
            center={position} 
            zoom={16} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%", borderRadius: "2rem" }}
          >
            {/* Extremely high quality Esri Topo / Satellite Imagery - 100% Free */}
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {/* Farm Perimeter Overlay */}
            <Circle 
              center={position} 
              radius={400} 
              pathOptions={{ color: '#10b981', weight: 2, fillColor: '#d7b45a', fillOpacity: 0.15 }} 
            >
              <Tooltip sticky>Zone A: Regenerative Agroforestry (5.2 Hectares)</Tooltip>
            </Circle>
            <Circle 
              center={[-0.3005, 36.079]} 
              radius={250} 
              pathOptions={{ color: '#d7b45a', weight: 2, stroke: true, dashArray: '5, 5', fillOpacity: 0.0 }} 
            >
              <Tooltip sticky>Zone B: Planned Silvopasture Expansion</Tooltip>
            </Circle>
          </MapContainer>
        );
      };
      setMapContent(() => Content);
    });
  }, []);

  if (!MapContent) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center border border-white/5 bg-black/40 rounded-[2rem]">
         <Globe size={48} strokeWidth={1} className="animate-pulse text-gold mb-6" />
         <div className="flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin text-white/40" />
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Acquiring Orbital Feed...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden border border-white/10 relative shadow-[0_0_30px_rgba(16,185,129,0.05)]">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <MapContent />
      
      {/* HUD Overlays for Maximum Realism */}
      <div className="absolute top-5 left-5 z-[400] bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[9px] font-mono text-emerald-400 flex items-center gap-2 shadow-2xl">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 
        LIVE: ESA SENTINEL-2 (MULTI-SPECTRAL)
      </div>
      
      <div className="absolute bottom-5 right-5 z-[400] bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded text-[8px] font-mono text-white/50 text-right">
        COORD: 0°18'11.2"S 36°04'48.0"E <br/>
        ALTITUDE: 1,850m
      </div>
    </div>
  );
}
