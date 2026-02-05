import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Target
} from 'lucide-react';

interface LegislativeStatisticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultation: any | null;
}

export function LegislativeStatisticsDialog({ 
  open, 
  onOpenChange, 
  consultation 
}: LegislativeStatisticsDialogProps) {
  const { language } = useLanguage();

  if (!consultation) return null;

  // Calculate statistics
  const duration = consultation.startDate && consultation.endDate 
    ? Math.ceil((new Date(consultation.endDate).getTime() - new Date(consultation.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const articlesWithAnnotations = consultation.totalArticles > 0
    ? Math.floor(consultation.totalArticles * 0.75) // Mock: 75% of articles have annotations
    : 0;

  const averageAnnotationsPerArticle = consultation.totalArticles > 0
    ? (consultation.totalAnnotations / consultation.totalArticles).toFixed(1)
    : '0';

  const engagementRate = consultation.totalParticipants > 0
    ? ((consultation.totalParticipants / 1000) * 100).toFixed(1) // Mock calculation
    : '0';

  const positiveVotes = Math.floor(consultation.totalAnnotations * 0.65); // Mock: 65% positive
  const negativeVotes = consultation.totalAnnotations - positiveVotes;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {language === 'fr' && 'Statistiques détaillées'}
            {language === 'de' && 'Detaillierte Statistiken'}
            {language === 'en' && 'Detailed Statistics'}
          </DialogTitle>
          <DialogDescription>
            {consultation.title[language]}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{consultation.totalArticles}</p>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Articles'}
                    {language === 'de' && 'Artikel'}
                    {language === 'en' && 'Articles'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{consultation.totalAnnotations}</p>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Annotations'}
                    {language === 'de' && 'Anmerkungen'}
                    {language === 'en' && 'Annotations'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{consultation.totalParticipants}</p>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Participants'}
                    {language === 'de' && 'Teilnehmer'}
                    {language === 'en' && 'Participants'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{engagementRate}%</p>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Engagement'}
                    {language === 'de' && 'Beteiligung'}
                    {language === 'en' && 'Engagement'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5" />
                {language === 'fr' && 'Détails de la participation'}
                {language === 'de' && 'Teilnahmedetails'}
                {language === 'en' && 'Participation Details'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">
                      {language === 'fr' && 'Articles avec annotations'}
                      {language === 'de' && 'Artikel mit Anmerkungen'}
                      {language === 'en' && 'Articles with annotations'}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {articlesWithAnnotations} / {consultation.totalArticles}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">
                      {language === 'fr' && 'Moyenne d\'annotations par article'}
                      {language === 'de' && 'Durchschnittliche Anmerkungen pro Artikel'}
                      {language === 'en' && 'Average annotations per article'}
                    </span>
                  </div>
                  <Badge variant="outline">{averageAnnotationsPerArticle}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">
                      {language === 'fr' && 'Durée de la consultation'}
                      {language === 'de' && 'Beratungsdauer'}
                      {language === 'en' && 'Consultation duration'}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {duration} {language === 'fr' ? 'jours' : language === 'de' ? 'Tage' : 'days'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Votes Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ThumbsUp className="w-5 h-5" />
                {language === 'fr' && 'Distribution des votes'}
                {language === 'de' && 'Stimmenverteilung'}
                {language === 'en' && 'Votes Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        {language === 'fr' && 'Votes positifs'}
                        {language === 'de' && 'Positive Stimmen'}
                        {language === 'en' && 'Positive votes'}
                      </span>
                    </div>
                    <span className="text-sm font-semibold">{positiveVotes}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(positiveVotes / consultation.totalAnnotations) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm">
                        {language === 'fr' && 'Votes négatifs'}
                        {language === 'de' && 'Negative Stimmen'}
                        {language === 'en' && 'Negative votes'}
                      </span>
                    </div>
                    <span className="text-sm font-semibold">{negativeVotes}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${(negativeVotes / consultation.totalAnnotations) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                {language === 'fr' && 'Chronologie'}
                {language === 'de' && 'Zeitplan'}
                {language === 'en' && 'Timeline'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-semibold">
                      {language === 'fr' && 'Création'}
                      {language === 'de' && 'Erstellung'}
                      {language === 'en' && 'Creation'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(consultation.createdAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-semibold">
                      {language === 'fr' && 'Date de début'}
                      {language === 'de' && 'Startdatum'}
                      {language === 'en' && 'Start Date'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(consultation.startDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-semibold">
                      {language === 'fr' && 'Date de fin'}
                      {language === 'de' && 'Enddatum'}
                      {language === 'en' && 'End Date'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(consultation.endDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5" />
                {language === 'fr' && 'Indicateurs clés'}
                {language === 'de' && 'Wichtige Kennzahlen'}
                {language === 'en' && 'Key Insights'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  • {language === 'fr' && `Taux de participation : ${engagementRate}% des citoyens éligibles`}
                  {language === 'de' && `Beteiligungsrate: ${engagementRate}% der berechtigten Bürger`}
                  {language === 'en' && `Participation rate: ${engagementRate}% of eligible citizens`}
                </p>
                <p>
                  • {language === 'fr' && `En moyenne ${averageAnnotationsPerArticle} annotations par article`}
                  {language === 'de' && `Durchschnittlich ${averageAnnotationsPerArticle} Anmerkungen pro Artikel`}
                  {language === 'en' && `Average ${averageAnnotationsPerArticle} annotations per article`}
                </p>
                <p>
                  • {language === 'fr' && `${Math.round((articlesWithAnnotations / consultation.totalArticles) * 100)}% des articles ont reçu des commentaires`}
                  {language === 'de' && `${Math.round((articlesWithAnnotations / consultation.totalArticles) * 100)}% der Artikel erhielten Kommentare`}
                  {language === 'en' && `${Math.round((articlesWithAnnotations / consultation.totalArticles) * 100)}% of articles received comments`}
                </p>
                <p>
                  • {language === 'fr' && `Sentiment général : ${Math.round((positiveVotes / consultation.totalAnnotations) * 100)}% positif`}
                  {language === 'de' && `Allgemeine Stimmung: ${Math.round((positiveVotes / consultation.totalAnnotations) * 100)}% positiv`}
                  {language === 'en' && `Overall sentiment: ${Math.round((positiveVotes / consultation.totalAnnotations) * 100)}% positive`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
