# Technical Reference - Sam Roi Yot Lifestyle

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React 19)                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Pages: Home, Properties, PropertyDetail,        │  │
│  │         Lifestyle, Concierge, About, Contact     │  │
│  └──────────────────────────────────────────────────┘  │
│                         ↓ tRPC Client                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Backend (Express 4 + tRPC 11)           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Routers: auth, properties, inquiries, system    │  │
│  │  Procedures: publicProcedure, protectedProcedure │  │
│  └──────────────────────────────────────────────────┘  │
│                         ↓ Drizzle ORM                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Database (MySQL/TiDB)                       │
│  Tables: users, properties, inquiries, lifestyleArticles│
└─────────────────────────────────────────────────────────┘

External Services:
- S3 + CloudFront: Property images (98 files)
- Manus OAuth: User authentication
- Email: Inquiry notifications to samroiyot.th@gmail.com
- Google Maps: Office location display
```

---

## 📡 tRPC API Reference

### Authentication Routes (`auth`)

#### `auth.me`
**Type:** Query (Public)  
**Returns:** Current user or null  
**Usage:**
```typescript
const { data: user } = trpc.auth.me.useQuery();
```

#### `auth.logout`
**Type:** Mutation (Public)  
**Returns:** `{ success: true }`  
**Usage:**
```typescript
const logout = trpc.auth.logout.useMutation();
await logout.mutateAsync();
```

### Property Routes (Need to be added)

#### `properties.list`
**Type:** Query (Public)  
**Input:** `{ type?: string, minPrice?: number, maxPrice?: number }`  
**Returns:** Array of properties  
**Usage:**
```typescript
const { data: properties } = trpc.properties.list.useQuery({
  type: 'condo',
  minPrice: 50000,
  maxPrice: 200000
});
```

#### `properties.getById`
**Type:** Query (Public)  
**Input:** `{ id: number }`  
**Returns:** Single property or null  
**Usage:**
```typescript
const { data: property } = trpc.properties.getById.useQuery({ id: 1 });
```

#### `properties.create` (Admin only)
**Type:** Mutation (Protected)  
**Input:** Property object  
**Returns:** Created property  
**Usage:**
```typescript
const createProperty = trpc.properties.create.useMutation();
await createProperty.mutateAsync({
  title: "New Property",
  priceEur: 150000,
  type: "condo",
  // ... other fields
});
```

### Inquiry Routes (Need to be added)

#### `inquiries.submit`
**Type:** Mutation (Public)  
**Input:** `{ name, email, phone?, message, propertyId?, type }`  
**Returns:** Created inquiry  
**Usage:**
```typescript
const submitInquiry = trpc.inquiries.submit.useMutation();
await submitInquiry.mutateAsync({
  name: "John Doe",
  email: "john@example.com",
  message: "Interested in property",
  propertyId: 1,
  type: "property"
});
```

#### `inquiries.list` (Admin only)
**Type:** Query (Protected)  
**Input:** `{ limit?: number, offset?: number }`  
**Returns:** Array of inquiries  
**Usage:**
```typescript
const { data: inquiries } = trpc.inquiries.list.useQuery({ limit: 50 });
```

---

## 🗄️ Database Schema Details

### Properties Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| title | TEXT | Property title (required) |
| description | TEXT | Full description |
| type | VARCHAR(50) | 'condo', 'house', 'villa', 'land', 'townhouse' |
| bedrooms | INT | Number of bedrooms |
| bathrooms | INT | Number of bathrooms |
| sqm | DECIMAL(10,2) | Square meters |
| priceEur | DECIMAL(15,2) | Price in EUR |
| address | TEXT | Full address |
| latitude | DECIMAL(10,8) | GPS latitude |
| longitude | DECIMAL(11,8) | GPS longitude |
| images | TEXT | JSON array of S3 URLs |
| videoUrl | TEXT | YouTube video URL |
| features | TEXT | JSON array of features |
| status | VARCHAR(20) | 'available', 'sold', 'pending' |
| featured | BOOLEAN | Show on homepage |
| fazwazUrl | TEXT | Original FazWaz listing URL |
| createdAt | TIMESTAMP | Auto-set on creation |
| updatedAt | TIMESTAMP | Auto-updated |

**Example Row:**
```json
{
  "id": 1,
  "title": "1 Bedroom Condo at The Sea Condominium",
  "description": "Beautiful beachfront condo...",
  "type": "condo",
  "bedrooms": 1,
  "bathrooms": 1,
  "sqm": 52.76,
  "priceEur": 125000,
  "images": "[\"https://d2...cloudfront.net/properties/1/image1.jpg\", ...]",
  "videoUrl": "https://youtube.com/shorts/oD-sokRcVO8",
  "features": "[\"Sea View\", \"Pool Access\", \"Furnished\"]",
  "status": "available",
  "featured": false
}
```

### Inquiries Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| name | VARCHAR(255) | Inquirer name (required) |
| email | VARCHAR(320) | Email address (required) |
| phone | VARCHAR(50) | Phone number (optional) |
| message | TEXT | Inquiry message (required) |
| propertyId | INT | FK to properties (nullable) |
| type | VARCHAR(50) | 'property', 'concierge', 'general' |
| status | VARCHAR(20) | 'new', 'contacted', 'closed' |
| createdAt | TIMESTAMP | Auto-set on creation |

**Example Row:**
```json
{
  "id": 1,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+66 123456789",
  "message": "I'm interested in viewing this property",
  "propertyId": 1,
  "type": "property",
  "status": "new",
  "createdAt": "2026-01-29T10:30:00Z"
}
```

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| openId | VARCHAR(64) | Manus OAuth ID (unique) |
| name | TEXT | User display name |
| email | VARCHAR(320) | Email address |
| loginMethod | VARCHAR(64) | 'manus', 'google', etc. |
| role | ENUM | 'user' or 'admin' |
| createdAt | TIMESTAMP | Account creation |
| updatedAt | TIMESTAMP | Last profile update |
| lastSignedIn | TIMESTAMP | Last login time |

---

## 🎨 Frontend Component Structure

```
client/src/
├── App.tsx                    # Routes and layout
├── main.tsx                   # App entry point
├── index.css                  # Global styles (Tailwind)
│
├── pages/
│   ├── Home.tsx              # Landing page
│   ├── Properties.tsx        # Property listings grid
│   ├── PropertyDetail.tsx    # Individual property page
│   ├── Lifestyle.tsx         # Area information
│   ├── Concierge.tsx         # Concierge services
│   ├── About.tsx             # About company
│   ├── Contact.tsx           # Contact form
│   ├── Admin.tsx             # Admin dashboard (needs work)
│   └── NotFound.tsx          # 404 page
│
├── components/
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── ErrorBoundary.tsx     # Error handling
│   ├── Map.tsx               # Google Maps integration
│   └── ...
│
├── contexts/
│   └── ThemeContext.tsx      # Theme provider
│
├── hooks/
│   └── useAuth.tsx           # Authentication hook
│
└── lib/
    └── trpc.ts               # tRPC client setup
