import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar,
  CheckCircle,
  Users,
  Home,
  Info,
  Shield,
  Map as MapIcon,
  TreePine,
  Square
} from 'lucide-react';
import { TerritoryMapInteractive } from '../components/TerritoryMapInteractive';

export function OrganizationPublicProfile() {
  const { language } = useLanguage();

  // Organization data - in production, this would be fetched from API
  // Must be synchronized with backoffice data
  const organization = {
    id: 'org-1',
    name: 'Ville de Genève',
    description: 'La Ville de Genève est une collectivité publique suisse engagée dans la démocratie participative et l\'écoute citoyenne. Notre mission est de faciliter le dialogue entre les citoyens et les institutions pour construire ensemble l\'avenir de notre territoire.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    email: 'participation@ville-geneve.ch',
    phone: '+41 22 418 29 00',
    website: 'https://www.ville-geneve.ch',
    address: 'Palais Eynard\nRue de la Croix-Rouge 4\n1204 Genève\nSuisse',
    createdAt: '2024-01-15',
    status: 'active',
    citizensCount: 203856,
    territoryType: 'municipality' as const,
    territory: {
      center: [46.2044, 6.1432] as [number, number],
      zoom: 13,
      boundary: [
        [46.2357, 6.1003],
        [46.2357, 6.1860],
        [46.1731, 6.1860],
        [46.1731, 6.1003],
      ] as [number, number][],
      area: 15.89, // km²
      postalCodes: ['1200', '1201', '1202', '1203', '1204', '1205', '1206', '1207', '1208', '1209'],
      districts: [
        { name: 'Cité', type: 'Centre historique' },
        { name: 'Plainpalais', type: 'Quartier' },
        { name: 'Eaux-Vives', type: 'Quartier' },
        { name: 'Petit-Saconnex', type: 'Quartier' },
      ]
    },
    territoryElements: {
      streets: 2,
      avenues: 2,
      parks: 2,
      squares: 2
    },
    vision: language === 'fr' 
      ? 'Notre vision est de créer une ville où chaque voix compte, où la participation citoyenne est au cœur des décisions publiques, et où la transparence et l\'innovation guident notre action.'
      : language === 'de'
      ? 'Unsere Vision ist es, eine Stadt zu schaffen, in der jede Stimme zählt, in der die Bürgerbeteiligung im Mittelpunkt der öffentlichen Entscheidungen steht und in der Transparenz und Innovation unser Handeln leiten.'
      : 'Our vision is to create a city where every voice counts, where citizen participation is at the heart of public decisions, and where transparency and innovation guide our action.',
    values: language === 'fr'
      ? [
          { title: 'Transparence', description: 'Nous nous engageons à partager nos décisions et processus de manière ouverte et accessible.' },
          { title: 'Inclusion', description: 'Chaque citoyen, quels que soient son âge, son origine ou sa situation, a sa place dans le débat public.' },
          { title: 'Innovation', description: 'Nous utilisons les technologies modernes pour faciliter la participation citoyenne.' },
          { title: 'Écoute', description: 'Nous valorisons les contributions de nos citoyens et les intégrons dans nos décisions.' }
        ]
      : language === 'de'
      ? [
          { title: 'Transparenz', description: 'Wir verpflichten uns, unsere Entscheidungen und Prozesse offen und zugänglich zu teilen.' },
          { title: 'Inklusion', description: 'Jeder Bürger, unabhängig von Alter, Herkunft oder Situation, hat seinen Platz in der öffentlichen Debatte.' },
          { title: 'Innovation', description: 'Wir nutzen moderne Technologien, um die Bürgerbeteiligung zu erleichtern.' },
          { title: 'Zuhören', description: 'Wir schätzen die Beiträge unserer Bürger und integrieren sie in unsere Entscheidungen.' }
        ]
      : [
          { title: 'Transparency', description: 'We are committed to sharing our decisions and processes in an open and accessible manner.' },
          { title: 'Inclusion', description: 'Every citizen, regardless of age, origin or situation, has their place in the public debate.' },
          { title: 'Innovation', description: 'We use modern technologies to facilitate citizen participation.' },
          { title: 'Listening', description: 'We value the contributions of our citizens and integrate them into our decisions.' }
        ]
  };

  const labels = {
    pageTitle: language === 'fr' ? 'Profil de l\'organisation' : language === 'de' ? 'Organisationsprofil' : 'Organization Profile',
    pageDescription: language === 'fr' ? 'Découvrez qui nous sommes et notre engagement envers la démocratie participative' : language === 'de' ? 'Entdecken Sie, wer wir sind und unser Engagement für partizipative Demokratie' : 'Discover who we are and our commitment to participatory democracy',
    about: language === 'fr' ? 'À propos' : language === 'de' ? 'Über uns' : 'About',
    contact: language === 'fr' ? 'Contact' : language === 'de' ? 'Kontakt' : 'Contact',
    vision: language === 'fr' ? 'Notre vision' : language === 'de' ? 'Unsere Vision' : 'Our Vision',
    values: language === 'fr' ? 'Nos valeurs' : language === 'de' ? 'Unsere Werte' : 'Our Values',
    territory: language === 'fr' ? 'Notre territoire' : language === 'de' ? 'Unser Gebiet' : 'Our Territory',
    citizens: language === 'fr' ? 'Citoyens enregistrés' : language === 'de' ? 'Registrierte Bürger' : 'Registered Citizens',
    since: language === 'fr' ? 'Sur CiviAgora depuis' : language === 'de' ? 'Auf CiviAgora seit' : 'On CiviAgora since',
    backToHome: language === 'fr' ? 'Retour à l\'accueil' : language === 'de' ? 'Zurück zur Startseite' : 'Back to Home',
    streets: language === 'fr' ? 'Rues' : language === 'de' ? 'Straßen' : 'Streets',
    avenues: language === 'fr' ? 'Avenues' : language === 'de' ? 'Alleen' : 'Avenues',
    parks: language === 'fr' ? 'Parcs / Jardins' : language === 'de' ? 'Parks / Gärten' : 'Parks / Gardens',
    squares: language === 'fr' ? 'Places' : language === 'de' ? 'Plätze' : 'Squares',
    totalElements: language === 'fr' ? 'Total éléments' : language === 'de' ? 'Gesamtelemente' : 'Total Elements'
  };

  return (
    <div>
      {/* Page Banner */}
      <PageBanner
        title={labels.pageTitle}
        description={labels.pageDescription}
        gradient="from-blue-600 to-purple-600"
        icon={<Building2 className="w-12 h-12 text-white" />}
      />

      {/* Main Content */}
      <PageLayout className="py-8 space-y-8">
        {/* Territory Elements KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            label={labels.streets}
            value={organization.territoryElements.streets}
            icon={MapPin}
            variant="blue"
            type="primary"
          />
          <KPICard
            label={labels.avenues}
            value={organization.territoryElements.avenues}
            icon={MapPin}
            variant="purple"
            type="primary"
          />
          <KPICard
            label={labels.parks}
            value={organization.territoryElements.parks}
            icon={TreePine}
            variant="green"
            type="primary"
          />
          <KPICard
            label={labels.squares}
            value={organization.territoryElements.squares}
            icon={Square}
            variant="orange"
            type="primary"
          />
        </div>

        {/* Main Organization Card */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {organization.logo && (
                  <div className="w-20 h-20 rounded-xl border-2 border-blue-300 overflow-hidden flex items-center justify-center bg-white shadow-md flex-shrink-0">
                    <img 
                      src={organization.logo} 
                      alt={organization.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <CardTitle className="text-3xl mb-2">{organization.name}</CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {labels.since} {new Date(organization.createdAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' })}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      <Users className="w-3 h-3 mr-1" />
                      {organization.citizensCount.toLocaleString()} {labels.citizens.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                {labels.about}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {organization.description}
              </p>
            </div>

            {/* Vision */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                {labels.vision}
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                {organization.vision}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{labels.values}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organization.values.map((value, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              {labels.contact}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {language === 'fr' ? 'Email' : language === 'de' ? 'E-Mail' : 'Email'}
                  </p>
                  <a 
                    href={`mailto:${organization.email}`}
                    className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                  >
                    {organization.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {language === 'fr' ? 'Téléphone' : language === 'de' ? 'Telefon' : 'Phone'}
                  </p>
                  <a 
                    href={`tel:${organization.phone}`}
                    className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                  >
                    {organization.phone}
                  </a>
                </div>
              </div>

              {/* Website */}
              {organization.website && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {language === 'fr' ? 'Site web' : language === 'de' ? 'Webseite' : 'Website'}
                    </p>
                    <a 
                      href={organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                    >
                      {organization.website}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {language === 'fr' ? 'Adresse' : language === 'de' ? 'Adresse' : 'Address'}
                  </p>
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {organization.address}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Territory Map */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{labels.territory}</h2>
          <TerritoryMapInteractive 
            organizationName={organization.name}
            territoryType={organization.territoryType}
            center={organization.territory.center}
            zoom={organization.territory.zoom}
            boundary={organization.territory.boundary}
            area={organization.territory.area}
            postalCodes={organization.territory.postalCodes}
            districts={organization.territory.districts}
          />
        </div>

        {/* Call to Action */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'fr' 
                ? 'Participez à la vie de votre ville' 
                : language === 'de' 
                ? 'Beteiligen Sie sich am Leben Ihrer Stadt' 
                : 'Participate in the life of your city'}
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Rejoignez des milliers de citoyens qui façonnent l\'avenir de notre territoire à travers CiviAgora.'
                : language === 'de'
                ? 'Schließen Sie sich Tausenden von Bürgern an, die die Zukunft unseres Gebiets durch CiviAgora gestalten.'
                : 'Join thousands of citizens shaping the future of our territory through CiviAgora.'}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => window.location.href = '/'}
              >
                <Home className="w-4 h-4 mr-2" />
                {labels.backToHome}
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-purple-600 text-white hover:bg-purple-700 border-2 border-purple-700"
                onClick={() => window.location.href = '/register'}
              >
                <Users className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Créer un compte' : language === 'de' ? 'Konto erstellen' : 'Create Account'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-900 font-medium mb-1">
                {language === 'fr' ? 'Données officielles' : language === 'de' ? 'Offizielle Daten' : 'Official Data'}
              </p>
              <p className="text-sm text-blue-700">
                {language === 'fr'
                  ? 'Les informations affichées sur cette page sont gérées et mises à jour par l\'administration de l\'organisation via le backoffice CiviAgora.'
                  : language === 'de'
                  ? 'Die auf dieser Seite angezeigten Informationen werden von der Organisationsverwaltung über das CiviAgora-Backoffice verwaltet und aktualisiert.'
                  : 'The information displayed on this page is managed and updated by the organization\'s administration via the CiviAgora backoffice.'}
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}