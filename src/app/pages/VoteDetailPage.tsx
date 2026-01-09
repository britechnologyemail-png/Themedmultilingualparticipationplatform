import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeTag } from '../components/ThemeTag';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { votes } from '../data/mockData';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  BarChart3,
  Info,
  Clock,
  Edit3
} from 'lucide-react';
import { toast } from 'sonner';

export function VoteDetailPage() {
  const { voteId } = useParams<{ voteId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [previousVote, setPreviousVote] = useState<string | null>(null);
  const [isModifying, setIsModifying] = useState(false);
  const [voteDate, setVoteDate] = useState<Date | null>(null);

  const vote = votes.find(v => v.id === voteId);

  if (!vote) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/votes')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'fr' && 'Retour aux votes'}
          {language === 'de' && 'Zurück zu den Abstimmungen'}
          {language === 'en' && 'Back to votes'}
        </Button>
        <p className="text-center text-gray-600">
          {language === 'fr' && 'Vote non trouvé'}
          {language === 'de' && 'Abstimmung nicht gefunden'}
          {language === 'en' && 'Vote not found'}
        </p>
      </div>
    );
  }

  const totalVotes = vote.options.reduce((sum, option) => sum + (option.votes || 0), 0);
  const isOpen = vote.status === 'open';
  const isUpcoming = vote.status === 'upcoming';
  const isClosed = vote.status === 'closed';

  const handleVote = () => {
    if (!selectedOption) {
      toast.error(
        language === 'fr' ? 'Veuillez sélectionner une option' :
        language === 'de' ? 'Bitte wählen Sie eine Option' :
        'Please select an option'
      );
      return;
    }

    const now = new Date();
    setPreviousVote(selectedOption);
    setHasVoted(true);
    setIsModifying(false);
    setVoteDate(now);
    
    const successMessage = isModifying
      ? (language === 'fr' ? `Votre vote a été mis à jour avec succès le ${now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` :
         language === 'de' ? `Ihre Stimme wurde erfolgreich aktualisiert am ${now.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })} um ${now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}` :
         `Your vote was successfully updated on ${now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} at ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`)
      : (language === 'fr' ? 'Votre vote a été enregistré avec succès !' :
         language === 'de' ? 'Ihre Stimme wurde erfolgreich registriert!' :
         'Your vote has been successfully recorded!');
    
    toast.success(successMessage);
  };

  const handleModifyVote = () => {
    setIsModifying(true);
    setHasVoted(false);
    setSelectedOption(previousVote);
  };

  const getSelectedOptionText = () => {
    if (!previousVote) return '';
    const option = vote.options.find(opt => opt.id === previousVote);
    return option ? option.text : '';
  };

  const getOptionPercentage = (optionVotes: number) => {
    if (totalVotes === 0) return 0;
    return (optionVotes / totalVotes) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/votes')}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {language === 'fr' && 'Retour aux votes'}
        {language === 'de' && 'Zurück zu den Abstimmungen'}
        {language === 'en' && 'Back to votes'}
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <ThemeTag themeId={vote.themeId} className="mb-3" />
            <h1 className="text-4xl mb-2 text-gray-900">{vote.title}</h1>
            <p className="text-xl text-gray-600">{vote.question}</p>
          </div>
          <div>
            {isOpen && (
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {language === 'fr' && '🟢 En cours'}
                {language === 'de' && '🟢 Laufend'}
                {language === 'en' && '🟢 Open'}
              </span>
            )}
            {isUpcoming && (
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {language === 'fr' && '🔵 À venir'}
                {language === 'de' && '🔵 Bevorstehend'}
                {language === 'en' && '🔵 Upcoming'}
              </span>
            )}
            {isClosed && (
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {language === 'fr' && '⚫ Terminé'}
                {language === 'de' && '⚫ Beendet'}
                {language === 'en' && '⚫ Closed'}
              </span>
            )}
          </div>
        </div>

        {/* Vote Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Période de vote'}
                    {language === 'de' && 'Abstimmungszeitraum'}
                    {language === 'en' && 'Voting period'}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {new Date(vote.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - {new Date(vote.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Participants'}
                    {language === 'de' && 'Teilnehmer'}
                    {language === 'en' && 'Participants'}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {vote.participants || totalVotes || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Type de vote'}
                    {language === 'de' && 'Abstimmungstyp'}
                    {language === 'en' && 'Vote type'}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {vote.type === 'referendum' ? 
                      (language === 'fr' ? 'Référendum' : language === 'de' ? 'Referendum' : 'Referendum') :
                      (language === 'fr' ? 'Consultation' : language === 'de' ? 'Konsultation' : 'Consultation')
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Voting Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voting Section */}
          {isOpen && !hasVoted && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  {language === 'fr' && 'Votez maintenant'}
                  {language === 'de' && 'Jetzt abstimmen'}
                  {language === 'en' && 'Vote now'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vote.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedOption === option.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === option.id
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}>
                          {selectedOption === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <Button 
                  onClick={handleVote}
                  className="w-full mt-6 gap-2"
                  disabled={!selectedOption}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {language === 'fr' && 'Confirmer mon vote'}
                  {language === 'de' && 'Stimme bestätigen'}
                  {language === 'en' && 'Confirm my vote'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Success Message */}
          {hasVoted && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 mb-1">
                      {language === 'fr' && 'Vote enregistré avec succès !'}
                      {language === 'de' && 'Stimme erfolgreich registriert!'}
                      {language === 'en' && 'Vote successfully recorded!'}
                    </h3>
                    <p className="text-sm text-green-800 mb-3">
                      {language === 'fr' && 'Merci de votre participation.'}
                      {language === 'de' && 'Vielen Dank für Ihre Teilnahme.'}
                      {language === 'en' && 'Thank you for your participation.'}
                    </p>
                    
                    {/* Vote Details */}
                    {voteDate && (
                      <div className="bg-white rounded-lg p-4 mb-3">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {language === 'fr' && 'Votre dernier vote :'}
                          {language === 'de' && 'Ihre letzte Stimme:'}
                          {language === 'en' && 'Your last vote:'}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">{getSelectedOptionText()}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && `Enregistré le ${voteDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à ${voteDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
                          {language === 'de' && `Registriert am ${voteDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })} um ${voteDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`}
                          {language === 'en' && `Recorded on ${voteDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} at ${voteDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
                        </p>
                      </div>
                    )}

                    {/* Modification Deadline Notice */}
                    {isOpen && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-blue-800">
                            {language === 'fr' && `Vous pouvez modifier votre vote jusqu'au ${new Date(vote.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à ${new Date(vote.endDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
                            {language === 'de' && `Sie können Ihre Stimme ändern bis zum ${new Date(vote.endDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })} um ${new Date(vote.endDate).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`}
                            {language === 'en' && `You can modify your vote until ${new Date(vote.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} at ${new Date(vote.endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Modify Vote Button */}
                    {isOpen && (
                      <Button 
                        onClick={handleModifyVote}
                        variant="outline"
                        className="w-full gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit3 className="w-4 h-4" />
                        {language === 'fr' && 'Modifier mon vote'}
                        {language === 'de' && 'Stimme ändern'}
                        {language === 'en' && 'Modify my vote'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Message */}
          {isUpcoming && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      {language === 'fr' && 'Vote à venir'}
                      {language === 'de' && 'Kommende Abstimmung'}
                      {language === 'en' && 'Upcoming vote'}
                    </h3>
                    <p className="text-sm text-blue-800">
                      {language === 'fr' && `Le vote débutera le ${new Date(vote.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.`}
                      {language === 'de' && `Die Abstimmung beginnt am ${new Date(vote.startDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}.`}
                      {language === 'en' && `Voting will start on ${new Date(vote.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {(hasVoted || isClosed || totalVotes > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  {language === 'fr' && 'Résultats'}
                  {language === 'de' && 'Ergebnisse'}
                  {language === 'en' && 'Results'}
                  {isOpen && !isClosed && (
                    <span className="text-sm font-normal text-gray-500">
                      ({language === 'fr' ? 'provisoires' : language === 'de' ? 'vorläufig' : 'provisional'})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vote.options.map((option) => {
                    const percentage = getOptionPercentage(option.votes || 0);
                    return (
                      <div key={option.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{option.text}</span>
                          <div className="text-right">
                            <span className="font-semibold text-gray-900">{percentage.toFixed(1)}%</span>
                            <span className="text-sm text-gray-500 ml-2">({option.votes || 0} votes)</span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-3" />
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {language === 'fr' && 'Total des votes'}
                    {language === 'de' && 'Gesamtstimmen'}
                    {language === 'en' && 'Total votes'}
                  </span>
                  <span className="font-semibold text-gray-900">{totalVotes}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                {language === 'fr' && 'Informations'}
                {language === 'de' && 'Informationen'}
                {language === 'en' && 'Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'fr' && 'À propos de ce vote'}
                    {language === 'de' && 'Über diese Abstimmung'}
                    {language === 'en' && 'About this vote'}
                  </h4>
                  <p>
                    {vote.type === 'referendum' ? (
                      language === 'fr' ? 'Ce référendum permet aux citoyens de se prononcer directement sur une question importante pour la collectivité.' :
                      language === 'de' ? 'Dieses Referendum ermöglicht es den Bürgern, sich direkt zu einer wichtigen Frage für die Gemeinschaft zu äußern.' :
                      'This referendum allows citizens to vote directly on an important question for the community.'
                    ) : (
                      language === 'fr' ? 'Cette consultation permet de recueillir l\'avis des citoyens sur plusieurs options proposées.' :
                      language === 'de' ? 'Diese Konsultation ermöglicht es, die Meinung der Bürger zu mehreren vorgeschlagenen Optionen einzuholen.' :
                      'This consultation allows gathering citizens\' opinions on several proposed options.'
                    )}
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'fr' && 'Règles de vote'}
                    {language === 'de' && 'Abstimmungsregeln'}
                    {language === 'en' && 'Voting rules'}
                  </h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>
                      {language === 'fr' && 'Un vote par personne'}
                      {language === 'de' && 'Eine Stimme pro Person'}
                      {language === 'en' && 'One vote per person'}
                    </li>
                    <li>
                      {language === 'fr' && 'Vote anonyme et sécurisé'}
                      {language === 'de' && 'Anonyme und sichere Abstimmung'}
                      {language === 'en' && 'Anonymous and secure voting'}
                    </li>
                    <li>
                      {language === 'fr' && 'Modification possible jusqu\'à la date de clôture'}
                      {language === 'de' && 'Änderung möglich bis zum Schlussdatum'}
                      {language === 'en' && 'Modification possible until the closing date'}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'fr' && 'Statistiques'}
                {language === 'de' && 'Statistiken'}
                {language === 'en' && 'Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'fr' && 'Taux de participation'}
                    {language === 'de' && 'Beteiligungsrate'}
                    {language === 'en' && 'Participation rate'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {vote.participants ? '67%' : '—'}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'fr' && 'Jours restants'}
                    {language === 'de' && 'Verbleibende Tage'}
                    {language === 'en' && 'Days remaining'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isOpen ? Math.ceil((new Date(vote.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : '—'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'fr' && 'Partager'}
                {language === 'de' && 'Teilen'}
                {language === 'en' && 'Share'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'fr' && 'Invitez d\'autres citoyens à participer au vote'}
                {language === 'de' && 'Laden Sie andere Bürger zur Teilnahme an der Abstimmung ein'}
                {language === 'en' && 'Invite other citizens to participate in the vote'}
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  📧 Email
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  🔗 {language === 'fr' ? 'Copier le lien' : language === 'de' ? 'Link kopieren' : 'Copy link'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'fr' && 'Voir aussi'}
                {language === 'de' && 'Siehe auch'}
                {language === 'en' && 'See also'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link 
                  to="/votes"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  {language === 'fr' && '→ Tous les votes'}
                  {language === 'de' && '→ Alle Abstimmungen'}
                  {language === 'en' && '→ All votes'}
                </Link>
                <Link 
                  to="/consultations"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  {language === 'fr' && '→ Consultations publiques'}
                  {language === 'de' && '→ Öffentliche Konsultationen'}
                  {language === 'en' && '→ Public consultations'}
                </Link>
                <Link 
                  to={`/themes/${vote.themeId}`}
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  {language === 'fr' && '→ Voir le thème'}
                  {language === 'de' && '→ Thema ansehen'}
                  {language === 'en' && '→ View theme'}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}