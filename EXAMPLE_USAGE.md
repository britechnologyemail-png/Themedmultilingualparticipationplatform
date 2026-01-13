# CiviAgora - Example Usage

This document provides practical examples of how to use the CiviAgora data architecture in real React components.

## 📋 Table of Contents

1. [Basic Page Component](#basic-page-component)
2. [List with Filters](#list-with-filters)
3. [Detail Page](#detail-page)
4. [Form Submission](#form-submission)
5. [Multilingual Content](#multilingual-content)
6. [User Profile](#user-profile)
7. [Dashboard](#dashboard)
8. [Advanced Patterns](#advanced-patterns)

---

## Basic Page Component

### Simple Consultations List

```tsx
// src/app/pages/ConsultationsPage.tsx
import React from 'react';
import { useConsultations } from '@/hooks/useApi';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export function ConsultationsPage() {
  const { language } = useLanguage();
  const { data: consultations, isLoading, error } = useConsultations({ 
    status: 'open' 
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>{language === 'fr' ? 'Erreur de chargement' : 'Loading error'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {language === 'fr' && 'Consultations Ouvertes'}
        {language === 'de' && 'Offene Konsultationen'}
        {language === 'en' && 'Open Consultations'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultations?.map((consultation) => (
          <Card key={consultation.id} className="p-6 hover:shadow-lg transition-shadow">
            <Badge className="mb-3">{consultation.type}</Badge>
            
            <h3 className="text-xl font-semibold mb-2">
              {consultation.title[language]}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {consultation.description[language]}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {consultation.registeredParticipants}{' '}
                {language === 'fr' ? 'participants' : 'participants'}
              </span>
              
              <span>
                {language === 'fr' && 'Jusqu\'au'}
                {language === 'de' && 'Bis'}
                {language === 'en' && 'Until'}
                {' '}
                {new Date(consultation.endDate).toLocaleDateString(language)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

## List with Filters

### Petitions with Theme Filter

```tsx
// src/app/pages/PetitionsPage.tsx
import React, { useState } from 'react';
import { usePetitions, useThemes } from '@/hooks/useApi';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export function PetitionsPage() {
  const { language } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>();
  
  const { data: themes } = useThemes();
  const { data: petitions, isLoading } = usePetitions({ 
    themeId: selectedTheme,
    status: 'open'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {language === 'fr' && 'Pétitions en cours'}
          {language === 'de' && 'Laufende Petitionen'}
          {language === 'en' && 'Ongoing Petitions'}
        </h1>

        {/* Theme Filter */}
        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={
              language === 'fr' ? 'Tous les thèmes' :
              language === 'de' ? 'Alle Themen' :
              'All themes'
            } />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === 'fr' ? 'Tous les thèmes' : 'All themes'}
            </SelectItem>
            {themes?.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.icon} {theme.name[language]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {language === 'fr' ? 'Chargement...' : 'Loading...'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {petitions?.map((petition) => {
            const theme = themes?.find(t => t.id === petition.themeId);
            
            return (
              <div 
                key={petition.id} 
                className="border rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {theme && (
                        <span className="text-2xl">{theme.icon}</span>
                      )}
                      <span className="text-sm text-gray-500">
                        {theme?.name[language]}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">
                      {petition.title[language]}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {petition.description[language]}
                    </p>
                  </div>
                </div>

                {/* Signature Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {petition.currentSignatures.toLocaleString(language)} / {petition.targetSignatures.toLocaleString(language)}
                      {' '}
                      {language === 'fr' ? 'signatures' :
                       language === 'de' ? 'Unterschriften' :
                       'signatures'}
                    </span>
                    <span className="text-gray-600">
                      {petition.progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <Progress value={petition.progressPercentage} className="h-2" />
                </div>

                {/* End Date */}
                <div className="mt-4 text-sm text-gray-500">
                  {language === 'fr' && 'Se termine le'}
                  {language === 'de' && 'Endet am'}
                  {language === 'en' && 'Ends on'}
                  {' '}
                  {new Date(petition.endDate).toLocaleDateString(language, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

---

## Detail Page

### Consultation Detail with Registration

```tsx
// src/app/pages/ConsultationDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useConsultation, useRegisterForConsultation } from '@/hooks/useApi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function ConsultationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const { data: consultation, isLoading } = useConsultation(id!);
  const registerMutation = useRegisterForConsultation();

  const handleRegister = async () => {
    if (!isAuthenticated) {
      toast.error(
        language === 'fr' ? 'Vous devez être connecté' :
        language === 'de' ? 'Sie müssen angemeldet sein' :
        'You must be logged in'
      );
      return;
    }

    try {
      await registerMutation.mutateAsync(id!);
      
      toast.success(
        language === 'fr' ? 'Inscription réussie !' :
        language === 'de' ? 'Registrierung erfolgreich!' :
        'Registration successful!'
      );
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'inscription' :
        language === 'de' ? 'Fehler bei der Registrierung' :
        'Registration error'
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!consultation) {
    return <div>Not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1280px]">
      {/* Header */}
      <div className="mb-8">
        <Badge className="mb-4">{consultation.type}</Badge>
        
        <h1 className="text-4xl font-bold mb-4">
          {consultation.title[language]}
        </h1>
        
        <p className="text-xl text-gray-600">
          {consultation.description[language]}
        </p>
      </div>

      {/* Hero Image */}
      {consultation.images[0] && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={consultation.images[0]} 
            alt={consultation.title[language]}
            className="w-full h-[400px] object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">
                  {language === 'fr' ? 'Dates' :
                   language === 'de' ? 'Termine' :
                   'Dates'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(consultation.startDate).toLocaleDateString(language)} - {new Date(consultation.endDate).toLocaleDateString(language)}
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">
                  {language === 'fr' ? 'Participants' :
                   language === 'de' ? 'Teilnehmer' :
                   'Participants'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {consultation.registeredParticipants} / {consultation.capacity || '∞'}
              </p>
            </Card>

            {consultation.location && (
              <Card className="p-4 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">
                    {language === 'fr' ? 'Lieu' :
                     language === 'de' ? 'Ort' :
                     'Location'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {consultation.location.name}<br />
                  {consultation.location.address}, {consultation.location.city}
                </p>
              </Card>
            )}
          </div>

          {/* Phases */}
          {consultation.phases.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {language === 'fr' ? 'Phases' :
                 language === 'de' ? 'Phasen' :
                 'Phases'}
              </h2>
              
              <div className="space-y-4">
                {consultation.phases.map((phase, index) => (
                  <Card 
                    key={phase.id} 
                    className={`p-4 ${
                      phase.status === 'active' ? 'border-blue-500 bg-blue-50' :
                      phase.status === 'completed' ? 'bg-gray-50' :
                      ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${phase.status === 'active' ? 'bg-blue-600 text-white' :
                          phase.status === 'completed' ? 'bg-green-600 text-white' :
                          'bg-gray-300 text-gray-600'}
                      `}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          {phase.title[language]}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {phase.description[language]}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(phase.startDate).toLocaleDateString(language)} - {new Date(phase.endDate).toLocaleDateString(language)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {consultation.documents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {language === 'fr' ? 'Documents' :
                 language === 'de' ? 'Dokumente' :
                 'Documents'}
              </h2>
              
              <div className="space-y-2">
                {consultation.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-gray-500">
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <Button 
              onClick={handleRegister}
              disabled={registerMutation.isPending}
              className="w-full mb-4"
              size="lg"
            >
              {registerMutation.isPending ? (
                <>
                  {language === 'fr' ? 'Inscription...' :
                   language === 'de' ? 'Registrierung...' :
                   'Registering...'}
                </>
              ) : (
                <>
                  {language === 'fr' ? 'S\'inscrire' :
                   language === 'de' ? 'Anmelden' :
                   'Register'}
                </>
              )}
            </Button>

            {consultation.isOnline && consultation.onlineLink && (
              <Button variant="outline" className="w-full" asChild>
                <a href={consultation.onlineLink} target="_blank" rel="noopener noreferrer">
                  {language === 'fr' ? 'Rejoindre en ligne' :
                   language === 'de' ? 'Online beitreten' :
                   'Join online'}
                </a>
              </Button>
            )}
          </Card>

          {/* Organizer */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3">
              {language === 'fr' ? 'Organisé par' :
               language === 'de' ? 'Organisiert von' :
               'Organized by'}
            </h3>
            <p className="text-gray-700">
              {consultation.organizer.name[language]}
            </p>
            {consultation.organizer.website && (
              <a 
                href={consultation.organizer.website}
                className="text-sm text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === 'fr' ? 'Visiter le site' :
                 language === 'de' ? 'Website besuchen' :
                 'Visit website'}
              </a>
            )}
          </Card>

          {/* Stats */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3">
              {language === 'fr' ? 'Statistiques' :
               language === 'de' ? 'Statistiken' :
               'Statistics'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {language === 'fr' ? 'Participants' : 'Participants'}
                </span>
                <span className="font-semibold">
                  {consultation.stats.totalParticipants}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {language === 'fr' ? 'Commentaires' : 'Comments'}
                </span>
                <span className="font-semibold">
                  {consultation.stats.totalComments}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {language === 'fr' ? 'Idées' : 'Ideas'}
                </span>
                <span className="font-semibold">
                  {consultation.stats.totalIdeas}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

---

## Form Submission

### Sign Petition Form

```tsx
// src/app/components/SignPetitionForm.tsx
import React, { useState } from 'react';
import { useSignPetition } from '@/hooks/useApi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SignPetitionFormProps {
  petitionId: string;
  onSuccess?: () => void;
}

export function SignPetitionForm({ petitionId, onSuccess }: SignPetitionFormProps) {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  
  const signMutation = useSignPetition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error(
        language === 'fr' ? 'Vous devez être connecté pour signer' :
        language === 'de' ? 'Sie müssen angemeldet sein, um zu unterschreiben' :
        'You must be logged in to sign'
      );
      return;
    }

    try {
      await signMutation.mutateAsync({
        petitionId,
        data: {
          anonymous,
          comment: comment.trim() || undefined,
        },
      });

      toast.success(
        language === 'fr' ? 'Pétition signée avec succès !' :
        language === 'de' ? 'Petition erfolgreich unterzeichnet!' :
        'Petition signed successfully!'
      );

      setComment('');
      setAnonymous(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de la signature' :
        language === 'de' ? 'Fehler beim Unterschreiben' :
        'Error signing petition'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Comment */}
      <div>
        <Label htmlFor="comment">
          {language === 'fr' ? 'Commentaire (optionnel)' :
           language === 'de' ? 'Kommentar (optional)' :
           'Comment (optional)'}
        </Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            language === 'fr' ? 'Expliquez pourquoi vous soutenez cette pétition...' :
            language === 'de' ? 'Erklären Sie, warum Sie diese Petition unterstützen...' :
            'Explain why you support this petition...'
          }
          maxLength={500}
          rows={4}
          className="mt-2"
        />
        <p className="text-sm text-gray-500 mt-1">
          {comment.length} / 500
        </p>
      </div>

      {/* Anonymous Option */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="anonymous"
          checked={anonymous}
          onCheckedChange={(checked) => setAnonymous(checked as boolean)}
        />
        <Label 
          htmlFor="anonymous" 
          className="text-sm cursor-pointer"
        >
          {language === 'fr' ? 'Signer de manière anonyme' :
           language === 'de' ? 'Anonym unterschreiben' :
           'Sign anonymously'}
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={signMutation.isPending}
        className="w-full"
        size="lg"
      >
        {signMutation.isPending ? (
          <>
            {language === 'fr' ? 'Signature en cours...' :
             language === 'de' ? 'Wird unterzeichnet...' :
             'Signing...'}
          </>
        ) : (
          <>
            {language === 'fr' ? 'Signer la pétition' :
             language === 'de' ? 'Petition unterschreiben' :
             'Sign petition'}
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        {language === 'fr' ? 'En signant, vous acceptez nos conditions d\'utilisation' :
         language === 'de' ? 'Durch Unterzeichnung akzeptieren Sie unsere Nutzungsbedingungen' :
         'By signing, you accept our terms of use'}
      </p>
    </form>
  );
}
```

---

## Multilingual Content

### Properly Handling LocalizedString

```tsx
// src/app/components/ThemeCard.tsx
import React from 'react';
import type { ThemeDTO } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

interface ThemeCardProps {
  theme: ThemeDTO;
  onClick?: () => void;
}

export function ThemeCard({ theme, onClick }: ThemeCardProps) {
  const { language } = useLanguage();

  return (
    <Card 
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${theme.colorHex}20` }}
        >
          <span className="text-3xl">{theme.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Name - correctly accessing LocalizedString */}
          <h3 className="text-lg font-semibold mb-1">
            {theme.name[language]}
          </h3>

          {/* Description - correctly accessing LocalizedString */}
          <p className="text-sm text-gray-600 mb-3">
            {theme.description[language]}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>
              {language === 'fr' ? 'Consultations' :
               language === 'de' ? 'Konsultationen' :
               'Consultations'}: {theme.stats.consultations}
            </div>
            <div>
              {language === 'fr' ? 'Pétitions' :
               language === 'de' ? 'Petitionen' :
               'Petitions'}: {theme.stats.petitions}
            </div>
            <div>
              {language === 'fr' ? 'Votes' :
               language === 'de' ? 'Abstimmungen' :
               'Votes'}: {theme.stats.votes}
            </div>
            <div>
              {language === 'fr' ? 'Participants' :
               language === 'de' ? 'Teilnehmer' :
               'Participants'}: {theme.stats.participants.toLocaleString(language)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

---

## User Profile

### Profile Page with Participation History

```tsx
// src/app/pages/ProfilePage.tsx (simplified example)
import React from 'react';
import { useCurrentUser, useParticipationHistory } from '@/hooks/useApi';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ProfilePageExample() {
  const { language } = useLanguage();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: history, isLoading: historyLoading } = useParticipationHistory();

  if (userLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1280px]">
      {/* User Header */}
      <Card className="p-6 mb-8">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {user.stats.totalParticipations}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Participations' :
               language === 'de' ? 'Teilnahmen' :
               'Participations'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {user.stats.petitionsSigned}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Pétitions signées' :
               language === 'de' ? 'Petitionen unterzeichnet' :
               'Petitions signed'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {user.stats.votesParticipated}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Votes' :
               language === 'de' ? 'Abstimmungen' :
               'Votes'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {user.stats.commentsPosted}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Commentaires' :
               language === 'de' ? 'Kommentare' :
               'Comments'}
            </div>
          </div>
        </div>
      </Card>

      {/* Participation History */}
      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="consultations">
            {language === 'fr' ? 'Consultations' :
             language === 'de' ? 'Konsultationen' :
             'Consultations'}
          </TabsTrigger>
          <TabsTrigger value="petitions">
            {language === 'fr' ? 'Pétitions' :
             language === 'de' ? 'Petitionen' :
             'Petitions'}
          </TabsTrigger>
          <TabsTrigger value="votes">
            {language === 'fr' ? 'Votes' :
             language === 'de' ? 'Abstimmungen' :
             'Votes'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consultations" className="mt-6">
          {historyLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {history?.consultations.map((participation) => (
                <Card key={participation.consultation.id} className="p-4">
                  <h3 className="font-semibold mb-2">
                    {participation.consultation.title[language]}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>
                      {new Date(participation.participatedAt).toLocaleDateString(language)}
                    </span>
                    <span>
                      {participation.commentsCount}{' '}
                      {language === 'fr' ? 'commentaires' : 'comments'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="petitions" className="mt-6">
          {/* Similar pattern for petitions */}
        </TabsContent>

        <TabsContent value="votes" className="mt-6">
          {/* Similar pattern for votes */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Dashboard

### Dashboard with Statistics

```tsx
// src/app/pages/Dashboard.tsx (simplified example)
import React from 'react';
import { useDashboardStats, useThemes } from '@/hooks/useApi';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function DashboardExample() {
  const { language } = useLanguage();
  const { data: stats, isLoading } = useDashboardStats();
  const { data: themes } = useThemes();

  if (isLoading) return <div>Loading...</div>;
  if (!stats) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {language === 'fr' ? 'Tableau de bord' :
         language === 'de' ? 'Dashboard' :
         'Dashboard'}
      </h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              {language === 'fr' ? 'Consultations actives' :
               language === 'de' ? 'Aktive Konsultationen' :
               'Active consultations'}
            </h3>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold">
            {stats.overview.activeConsultations}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            +{stats.trends.consultationsGrowth}%{' '}
            {language === 'fr' ? 'ce mois' :
             language === 'de' ? 'diesen Monat' :
             'this month'}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              {language === 'fr' ? 'Pétitions ouvertes' :
               language === 'de' ? 'Offene Petitionen' :
               'Open petitions'}
            </h3>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold">
            {stats.overview.openPetitions}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            +{stats.trends.petitionsGrowth}%
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              {language === 'fr' ? 'Votes en cours' :
               language === 'de' ? 'Laufende Abstimmungen' :
               'Ongoing votes'}
            </h3>
            {stats.trends.votesGrowth < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-600" />
            ) : (
              <TrendingUp className="w-4 h-4 text-green-600" />
            )}
          </div>
          <div className="text-3xl font-bold">
            {stats.overview.ongoingVotes}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {stats.trends.votesGrowth}%
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              {language === 'fr' ? 'Participants' :
               language === 'de' ? 'Teilnehmer' :
               'Participants'}
            </h3>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold">
            {stats.overview.totalParticipants.toLocaleString(language)}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            +{stats.trends.participationGrowth}%
          </p>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {language === 'fr' ? 'Événements à venir' :
           language === 'de' ? 'Kommende Veranstaltungen' :
           'Upcoming events'}
        </h2>
        
        <div className="space-y-3">
          {stats.upcomingEvents.map((event) => {
            const theme = themes?.find(t => t.id === event.themeId);
            
            return (
              <div 
                key={event.id} 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
              >
                {theme && (
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${theme.colorHex}20` }}
                  >
                    <span className="text-xl">{theme.icon}</span>
                  </div>
                )}
                
                <div className="flex-1">
                  <p className="font-medium">
                    {event.title[language]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString(language, {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
```

---

## Advanced Patterns

### Infinite Scroll with React Query

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export function InfiniteConsultationsList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['consultations', 'infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiService.consultation.getConsultations({
        page: pageParam,
        limit: 20,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.hasNextPage) {
        return (lastPage.meta.currentPage || 0) + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map((consultation) => (
            <div key={consultation.id}>
              {/* Render consultation */}
            </div>
          ))}
        </div>
      ))}
      
      <div ref={ref}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
```

### Debounced Search

```tsx
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useDeb ounce } from 'use-debounce';

export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return null;
      
      const response = await apiService.search.search({
        query: debouncedSearch,
        filters: {},
      });
      return response.data;
    },
    enabled: debouncedSearch.length > 2,
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      
      {isLoading && <p>Searching...</p>}
      
      {results && (
        <div>
          {results.results.map((result) => (
            <div key={result.id}>
              {/* Render result */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

**This completes the example usage guide. All examples use TypeScript DTOs and follow best practices!**
