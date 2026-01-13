# CiviAgora - Quick Reference Guide

Fast reference for common tasks and patterns in the CiviAgora platform.

## 🚀 Quick Start Checklist

- [ ] Read [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- [ ] Browse TypeScript DTOs in `/src/app/types/index.ts`
- [ ] Review mock data in `/src/app/data/api-mock.ts`
- [ ] Check available hooks in `/src/app/hooks/useApi.ts`
- [ ] Review [BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md) if building backend

---

## 📁 File Locations

```
/src/app/types/index.ts              → All TypeScript DTOs
/src/app/data/api-mock.ts            → Realistic mock data
/src/app/services/api.ts             → API service layer
/src/app/hooks/useApi.ts             → React Query hooks
/src/app/constants/index.ts          → App constants
/src/app/types/exports.ts            → Centralized exports
```

---

## 📦 Common Imports

```typescript
// Import everything from one place
import {
  // Types
  ConsultationDTO,
  PetitionDTO,
  VoteDTO,
  UserDTO,
  
  // API Service
  apiService,
  
  // Hooks
  useConsultations,
  usePetitions,
  useVotes,
  useCurrentUser,
  
  // Mock Data (for reference)
  mockConsultations,
  
  // Themes
  themes,
  getThemeById,
} from '@/types/exports';

// Or import individually
import type { ConsultationDTO } from '@/types';
import { useConsultations } from '@/hooks/useApi';
import { apiService } from '@/services/api';
```

---

## 🔧 Most Used Hooks

```typescript
// User & Auth
const { data: user } = useCurrentUser();
const loginMutation = useLogin();
const registerMutation = useRegister();

// Consultations
const { data: consultations, isLoading } = useConsultations({ status: 'open' });
const { data: consultation } = useConsultation(id);
const registerMutation = useRegisterForConsultation();

// Petitions
const { data: petitions } = usePetitions({ themeId: 'env' });
const { data: petition } = usePetition(id);
const signMutation = useSignPetition();

// Votes
const { data: votes } = useVotes({ status: 'open' });
const { data: vote } = useVote(id);
const castMutation = useCastVote();

// Themes
const { data: themes } = useThemes();
const { data: theme } = useTheme(id);

// Dashboard
const { data: stats } = useDashboardStats();
```

---

## 📊 Data Fetching Pattern

```typescript
function MyComponent() {
  const { data, isLoading, error } = useConsultations();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  if (!data) return null;

  return <div>{/* render data */}</div>;
}
```

---

## ✍️ Mutation Pattern

```typescript
function MyComponent() {
  const mutation = useSignPetition();

  const handleClick = async () => {
    try {
      await mutation.mutateAsync({
        petitionId: 'pet_001',
        data: { anonymous: false }
      });
      toast.success('Success!');
    } catch (error) {
      toast.error('Error!');
    }
  };

  return (
    <button onClick={handleClick} disabled={mutation.isPending}>
      {mutation.isPending ? 'Loading...' : 'Sign'}
    </button>
  );
}
```

---

## 🌍 Multilingual Pattern

```typescript
import { useLanguage } from '@/contexts/LanguageContext';
import type { LocalizedString } from '@/types';

function MyComponent({ title }: { title: LocalizedString }) {
  const { language } = useLanguage(); // 'fr' | 'de' | 'en'

  return (
    <div>
      {/* Access localized string */}
      <h1>{title[language]}</h1>

      {/* Conditional text */}
      <p>
        {language === 'fr' && 'Texte en français'}
        {language === 'de' && 'Text auf Deutsch'}
        {language === 'en' && 'Text in English'}
      </p>

      {/* Format dates with locale */}
      <span>{new Date().toLocaleDateString(language)}</span>
      
      {/* Format numbers with locale */}
      <span>{(12345).toLocaleString(language)}</span>
    </div>
  );
}
```

---

## 🎨 Theme Helper Functions

```typescript
import { getThemeById, getThemeBySlug, getActiveThemes } from '@/data/themes';

// Get theme by ID
const theme = getThemeById('env');

// Get theme by slug
const theme = getThemeBySlug('environnement');

// Get only active themes
const activeThemes = getActiveThemes();
```

---

## 🔐 Auth Pattern

```typescript
import { useAuth } from '@/contexts/AuthContext';

function ProtectedComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <p>Welcome, {user.firstName}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 📝 Form Validation

```typescript
import { VALIDATION_RULES } from '@/constants';

// Email validation
const isValidEmail = VALIDATION_RULES.email.pattern.test(email);

// Password validation
const isValidPassword = VALIDATION_RULES.password.pattern.test(password);

// Get error message
const errorMessage = VALIDATION_RULES.email.message[language];
```

---

## 🎯 Common Constants

```typescript
import {
  APP_NAME,
  ROUTES,
  STATUS_COLORS,
  STATUS_LABELS,
  SUPPORTED_LANGUAGES,
  DEFAULT_PAGE_SIZE,
} from '@/constants';

// Use routes
navigate(ROUTES.consultations);
navigate(ROUTES.consultationDetail('con_001'));

// Use status labels
const label = STATUS_LABELS[language]['open'];

// Use status colors
const colorClass = STATUS_COLORS['open']; // 'bg-green-100 text-green-700'
```

---

## 🔍 Search Pattern

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useDeb ounce } from 'use-debounce';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);

  const { data } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return null;
      const response = await apiService.search.search({
        query: debouncedQuery,
      });
      return response.data;
    },
    enabled: debouncedQuery.length > 2,
  });

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

---

## 📄 Pagination Pattern

```typescript
function PaginatedList() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading } = useConsultations({ 
    page, 
    limit: 20 
  });

  return (
    <div>
      {/* Render items */}
      {data?.map(item => <Item key={item.id} />)}

      {/* Pagination */}
      <div className="flex gap-2">
        <button 
          onClick={() => setPage(p => p - 1)}
          disabled={!data?.meta?.hasPreviousPage}
        >
          Previous
        </button>
        
        <span>Page {data?.meta?.currentPage} of {data?.meta?.totalPages}</span>
        
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={!data?.meta?.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

## 🎨 Styling with Theme Colors

```typescript
function ThemeComponent({ themeId }: { themeId: string }) {
  const theme = getThemeById(themeId);
  if (!theme) return null;

  return (
    <div>
      {/* Use hex color for custom styling */}
      <div 
        className="p-4 rounded-lg"
        style={{ 
          backgroundColor: `${theme.colorHex}20`,
          borderColor: theme.colorHex 
        }}
      >
        <span className="text-2xl">{theme.icon}</span>
        {/* Use Tailwind color class */}
        <h3 className={theme.color}>{theme.name.fr}</h3>
      </div>
    </div>
  );
}
```

---

## 📊 Dashboard Stats Pattern

```typescript
function StatsCard({ 
  title, 
  value, 
  trend 
}: { 
  title: string; 
  value: number; 
  trend: number; 
}) {
  const isPositive = trend > 0;

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-sm text-gray-600">{title}</h3>
      
      <div className="text-3xl font-bold my-2">
        {value.toLocaleString()}
      </div>
      
      <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
      </div>
    </div>
  );
}
```

---

## 🚨 Error Handling

```typescript
import { toast } from 'sonner';

function MyComponent() {
  const mutation = useSomeMutation();

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync(data);
      toast.success('Success!');
    } catch (error) {
      console.error('Error:', error);
      
      // Generic error
      toast.error('An error occurred');
      
      // Or handle specific errors
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
}
```

---

## 🔄 Optimistic Updates

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/useApi';

function OptimisticComponent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: someApiCall,
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.consultations() });

      // Snapshot previous value
      const previous = queryClient.getQueryData(queryKeys.consultations());

      // Optimistically update
      queryClient.setQueryData(queryKeys.consultations(), (old: any) => {
        return [...old, newData];
      });

      return { previous };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(queryKeys.consultations(), context?.previous);
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.consultations() });
    },
  });
}
```

---

## 📱 Responsive Pattern

```typescript
import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/constants';

