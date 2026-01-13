# CiviAgora Developer Guide

Complete guide for frontend and backend developers working on the CiviAgora participatory democracy platform.

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Frontend Development](#frontend-development)
5. [Backend Development](#backend-development)
6. [Data Flow](#data-flow)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview

**CiviAgora** is a multilingual (FR/DE/EN) participatory democracy platform for public organizations, featuring:

- 🗳️ **Consultations** - Public meetings, online debates, citizen proposals
- ✍️ **Petitions** - Citizen-initiated petitions with signature tracking
- 📊 **Votes** - Participatory budgets, referendums, polls
- 👥 **Assemblies** - Citizens' councils with meetings and working groups
- 🎤 **Conferences** - Events with speakers, sessions, and registration

### Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS v4
- React Router v6
- React Query (TanStack Query)
- Motion (Framer Motion)

**Backend (Recommended):**
- NestJS or Express (Node.js)
- PostgreSQL + TypeORM/Prisma
- JWT Authentication
- Elasticsearch (for search)

---

## Architecture

### Project Structure

```
civiagora/
├── src/app/
│   ├── types/
│   │   └── index.ts                 # All TypeScript DTOs
│   ├── data/
│   │   ├── api-mock.ts              # Mock data matching DTOs
│   │   ├── themes.ts                # Theme configuration
│   │   └── README.md                # Data architecture docs
│   ├── services/
│   │   └── api.ts                   # API service layer
│   ├── hooks/
│   │   └── useApi.ts                # React Query hooks
│   ├── contexts/
│   │   ├── AuthContext.tsx          # Authentication context
│   │   └── LanguageContext.tsx      # i18n context
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ui/                      # Shadcn UI components
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── ConsultationsPage.tsx
│   │   ├── PetitionsPage.tsx
│   │   └── ...
│   ├── admin/                       # Back-office admin
│   └── saas/                        # SaaS multi-tenant
├── BACKEND_API_SPEC.md              # Complete API specification
├── DEVELOPER_GUIDE.md               # This file
└── package.json
```

### Data Architecture

```
┌─────────────────┐
│   React App     │
└────────┬────────┘
         │
         ├─► useApi Hooks (React Query)
         │
         ├─► API Service Layer
         │
         ├─► TypeScript DTOs (Types)
         │
         └─► Mock Data (Development) / Real API (Production)
```

---

## Quick Start

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Using Mock Data (Current)

All data is currently mocked in `/src/app/data/api-mock.ts`. The application works fully without a backend.

### Connecting to Real Backend

1. Update `/src/app/services/api.ts` to use real HTTP calls
2. Configure API base URL in environment variables
3. Replace `simulateDelay()` with actual `fetch` or `axios` calls

Example:

```typescript
// Before (mock)
async getConsultations(): Promise<ApiResponse<ConsultationDTO[]>> {
  await simulateDelay();
  return { data: mockConsultations, ... };
}

// After (real API)
async getConsultations(): Promise<ApiResponse<ConsultationDTO[]>> {
  const response = await fetch(`${API_BASE_URL}/consultations`);
  return response.json();
}
```

---

## Frontend Development

### Using TypeScript DTOs

**Always** import types from `/types/index.ts`:

```typescript
import type { ConsultationDTO, UserDTO, PetitionDTO } from '@/types';

function MyComponent() {
  const [consultation, setConsultation] = useState<ConsultationDTO | null>(null);
  // TypeScript will provide auto-completion and type checking
}
```

### Fetching Data with Hooks

**Recommended approach** using React Query hooks:

```typescript
import { useConsultations, useConsultation } from '@/hooks/useApi';

function ConsultationsPage() {
  const { data: consultations, isLoading, error } = useConsultations({ 
    status: 'open' 
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {consultations?.map(consultation => (
        <ConsultationCard key={consultation.id} data={consultation} />
      ))}
    </div>
  );
}
```

### Mutations (Create/Update/Delete)

```typescript
import { useSignPetition } from '@/hooks/useApi';
import { toast } from 'sonner';

function PetitionDetail({ petitionId }) {
  const signMutation = useSignPetition();

  const handleSign = async () => {
    try {
      await signMutation.mutateAsync({
        petitionId,
        data: { anonymous: false, comment: 'I support this!' }
      });
      toast.success('Petition signed successfully!');
    } catch (error) {
      toast.error('Failed to sign petition');
    }
  };

  return (
    <button onClick={handleSign} disabled={signMutation.isPending}>
      {signMutation.isPending ? 'Signing...' : 'Sign Petition'}
    </button>
  );
}
```

### Multilingual Content

Use `LocalizedString` type for i18n content:

```typescript
import { useLanguage } from '@/contexts/LanguageContext';
import type { LocalizedString } from '@/types';

function Title({ title }: { title: LocalizedString }) {
  const { language } = useLanguage(); // 'fr' | 'de' | 'en'
  
  return <h1>{title[language]}</h1>;
}
```

### Available Hooks

All hooks are in `/src/app/hooks/useApi.ts`:

**User & Auth:**
- `useCurrentUser()` - Get logged-in user
- `useLogin()` - Login mutation
- `useRegister()` - Register mutation
- `useLogout()` - Logout mutation
- `useUpdateProfile()` - Update profile mutation
- `useParticipationHistory()` - Get user history
- `useNotifications()` - Get notifications
- `useActivities()` - Get user activities

**Data Fetching:**
- `useThemes()` - Get all themes
- `useConsultations(filters?)` - Get consultations
- `useConsultation(id)` - Get single consultation
- `usePetitions(filters?)` - Get petitions
- `usePetition(id)` - Get single petition
- `useVotes(filters?)` - Get votes
- `useVote(id)` - Get single vote
- `useAssemblies(filters?)` - Get assemblies
- `useAssembly(id)` - Get single assembly
- `useConferences(filters?)` - Get conferences
- `useConference(id)` - Get single conference
- `useDashboardStats()` - Get dashboard statistics

**Mutations:**
- `useSignPetition()` - Sign petition
- `useCastVote()` - Cast vote
- `useRegisterForConsultation()` - Register for consultation
- `useRegisterForConference()` - Register for conference

---

## Backend Development

See [BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md) for complete API documentation.

### Key Points

1. **Use the DTOs** - All TypeScript interfaces in `/types/index.ts` define your API contracts
2. **Match the structure** - API responses must match `ApiResponse<T>` format
3. **Implement pagination** - Use `PaginationMeta` for list endpoints
4. **Support multilingual** - All text content uses `LocalizedString`
5. **Handle errors** - Return proper HTTP status codes and error messages

### Example NestJS Controller

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { ConsultationDTO, ApiResponse } from './types';

@Controller('consultations')
export class ConsultationsController {
  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('themeId') themeId?: string,
  ): Promise<ApiResponse<ConsultationDTO[]>> {
    const consultations = await this.consultationsService.findAll({
      status,
      themeId,
    });

    return {
      data: consultations,
      meta: {
        currentPage: 1,
        totalPages: 1,
        totalItems: consultations.length,
        itemsPerPage: 20,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  }
}
```

### Database Models

Create database models that match the DTOs. Example with Prisma:

```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  firstName     String
  lastName      String
  role          String   @default("citizen")
  status        String   @default("active")
  emailVerified Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  petitionSignatures PetitionSignature[]
  votes              UserVote[]
}

model Consultation {
  id              String   @id @default(uuid())
  slug            String   @unique
  titleFr         String
  titleDe         String
  titleEn         String
  descriptionFr   String
  descriptionDe   String
  descriptionEn   String
  themeId         String
  type            String
  status          String
  startDate       DateTime
  endDate         DateTime
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  theme           Theme    @relation(fields: [themeId], references: [id])
}
```

---

## Data Flow

### Frontend → Backend

```
User Action (e.g., Sign Petition)
         ↓
React Component calls hook
         ↓
useSignPetition() mutation
         ↓
API Service: apiService.petition.signPetition()
         ↓
HTTP POST /api/petitions/:id/sign
         ↓
Backend validates & saves
         ↓
Returns ApiResponse<T>
         ↓
React Query updates cache
         ↓
UI updates automatically
```

### Data Types Flow

```
Database Row
      ↓
Backend Entity/Model
      ↓
DTO Mapping (matches frontend DTOs)
      ↓
API Response (ApiResponse<DTO>)
      ↓
Frontend receives typed data
      ↓
TypeScript ensures type safety
      ↓
React component renders
```

---

## Best Practices

### Frontend

✅ **DO:**
- Always use TypeScript DTOs for type safety
- Use React Query hooks for data fetching
- Handle loading and error states
- Use the API service layer, never import mock data directly
- Follow multilingual pattern with `LocalizedString`
- Implement proper form validation
- Show user feedback with toast notifications

❌ **DON'T:**
- Don't use `any` type
- Don't fetch data in `useEffect` manually (use hooks)
- Don't mutate data directly (use immutable updates)
- Don't hardcode text (use i18n)
- Don't bypass the API service layer

### Backend

✅ **DO:**
- Validate all input data
- Use DTOs for request/response
- Implement proper error handling
- Log all API requests
- Add rate limiting
- Use database transactions for critical operations
- Implement caching where appropriate
- Write unit and integration tests

❌ **DON'T:**
- Don't expose sensitive data
- Don't return different structures than DTOs
- Don't trust client input
- Don't forget pagination for lists
- Don't skip authentication checks

---

## Common Patterns

### Pattern 1: List with Filters

```typescript
function ConsultationsPage() {
  const [filters, setFilters] = useState({ 
    status: 'open' as const,
    themeId: undefined as string | undefined
  });

  const { data: consultations, isLoading } = useConsultations(filters);

  return (
    <>
      <FilterBar onFilterChange={setFilters} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ConsultationList consultations={consultations || []} />
      )}
    </>
  );
}
```

### Pattern 2: Detail Page

```typescript
function ConsultationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: consultation, isLoading, error } = useConsultation(id!);

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorPage error={error} />;
  if (!consultation) return <NotFoundPage />;

  return <ConsultationDetail data={consultation} />;
}
```

### Pattern 3: Form Submission

```typescript
function PetitionForm() {
  const navigate = useNavigate();
  const signMutation = useSignPetition();

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await signMutation.mutateAsync({
        petitionId: 'pet_001',
        data: {
          anonymous: formData.anonymous,
          comment: formData.comment,
        },
      });

      toast.success('Petition signed!');
      navigate('/petitions');
    } catch (error) {
      toast.error('Failed to sign petition');
      console.error(error);
    }
  };

  return <Form onSubmit={handleSubmit} />;
}
```

### Pattern 4: Optimistic Updates

```typescript
function LikePetition({ petitionId }: { petitionId: string }) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (petitionId: string) => apiService.petition.like(petitionId),
    onMutate: async (petitionId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: ['petitions', petitionId] 
      });

      // Snapshot previous value
      const previousPetition = queryClient.getQueryData(['petitions', petitionId]);

      // Optimistically update
      queryClient.setQueryData(['petitions', petitionId], (old: any) => ({
        ...old,
        liked: true,
        likes: old.likes + 1,
      }));

      return { previousPetition };
    },
    onError: (err, petitionId, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ['petitions', petitionId],
        context?.previousPetition
      );
    },
  });

  return <button onClick={() => likeMutation.mutate(petitionId)}>Like</button>;
}
```

---

## Troubleshooting

### TypeScript Errors

**Problem:** Type mismatch errors

**Solution:** Ensure you're using the correct DTO from `/types/index.ts`

```typescript
// ❌ Wrong - custom interface
interface Consultation { /* ... */ }

