import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Layers, Map as MapIcon } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

interface TerritoryMapInteractiveProps {
  organizationName: string;
  territoryType?: 'municipality' | 'commune' | 'village' | 'district';
  center?: [number, number];
  zoom?: number;
  boundary?: [number, number][];
  area?: number;
  postalCodes?: string[];
  districts?: { name: string; type: string }[];
}

export function TerritoryMapInteractive({
  organizationName,
  territoryType = 'municipality',
  center = [46.2044, 6.1432],
  zoom = 13,
  boundary,
  area = 15.89,
  postalCodes = [],
  districts = []
}: TerritoryMapInteractiveProps) {
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
    mapTitle: language === 'fr'
      ? 'Carte interactive du territoire'
      : language === 'de'
      ? 'Interaktive Gebietskarte'
      : 'Interactive Territory Map',
    mapDescription: language === 'fr'
      ? 'Visualisez les frontières géographiques et les zones couvertes par notre organisation'
      : language === 'de'
      ? 'Visualisieren Sie die geografischen Grenzen und die von unserer Organisation abgedeckten Gebiete'
      : 'Visualize the geographic boundaries and areas covered by our organization',
    territoryInfo: language === 'fr'
      ? 'Informations territoriales'
      : language === 'de'
      ? 'Gebietsinformationen'
      : 'Territory Information',
    population: language === 'fr' ? 'Population' : language === 'de' ? 'Bevölkerung' : 'Population',
    area: language === 'fr' ? 'Superficie' : language === 'de' ? 'Fläche' : 'Area',
    postalCodes: language === 'fr' ? 'Codes postaux couverts' : language === 'de' ? 'Abgedeckte Postleitzahlen' : 'Covered Postal Codes',
    districts: language === 'fr' ? 'Quartiers' : language === 'de' ? 'Bezirke' : 'Districts',
    readOnly: language === 'fr'
      ? 'Carte en lecture seule - Les modifications sont effectuées depuis le backoffice'
      : language === 'de'
      ? 'Nur-Lese-Karte - Änderungen werden über das Backoffice vorgenommen'
      : 'Read-only map - Modifications are made from the backoffice'
  };

  return (
    <div className="space-y-6">
      {/* Main Interactive Map */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{labels.mapTitle}</span>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  {getTerritoryTypeLabel()}
                </Badge>
              </div>
              <p className="text-sm font-normal text-gray-600 mt-1">
                {organizationName}
              </p>
            </div>
          </CardTitle>
          <CardDescription className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span>{labels.mapDescription}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InteractiveMap
            center={center}
            zoom={zoom}
            territoryName={organizationName}
            territoryBoundary={boundary}
            height="500px"
          />
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700 flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              {labels.readOnly}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Territory Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Area Card */}
        <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              {labels.area}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{area}</p>
              <p className="text-sm text-gray-600 mt-1">km²</p>
            </div>
          </CardContent>
        </Card>

        {/* Postal Codes Card */}
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              {labels.postalCodes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{postalCodes.length}</p>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'fr' ? 'zones' : language === 'de' ? 'Zonen' : 'zones'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Districts Card */}
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-orange-600" />
              {labels.districts}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{districts.length}</p>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'fr' ? 'quartiers' : language === 'de' ? 'Bezirke' : 'districts'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Postal Codes Details */}
      {postalCodes.length > 0 && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">{labels.postalCodes}</CardTitle>
            <CardDescription>
              {language === 'fr'
                ? 'Liste des codes postaux inclus dans le périmètre du territoire'
                : language === 'de'
                ? 'Liste der im Gebietsgebiet enthaltenen Postleitzahlen'
                : 'List of postal codes included in the territory perimeter'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {postalCodes.map((code) => (
                <Badge
                  key={code}
                  variant="outline"
                  className="px-3 py-1 text-sm bg-white hover:bg-blue-50 transition-colors"
                >
                  {code}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Districts Details */}
      {districts.length > 0 && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">{labels.districts}</CardTitle>
            <CardDescription>
              {language === 'fr'
                ? 'Quartiers et zones administratives du territoire'
                : language === 'de'
                ? 'Bezirke und Verwaltungszonen des Gebiets'
                : 'Districts and administrative zones of the territory'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {districts.map((district, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{district.name}</p>
                      <p className="text-xs text-gray-600">{district.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