```

---

## 🔧 Backend Structure

```
server/
├── routers.ts                # Main tRPC router
├── db.ts                     # Database query helpers
│
├── _core/                    # Framework code (don't edit)
│   ├── index.ts              # Express server
│   ├── trpc.ts               # tRPC setup
│   ├── context.ts            # Request context
│   ├── cookies.ts            # Session management
│   ├── env.ts                # Environment variables
│   ├── llm.ts                # LLM integration
│   ├── map.ts                # Google Maps proxy
│   ├── notification.ts       # Owner notifications
│   └── systemRouter.ts       # System procedures
│
└── storage.ts                # S3 storage helpers
```

---

## 🌐 Environment Variables

**Auto-injected by Manus (DO NOT EDIT):**

| Variable | Description |
|----------|-------------|
| DATABASE_URL | MySQL/TiDB connection string |
| JWT_SECRET | Session cookie signing secret |
| VITE_APP_ID | Manus OAuth application ID |
| OAUTH_SERVER_URL | Manus OAuth backend URL |
| VITE_OAUTH_PORTAL_URL | Manus login portal URL |
| OWNER_OPEN_ID | Owner's Manus OAuth ID |
| OWNER_NAME | Owner's display name |
| BUILT_IN_FORGE_API_URL | Manus built-in APIs |
| BUILT_IN_FORGE_API_KEY | API key for built-in services |
| VITE_FRONTEND_FORGE_API_KEY | Frontend API key |
| VITE_FRONTEND_FORGE_API_URL | Frontend API URL |
| VITE_APP_TITLE | Website title |
| VITE_APP_LOGO | Website logo URL |

**Access in code:**
```typescript
// Server-side
import { ENV } from './_core/env';
console.log(ENV.ownerOpenId);