// ✅ Correct - use DTO
import type { ConsultationDTO } from '@/types';
```

### React Query Issues

**Problem:** Data not updating after mutation

**Solution:** Invalidate queries in mutation's `onSuccess`

```typescript
const mutation = useMutation({
  mutationFn: someApiCall,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['consultations'] });
  },
});
```

### Mock Data vs Real API

**Problem:** Need to switch between mock and real API

**Solution:** Use environment variables

```typescript
// src/app/services/api.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

async getConsultations() {
  if (USE_MOCK) {
    return { data: mockConsultations, ... };
  }
  
  const response = await fetch(`${API_BASE_URL}/consultations`);
  return response.json();
}
```

### Multilingual Content Not Showing

**Problem:** Text shows `[object Object]` instead of translated text

**Solution:** Access correct language property

```typescript
// ❌ Wrong
<h1>{consultation.title}</h1>

// ✅ Correct
const { language } = useLanguage();
<h1>{consultation.title[language]}</h1>
```

---

## Testing

### Frontend Tests

```typescript
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ConsultationCard from './ConsultationCard';
import { mockConsultations } from '@/data/api-mock';

test('renders consultation card', () => {
  const queryClient = new QueryClient();
  const consultation = mockConsultations[0];

  render(
    <QueryClientProvider client={queryClient}>
      <ConsultationCard data={consultation} />
    </QueryClientProvider>
  );

  expect(screen.getByText(consultation.title.fr)).toBeInTheDocument();
});
```

### Backend Tests

```typescript
import { Test } from '@nestjs/testing';
import { ConsultationsController } from './consultations.controller';
import { ConsultationsService } from './consultations.service';

describe('ConsultationsController', () => {
  let controller: ConsultationsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ConsultationsController],
      providers: [ConsultationsService],
    }).compile();

    controller = module.get<ConsultationsController>(ConsultationsController);
  });

  it('should return consultations', async () => {
    const result = await controller.findAll();
    
    expect(result.success).toBe(true);
    expect(result.data).toBeInstanceOf(Array);
    expect(result.meta).toBeDefined();
  });
});
```

---

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## Support

For questions or issues:

1. Check this guide and `/src/app/data/README.md`
2. Review `/BACKEND_API_SPEC.md` for API details
3. Check TypeScript DTOs in `/src/app/types/index.ts`
4. Contact the development team

---

**Last Updated**: January 9, 2026  
**Version**: 1.0.0  
**Maintainers**: CiviAgora Development Team
