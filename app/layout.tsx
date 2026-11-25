import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
export const metadata:Metadata={title:'Plotline · Your Bengaluru property desk',description:'One calm place for your property search. RERA records, WhatsApp details, and your shortlist on a map.',icons:{icon:'/favicon.svg'},manifest:'/manifest.webmanifest'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
