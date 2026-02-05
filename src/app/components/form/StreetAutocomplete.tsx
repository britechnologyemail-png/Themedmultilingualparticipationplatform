import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { MapPin, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TerritoryElement {
  id: string;
  name: string;
  type: 'street' | 'avenue' | 'park' | 'square';
  description?: string;
}

interface StreetAutocompleteProps {
  value: string;
  onChange: (value: string, elementId: string) => void;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export function StreetAutocomplete({ 
  value, 
  onChange, 
  disabled = false, 
  error,
  required = true 
}: StreetAutocompleteProps) {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<TerritoryElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mock data - would be fetched from API in production
  const territoryElements: TerritoryElement[] = [
    { id: '1', name: 'Rue de la Croix-Rouge', type: 'street', description: 'Rue principale du centre-ville' },
    { id: '2', name: 'Avenue de France', type: 'avenue', description: 'Grande avenue reliant le lac au centre' },
    { id: '3', name: 'Rue du Rhône', type: 'street', description: 'Rue commerçante principale' },
    { id: '4', name: 'Avenue Giuseppe-Motta', type: 'avenue', description: 'Avenue bordant le lac Léman' },
    { id: '5', name: 'Rue de Lausanne', type: 'street' },
    { id: '6', name: 'Rue du Stand', type: 'street' },
    { id: '7', name: 'Avenue de la Paix', type: 'avenue' },
    { id: '8', name: 'Rue de Carouge', type: 'street' },
    { id: '9', name: 'Rue des Pâquis', type: 'street' },
    { id: '10', name: 'Avenue Henri-Dunant', type: 'avenue' },
    { id: '11', name: 'Rue de Genève', type: 'street' },
    { id: '12', name: 'Rue Centrale', type: 'street' },
    { id: '13', name: 'Avenue du Mail', type: 'avenue' },
    { id: '14', name: 'Rue de la Servette', type: 'street' },
    { id: '15', name: 'Rue des Eaux-Vives', type: 'street' }
  ];

  // Filter only streets and avenues
  const streets = territoryElements.filter(el => el.type === 'street' || el.type === 'avenue');

  // Filter based on search term
  const filteredStreets = streets.filter(street =>
    street.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    
    // If input is cleared, reset selection
    if (!newValue) {
      setSelectedElement(null);
      onChange('', '');
    }
  };

  const handleSelect = (street: TerritoryElement) => {
    setSearchTerm(street.name);
    setSelectedElement(street);
    onChange(street.name, street.id);
    setIsOpen(false);
  };

  const getTypeLabel = (type: string) => {
    if (type === 'street') {
      return language === 'fr' ? 'Rue' : language === 'de' ? 'Straße' : 'Street';
    }
    return language === 'fr' ? 'Avenue' : language === 'de' ? 'Allee' : 'Avenue';
  };

  const labels = {
    placeholder: language === 'fr' 
      ? 'Commencez à taper votre rue...' 
      : language === 'de' 
      ? 'Beginnen Sie mit der Eingabe Ihrer Straße...' 
      : 'Start typing your street...',
    noResults: language === 'fr'
      ? 'Aucune rue trouvée'
      : language === 'de'
      ? 'Keine Straße gefunden'
      : 'No street found',
    label: language === 'fr'
      ? 'Rue / Avenue'
      : language === 'de'
      ? 'Straße / Allee'
      : 'Street / Avenue',
    helpText: language === 'fr'
      ? 'Si votre rue n\'apparaît pas, veuillez contacter l\'administrateur'
      : language === 'de'
      ? 'Wenn Ihre Straße nicht angezeigt wird, wenden Sie sich bitte an den Administrator'
      : 'If your street does not appear, please contact the administrator'
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="street" className="flex items-center gap-2">
        {labels.label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      <div ref={wrapperRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <Input
            id="street"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => !selectedElement && setIsOpen(true)}
            placeholder={labels.placeholder}
            disabled={disabled || !!selectedElement}
            className={`pl-10 pr-10 ${error ? 'border-red-500' : ''} ${selectedElement ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            autoComplete="off"
          />
          {selectedElement && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
          )}
        </div>

        {/* Dropdown */}
        {isOpen && !selectedElement && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredStreets.length > 0 ? (
              <ul className="py-1">
                {filteredStreets.map((street) => (
                  <li
                    key={street.id}
                    onClick={() => handleSelect(street)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{street.name}</p>
                        {street.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{street.description}</p>
                        )}
                        <p className="text-xs text-blue-600 mt-1">
                          {getTypeLabel(street.type)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">{labels.noResults}</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  {labels.helpText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Help text */}
      {!selectedElement && (
        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700">
            {labels.helpText}
          </p>
        </div>
      )}

      {/* Selected street info */}
      {selectedElement && (
        <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-green-800 font-medium">
              {language === 'fr' 
                ? 'Rue sélectionnée' 
                : language === 'de' 
                ? 'Ausgewählte Straße' 
                : 'Selected street'}
            </p>
            <p className="text-xs text-green-700 mt-1">
              {selectedElement.name}
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
