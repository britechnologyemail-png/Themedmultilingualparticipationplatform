import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { PageBanner } from "../components/PageBanner";
import { PageLayout } from "../components/layout/PageLayout";
import { KPICard } from "../components/layout/KPICard";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { IVRAccessBanner } from "../components/IVRAccessBanner";
import {
  MessageSquare,
  Users,
  FileText,
  CheckSquare,
  ArrowRight,
  Home,
  Lightbulb,
  Calendar,
  TrendingUp,
  Clock,
  Mic,
  UserCheck,
  Scale,
  Sparkles,
  Vote,
  AlertCircle,
} from "lucide-react";
import { themes } from "../data/themes";
import { 
  useDashboardStats, 
  useConsultations, 
  usePetitions, 
  useVotes, 
  useAssemblies, 
  useThemes,
  useYouthPolls,
  useYouthSpaceStats
} from "../hooks/useApi";

export function Dashboard() {
  const { t, language, tLocal } = useLanguage();
  const navigate = useNavigate();

  // Fetch data using React Query hooks
  const { data: stats, isLoading: isLoadingStats } = useDashboardStats();
  const { data: themes } = useThemes();
  const { data: consultations } = useConsultations();
  const { data: petitions } = usePetitions();
  const { data: votes } = useVotes();
  const { data: assemblies } = useAssemblies();
  const { data: youthPolls } = useYouthPolls({ status: 'active', featured: true });
  const { data: youthStats } = useYouthSpaceStats();

  const kpiStats = [
    {
      label: language === 'fr' ? 'Processus actifs' : language === 'de' ? 'Aktive Prozesse' : 'Active processes',
      value: stats?.overview?.activeConsultations?.toString() || "0",
      icon: MessageSquare,
      variant: 'blue' as const,
    },
    {
      label: language === 'fr' ? 'Pétitions ouvertes' : language === 'de' ? 'Offene Petitionen' : 'Open petitions',
      value: stats?.overview?.openPetitions?.toString() || "0",
      icon: FileText,
      variant: 'green' as const,
    },
    {
      label: language === 'fr' ? 'Votes en cours' : language === 'de' ? 'Laufende Abstimmungen' : 'Ongoing votes',
      value: stats?.overview?.ongoingVotes?.toString() || "0",
      icon: CheckSquare,
      variant: 'purple' as const,
    },
    {
      label: language === 'fr' ? 'Participants totaux' : language === 'de' ? 'Teilnehmer insgesamt' : 'Total participants',
      value: stats?.overview?.totalParticipants?.toLocaleString() || "0",
      icon: Users,
      variant: 'orange' as const,
    },
  ];

  // Show loading state
  if (isLoadingStats) {
    return (
      <div>
        <PageBanner
          title={
            language === "fr"
              ? "Tableau de bord citoyen"
              : language === "de"
                ? "Bürger-Dashboard"
                : "Citizen Dashboard"
          }
          description={
            language === "fr"
              ? "Participez aux décisions qui façonnent votre commune"
              : language === "de"
                ? "Beteiligen Sie sich an Entscheidungen, die Ihre Gemeinde gestalten"
                : "Participate in decisions that shape your community"
          }
          gradient="from-blue-600 to-indigo-600"
          icon={<Home className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center text-gray-500">
            {language === 'fr' ? 'Chargement...' : language === 'de' ? 'Laden...' : 'Loading...'}
          </div>
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
      <PageBanner
        title={
          language === "fr"
            ? "Tableau de bord citoyen"
            : language === "de"
              ? "Bürger-Dashboard"
              : "Citizen Dashboard"
        }
        description={
          language === "fr"
            ? "Participez aux décisions qui façonnent votre commune"
            : language === "de"
              ? "Beteiligen Sie sich an Entscheidungen, die Ihre Gemeinde gestalten"
              : "Participate in decisions that shape your community"
        }
        gradient="from-blue-600 to-indigo-600"
        icon={<Home className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        {/* KPI Cards - Standard 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiStats.map((stat, index) => (
            <KPICard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              variant={stat.variant}
            />
          ))}
        </div>

        {/* IVR Access Banner */}
        <div className="mb-12">
          <IVRAccessBanner />
        </div>

        {/* Themes Overview - Moved here after KPI cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {t("nav.themes")}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Explorez les thématiques de votre commune"}
                {language === "de" && "Entdecken Sie die Themen Ihrer Gemeinde"}
                {language === "en" && "Explore your community's themes"}
              </p>
            </div>
            <Link
              to="/themes"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir tous"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes?.slice(0, 8).map((theme, index) => {
              // Mock data for active processes per theme
              const processCount = [12, 8, 15, 6, 9, 11, 7, 10][index];
              
              return (
                <Link
                  key={theme.id}
                  to={`/themes/${theme.id}`}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md bg-white group"
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor: theme.color,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{theme.icon}</span>
                    <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tLocal(theme.name)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      {processCount}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      {language === 'fr' && 'processus'}
                      {language === 'de' && 'Prozesse'}
                      {language === 'en' && 'processes'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Processus en cours */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Processus en cours"}
                {language === "de" && "Laufende Prozesse"}
                {language === "en" && "Ongoing Processes"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Participez aux dispositifs actifs"}
                {language === "de" && "Beteiligen Sie sich an aktiven Prozessen"}
                {language === "en" && "Participate in active processes"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/consultations" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-blue-500 hover:border-l-blue-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors">
                      {language === "fr" && "8 actives"}
                      {language === "de" && "8 aktiv"}
                      {language === "en" && "8 active"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {t("nav.consultations")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Donnez votre avis sur les projets locaux"}
                    {language === "de" && "Geben Sie Ihre Meinung zu lokalen Projekten ab"}
                    {language === "en" && "Share your opinion on local projects"}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Participer"}
                      {language === "de" && "Teilnehmen"}
                      {language === "en" && "Participate"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/petitions" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-green-500 hover:border-l-green-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      {language === "fr" && "10 ouvertes"}
                      {language === "de" && "10 offen"}
                      {language === "en" && "10 open"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {t("nav.petitions")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Signez ou créez une pétition citoyenne"}
                    {language === "de" && "Unterschreiben oder erstellen Sie eine Petition"}
                    {language === "en" && "Sign or create a citizen petition"}
                  </p>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Signer"}
                      {language === "de" && "Unterschreiben"}
                      {language === "en" && "Sign"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/votes" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-purple-500 hover:border-l-purple-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Vote className="w-6 h-6 text-purple-600" />
                    </div>
                    <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                      {language === "fr" && "5 en cours"}
                      {language === "de" && "5 laufend"}
                      {language === "en" && "5 ongoing"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {language === "fr" && "Votes & Référendums"}
                    {language === "de" && "Abstimmungen & Referenden"}
                    {language === "en" && "Votes & Referendums"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Votez sur les décisions importantes"}
                    {language === "de" && "Stimmen Sie über wichtige Entscheidungen ab"}
                    {language === "en" && "Vote on important decisions"}
                  </p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Voter"}
                      {language === "de" && "Abstimmen"}
                      {language === "en" && "Vote"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/signalements" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-red-500 hover:border-l-red-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <Badge className="bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition-colors">
                      {language === "fr" && "12 actifs"}
                      {language === "de" && "12 aktiv"}
                      {language === "en" && "12 active"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {language === "fr" && "Signalements citoyens"}
                    {language === "de" && "Bürgermeldungen"}
                    {language === "en" && "Citizen Reports"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Signalez les problèmes de votre commune"}
                    {language === "de" && "Melden Sie Probleme in Ihrer Gemeinde"}
                    {language === "en" && "Report issues in your community"}
                  </p>
                  <div className="flex items-center text-red-600 text-sm font-medium">
                    <span>
                      {language === "fr" && "Signaler"}
                      {language === "de" && "Melden"}
                      {language === "en" && "Report"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Legislative Consultations - NEW */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {t("nav.legislativeConsultations")}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Annotez et commentez les projets de loi article par article"}
                {language === "de" && "Kommentieren Sie Gesetzesentwürfe Artikel für Artikel"}
                {language === "en" && "Annotate and comment on bills article by article"}
              </p>
            </div>
            <Link
              to="/legislative-consultations"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/legislative-consultations/leg_001">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                      <Scale className="w-3 h-3 mr-1" />
                      {language === "fr" && "Projet de loi"}
                      {language === "de" && "Gesetzentwurf"}
                      {language === "en" && "Bill"}
                    </Badge>
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "18 jours restants"}
                      {language === "de" && "18 Tage übrig"}
                      {language === "en" && "18 days left"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Transition Énergétique 2026"}
                    {language === "de" && "Energiewende 2026"}
                    {language === "en" && "Energy Transition 2026"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Projet de loi visant à accélérer la transition vers les énergies renouvelables"}
                    {language === "de" && "Gesetzentwurf zur Beschleunigung des Übergangs zu erneuerbaren Energien"}
                    {language === "en" && "Bill to accelerate the transition to renewable energy"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>12 {language === "fr" ? "articles" : language === "de" ? "Artikel" : "articles"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>145 {language === "fr" ? "annotations" : language === "de" ? "Anmerkungen" : "annotations"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>89</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/legislative-consultations/leg_002">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors">
                      <Scale className="w-3 h-3 mr-1" />
                      {language === "fr" && "Règlement"}
                      {language === "de" && "Verordnung"}
                      {language === "en" && "Regulation"}
                    </Badge>
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "25 jours restants"}
                      {language === "de" && "25 Tage übrig"}
                      {language === "en" && "25 days left"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Protection des Données Numériques"}
                    {language === "de" && "Digitaler Datenschutz"}
                    {language === "en" && "Digital Data Protection"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Nouveau règlement sur la protection des données personnelles dans l'ère numérique"}
                    {language === "de" && "Neue Verordnung zum Schutz personenbezogener Daten im digitalen Zeitalter"}
                    {language === "en" && "New regulation on personal data protection in the digital age"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>8 {language === "fr" ? "articles" : language === "de" ? "Artikel" : "articles"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>67 {language === "fr" ? "annotations" : language === "de" ? "Anmerkungen" : "annotations"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>42</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Assemblées citoyennes - New Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Assemblées citoyennes"}
                {language === "de" && "Bürgerversammlungen"}
                {language === "en" && "Citizens' Assemblies"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Délibérations citoyennes sur les grands enjeux"}
                {language === "de" && "Bürgerberatungen zu wichtigen Themen"}
                {language === "en" && "Citizen deliberations on major issues"}
              </p>
            </div>
            <Link
              to="/assemblies"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/assemblies">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "Prochaine session"}
                      {language === "de" && "Nächste Sitzung"}
                      {language === "en" && "Next session"}
                    </Badge>
                    <Badge className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors">
                      {language === "fr" && "Climat"}
                      {language === "de" && "Klima"}
                      {language === "en" && "Climate"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Assemblée climat"}
                    {language === "de" && "Klimaversammlung"}
                    {language === "en" && "Climate assembly"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Citoyens tirés au sort pour délibérer sur les enjeux climatiques locaux"}
                    {language === "de" && "Zufällig ausgewählte Bürger beraten über lokale Klimafragen"}
                    {language === "en" && "Randomly selected citizens deliberate on local climate issues"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      <span>45 {language === "fr" ? "membres" : language === "de" ? "Mitglieder" : "members"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>18 {language === "fr" ? "Mars" : language === "de" ? "März" : "March"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/assemblies">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "En délibération"}
                      {language === "de" && "In Beratung"}
                      {language === "en" && "Deliberating"}
                    </Badge>
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      {language === "fr" && "Urbanisme"}
                      {language === "de" && "Stadtplanung"}
                      {language === "en" && "Urban planning"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Assemblée logement"}
                    {language === "de" && "Wohnungsversammlung"}
                    {language === "en" && "Housing assembly"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Recommandations citoyennes sur la politique de logement abordable"}
                    {language === "de" && "Bürgerempfehlungen zur bezahlbaren Wohnungspolitik"}
                    {language === "en" && "Citizen recommendations on affordable housing policy"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      <span>60 {language === "fr" ? "membres" : language === "de" ? "Mitglieder" : "members"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>8 {language === "fr" ? "sessions" : language === "de" ? "Sitzungen" : "sessions"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/assemblies">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "Rapport publié"}
                      {language === "de" && "Bericht veröffentlicht"}
                      {language === "en" && "Report published"}
                    </Badge>
                    <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                      {language === "fr" && "Santé"}
                      {language === "de" && "Gesundheit"}
                      {language === "en" && "Health"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Assemblée santé publique"}
                    {language === "de" && "Gesundheitsversammlung"}
                    {language === "en" && "Public health assembly"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Propositions citoyennes pour améliorer l'accès aux soins de proximité"}
                    {language === "de" && "Bürgervorschläge zur Verbesserung des Zugangs zur Gesundheitsversorgung"}
                    {language === "en" && "Citizen proposals to improve access to local healthcare"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      <span>50 {language === "fr" ? "membres" : language === "de" ? "Mitglieder" : "members"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>24 {language === "fr" ? "recommandations" : language === "de" ? "Empfehlungen" : "recommendations"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Concertations */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Concertations actives"}
                {language === "de" && "Aktive Konsultationen"}
                {language === "en" && "Active Consultations"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Contribuez aux projets en cours de votre commune"}
                {language === "de" && "Tragen Sie zu laufenden Projekten Ihrer Gemeinde bei"}
                {language === "en" && "Contribute to your community's ongoing projects"}
              </p>
            </div>
            <Link
              to="/consultations"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/consultations">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "15 jours restants"}
                      {language === "de" && "15 Tage übrig"}
                      {language === "en" && "15 days left"}
                    </Badge>
                    <Badge className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors">
                      {language === "fr" && "Environnement"}
                      {language === "de" && "Umwelt"}
                      {language === "en" && "Environment"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Aménagement du parc central"}
                    {language === "de" && "Neugestaltung des Zentralparks"}
                    {language === "en" && "Central park redevelopment"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Participez à la réflexion sur la rénovation du parc central de Bruxelles"}
                    {language === "de" && "Beteiligen Sie sich an der Planung der Renovierung des Brüsseler Zentralparks"}
                    {language === "en" && "Participate in the discussion on Brussels central park renovation"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>234 {language === "fr" ? "participants" : language === "de" ? "Teilnehmer" : "participants"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>127 {language === "fr" ? "contributions" : language === "de" ? "Beiträge" : "contributions"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/consultations">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "22 jours restants"}
                      {language === "de" && "22 Tage übrig"}
                      {language === "en" && "22 days left"}
                    </Badge>
                    <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                      {language === "fr" && "Mobilité"}
                      {language === "de" && "Mobilität"}
                      {language === "en" && "Mobility"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Zones piétonnes au centre-ville"}
                    {language === "de" && "Fußgängerzonen in der Innenstadt"}
                    {language === "en" && "Downtown pedestrian zones"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Donnez votre avis sur l'extension des zones piétonnes"}
                    {language === "de" && "Geben Sie Ihre Meinung zur Erweiterung der Fußgängerzonen ab"}
                    {language === "en" && "Share your opinion on pedestrian zone expansion"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>189 {language === "fr" ? "participants" : language === "de" ? "Teilnehmer" : "participants"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>95 {language === "fr" ? "contributions" : language === "de" ? "Beiträge" : "contributions"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Pétitions populaires */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {language === "fr" && "Pétitions populaires"}
                {language === "de" && "Beliebte Petitionen"}
                {language === "en" && "Popular Petitions"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "fr" && "Soutenez les initiatives citoyennes"}
                {language === "de" && "Unterstützen Sie Bürgerinitiativen"}
                {language === "en" && "Support citizen initiatives"}
              </p>
            </div>
            <Link
              to="/petitions"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group"
            >
              <span>
                {language === "fr" && "Voir toutes"}
                {language === "de" && "Alle anzeigen"}
                {language === "en" && "View all"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/petitions">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {language === "fr" && "En tendance"}
                      {language === "de" && "Im Trend"}
                      {language === "en" && "Trending"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Plus d'espaces verts"}
                    {language === "de" && "Mehr Grünflächen"}
                    {language === "en" && "More green spaces"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Pour la création de nouveaux parcs urbains"}
                    {language === "de" && "Für die Schaffung neuer Stadtparks"}
                    {language === "en" && "For the creation of new urban parks"}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {language === "fr" && "Signatures"}
                        {language === "de" && "Unterschriften"}
                        {language === "en" && "Signatures"}
                      </span>
                      <span className="font-semibold text-gray-900">2,847 / 5,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/petitions">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors">
                      {language === "fr" && "Mobilité"}
                      {language === "de" && "Mobilität"}
                      {language === "en" && "Mobility"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Transport gratuit"}
                    {language === "de" && "Kostenloser Transport"}
                    {language === "en" && "Free public transport"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Pour la gratuité des transports publics"}
                    {language === "de" && "Für kostenlose öffentliche Verkehrsmittel"}
                    {language === "en" && "For free public transportation"}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {language === "fr" && "Signatures"}
                        {language === "de" && "Unterschriften"}
                        {language === "en" && "Signatures"}
                      </span>
                      <span className="font-semibold text-gray-900">1,923 / 3,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/petitions">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition-colors">
                      {language === "fr" && "Éducation"}
                      {language === "de" && "Bildung"}
                      {language === "en" && "Education"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Rénovation des écoles"}
                    {language === "de" && "Schulrenovierung"}
                    {language === "en" && "School renovation"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Pour la modernisation des infrastructures scolaires"}
                    {language === "de" && "Für die Modernisierung der Schulinfrastruktur"}
                    {language === "en" && "For school infrastructure modernization"}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {language === "fr" && "Signatures"}
                        {language === "de" && "Unterschriften"}
                        {language === "en" && "Signatures"}
                      </span>
                      <span className="font-semibold text-gray-900">1,456 / 2,500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Votes & Référendums */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900">
              {language === "fr" && "Votes & Référendums"}
              {language === "de" && "Abstimmungen & Referenden"}
              {language === "en" && "Votes & Referendums"}
            </h2>
            <Link
              to="/votes"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              {language === "fr" && "Voir tous"}
              {language === "de" && "Alle anzeigen"}
              {language === "en" && "View all"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/votes">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "Se termine dans 3 jours"}
                      {language === "de" && "Endet in 3 Tagen"}
                      {language === "en" && "Ends in 3 days"}
                    </Badge>
                    <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors">
                      {language === "fr" && "Référendum"}
                      {language === "de" && "Referendum"}
                      {language === "en" && "Referendum"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Budget participatif 2026"}
                    {language === "de" && "Bürgerhaushalt 2026"}
                    {language === "en" && "Participatory budget 2026"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Votez pour la répartition du budget participatif de 2 millions d'euros"}
                    {language === "de" && "Stimmen Sie über die Verteilung des Bürgerhaushalts von 2 Millionen Euro ab"}
                    {language === "en" && "Vote on the allocation of the €2 million participatory budget"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <Users className="w-4 h-4 inline mr-1" />
                      1,234 {language === "fr" ? "votes" : language === "de" ? "Stimmen" : "votes"}
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      {language === "fr" && "Voter maintenant"}
                      {language === "de" && "Jetzt abstimmen"}
                      {language === "en" && "Vote now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/votes">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      <Clock className="w-3 h-3 mr-1" />
                      {language === "fr" && "Se termine dans 10 jours"}
                      {language === "de" && "Endet in 10 Tagen"}
                      {language === "en" && "Ends in 10 days"}
                    </Badge>
                    <Badge className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors">
                      {language === "fr" && "Sondage"}
                      {language === "de" && "Umfrage"}
                      {language === "en" && "Poll"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Horaires d'ouverture des bibliothèques"}
                    {language === "de" && "Öffnungszeiten der Bibliotheken"}
                    {language === "en" && "Library opening hours"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Aidez-nous à définir les horaires d'ouverture adaptés à vos besoins"}
                    {language === "de" && "Helfen Sie uns, die Öffnungszeiten an Ihre Bedürfnisse anzupassen"}
                    {language === "en" && "Help us define opening hours adapted to your needs"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <Users className="w-4 h-4 inline mr-1" />
                      567 {language === "fr" ? "votes" : language === "de" ? "Stimmen" : "votes"}
                    </div>
                    <Button size="sm" variant="outline">
                      {language === "fr" && "Participer"}
                      {language === "de" && "Teilnehmen"}
                      {language === "en" && "Participate"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Conférences à venir */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900">
              {language === "fr" && "Conférences à venir"}
              {language === "de" && "Kommende Konferenzen"}
              {language === "en" && "Upcoming Conferences"}
            </h2>
            <Link
              to="/conferences"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              {language === "fr" && "Voir toutes"}
              {language === "de" && "Alle anzeigen"}
              {language === "en" && "View all"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/conferences">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">15 {language === "fr" ? "Mars" : language === "de" ? "März" : "March"} 2026</div>
                      <div className="text-gray-500">18:30 - 20:30</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Transition énergétique locale"}
                    {language === "de" && "Lokale Energiewende"}
                    {language === "en" && "Local energy transition"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Débat public sur les énergies renouvelables"}
                    {language === "de" && "Öffentliche Debatte über erneuerbare Energien"}
                    {language === "en" && "Public debate on renewable energies"}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Mic className="w-4 h-4" />
                    <span>{language === "fr" ? "3 intervenants" : language === "de" ? "3 Redner" : "3 speakers"}</span>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                    {language === "fr" && "Inscriptions ouvertes"}
                    {language === "de" && "Anmeldung offen"}
                    {language === "en" && "Registration open"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            <Link to="/conferences">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">22 {language === "fr" ? "Mars" : language === "de" ? "März" : "March"} 2026</div>
                      <div className="text-gray-500">19:00 - 21:00</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Mobilité urbaine durable"}
                    {language === "de" && "Nachhaltige Stadtmobilität"}
                    {language === "en" && "Sustainable urban mobility"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Conférence sur l'avenir des transports"}
                    {language === "de" && "Konferenz über die Zukunft des Verkehrs"}
                    {language === "en" && "Conference on the future of transport"}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Mic className="w-4 h-4" />
                    <span>{language === "fr" ? "4 intervenants" : language === "de" ? "4 Redner" : "4 speakers"}</span>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                    {language === "fr" && "Inscriptions ouvertes"}
                    {language === "de" && "Anmeldung offen"}
                    {language === "en" && "Registration open"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>

            <Link to="/conferences">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">5 {language === "fr" ? "Avril" : language === "de" ? "April" : "April"} 2026</div>
                      <div className="text-gray-500">14:00 - 17:00</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === "fr" && "Participation citoyenne"}
                    {language === "de" && "Bürgerbeteiligung"}
                    {language === "en" && "Citizen participation"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "fr" && "Atelier pratique sur la démocratie locale"}
                    {language === "de" && "Praktischer Workshop zu lokaler Demokratie"}
                    {language === "en" && "Practical workshop on local democracy"}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Mic className="w-4 h-4" />
                    <span>{language === "fr" ? "2 intervenants" : language === "de" ? "2 Redner" : "2 speakers"}</span>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                    {language === "fr" && "Inscriptions ouvertes"}
                    {language === "de" && "Anmeldung offen"}
                    {language === "en" && "Registration open"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Youth Space - Espace Jeunesse */}
        {youthPolls && youthPolls.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  {language === "fr" && "Espace Jeunesse"}
                  {language === "de" && "Jugendraum"}
                  {language === "en" && "Youth Space"}
                </h2>
                <p className="text-sm text-gray-500">
                  {language === "fr" && "Participe aux micro-sondages et gagne des points !"}
                  {language === "de" && "Nimm an Mikro-Umfragen teil und sammle Punkte!"}
                  {language === "en" && "Participate in micro-polls and earn points!"}
                </p>
              </div>
              <Link
                to="/youth-space"
                className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors group"
              >
                <span>
                  {language === "fr" && "Voir tout"}
                  {language === "de" && "Alle anzeigen"}
                  {language === "en" && "View all"}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-xl p-6 mb-6 border border-purple-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === "fr" && "🎯 Fais entendre ta voix !"}
                    {language === "de" && "🎯 Lass deine Stimme hören!"}
                    {language === "en" && "🎯 Make your voice heard!"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "fr" && `${youthStats?.activePolls || 0} sondages actifs • ${youthStats?.userPoints || 0} points gagnés`}
                    {language === "de" && `${youthStats?.activePolls || 0} aktive Umfragen • ${youthStats?.userPoints || 0} Punkte gesammelt`}
                    {language === "en" && `${youthStats?.activePolls || 0} active polls • ${youthStats?.userPoints || 0} points earned`}
                  </p>
                </div>
                <Link to="/youth-space">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    {language === "fr" && "Participer maintenant"}
                    {language === "de" && "Jetzt teilnehmen"}
                    {language === "en" && "Participate now"}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {youthPolls.slice(0, 3).map((poll) => (
                <Link key={poll.id} to={`/youth-space/${poll.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-purple-500 overflow-hidden">
                    {poll.imageUrl && (
                      <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100">
                        <img 
                          src={poll.imageUrl} 
                          alt={typeof poll.title === 'string' ? poll.title : poll.title.fr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {typeof poll.title === 'string' ? poll.title : tLocal(poll.title)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {typeof poll.description === 'string' ? poll.description : tLocal(poll.description)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{poll.estimatedDuration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{poll.totalResponses}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Sparkles className="w-3 h-3" />
                          <span className="font-medium">{poll.gamificationPoints} pts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action - Propose an Idea */}
        <Card className="mt-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-none shadow-lg">
          <CardContent className="py-12 px-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl mb-4 text-gray-900">
              {language === "fr" &&
                "Vous avez une idée pour votre commune ?"}
              {language === "de" &&
                "Sie haben eine Idee für Ihre Gemeinde?"}
              {language === "en" &&
                "Do you have an idea for your community?"}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === "fr" &&
                "Partagez vos propositions pour améliorer la vie locale. Chaque idée compte et peut faire la différence !"}
              {language === "de" &&
                "Teilen Sie Ihre Vorschläge zur Verbesserung des lokalen Lebens. Jede Idee zählt und kann den Unterschied machen!"}
              {language === "en" &&
                "Share your proposals to improve local life. Every idea counts and can make a difference!"}
            </p>
            <Link to="/propose-idea">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
              >
                <Lightbulb className="w-5 h-5" />
                {language === "fr" && "Proposer une idée"}
                {language === "de" && "Eine Idee vorschlagen"}
                {language === "en" && "Propose an idea"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </PageLayout>
    </div>
  );
}