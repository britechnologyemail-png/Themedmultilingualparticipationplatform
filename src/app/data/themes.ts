export interface Theme {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const themes: Theme[] = [
  {
    id: 'environment',
    name: 'theme.environment',
    color: '#22c55e',
    icon: '🌱',
  },
  {
    id: 'urban',
    name: 'theme.urban',
    color: '#f59e0b',
    icon: '🏙️',
  },
  {
    id: 'mobility',
    name: 'theme.mobility',
    color: '#3b82f6',
    icon: '🚌',
  },
  {
    id: 'education',
    name: 'theme.education',
    color: '#8b5cf6',
    icon: '📚',
  },
  {
    id: 'health',
    name: 'theme.health',
    color: '#ec4899',
    icon: '🏥',
  },
  {
    id: 'culture',
    name: 'theme.culture',
    color: '#f97316',
    icon: '🎭',
  },
  {
    id: 'governance',
    name: 'theme.governance',
    color: '#6366f1',
    icon: '🏛️',
  },
  {
    id: 'economy',
    name: 'theme.economy',
    color: '#14b8a6',
    icon: '💼',
  },
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id);
}
