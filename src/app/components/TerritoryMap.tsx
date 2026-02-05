import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Map, MapPin, Info, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface TerritoryMapProps {
  organizationName?: string;
  territoryType?: 'municipality' | 'commune' | 'village' | 'district';
  compact?: boolean;
}

export function TerritoryMap({ 
  organizationName = 'Ville de Genève',
  territoryType = 'municipality',
  compact = false
}: TerritoryMapProps) {
  const { language } = useLanguage();

  const getTerritoryTypeLabel = () => {
    const labels: Record<string, Record<string, string>> = {
      municipality: {
        fr: 'Municipalité',
        de: 'Gemeinde',
        en: 'Municipality'
      },
      commune: {
        fr: 'Commune',
        de: 'Gemeinde',
        en: 'Commune'
      },
      village: {
        fr: 'Village',
        de: 'Dorf',
        en: 'Village'
      },
      district: {
        fr: 'District',
        de: 'Bezirk',
        en: 'District'
      }
    };
    return labels[territoryType][language] || labels[territoryType]['fr'];
  };

  const labels = {
    title: language === 'fr' 
      ? 'Périmètre d\'inscription' 
      : language === 'de' 
      ? 'Registrierungsbereich' 
      : 'Registration Area',
    description: language === 'fr'
      ? 'Cette plateforme est réservée aux résidents de cette zone géographique'
      : language === 'de'
      ? 'Diese Plattform ist den Bewohnern dieses geografischen Gebiets vorbehalten'
      : 'This platform is reserved for residents of this geographic area',
    verifyText: language === 'fr'
      ? 'Vérifiez que votre adresse se situe bien dans le périmètre ci-dessous'
      : language === 'de'
      ? 'Überprüfen Sie, ob sich Ihre Adresse im unten stehenden Bereich befindet'
      : 'Verify that your address is located within the perimeter below',
    mapPlaceholder: language === 'fr'
      ? 'Carte interactive du territoire'
      : language === 'de'
      ? 'Interaktive Gebietskarte'
      : 'Interactive territory map'
  };

  if (compact) {
    return (
      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{labels.title}</h3>
            <p className="text-sm text-gray-700">{organizationName}</p>
            <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-200">
              {getTerritoryTypeLabel()}
            </Badge>
          </div>
        </div>
        
        {/* Compact Map Preview */}
        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 flex items-center justify-center overflow-hidden relative">
          {/* Stylized map background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <path d="M20,50 Q40,20 60,40 T100,50 Q120,60 140,40 T180,50" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    className="text-blue-600"/>
              <circle cx="50" cy="40" r="3" fill="currentColor" className="text-blue-600"/>
              <circle cx="100" cy="50" r="3" fill="currentColor" className="text-blue-600"/>
              <circle cx="150" cy="40" r="3" fill="currentColor" className="text-blue-600"/>
            </svg>
          </div>
          <div className="text-center z-10">
            <Map className="w-8 h-8 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-blue-700 font-medium">{organizationName}</p>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs text-gray-600">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p>{labels.verifyText}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span>{labels.title}</span>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                {getTerritoryTypeLabel()}
              </Badge>
            </div>
            <p className="text-sm font-normal text-gray-600 mt-1">
              {organizationName}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">
              {labels.description}
            </p>
            <p className="text-xs text-blue-700">
              {labels.verifyText}
            </p>
          </div>
        </div>

        {/* Map visualization */}
        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-200 flex items-center justify-center overflow-hidden relative shadow-inner">
          {/* Stylized territory outline */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#grid)" />
              
              {/* Territory boundary (stylized polygon) */}
              <path 
                d="M 100,80 L 150,60 L 220,70 L 280,100 L 300,150 L 280,200 L 220,230 L 150,240 L 100,220 L 80,170 Z" 
                fill="rgba(59, 130, 246, 0.15)" 
                stroke="rgba(37, 99, 235, 0.6)" 
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              
              {/* Main point (city center) */}
              <circle cx="200" cy="150" r="6" fill="rgb(37, 99, 235)"/>
              <circle cx="200" cy="150" r="10" fill="none" stroke="rgb(37, 99, 235)" strokeWidth="2" opacity="0.3"/>
              
              {/* Secondary points */}
              <circle cx="150" cy="140" r="4" fill="rgb(59, 130, 246)"/>
              <circle cx="240" cy="130" r="4" fill="rgb(59, 130, 246)"/>
              <circle cx="180" cy="190" r="4" fill="rgb(59, 130, 246)"/>
              
              {/* Street lines */}
              <line x1="150" y1="140" x2="200" y2="150" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2"/>
              <line x1="240" y1="130" x2="200" y2="150" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2"/>
              <line x1="180" y1="190" x2="200" y2="150" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2"/>
            </svg>
          </div>

          {/* Center overlay */}
          <div className="text-center z-10 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg border border-blue-200 shadow-lg">
            <Map className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900 mb-1">{organizationName}</p>
            <p className="text-sm text-gray-600">{labels.mapPlaceholder}</p>
          </div>
        </div>

        {/* Territory stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">
              {language === 'fr' ? 'Population' : language === 'de' ? 'Bevölkerung' : 'Population'}
            </p>
            <p className="text-lg font-bold text-gray-900">203,856</p>
          </div>
          <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">
              {language === 'fr' ? 'Superficie' : language === 'de' ? 'Fläche' : 'Area'}
            </p>
            <p className="text-lg font-bold text-gray-900">15.89 km²</p>
          </div>
          <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">
              {language === 'fr' ? 'Codes postaux' : language === 'de' ? 'PLZ' : 'Postal Codes'}
            </p>
            <p className="text-lg font-bold text-gray-900">10</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
