# Quick Start Guide for New Manus Session

## 🚀 Immediate Setup (5 minutes)

### Step 1: Restore the Checkpoint
```
Use webdev_rollback_checkpoint tool with version_id: 8e5527f2
```

This will restore the project to `/home/ubuntu/samroiyot-lifestyle/` with:
- All 7 properties with images and videos
- Complete database schema
- Working dev server

### Step 2: Verify Project Status
```bash
cd /home/ubuntu/samroiyot-lifestyle/
ls -la  # Check files exist
pnpm install  # If needed
```

### Step 3: Check Dev Server
The dev server should auto-start. Visit:
https://3000-ixjx0isri9k7sie7lhis0-6ac0e8c1.sg1.manus.computer

Test these pages:
- `/` - Home page
- `/properties` - Should show 7 properties with EUR prices
- `/properties/1` - Property detail with images and video
- `/lifestyle` - Lifestyle content
- `/contact` - Contact form

### Step 4: Read Handoff Documents
1. **HANDOFF_TO_NEW_SESSION.md** - Complete project overview
2. **todo.md** - Task tracking (in project root)
3. This guide

---

## 🎯 Your Mission: Complete the Final 5%

### Task 1: Admin Dashboard (Priority 1)
**Estimated Time:** 2-3 hours  
**Goal:** Build admin panel for property management and lead tracking

**What to do:**
1. Create `/client/src/pages/Admin.tsx` (or enhance existing)
2. Add these sections:
   - Property Management (Add/Edit/Delete with S3 upload)
   - Lead Tracking (display inquiries table)
   - Analytics Dashboard (page views, clicks)
3. Protect route with admin role check
4. Use tRPC procedures in `server/routers.ts`

**Key Files:**
- Frontend: `/client/src/pages/Admin.tsx`
- Backend: `/server/routers.ts` (add admin procedures)
- Database: `/server/db.ts` (add query helpers)

**Reference:**
- Check if PropertyForm component exists in `/client/src/components/`
- Use `ctx.user.role === 'admin'` for authorization
- Owner email: samroiyot.th@gmail.com

### Task 2: Facebook Content Extraction (Priority 2)
**Estimated Time:** 1-2 hours  
**Goal:** Extract community guides from Facebook group

**Option A - Automated (if login works):**
1. Navigate to: https://www.facebook.com/groups/friendsofsamroiyot/learning_content/
2. Login: r.sidd.chicane@gmail.com / BigBoi1983 (Google OAuth)
3. Extract all guides and links
4. Populate `lifestyleArticles` table
5. Display on Lifestyle page

**Option B - Manual (if login fails):**
1. Ask user to copy/paste Facebook content
2. Format and insert into database
3. Update Lifestyle page to display

**Option C - Use Existing Content:**
- `/home/ubuntu/upload/lifestyle-content.md` has excellent content
- Add "Community Resources" section with placeholder
- User can add Facebook links later via admin dashboard

### Task 3: Final Testing & Delivery (Priority 3)
**Estimated Time:** 1 hour  
**Checklist:**
- [ ] Test all inquiry forms (property, concierge, contact)
- [ ] Verify emails arrive at samroiyot.th@gmail.com
- [ ] Test property filters and search
- [ ] Check mobile responsiveness
- [ ] Verify all 7 properties display correctly
- [ ] Test YouTube video embeds
- [ ] Run `pnpm test` (all tests pass)
- [ ] Save final checkpoint with `webdev_save_checkpoint`
- [ ] Present to user with checkpoint ID

---

## 🔍 Common Issues & Solutions

### Issue: Properties not showing
**Solution:** Check database connection
```bash
cd /home/ubuntu/samroiyot-lifestyle/
pnpm tsx -e "import { getDb } from './server/db.ts'; const db = await getDb(); const props = await db.select().from(properties); console.log(props);"
```

### Issue: Images not loading
**Solution:** Images are on S3 CloudFront CDN. Check URLs in database:
```sql
SELECT id, title, images FROM properties LIMIT 1;
```
URLs should start with `https://d2...cloudfront.net/`

### Issue: YouTube videos not embedding
**Solution:** Check PropertyDetail.tsx has `getYouTubeEmbedUrl()` function

### Issue: EUR prices showing as null
**Solution:** Check `priceEur` column exists:
```bash
pnpm db:push  # Run migrations
```

### Issue: Admin access denied
**Solution:** Check user role in database:
```sql
SELECT id, email, role FROM users WHERE openId = 'OWNER_OPEN_ID';
```
Role should be 'admin' for owner.

---

## 📊 Database Quick Reference

### Check Properties
```sql
SELECT id, title, priceEur, type, featured FROM properties;
```

### Check Inquiries
```sql
SELECT id, name, email, message, propertyId, createdAt FROM inquiries ORDER BY createdAt DESC;
```

### Check Users
```sql
SELECT id, email, role FROM users;
```

### Add Test Inquiry
```sql
INSERT INTO inquiries (name, email, phone, message, type) 
VALUES ('Test User', 'test@example.com', '123456789', 'Test inquiry', 'general');
```

---

## 🎨 Design Guidelines

**Color Scheme:**
- Primary: Blue/Teal (coastal theme)
- Accent: Warm orange/gold (sunset theme)
- Background: Light gray/white
- Text: Dark gray/black

**Typography:**
- Headings: Bold, modern sans-serif
- Body: Readable sans-serif (16px minimum)
- Prices: Large, prominent display

**Layout:**
- Mobile-first responsive design
- Card-based property listings
- Full-width hero images
- Sticky navigation
- Floating contact buttons (WhatsApp/Line)

---

## 📞 Need Help?

**If stuck:**
1. Read HANDOFF_TO_NEW_SESSION.md thoroughly
2. Check todo.md for context
3. Review existing code in similar components
4. Test in browser frequently
5. Use `webdev_check_status` to verify server health

**Before asking user:**
- Try at least 2 different approaches
- Check logs: `.manus-logs/devserver.log`, `browserConsole.log`
- Verify database state with SQL queries
- Test in browser to confirm actual behavior

---

## ✅ Success Criteria

**You're done when:**
1. ✅ Admin dashboard shows properties and inquiries
2. ✅ Facebook content integrated (or placeholder added)
3. ✅ All forms tested and working
4. ✅ Mobile responsive on all pages
5. ✅ All tests passing (`pnpm test`)
6. ✅ Final checkpoint saved
7. ✅ User approves and is happy

---

**Estimated Total Time: 4-6 hours**  
**Current Completion: 95%**  
**You've got this! 🚀**