function useMediaQuery(breakpoint: keyof typeof BREAKPOINTS) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
    const media = window.matchMedia(query);
    
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [breakpoint]);

  return matches;
}

// Usage
function ResponsiveComponent() {
  const isDesktop = useMediaQuery('lg');
  
  return (
    <div className={isDesktop ? 'grid-cols-3' : 'grid-cols-1'}>
      {/* ... */}
    </div>
  );
}
```

---

## 🎯 Common Patterns Cheat Sheet

| Pattern | Code |
|---------|------|
| **Get current user** | `const { data: user } = useCurrentUser()` |
| **Check if authenticated** | `const { isAuthenticated } = useAuth()` |
| **Get current language** | `const { language } = useLanguage()` |
| **Show toast** | `toast.success('Message')` |
| **Navigate** | `navigate(ROUTES.consultations)` |
| **Format date** | `new Date().toLocaleDateString(language)` |
| **Format number** | `(123456).toLocaleString(language)` |
| **Get theme** | `const theme = getThemeById('env')` |
| **Invalidate cache** | `queryClient.invalidateQueries({ queryKey: [...] })` |

---

## 📚 Documentation Links

- [Developer Guide](./DEVELOPER_GUIDE.md) - Complete development guide
- [Backend API Spec](./BACKEND_API_SPEC.md) - API documentation for backend
- [Example Usage](./EXAMPLE_USAGE.md) - Practical code examples
- [Data README](./src/app/data/README.md) - Data architecture details

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| **Type error with DTO** | Import from `/types/index.ts`, not mock data |
| **Data not updating** | Add `invalidateQueries` in mutation's `onSuccess` |
| **Multilingual text not showing** | Use `title[language]` not just `title` |
| **Hook returns undefined** | Check if query is `enabled` and `id` is provided |
| **Infinite rerender** | Add dependencies to `useEffect` properly |
| **Mock data vs real API** | Check `API_CONFIG.useMock` in constants |

---

## 💡 Pro Tips

1. **Always use DTOs** - They ensure type safety across frontend/backend
2. **Use React Query** - Handles caching, loading states, errors automatically
3. **Centralize imports** - Import from `@/types/exports` for convenience
4. **Multilingual first** - Always use `LocalizedString` for user-facing text
5. **Use constants** - Routes, colors, labels from `/constants/index.ts`
6. **Test with mock data** - Full app works without backend
7. **Follow patterns** - Check [EXAMPLE_USAGE.md](./EXAMPLE_USAGE.md) for proven patterns

---

**Need more help? Check the full [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)**
