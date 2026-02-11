# Sam Roi Yot Lifestyle - Project TODO

## Core Features
- [x] Multilingual support (English primary, Thai secondary) with language switcher
- [x] Database schema for properties, inquiries, and leads
- [x] Property listings with search and filter functionality
- [x] Individual property detail pages with galleries and maps
- [x] Admin dashboard with authentication for property management
- [x] Image upload and cloud storage integration (S3 ready)
- [x] Three pre-populated sample properties

## Content Pages
- [x] Home page with hero slider and featured properties
- [x] Lifestyle section with authentic Sam Roi Yot imagery and detailed content
- [x] Concierge services section with consultation form
- [x] About page with company story
- [x] Contact page with form and embedded map

## Lead Capture & Notifications
- [x] Property inquiry forms on detail pages
- [x] Contact forms throughout site
- [x] Email notifications to owner on form submissions (via Manus notification system)
- [x] WhatsApp and Line chat buttons
- [x] Lead tracking in database

## Integrations
- [x] Google Maps integration for property locations (using Manus proxy)
- [x] Google Analytics 4 tracking (built-in via Manus platform)
- [x] AI chatbot with intelligent routing (generic questions → AI, specific → WhatsApp)
- [x] SEO meta tags and schema markup
- [ ] XML sitemap and robots.txt (optional enhancement)

## Admin Features
- [x] Secure admin authentication
- [x] PropertyForm component created with all fields and image URL management
- [ ] Integrate PropertyForm into AdminDashboard (Add/Edit/Delete functionality)
- [ ] Property edit/delete actions in admin table
- [x] View submitted inquiries and leads

## Testing & Deployment
- [x] Test all forms and lead capture
- [x] Test multilingual switching
- [x] Test property search and filters
- [x] Test admin dashboard functionality
- [x] Mobile responsiveness verification
- [x] SEO optimization verification

## Bug Fixes
- [x] Fix nested anchor tag error in Header navigation
- [x] Find and fix all remaining nested anchor tags in other components
- [x] Fix nested anchor tags in Footer component

## Lifestyle Page Enhancement
- [x] Research authentic Sam Roi Yot images (beaches, national park, caves, local life)
- [x] Write detailed, compelling blog-style content about living in Sam Roi Yot
- [x] Replace generic placeholder images with real Sam Roi Yot photography
- [x] Enhance content sections with rich, detailed descriptions

## Critical Features Implementation (Phase 2)
- [x] Fix Renovated House property specifications (3 beds/3 baths, 270 sqm, Red Garuda Chanote, 1 Rai 2 Ngan 41 sq.wah land, etc.)
- [x] Implement AI chatbot with intelligent routing (generic Sam Roi Yot questions → AI answers, specific inquiries → WhatsApp redirect)
- [x] Integrate real Google Maps on property detail pages using Manus proxy
- [x] Integrate real Google Maps on contact page using Manus proxy (using same PropertyMap component)
- [x] Create PropertyForm component with all fields and image URL management
- [ ] Integrate PropertyForm into AdminDashboard for Add/Edit/Delete operations
- [ ] Add S3 image upload functionality with preview for property management (URL-based for now)
- [ ] Prepare FazWaz scraping system for automatic property import (ready for URLs in 24 hours)

## Next Steps (To Complete)
- [ ] Integrate PropertyForm into AdminDashboard
- [ ] Add property edit/delete functionality in admin table
- [ ] Create FazWaz scraping utility script
- [ ] Test chatbot with real user queries
- [ ] Test Google Maps on property detail pages
- [ ] Update property coordinates for accurate map display
- [ ] Write vitest tests for chatbot router
- [ ] Write vitest tests for property CRUD operations

## Chatbot Routing Fix
- [x] Update chatbot logic to properly distinguish free info (AI answers) vs revenue opportunities (WhatsApp)
- [x] AI should answer: distances, weather, area info, visa basics, any Google-answerable question
- [x] WhatsApp should handle: property inquiries, services (bike rentals, transportation), land, quotes, bookings

## Chatbot LLM Integration Fix
- [x] Debug why chatbot is not generating AI responses (falling back to generic messages)
- [x] Verify LLM integration is working correctly - frontend now calls tRPC backend with real LLM
- [ ] Test chatbot with multiple informational questions (ready for user testing)

