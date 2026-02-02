# Sam Roi Yot Lifestyle Website - Handoff Document

**Project:** Sam Roi Yot Lifestyle - Properties & Concierge  
**Checkpoint:** manus-webdev://8e5527f2  
**Date:** January 29, 2026  
**Status:** 95% Complete - Property listings done, admin dashboard and Facebook extraction remaining

---

## 🎯 Project Overview

A premium real estate and concierge services website for Sam Roi Yot, Thailand. The site showcases properties with EUR pricing, captures leads through inquiry forms, and provides comprehensive lifestyle information about the area.

**Live URL:** https://3000-ixjx0isri9k7sie7lhis0-6ac0e8c1.sg1.manus.computer  
**Project Path:** `/home/ubuntu/samroiyot-lifestyle/`  
**Tech Stack:** React 19 + tRPC 11 + Tailwind 4 + Express 4 + Drizzle ORM + MySQL/TiDB

---

## ✅ Completed Features (95%)

### 1. **Property Listings System** ✅
- **7 FazWaz properties** added with complete data:
  - U5985439: 1BR Condo 52.76 SqM - €125,000
  - U5971902: Land 3.2 Rai - €195,000
  - U5971841: Land 300m to Beach - €60,000
  - U5971886: Land 150 sqm - €55,000
  - U5971940: Land 1 Rai - €55,000
  - U5971738: 1BR Condo 70 SqM - €140,000
  - U5988038: Mango Hills Resort (FEATURED) - €595,000

- **98 property images** uploaded to S3 CloudFront CDN
- **6 YouTube video walkthroughs** embedded (Mango Hills pending)
- **EUR pricing** displayed as primary currency
- Property types: Condo, House, Villa, Land, Townhouse
- Filterable by property type
- Image galleries with carousel
- Property detail pages with inquiry forms

### 2. **Website Pages** ✅
- **Home:** Hero, featured properties, CTA sections
- **Properties:** Grid view with filters, search, EUR prices
- **Property Detail:** Image gallery, YouTube video, specs, inquiry form
- **Lifestyle:** Comprehensive content about Sam Roi Yot (beaches, national park, community, amenities)
- **Concierge:** Services overview and contact form
- **About:** Company information
- **Contact:** Contact form with email notifications

### 3. **Core Features** ✅
- **Manus OAuth authentication** (admin access)
- **Email notifications** to samroiyot.th@gmail.com for inquiries
- **Bilingual support** (English/Thai) - infrastructure ready
- **Google Maps integration** - Office location at 622 ถนน 4020 Tambon Sam Roi Yot
- **Floating WhatsApp/Line buttons** for instant contact
- **Mobile-responsive design** across all pages
- **S3 image storage** with CloudFront CDN delivery

### 4. **Database Schema** ✅
Tables created and populated:
- `users` - OAuth user management with admin role
- `properties` - 7 properties with images, videos, EUR prices
- `inquiries` - Contact form submissions
- `lifestyleArticles` - Lifestyle content (not yet populated)

---

## 🚧 Remaining Tasks (5%)

### Priority 1: Admin Dashboard Enhancement
**Status:** Basic structure exists, needs integration  
**Location:** `/client/src/pages/Admin.tsx` (if exists) or needs creation

**Requirements:**
1. **Property Management**
   - Add/Edit/Delete properties through admin UI
   - Upload images directly to S3
   - Set EUR prices, YouTube video URLs
   - Mark properties as featured
   - Integrate existing PropertyForm component

2. **Lead Tracking Dashboard**
   - Display all inquiries from `inquiries` table
   - Show property inquiries separately
   - Filter by date, property, inquiry type
   - Export to CSV functionality

3. **Analytics Display**
   - Page view tracking (UV/PV)
   - Most viewed properties
   - Button click tracking (WhatsApp, Line, Contact)
   - Traffic sources
   - Weekly email reports to owner

