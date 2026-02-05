import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import {
  Shield,
  UserPlus,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  User,
  Eye,
  EyeOff,
  Info,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Home
} from 'lucide-react';
import { toast } from 'sonner';
import { StreetAutocomplete } from '../components/form/StreetAutocomplete';
import { TerritoryMap } from '../components/TerritoryMap';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  municipality: string;
  street: string;
  streetId: string;
  streetNumber: string;
  postalCode: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  declareSincerity: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function RegisterPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [accountStatus, setAccountStatus] = useState<'pending' | 'verified' | 'active' | 'restricted'>('pending');
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Organization data - would be fetched from API
  const organizationData = {
    name: 'Ville de Genève',
    type: 'municipality' as const,
    postalCodes: ['1200', '1201', '1202', '1203', '1204', '1205', '1206', '1207', '1208', '1209']
  };

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    municipality: organizationData.name, // Pre-filled and non-editable
    street: '',
    streetId: '',
    streetNumber: '',
    postalCode: '',
    acceptTerms: false,
    acceptPrivacy: false,
    declareSincerity: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const steps = [
    {
      id: 0,
      title: language === 'fr' ? 'Identité' : language === 'de' ? 'Identität' : 'Identity',
      icon: User,
      description: language === 'fr' ? 'Informations personnelles' : language === 'de' ? 'Persönliche Informationen' : 'Personal information'
    },
    {
      id: 1,
      title: language === 'fr' ? 'Adresse' : language === 'de' ? 'Adresse' : 'Address',
      icon: MapPin,
      description: language === 'fr' ? 'Coordonnées territoriales' : language === 'de' ? 'Territoriale Koordinaten' : 'Territorial coordinates'
    },
    {
      id: 2,
      title: language === 'fr' ? 'Contact' : language === 'de' ? 'Kontakt' : 'Contact',
      icon: Mail,
      description: language === 'fr' ? 'Email et téléphone' : language === 'de' ? 'E-Mail und Telefon' : 'Email and phone'
    },
    {
      id: 3,
      title: language === 'fr' ? 'Sécurité' : language === 'de' ? 'Sicherheit' : 'Security',
      icon: Lock,
      description: language === 'fr' ? 'Mot de passe et protection' : language === 'de' ? 'Passwort und Schutz' : 'Password and protection'
    },
    {
      id: 4,
      title: language === 'fr' ? 'Vérification' : language === 'de' ? 'Verifizierung' : 'Verification',
      icon: ShieldCheck,
      description: language === 'fr' ? 'Validation des coordonnées' : language === 'de' ? 'Validierung der Kontaktdaten' : 'Contact validation'
    },
    {
      id: 5,
      title: language === 'fr' ? 'Confirmation' : language === 'de' ? 'Bestätigung' : 'Confirmation',
      icon: CheckCircle2,
      description: language === 'fr' ? 'Finalisation du compte' : language === 'de' ? 'Kontoabschluss' : 'Account finalization'
    }
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Minimum 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      // Validation identité
      if (!formData.firstName.trim()) {
        newErrors.firstName = language === 'fr' ? 'Le prénom est requis' : language === 'de' ? 'Vorname ist erforderlich' : 'First name is required';
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = language === 'fr' ? 'Le prénom doit contenir au moins 2 caractères' : language === 'de' ? 'Vorname muss mindestens 2 Zeichen enthalten' : 'First name must contain at least 2 characters';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = language === 'fr' ? 'Le nom est requis' : language === 'de' ? 'Nachname ist erforderlich' : 'Last name is required';
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = language === 'fr' ? 'Le nom doit contenir au moins 2 caractères' : language === 'de' ? 'Nachname muss mindestens 2 Zeichen enthalten' : 'Last name must contain at least 2 characters';
      }
    }

    if (step === 1) {
      // Validation adresse
      if (!formData.streetId || !formData.street) {
        newErrors.street = language === 'fr' ? 'Vous devez sélectionner une rue' : language === 'de' ? 'Sie müssen eine Straße auswählen' : 'You must select a street';
      }
      if (!formData.streetNumber.trim()) {
        newErrors.streetNumber = language === 'fr' ? 'Le numéro de rue est requis' : language === 'de' ? 'Hausnummer ist erforderlich' : 'Street number is required';
      }
      if (!formData.postalCode) {
        newErrors.postalCode = language === 'fr' ? 'Le code postal est requis' : language === 'de' ? 'Postleitzahl ist erforderlich' : 'Postal code is required';
      } else if (!organizationData.postalCodes.includes(formData.postalCode)) {
        newErrors.postalCode = language === 'fr' ? 'Code postal non valide pour ce territoire' : language === 'de' ? 'Postleitzahl für dieses Gebiet ungültig' : 'Invalid postal code for this territory';
      }
    }

    if (step === 2) {
      // Validation contact
      if (!formData.email.trim()) {
        newErrors.email = language === 'fr' ? 'L\'email est requis' : language === 'de' ? 'E-Mail ist erforderlich' : 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = language === 'fr' ? 'Email invalide' : language === 'de' ? 'Ungültige E-Mail' : 'Invalid email';
      }
    }

    if (step === 3) {
      // Validation sécurité
      if (!formData.password) {
        newErrors.password = language === 'fr' ? 'Le mot de passe est requis' : language === 'de' ? 'Passwort ist erforderlich' : 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = language === 'fr' 
          ? 'Min. 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial'
          : language === 'de'
          ? 'Min. 8 Zeichen, 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Ziffer, 1 Sonderzeichen'
          : 'Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = language === 'fr' ? 'Les mots de passe ne correspondent pas' : language === 'de' ? 'Passwörter stimmen nicht überein' : 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = language === 'fr' ? 'Vous devez accepter les CGU' : language === 'de' ? 'Sie müssen die AGB akzeptieren' : 'You must accept the terms';
      }
      if (!formData.acceptPrivacy) {
        newErrors.acceptPrivacy = language === 'fr' ? 'Vous devez accepter la politique de confidentialité' : language === 'de' ? 'Sie müssen die Datenschutzrichtlinie akzeptieren' : 'You must accept the privacy policy';
      }
      if (!formData.declareSincerity) {
        newErrors.declareSincerity = language === 'fr' ? 'Vous devez certifier la sincérité de vos informations' : language === 'de' ? 'Sie müssen die Richtigkeit Ihrer Angaben bestätigen' : 'You must certify the sincerity of your information';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        // Simuler l'envoi des codes de vérification
        sendVerificationCodes();
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const sendVerificationCodes = () => {
    // Simulation d'envoi de codes
    toast.success(
      language === 'fr'
        ? `Code de vérification envoyé à ${formData.email}`
        : language === 'de'
        ? `Verifizierungscode an ${formData.email} gesendet`
        : `Verification code sent to ${formData.email}`
    );
  };

  const handleVerifyEmail = () => {
    // Simulation - en production, vérifier avec le backend
    if (emailVerificationCode === '123456') {
      setIsEmailVerified(true);
      toast.success(
        language === 'fr' ? 'Email vérifié avec succès' : language === 'de' ? 'E-Mail erfolgreich verifiziert' : 'Email verified successfully'
      );
    } else {
      toast.error(
        language === 'fr' ? 'Code incorrect' : language === 'de' ? 'Falscher Code' : 'Incorrect code'
      );
    }
  };

  const handleSubmit = () => {
    if (isEmailVerified) {
      setAccountStatus('verified');
      setCurrentStep(5);
      toast.success(
        language === 'fr' 
          ? 'Compte créé avec succès !' 
          : language === 'de' 
          ? 'Konto erfolgreich erstellt!' 
          : 'Account created successfully!'
      );
    } else {
      toast.error(
        language === 'fr'
          ? 'Veuillez vérifier votre email'
          : language === 'de'
          ? 'Bitte verifizieren Sie Ihre E-Mail'
          : 'Please verify your email'
      );
    }
  };

  const handleCancel = () => {
    // Redirect to home page
    navigate('/');
    
    // Show cancellation message
    toast.info(
      language === 'fr'
        ? 'Inscription annulée'
        : language === 'de'
        ? 'Registrierung abgebrochen'
        : 'Registration cancelled'
    );
  };

  const handleStreetChange = (streetName: string, streetId: string) => {
    setFormData({ ...formData, street: streetName, streetId });
    // Clear error when street is selected
    if (streetId) {
      setErrors({ ...errors, street: '' });
    }
  };

  const getAccountStatusBadge = () => {
    const statusConfig = {
      pending: {
        color: 'bg-amber-50 text-amber-600 border border-amber-200',
        icon: AlertCircle,
        text: language === 'fr' ? 'En attente de validation' : language === 'de' ? 'Ausstehend' : 'Pending validation'
      },
      verified: {
        color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
        icon: CheckCircle2,
        text: language === 'fr' ? 'Vérifié' : language === 'de' ? 'Verifiziert' : 'Verified'
      },
      active: {
        color: 'bg-blue-50 text-blue-600 border border-blue-200',
        icon: CheckCircle2,
        text: language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'
      },
      restricted: {
        color: 'bg-red-50 text-red-600 border border-red-200',
        icon: AlertTriangle,
        text: language === 'fr' ? 'Restreint' : language === 'de' ? 'Eingeschränkt' : 'Restricted'
      }
    };

    const config = statusConfig[accountStatus];
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">CiviAgora</h1>
                <p className="text-xs text-gray-600">
                  {language === 'fr' ? 'Plateforme sécurisée' : language === 'de' ? 'Sichere Plattform' : 'Secure Platform'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress Stepper */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isActive
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 mt-[-40px] transition-all ${
                        isCompleted ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="max-w-3xl mx-auto shadow-2xl border-2">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <UserPlus className="w-7 h-7" />
                    {language === 'fr' ? 'Création de compte sécurisé' : language === 'de' ? 'Sichere Kontoerstellung' : 'Secure Account Creation'}
                  </CardTitle>
                  <CardDescription className="text-blue-50 mt-2">
                    {language === 'fr'
                      ? 'Un citoyen = Un compte = Un droit de participation'
                      : language === 'de'
                      ? 'Ein Bürger = Ein Konto = Ein Teilnahmerecht'
                      : 'One citizen = One account = One participation right'}
                  </CardDescription>
                </div>
                {currentStep === 5 && getAccountStatusBadge()}
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 0: Identity */}
                {currentStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Informations d\'identité' : language === 'de' ? 'Identitätsinformationen' : 'Identity Information'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Ces informations permettent de garantir l\'unicité de votre compte'
                          : language === 'de'
                          ? 'Diese Informationen gewährleisten die Einzigartigkeit Ihres Kontos'
                          : 'This information ensures the uniqueness of your account'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-600" />
                          {language === 'fr' ? 'Prénom *' : language === 'de' ? 'Vorname *' : 'First Name *'}
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={errors.firstName ? 'border-red-500' : ''}
                          placeholder={language === 'fr' ? 'Jean' : language === 'de' ? 'Hans' : 'John'}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-600" />
                          {language === 'fr' ? 'Nom *' : language === 'de' ? 'Nachname *' : 'Last Name *'}
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={errors.lastName ? 'border-red-500' : ''}
                          placeholder={language === 'fr' ? 'Dupont' : language === 'de' ? 'Müller' : 'Doe'}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Address */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Adresse de résidence' : language === 'de' ? 'Wohnadresse' : 'Residential Address'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Votre adresse doit être située dans le périmètre de notre territoire'
                          : language === 'de'
                          ? 'Ihre Adresse muss sich im Umkreis unseres Gebiets befinden'
                          : 'Your address must be located within our territory perimeter'}
                      </p>
                    </div>

                    {/* Territory Map */}
                    <TerritoryMap 
                      organizationName={organizationData.name}
                      territoryType={organizationData.type}
                      compact={true}
                    />

                    {/* Municipality (Read-only) */}
                    <div className="space-y-2">
                      <Label htmlFor="municipality" className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Municipalité *' : language === 'de' ? 'Gemeinde *' : 'Municipality *'}
                      </Label>
                      <Input
                        id="municipality"
                        value={formData.municipality}
                        disabled
                        className="bg-gray-50 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {language === 'fr'
                          ? 'La municipalité est déterminée par votre organisation'
                          : language === 'de'
                          ? 'Die Gemeinde wird von Ihrer Organisation festgelegt'
                          : 'The municipality is determined by your organization'}
                      </p>
                    </div>

                    {/* Street Autocomplete */}
                    <StreetAutocomplete
                      value={formData.street}
                      onChange={handleStreetChange}
                      error={errors.street}
                      disabled={!!formData.streetId}
                    />

                    {/* Street Number and Postal Code */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="streetNumber">
                          {language === 'fr' ? 'Numéro *' : language === 'de' ? 'Nummer *' : 'Number *'}
                        </Label>
                        <Input
                          id="streetNumber"
                          value={formData.streetNumber}
                          onChange={(e) => setFormData({ ...formData, streetNumber: e.target.value })}
                          className={errors.streetNumber ? 'border-red-500' : ''}
                          placeholder="12"
                        />
                        {errors.streetNumber && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.streetNumber}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">
                          {language === 'fr' ? 'Code postal *' : language === 'de' ? 'Postleitzahl *' : 'Postal Code *'}
                        </Label>
                        <select
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className={`flex h-10 w-full rounded-md border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="">
                            {language === 'fr' ? 'Sélectionnez' : language === 'de' ? 'Wählen' : 'Select'}
                          </option>
                          {organizationData.postalCodes.map((code) => (
                            <option key={code} value={code}>{code}</option>
                          ))}
                        </select>
                        {errors.postalCode && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Contact */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Coordonnées de contact' : language === 'de' ? 'Kontaktdaten' : 'Contact Information'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Votre email sera vérifié pour sécuriser votre compte'
                          : language === 'de'
                          ? 'Ihre E-Mail wird zur Sicherung Ihres Kontos verifiziert'
                          : 'Your email will be verified to secure your account'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Adresse email *' : language === 'de' ? 'E-Mail-Adresse *' : 'Email Address *'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder="jean.dupont@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {language === 'fr'
                          ? 'Un email unique par citoyen'
                          : language === 'de'
                          ? 'Eine eindeutige E-Mail pro Bürger'
                          : 'One unique email per citizen'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Security */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Sécurité et engagements' : language === 'de' ? 'Sicherheit und Verpflichtungen' : 'Security and Commitments'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Définissez un mot de passe fort et acceptez nos conditions'
                          : language === 'de'
                          ? 'Legen Sie ein sicheres Passwort fest und akzeptieren Sie unsere Bedingungen'
                          : 'Set a strong password and accept our terms'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Mot de passe *' : language === 'de' ? 'Passwort *' : 'Password *'}
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        {language === 'fr' ? 'Confirmer le mot de passe *' : language === 'de' ? 'Passwort bestätigen *' : 'Confirm Password *'}
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                        />
                        <Label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                          {language === 'fr' ? 'J\'accepte les' : language === 'de' ? 'Ich akzeptiere die' : 'I accept the'}{' '}
                          <a href="/terms" className="text-blue-600 hover:underline">
                            {language === 'fr' ? 'Conditions Générales d\'Utilisation' : language === 'de' ? 'Allgemeinen Geschäftsbedingungen' : 'Terms of Use'}
                          </a>
                        </Label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                          <AlertCircle className="w-4 h-4" />
                          {errors.acceptTerms}
                        </p>
                      )}

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="acceptPrivacy"
                          checked={formData.acceptPrivacy}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                        />
                        <Label htmlFor="acceptPrivacy" className="text-sm cursor-pointer">
                          {language === 'fr' ? 'J\'accepte la' : language === 'de' ? 'Ich akzeptiere die' : 'I accept the'}{' '}
                          <a href="/privacy" className="text-blue-600 hover:underline">
                            {language === 'fr' ? 'Politique de Confidentialité' : language === 'de' ? 'Datenschutzrichtlinie' : 'Privacy Policy'}
                          </a>
                        </Label>
                      </div>
                      {errors.acceptPrivacy && (
                        <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                          <AlertCircle className="w-4 h-4" />
                          {errors.acceptPrivacy}
                        </p>
                      )}

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="declareSincerity"
                          checked={formData.declareSincerity}
                          onCheckedChange={(checked) => setFormData({ ...formData, declareSincerity: checked as boolean })}
                        />
                        <Label htmlFor="declareSincerity" className="text-sm cursor-pointer">
                          {language === 'fr'
                            ? 'Je certifie sur l\'honneur l\'exactitude des informations fournies'
                            : language === 'de'
                            ? 'Ich bestätige die Richtigkeit der bereitgestellten Informationen'
                            : 'I certify the accuracy of the information provided'}
                        </Label>
                      </div>
                      {errors.declareSincerity && (
                        <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                          <AlertCircle className="w-4 h-4" />
                          {errors.declareSincerity}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Verification */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Vérification de l\'email' : language === 'de' ? 'E-Mail-Verifizierung' : 'Email Verification'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Entrez le code de vérification envoyé à votre adresse email'
                          : language === 'de'
                          ? 'Geben Sie den an Ihre E-Mail-Adresse gesendeten Verifizierungscode ein'
                          : 'Enter the verification code sent to your email address'}
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            {language === 'fr' ? 'Code envoyé à' : language === 'de' ? 'Code gesendet an' : 'Code sent to'}
                          </p>
                          <p className="text-sm text-blue-700 mt-1">{formData.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailCode">
                        {language === 'fr' ? 'Code de vérification email *' : language === 'de' ? 'E-Mail-Verifizierungscode *' : 'Email Verification Code *'}
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          id="emailCode"
                          value={emailVerificationCode}
                          onChange={(e) => setEmailVerificationCode(e.target.value)}
                          placeholder="123456"
                          maxLength={6}
                        />
                        <Button
                          onClick={handleVerifyEmail}
                          disabled={isEmailVerified}
                          variant={isEmailVerified ? 'outline' : 'default'}
                        >
                          {isEmailVerified ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              {language === 'fr' ? 'Vérifié' : language === 'de' ? 'Verifiziert' : 'Verified'}
                            </>
                          ) : (
                            language === 'fr' ? 'Vérifier' : language === 'de' ? 'Verifizieren' : 'Verify'
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        {language === 'fr' ? 'Code de test : 123456' : language === 'de' ? 'Testcode: 123456' : 'Test code: 123456'}
                      </p>
                    </div>

                    {isEmailVerified && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <p className="text-sm font-medium text-green-900">
                            {language === 'fr' ? 'Email vérifié avec succès' : language === 'de' ? 'E-Mail erfolgreich verifiziert' : 'Email verified successfully'}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {language === 'fr' ? 'Compte créé avec succès !' : language === 'de' ? 'Konto erfolgreich erstellt!' : 'Account Created Successfully!'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'fr'
                          ? 'Bienvenue sur CiviAgora ! Vous pouvez maintenant participer aux consultations citoyennes.'
                          : language === 'de'
                          ? 'Willkommen bei CiviAgora! Sie können jetzt an Bürgerkonsultationen teilnehmen.'
                          : 'Welcome to CiviAgora! You can now participate in citizen consultations.'}
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button size="lg" className="gap-2" onClick={() => navigate('/login')}>
                        {language === 'fr' ? 'Se connecter' : language === 'de' ? 'Anmelden' : 'Sign In'}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex justify-between items-center mt-8 pt-6 border-t gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {language === 'fr' ? 'Précédent' : language === 'de' ? 'Zurück' : 'Previous'}
                  </Button>
                  
                  {/* Cancel button to return to home */}
                  <Button
                    variant="ghost"
                    onClick={() => setShowCancelDialog(true)}
                    className="gap-2 text-gray-600 hover:text-gray-900"
                  >
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>

                  {currentStep < 4 ? (
                    <Button onClick={handleNext} className="gap-2">
                      {language === 'fr' ? 'Suivant' : language === 'de' ? 'Weiter' : 'Next'}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="gap-2" disabled={!isEmailVerified}>
                      {language === 'fr' ? 'Créer mon compte' : language === 'de' ? 'Konto erstellen' : 'Create Account'}
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'fr' ? 'Annuler l\'inscription' : language === 'de' ? 'Registrierung abbrechen' : 'Cancel Registration'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'fr'
                ? 'Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.'
                : language === 'de'
                ? 'Sind Sie sicher, dass Sie abbrechen möchten? Alle eingegebenen Daten gehen verloren.'
                : 'Are you sure you want to cancel? All entered data will be lost.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowCancelDialog(false);
                handleCancel();
              }}
            >
              {language === 'fr' ? 'Confirmer' : language === 'de' ? 'Bestätigen' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}