## 2026 Conversion Optimization & Polish
### Hero Section
- [x] Replace hero with cinematic Sam Roi Yot imagery (Dolphin Bay, mountains, sunset, luxury villa)
- [x] Add bold overlay text: "Sam Roi Yot – Thailand's Last True Coastal Secret"
- [x] Add subtitle: "Where Nature Meets Luxury Living & Smart Investment"
- [x] Add three trust pillars: "Curated Exclusive Properties" | "Seamless Relocation & Visa Support" | "Experience the Lifestyle First"

### Lead Capture & Conversion
- [x] Add floating WhatsApp button (bottom right) with pre-filled message
- [x] Add floating Line chat button (bottom right)
- [x] Implement email capture popup after 15 seconds: "Get your Free Sam Roi Yot Insider Guide"
- [x] Add strong CTA on all listing pages: "Interested? Chat now or book private viewing"
- [ ] Add Calendly embed link placeholder for booking viewings

### Multi-Service Storytelling
- [x] Enhance Concierge page with bullet benefits (Elite Visa, airport pickup, car rental, bank setup, health insurance)
- [ ] Add 4-6 blog-style cards to Lifestyle page with guides ("Why Sam Roi Yot Beats Phuket", "Day in the Life: Dolphin Bay", "Mango Harvest Season")
- [ ] Create About page: "We are your trusted Sam Roi Yot authority"

### Property Enhancements
- [x] Add video walkthrough support for properties (YouTube/Vimeo embed or direct video upload)
- [ ] Add "Exclusive" badge to Mango Hills listing
- [ ] Feature Mango Hills in hero carousel or featured section

### Polish & 2026 Standards
- [x] Ensure mobile-first responsive design
- [ ] Compress and optimize all images for fast loading
- [x] Verify language switcher (English primary, Thai secondary)
- [ ] Add social icons to footer
- [ ] Add Google Business link placeholder to footer
- [ ] Add legal disclaimer to footer
- [ ] Implement schema markup for all property listings (price, location, availability)
- [ ] Test all features on mobile devices

## Critical Fixes (User Request - Jan 24, 2026)
- [x] Update WhatsApp number to +66 092-2746524 in FloatingChatButtons component
- [x] Extract 5 remaining FazWaz properties (2 condos + 4 land listings)
- [x] Prepare video walkthrough field for admin to input YouTube links
- [x] Add 7 FazWaz properties with images, EUR prices, and YouTube videos
- [x] Upload 98 property images to S3
- [x] Fix property detail pages to display EUR prices and embedded YouTube videos
- [x] Replace low-resolution hero images with high-quality versions
- [x] Mix featured listings on homepage: 1 exclusive + 1 condo + 1 land (featured flags set in database)
- [x] Fix airport distance: 3hr 40min (264km) not 30 minutes
- [x] Fix Hua Hin distance: 45km not 60km on contact page
- [x] Update map location to: 622 ถนน 4020 Tambon Sam Roi Yot, Sam Roi Yot District, Prachuap Khiri Khan 77120

## Final Session - Complete & Publish (Jan 29, 2026)
- [x] Build comprehensive admin dashboard with property management
- [x] Add property Add/Edit/Delete functionality with S3 image upload
- [x] Display all inquiries in admin dashboard with status management
- [x] Integrate lifestyle-content.md into Lifestyle page (already complete with comprehensive content)
- [x] Fix inquiries table creation and test inquiry form submission
- [x] Verify inquiry endpoint works with vitest tests
- [x] Final testing: all pages and forms
- [x] Test mobile responsiveness on all pages
- [x] Verify all 7 properties display correctly
- [x] Test admin dashboard CRUD operations
- [x] Check Google Maps integration
- [x] Test WhatsApp/Line floating buttons
- [x] Create final production checkpoint
- [x] Guide user to publish via Management UI


## Facebook Integration & Content Hub (Current Session)
- [x] Create comprehensive Guides & Resources page with sections from Facebook
- [x] Build News & Updates section with links to Facebook posts
- [x] Create Local Services Directory (builders, restaurants, activities)
- [x] Build Events Calendar page
- [x] Integrate lifestyle photos from Facebook community
- [x] Test all new pages and features
- [x] Create final checkpoint with all Facebook integration complete


## Navigation & Homepage Fixes (Current Session)
- [x] Move Properties to position 2 in navigation (right after Home)
- [x] Add Cheap Condo as featured property on homepage with EUR price
- [x] Add 3.2 Rai Land as featured property on homepage with EUR price
- [x] Fix Mango Hills price display (show EUR price on card)
- [x] Restructure Services page (remove activities/tours, keep practical services only)
- [x] Create Internal Partner List page (printable, protected, for staff reference)
- [x] Update Concierge page to include Activities & Tours as offered services
- [x] Test all changes and create final checkpoint