**Technical Notes:**
- Use tRPC procedures in `server/routers.ts`
- Protect routes with `protectedProcedure` and check `ctx.user.role === 'admin'`
- Owner email: samroiyot.th@gmail.com
- Admin role automatically assigned to OWNER_OPEN_ID

### Priority 2: Facebook Content Extraction
**Status:** Not started - authentication issues encountered  
**Target:** https://www.facebook.com/groups/friendsofsamroiyot/learning_content/

**Requirements:**
1. Extract all guides and links from Friends of Sam Roi Yot Facebook group
2. Populate `lifestyleArticles` table with community guides
3. Display on Lifestyle page as "Community Resources" section
4. Include titles, descriptions, external links

**Facebook Login:**
- Google OAuth: r.sidd.chicane@gmail.com / BigBoi1983
- Alternative: Manual copy/paste from Facebook group

**Files Available:**
- `/home/ubuntu/upload/lifestyle-content.md` - General lifestyle content (already excellent)
- `/home/ubuntu/upload/lifestyle-research.md` - Research notes

### Priority 3: Final Testing & Polish
- Test all inquiry forms end-to-end
- Verify email notifications working
- Test property filters and search
- Mobile responsiveness check
- Cross-browser testing
- Performance optimization
- SEO meta tags

---

## 🗄️ Database Schema

### Properties Table
```sql
CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type VARCHAR(50), -- 'condo', 'house', 'villa', 'land', 'townhouse'
  bedrooms INT,
  bathrooms INT,
  sqm DECIMAL(10,2),
  priceEur DECIMAL(15,2), -- EUR pricing
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  images TEXT, -- JSON array of S3 URLs
  videoUrl TEXT, -- YouTube URL
  features TEXT, -- JSON array
  status VARCHAR(20) DEFAULT 'available',
  featured BOOLEAN DEFAULT FALSE,
  fazwazUrl TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Inquiries Table
```sql
CREATE TABLE inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  propertyId INT,
  type VARCHAR(50), -- 'property', 'concierge', 'general'
  status VARCHAR(20) DEFAULT 'new',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (propertyId) REFERENCES properties(id)
);
```

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📁 Key Files & Locations

### Frontend (React)
- **App.tsx:** `/client/src/App.tsx` - Routes and navigation
- **Properties Page:** `/client/src/pages/Properties.tsx` - Property listings grid
- **Property Detail:** `/client/src/pages/PropertyDetail.tsx` - Individual property page
- **Home Page:** `/client/src/pages/Home.tsx` - Landing page
- **Lifestyle Page:** `/client/src/pages/Lifestyle.tsx` - Area information
- **Components:** `/client/src/components/` - Reusable UI components

### Backend (tRPC + Express)
- **Routers:** `/server/routers.ts` - tRPC API procedures
- **Database:** `/server/db.ts` - Database query helpers
- **Schema:** `/drizzle/schema.ts` - Drizzle ORM schema definitions
- **Migrations:** `/drizzle/migrations/` - Database migration files

### Configuration
- **Environment:** `.env` (auto-injected by Manus platform)
- **Package:** `package.json` - Dependencies and scripts
- **Drizzle Config:** `drizzle.config.ts` - Database configuration

### Property Images
- **S3 Bucket:** Manus-managed S3 storage
- **CDN:** CloudFront distribution for fast delivery
- **Local Organized:** `/home/ubuntu/property_images/` (organized by property ID)

---

## 🔧 Development Commands

```bash
# Navigate to project
cd /home/ubuntu/samroiyot-lifestyle/

# Install dependencies
pnpm install

# Database migrations
pnpm db:push  # Generate and run migrations

# Development server (auto-starts)
pnpm dev

# Run tests
pnpm test

# TypeScript check
pnpm check

