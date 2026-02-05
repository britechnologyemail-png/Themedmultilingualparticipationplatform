import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { MapPin, Map, Building, Home, Landmark, CheckCircle, Edit, Save } from 'lucide-react';
import { toast } from 'sonner';
import { InteractiveMap } from '../../components/InteractiveMap';

type TerritoryType = 'municipality' | 'commune' | 'village' | 'district';

export function GeographicPerimeter() {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [territoryData, setTerritoryData] = useState({
    type: 'municipality' as TerritoryType,
    name: 'Genève',
    officialCode: 'CH-GE-6621',
    population: 203856,
    area: 15.89, // km²
    postalCodes: ['1200', '1201', '1202', '1203', '1204', '1205', '1206', '1207', '1208', '1209'],
    canton: 'Genève',
    country: 'Suisse'
  });

  const handleSave = () => {
    toast.success('Périmètre géographique mis à jour avec succès');
    setIsEditing(false);
  };

  const getTerritoryTypeLabel = (type: TerritoryType) => {
    const labels: Record<TerritoryType, string> = {
      municipality: language === 'fr' ? 'Municipalité' : language === 'de' ? 'Gemeinde' : 'Municipality',
      commune: language === 'fr' ? 'Commune' : language === 'de' ? 'Gemeinde' : 'Commune',
      village: language === 'fr' ? 'Village' : language === 'de' ? 'Dorf' : 'Village',
      district: language === 'fr' ? 'District' : language === 'de' ? 'Bezirk' : 'District'
    };
    return labels[type];
  };

  const getTerritoryIcon = (type: TerritoryType) => {
    const icons: Record<TerritoryType, React.ReactNode> = {
      municipality: <Building className="w-6 h-6" />,
      commune: <Landmark className="w-6 h-6" />,
      village: <Home className="w-6 h-6" />,
      district: <Map className="w-6 h-6" />
    };
    return icons[type];
  };

  const getTerritoryColor = (type: TerritoryType) => {
    const colors: Record<TerritoryType, string> = {
      municipality: 'bg-blue-100 text-blue-700 border-blue-200',
      commune: 'bg-green-100 text-green-700 border-green-200',
      village: 'bg-orange-100 text-orange-700 border-orange-200',
      district: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Périmètre géographique' :
             language === 'de' ? 'Geografisches Gebiet' :
             'Geographic Perimeter'}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' ? 'Définissez le type et les limites de votre territoire' :
             language === 'de' ? 'Definieren Sie den Typ und die Grenzen Ihres Gebiets' :
             'Define the type and boundaries of your territory'}
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit className="w-4 h-4" />
            {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
            </Button>
          </div>
        )}
      </div>

      {/* Territory Type Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTerritoryColor(territoryData.type)} border-2`}>
              {getTerritoryIcon(territoryData.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span>{territoryData.name}</span>
                <Badge className={`${getTerritoryColor(territoryData.type)} border`}>
                  {getTerritoryTypeLabel(territoryData.type)}
                </Badge>
              </div>
              <p className="text-sm font-normal text-gray-600 mt-1">
                {territoryData.officialCode}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'fr' ? 'Population' : language === 'de' ? 'Bevölkerung' : 'Population'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {territoryData.population.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">habitants</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'fr' ? 'Superficie' : language === 'de' ? 'Fläche' : 'Area'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {territoryData.area}
              </p>
              <p className="text-xs text-gray-500 mt-1">km²</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'fr' ? 'Codes postaux' : language === 'de' ? 'Postleitzahlen' : 'Postal Codes'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {territoryData.postalCodes.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">zones</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Configuration du territoire' :
             language === 'de' ? 'Gebietskonfiguration' :
             'Territory Configuration'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Définissez les caractéristiques de votre périmètre géographique' :
             language === 'de' ? 'Definieren Sie die Merkmale Ihres geografischen Gebiets' :
             'Define the characteristics of your geographic perimeter'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Territory Type */}
            <div className="space-y-2">
              <Label>
                {language === 'fr' ? 'Type de territoire' :
                 language === 'de' ? 'Gebietstyp' :
                 'Territory Type'}
              </Label>
              <Select
                value={territoryData.type}
                onValueChange={(value) => setTerritoryData({ ...territoryData, type: value as TerritoryType })}
                disabled={!isEditing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="municipality">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>{language === 'fr' ? 'Municipalité' : language === 'de' ? 'Gemeinde' : 'Municipality'}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="commune">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4" />
                      <span>{language === 'fr' ? 'Commune' : language === 'de' ? 'Gemeinde' : 'Commune'}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="village">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      <span>{language === 'fr' ? 'Village' : language === 'de' ? 'Dorf' : 'Village'}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="district">
                    <div className="flex items-center gap-2">
                      <Map className="w-4 h-4" />
                      <span>{language === 'fr' ? 'District' : language === 'de' ? 'Bezirk' : 'District'}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                {language === 'fr' ? 'Sélectionnez le type de frontière géographique correspondant à votre organisation' :
                 language === 'de' ? 'Wählen Sie den Typ der geografischen Grenze aus, der Ihrer Organisation entspricht' :
                 'Select the type of geographic boundary that corresponds to your organization'}
              </p>
            </div>

            {/* Official Association */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">
                    {language === 'fr' ? 'Territoire associé' :
                     language === 'de' ? 'Zugeordnetes Gebiet' :
                     'Associated Territory'}
                  </p>
                  <p className="text-sm text-green-700">
                    {language === 'fr' ? `Votre organisation est associée au territoire officiel : ${territoryData.name}, ${territoryData.canton}, ${territoryData.country}` :
                     language === 'de' ? `Ihre Organisation ist dem offiziellen Gebiet zugeordnet: ${territoryData.name}, ${territoryData.canton}, ${territoryData.country}` :
                     `Your organization is associated with the official territory: ${territoryData.name}, ${territoryData.canton}, ${territoryData.country}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Postal Codes */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Codes postaux couverts' :
             language === 'de' ? 'Abgedeckte Postleitzahlen' :
             'Covered Postal Codes'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Liste des codes postaux inclus dans votre périmètre' :
             language === 'de' ? 'Liste der in Ihrem Gebiet enthaltenen Postleitzahlen' :
             'List of postal codes included in your perimeter'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {territoryData.postalCodes.map((code) => (
              <Badge key={code} variant="outline" className="px-3 py-1 text-sm">
                {code}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {language === 'fr' ? 'Aperçu cartographique' :
             language === 'de' ? 'Kartenvorschau' :
             'Map Preview'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Visualisation interactive du périmètre géographique' :
             language === 'de' ? 'Interaktive Visualisierung des geografischen Gebiets' :
             'Interactive visualization of the geographic perimeter'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InteractiveMap
            center={[46.2044, 6.1432]}
            zoom={13}
            territoryName={territoryData.name}
            height="500px"
          />
        </CardContent>
      </Card>
    </div>
  );
}