## BRAND OVERHAUL: Sam Roi Yot Insider (Video-First Strategy)

### Phase 1: S3 & Preparation
- [x] Upload large image file to S3 (cave-pavilion.jpg)
- [x] Update todo.md with all overhaul tasks

### Phase 2: Branding & Navigation
- [x] Update site title: "Sam Roi Yot Lifestyle" → "Sam Roi Yot Insider"
- [x] Update tagline: "Your Expert Guide to Thailand's Hidden Coastal Paradise"
- [x] Update email: samroiyotinsider.com
- [x] Simplify navigation: Home | Properties | Area Guide | Buying Guide | Concierge | About | Contact
- [x] Remove pages: Lifestyle, Guides, News, Services, Events
- [x] Update Header component with new branding
- [x] Update Footer component with new branding

### Phase 3: Homepage Video-First Transformation
- [x] Replace hero carousel with YouTube video embed (autoplay, muted, loop)
- [x] Add hero overlay with title + tagline + 2 CTAs
- [x] Convert "Why Sam Roi Yot" section to 4-video grid (2x2 responsive)
- [x] Keep featured properties section, add video embeds to property cards
- [x] Add CSS for responsive video containers (.video-container, .video-container-large)
- [x] Test lazy loading for all videos

### Phase 4: Create /buying-guide Page
- [x] Create new page component: BuyingGuide.tsx
- [x] Add hero section with title + large video embed
- [x] Add email capture form (placeholder for ConvertKit)
- [x] Create 4 expandable FAQ sections with video embeds
- [x] Add bottom CTA buttons (Explore Properties, Book Consultation)
- [x] Add to routing in App.tsx

### Phase 5: Create /area-guide Page
- [x] Create new page component: AreaGuide.tsx
- [x] Add hero section with title + large video embed
- [x] Create 6-topic grid with video embeds (2 columns desktop, stack mobile)
- [x] Topics: Beaches, Cost of Living, Activities, National Park, Dining, Healthcare
- [x] Add bottom CTA (Explore Concierge Services)
- [x] Add to routing in App.tsx

### Phase 6: Update Property Detail Pages
- [x] Convert property hero to large YouTube video embed (property tour)
- [x] Simplify property info: name, price, 5 key specs only
- [x] Add 2 CTA buttons (Book Viewing, Watch Buying Guide)
- [x] Add secondary video section at bottom (Money video - same for all properties)
- [x] Update PropertyDetail.tsx component

### Phase 7: SEO Optimization
- [x] Add meta tags to all pages (title, description, keywords, OG tags)
- [x] Add schema markup (LocalBusiness, Product, VideoObject)
- [x] Add image alt text to all images
- [x] Verify header hierarchy (H1, H2, H3)
- [x] Add internal linking strategy
- [x] Create /sitemap.xml
- [x] Create /robots.txt
- [x] Test performance (<3 second load time)

### Phase 8: Finalization
- [x] Test all pages and video embeds (with placeholder IDs)
- [x] Test mobile responsiveness
- [x] Test navigation and routing
- [x] Create final checkpoint
- [x] Prepare for video integration (user will provide YouTube IDs)

### Phase 9: Video Integration (User Provides IDs)
- [ ] Homepage hero video ID
- [ ] 4 "Why Sam Roi Yot?" video IDs
- [ ] 4 FAQ video IDs for /buying-guide
- [ ] 6 topic video IDs for /area-guide
- [ ] Individual property tour video IDs

### Phase 9: Facebook Extraction & Content Strategy (Completed)
- [x] Extract all detailed information from Friends of Sam Roi Yot Facebook
- [x] Create Master Partner/Services List (internal staff reference)
- [x] Write detailed video scripts for all 18 videos
- [x] Update Concierge page with direct phone booking model (+66 092-2746524)
- [x] Add incentive messaging (complementary gift from web developer)
- [x] Test Concierge page with new direct booking model
- [x] Create final checkpoint with all deliverables

### Phase 10: Video Integration (User Provides IDs)
- [ ] Homepage hero video ID
- [ ] 4 "Why Sam Roi Yot?" video IDs
- [ ] 4 FAQ video IDs for /buying-guide
- [ ] 6 topic video IDs for /area-guide
- [ ] Individual property tour video IDs

### Phase 11: Concierge Customization (One-on-One)
- [ ] Review Concierge page with user
- [ ] Customize based on user feedback
- [ ] Final testing and polish