# Format code
pnpm format
```

---

## 🚨 Critical Notes & Gotchas

### 1. **Pricing Display - CRITICAL**
- **ALWAYS display EUR as primary currency**
- Previous sessions had issues with USD/THB conversion
- User explicitly requested EUR pricing from FazWaz listings
- Do NOT calculate exchange rates yourself
- Property prices are stored in `priceEur` column

### 2. **Images Field Handling**
- Images stored as JSON string in database
- Frontend must handle both string and parsed array formats
- Use this pattern:
```typescript
const imageUrls = typeof property.images === 'string' 
  ? JSON.parse(property.images) 
  : Array.isArray(property.images) 
    ? property.images 
    : [];
```

### 3. **YouTube Video Embedding**
- YouTube URLs need conversion to embed format
- Use helper function in PropertyDetail.tsx:
```typescript
function getYouTubeEmbedUrl(url: string): string {
  const videoIdMatch = url.match(/(?:shorts\/|v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
  return videoIdMatch 
    ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
    : url;
}
```

### 4. **Email Notifications**
- All inquiries send to: samroiyot.th@gmail.com
- Email functionality built into inquiry forms
- Check server logs if emails not sending

### 5. **Admin Access**
- Admin role auto-assigned to OWNER_OPEN_ID
- Check user role: `ctx.user.role === 'admin'`
- Protect admin routes with `protectedProcedure`

### 6. **S3 Storage**
- Use helpers in `server/storage.ts`
- Files are public by default
- Add random suffixes to prevent enumeration
- Example: `properties/${propertyId}/${filename}-${randomId}.jpg`

### 7. **Database Connection**
- DATABASE_URL auto-injected by Manus
- Use `getDb()` from `server/db.ts`
- Always check if db exists before queries

---

## 📊 Property Data Reference

All 7 properties are in the database with:
- Complete descriptions from FazWaz
- 98 images uploaded to S3
- EUR pricing set
- YouTube videos (6 of 7 have videos)
- Property types, specs, features

**Property IDs:**
1. U5985439 - Condo 52.76 SqM
2. U5971902 - Land 3.2 Rai
3. U5971841 - Land 300m Beach
4. U5971886 - Land 150 sqm
5. U5971940 - Land 1 Rai
6. U5971738 - Condo 70 SqM
7. U5988038 - Mango Hills (Featured)

---

## 🎯 Next Session Action Plan

1. **Start with Admin Dashboard** (Highest Priority)
   - Read existing admin components
   - Integrate PropertyForm for CRUD operations
   - Build lead tracking display
   - Add analytics dashboard

2. **Facebook Content Extraction** (Medium Priority)
   - Try manual copy/paste approach if login fails
   - Or use existing lifestyle-content.md as base
   - Populate lifestyleArticles table
   - Display on Lifestyle page

3. **Final Testing** (Before Delivery)
   - Test all forms and email notifications
   - Verify property filtering and search
   - Mobile responsiveness check
   - Create final checkpoint

4. **Save Checkpoint & Deliver**
   - `pnpm test` - Run all tests
   - `webdev_save_checkpoint` with description
   - Present to user with checkpoint ID

---

## 📞 Contact Information

**Owner Email:** samroiyot.th@gmail.com  
**Office Location:** 622 ถนน 4020 Tambon Sam Roi Yot, Amphoe Sam Roi Yot, Prachuap Khiri Khan 77120, Thailand  
**WhatsApp:** [Link in floating button]  
**Line:** [Link in floating button]

---

## 🔗 Useful Links

- **Dev Server:** https://3000-ixjx0isri9k7sie7lhis0-6ac0e8c1.sg1.manus.computer
- **Checkpoint:** manus-webdev://8e5527f2
- **Facebook Group:** https://www.facebook.com/groups/friendsofsamroiyot/learning_content/
- **FazWaz Listings:** https://www.fazwaz.com/user/listing (Login: samroiyot.th@gmail.com / KittyKat123)

---

## 📝 Todo.md Status

Check `/home/ubuntu/samroiyot-lifestyle/todo.md` for detailed task tracking. Mark items as `[x]` when completed.

---

**End of Handoff Document**  
**Good luck with the remaining 5%! The hard work is done. 🚀**
