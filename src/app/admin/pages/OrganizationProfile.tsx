import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Building2, Edit, Mail, Phone, Globe, MapPin, Calendar, CheckCircle, Settings } from 'lucide-react';
import { EditOrganizationDialog } from '../components/dialogs/OrganizationDialogs';
import { toast } from 'sonner';

export function OrganizationProfile() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [organization, setOrganization] = useState({
    id: 'org-1',
    name: 'Ville de Genève',
    description: 'La Ville de Genève est une collectivité publique suisse engagée dans la démocratie participative et l\'écoute citoyenne.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    email: 'participation@ville-geneve.ch',
    phone: '+41 22 418 29 00',
    website: 'https://www.ville-geneve.ch',
    address: 'Palais Eynard\nRue de la Croix-Rouge 4\n1204 Genève\nSuisse',
    createdAt: '2024-01-15',
    status: 'active',
    employeesCount: 450,
    citizensCount: 203856
  });

  const handleSave = (updatedOrg: any) => {
    setOrganization({ ...organization, ...updatedOrg });
    toast.success(language === 'fr' ? 'Organisation mise à jour avec succès' :
                  language === 'de' ? 'Organisation erfolgreich aktualisiert' :
                  'Organization updated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Profil de l\'organisation' :
             language === 'de' ? 'Organisationsprofil' :
             'Organization Profile'}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' ? 'Gérez les informations générales de votre organisation' :
             language === 'de' ? 'Verwalten Sie die allgemeinen Informationen Ihrer Organisation' :
             'Manage your organization\'s general information'}
          </p>
        </div>
        <Button onClick={() => setEditDialogOpen(true)} className="gap-2">
          <Edit className="w-4 h-4" />
          {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
        </Button>
      </div>

      {/* Organization Overview Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {organization.logo && (
                <div className="w-20 h-20 rounded-xl border-2 border-blue-300 overflow-hidden flex items-center justify-center bg-white shadow-md">
                  <img 
                    src={organization.logo} 
                    alt={organization.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <CardTitle className="text-2xl">{organization.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'}
                  </Badge>
                  <Badge variant="outline" className="text-gray-600">
                    <Calendar className="w-3 h-3 mr-1" />
                    Depuis {new Date(organization.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {organization.description}
          </p>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'fr' ? 'Citoyens enregistrés' : language === 'de' ? 'Registrierte Bürger' : 'Registered Citizens'}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {organization.citizensCount.toLocaleString()}
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'fr' ? 'Personnel' : language === 'de' ? 'Personal' : 'Staff'}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {organization.employeesCount}
                </p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Informations de contact' :
             language === 'de' ? 'Kontaktinformationen' :
             'Contact Information'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Coordonnées publiques de votre organisation' :
             language === 'de' ? 'Öffentliche Kontaktdaten Ihrer Organisation' :
             'Public contact details of your organization'}
          </CardDescription>
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
                  className="text-blue-600 hover:text-blue-700 hover:underline"
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
                  className="text-blue-600 hover:text-blue-700 hover:underline"
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
                    className="text-blue-600 hover:text-blue-700 hover:underline"
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
                <p className="text-gray-600 whitespace-pre-line">
                  {organization.address}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' ? 'Actions rapides' :
             language === 'de' ? 'Schnellaktionen' :
             'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all"
              onClick={() => {
                toast.info(
                  language === 'fr' ? 'Redirection vers la gestion du territoire...' :
                  language === 'de' ? 'Weiterleitung zur Gebietsverwaltung...' :
                  'Redirecting to territory management...'
                );
                navigate('/admin/organization/territory');
              }}
            >
              <Building2 className="w-6 h-6" />
              <span className="text-sm">
                {language === 'fr' ? 'Gérer le territoire' : language === 'de' ? 'Gebiet verwalten' : 'Manage Territory'}
              </span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all"
              onClick={() => {
                toast.info(
                  language === 'fr' ? 'Redirection vers le périmètre géographique...' :
                  language === 'de' ? 'Weiterleitung zum geografischen Gebiet...' :
                  'Redirecting to geographic perimeter...'
                );
                navigate('/admin/organization/perimeter');
              }}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-sm">
                {language === 'fr' ? 'Périmètre géographique' : language === 'de' ? 'Geografisches Gebiet' : 'Geographic Perimeter'}
              </span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300 transition-all"
              onClick={() => {
                toast.info(
                  language === 'fr' ? 'Redirection vers les paramètres avancés...' :
                  language === 'de' ? 'Weiterleitung zu erweiterten Einstellungen...' :
                  'Redirecting to advanced settings...'
                );
                navigate('/admin/settings/general');
              }}
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm">
                {language === 'fr' ? 'Paramètres avancés' : language === 'de' ? 'Erweiterte Einstellungen' : 'Advanced Settings'}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditOrganizationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        organization={organization}
        onSave={handleSave}
      />
    </div>
  );
}