// Client-side
console.log(import.meta.env.VITE_APP_TITLE);
```

---

## 📦 S3 Storage Usage

### Upload Image
```typescript
import { storagePut } from './server/storage';

// Generate unique filename
const randomId = Math.random().toString(36).substring(7);
const fileKey = `properties/${propertyId}/${filename}-${randomId}.jpg`;

// Upload to S3
const { url } = await storagePut(
  fileKey,
  fileBuffer,  // Buffer or Uint8Array
  'image/jpeg'
);

// url is now a CloudFront CDN URL
// Store this URL in the database
```

### Get Presigned URL (if needed)
```typescript
import { storageGet } from './server/storage';

const { url } = await storageGet(fileKey, 3600); // 1 hour expiry
```

---

## 🎯 Common Patterns

### Protected Admin Route
```typescript
// In server/routers.ts
import { protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  deleteProperty: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Check admin role
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      
      // Perform admin action
      const db = await getDb();
      await db.delete(properties).where(eq(properties.id, input.id));
      
      return { success: true };
    }),
});
```

### Optimistic Update Pattern
```typescript
// In React component
const utils = trpc.useUtils();
const deleteProperty = trpc.properties.delete.useMutation({
  onMutate: async (deletedId) => {
    // Cancel outgoing refetches
    await utils.properties.list.cancel();
    
    // Snapshot previous value
    const previous = utils.properties.list.getData();
    
    // Optimistically update
    utils.properties.list.setData(undefined, (old) =>
      old?.filter((p) => p.id !== deletedId)
    );
    
    return { previous };
  },
  onError: (err, deletedId, context) => {
    // Rollback on error
    utils.properties.list.setData(undefined, context?.previous);
  },
  onSettled: () => {
    // Refetch after mutation
    utils.properties.list.invalidate();
  },
});
```

### Email Notification
```typescript
// In server/routers.ts
import { notifyOwner } from './_core/notification';

inquiries: router({
  submit: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string(),
      propertyId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      // Save to database
      const db = await getDb();
      const [inquiry] = await db.insert(inquiries).values(input);
      
      // Send notification
      await notifyOwner({
        title: `New Inquiry from ${input.name}`,
        content: `Email: ${input.email}\nMessage: ${input.message}`
      });
      
      return inquiry;
    }),
}),
```

---

## 🐛 Debugging Tips

### Check Server Logs
```bash
cd /home/ubuntu/samroiyot-lifestyle/
tail -f .manus-logs/devserver.log
```

### Check Browser Console Logs
```bash
tail -f .manus-logs/browserConsole.log
```

### Check Network Requests
```bash
tail -f .manus-logs/networkRequests.log
```

### Test tRPC Procedure Directly
```bash
cd /home/ubuntu/samroiyot-lifestyle/
pnpm tsx -e "
import { appRouter } from './server/routers.ts';
const caller = appRouter.createCaller({ user: null, req: {}, res: {} });
const result = await caller.properties.list();
console.log(result);
"
```

### Check Database State
```bash
cd /home/ubuntu/samroiyot-lifestyle/
pnpm tsx -e "
import { getDb } from './server/db.ts';
import { properties } from './drizzle/schema.ts';
const db = await getDb();
const props = await db.select().from(properties);
console.log(props);
"
```

---

## 📚 Additional Resources

- **tRPC Docs:** https://trpc.io/docs
- **Drizzle ORM:** https://orm.drizzle.team/docs
- **React 19:** https://react.dev
- **Tailwind CSS 4:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com

---

**End of Technical Reference**
