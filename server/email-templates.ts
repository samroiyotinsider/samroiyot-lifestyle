/**
 * Email templates for the lead magnet funnel
 * Each email is designed to nurture leads through the funnel
 */

interface EmailTemplateContext {
  firstName?: string;
  leadId: number;
  unsubscribeToken: string;
  youtubeChannelUrl?: string;
  propertyUrl?: string;
  affiliateLinks?: {
    booking?: string;
    agoda?: string;
    wise?: string;
    viator?: string;
    klook?: string;
  };
}

/**
 * Email 1: Welcome + YouTube (sent immediately)
 * Goal: Drive to YouTube channel
 */
export function getEmail1Template(context: EmailTemplateContext): {
  subject: string;
  html: string;
  text: string;
} {
  const name = context.firstName ? `${context.firstName}!` : "there!";
  const youtubeUrl = context.youtubeChannelUrl || "https://www.youtube.com/@SamRoiYotinsider";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .content { padding: 20px 0; }
    .cta-button { background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
    .footer { border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666; }
    .video-section { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Sam Roi Yot Insider, ${name}</h1>
      <p>Your guide to Thailand's hidden coastal paradise</p>
    </div>

    <div class="content">
      <p>Hi ${context.firstName || "there"},</p>
      
      <p>Thank you for subscribing! Your free Sam Roi Yot Insider Guide is on its way to your inbox.</p>
      
      <p>While you're reading the guide, I'd love for you to check out our YouTube channel where I share video tours, insider tips, and everything you need to know about Sam Roi Yot.</p>

      <div class="video-section">
        <h3>Watch These Videos:</h3>
        <ul>
          <li><strong>Why I Left Phuket for Sam Roi Yot</strong> - My personal story and why this is the best place to live in Thailand</li>
          <li><strong>7 Beaches Ranked by a Local</strong> - Discover the hidden gems most tourists never find</li>
          <li><strong>Cost of Living Breakdown</strong> - Real numbers on what it actually costs to live here</li>
        </ul>
        
        <a href="${youtubeUrl}" class="cta-button">Subscribe to Our Channel</a>
      </div>

      <p>Over the next two weeks, I'll be sending you more insider tips, property opportunities, and resources to help you explore Sam Roi Yot.</p>

      <p>Questions? Just reply to this email!</p>

      <p>Cheers,<br>
      The Sam Roi Yot Insider Team</p>
    </div>

    <div class="footer">
      <p><a href="https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}">Unsubscribe</a></p>
      <p>© 2026 Sam Roi Yot Insider. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Welcome to Sam Roi Yot Insider, ${name}

Thank you for subscribing! Your free Sam Roi Yot Insider Guide is on its way to your inbox.

While you're reading the guide, check out our YouTube channel:
${youtubeUrl}

Watch these videos:
- Why I Left Phuket for Sam Roi Yot
- 7 Beaches Ranked by a Local
- Cost of Living Breakdown

Over the next two weeks, I'll be sending you more insider tips, property opportunities, and resources.

Questions? Just reply to this email!

Cheers,
The Sam Roi Yot Insider Team

Unsubscribe: https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}
  `;

  return {
    subject: "Your Free Sam Roi Yot Insider Guide + 3 Must-See Videos",
    html,
    text,
  };
}

/**
 * Email 2: Property Opportunity (sent day 3-4)
 * Goal: Soft property pitch to warm leads
 */
export function getEmail2Template(context: EmailTemplateContext): {
  subject: string;
  html: string;
  text: string;
} {
  const name = context.firstName || "there";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .content { padding: 20px 0; }
    .cta-button { background: #f5576c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
    .footer { border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666; }
    .property-section { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>The Mango Hills Opportunity</h1>
      <p>Limited Availability</p>
    </div>

    <div class="content">
      <p>Hi ${name},</p>
      
      <p>You've read about Sam Roi Yot. Now I want to introduce you to one of the most exciting investment opportunities in the area.</p>

      <div class="property-section">
        <h3>Mango Hills Resort Estate</h3>
        <p>A luxury residential development with stunning views, modern amenities, and strong rental potential.</p>
        
        <h4>Why This Matters:</h4>
        <ul>
          <li><strong>Appreciation:</strong> Property values in Sam Roi Yot are rising 8-12% annually</li>
          <li><strong>Rental Income:</strong> High-season occupancy rates of 70%+ with nightly rates of $80-150</li>
          <li><strong>Lifestyle:</strong> Live in paradise while your property works for you</li>
        </ul>

        <a href="${context.propertyUrl || 'https://samroiyotinsider.com/properties'}" class="cta-button">Watch Property Tour Video</a>
      </div>

      <p>This isn't a hard sell. Just wanted you to know about this opportunity while it's still available.</p>

      <p>Ready to explore? Let's schedule a private viewing.</p>

      <p>Best,<br>
      The Sam Roi Yot Insider Team</p>
    </div>

    <div class="footer">
      <p><a href="https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}">Unsubscribe</a></p>
      <p>© 2026 Sam Roi Yot Insider. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
The Mango Hills Opportunity - Limited Availability

Hi ${name},

You've read about Sam Roi Yot. Now I want to introduce you to one of the most exciting investment opportunities in the area.

Mango Hills Resort Estate
A luxury residential development with stunning views, modern amenities, and strong rental potential.

Why This Matters:
- Appreciation: Property values in Sam Roi Yot are rising 8-12% annually
- Rental Income: High-season occupancy rates of 70%+ with nightly rates of $80-150
- Lifestyle: Live in paradise while your property works for you

Watch the property tour: ${context.propertyUrl || 'https://samroiyotinsider.com/properties'}

This isn't a hard sell. Just wanted you to know about this opportunity while it's still available.

Ready to explore? Let's schedule a private viewing.

Best,
The Sam Roi Yot Insider Team

Unsubscribe: https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}
  `;

  return {
    subject: "The Mango Hills Opportunity (Limited Availability)",
    html,
    text,
  };
}

/**
 * Email 3: Affiliate Recommendations (sent day 7)
 * Goal: Passive affiliate revenue
 */
export function getEmail3Template(context: EmailTemplateContext): {
  subject: string;
  html: string;
  text: string;
} {
  const name = context.firstName || "there";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .content { padding: 20px 0; }
    .cta-button { background: #4facfe; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
    .footer { border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666; }
    .tools-section { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .tool-item { margin: 15px 0; padding-bottom: 15px; border-bottom: 1px solid #ddd; }
    .tool-item:last-child { border-bottom: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Tools We Actually Use</h1>
      <p>Gear, Services & Deals for Sam Roi Yot</p>
    </div>

    <div class="content">
      <p>Hi ${name},</p>
      
      <p>Here are the tools and services we actually use and recommend for living in or visiting Sam Roi Yot.</p>

      <div class="tools-section">
        <h3>Travel & Booking</h3>
        <div class="tool-item">
          <strong>Booking.com</strong> - Best rates for accommodations in Thailand
          ${context.affiliateLinks?.booking ? `<a href="${context.affiliateLinks.booking}" class="cta-button">Get Deals</a>` : ''}
        </div>
        <div class="tool-item">
          <strong>Agoda</strong> - Great for last-minute deals and local properties
          ${context.affiliateLinks?.agoda ? `<a href="${context.affiliateLinks.agoda}" class="cta-button">Get Deals</a>` : ''}
        </div>
        <div class="tool-item">
          <strong>Viator</strong> - Book tours and activities with confidence
          ${context.affiliateLinks?.viator ? `<a href="${context.affiliateLinks.viator}" class="cta-button">Get Deals</a>` : ''}
        </div>
        <div class="tool-item">
          <strong>Klook</strong> - Best prices on activities and day trips
          ${context.affiliateLinks?.klook ? `<a href="${context.affiliateLinks.klook}" class="cta-button">Get Deals</a>` : ''}
        </div>

        <h3 style="margin-top: 20px;">Money & Banking</h3>
        <div class="tool-item">
          <strong>Wise</strong> - Send money internationally with real exchange rates
          ${context.affiliateLinks?.wise ? `<a href="${context.affiliateLinks.wise}" class="cta-button">Get Deals</a>` : ''}
        </div>
      </div>

      <p>Using these links helps support our content and keeps us creating more insider guides and videos.</p>

      <p>Questions? Just reply to this email!</p>

      <p>Cheers,<br>
      The Sam Roi Yot Insider Team</p>
    </div>

    <div class="footer">
      <p><a href="https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}">Unsubscribe</a></p>
      <p>© 2026 Sam Roi Yot Insider. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Tools We Actually Use - Gear, Services & Deals for Sam Roi Yot

Hi ${name},

Here are the tools and services we actually use and recommend for living in or visiting Sam Roi Yot.

TRAVEL & BOOKING
- Booking.com: Best rates for accommodations in Thailand
- Agoda: Great for last-minute deals and local properties
- Viator: Book tours and activities with confidence
- Klook: Best prices on activities and day trips

MONEY & BANKING
- Wise: Send money internationally with real exchange rates

Using these links helps support our content and keeps us creating more insider guides and videos.

Questions? Just reply to this email!

Cheers,
The Sam Roi Yot Insider Team

Unsubscribe: https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}
  `;

  return {
    subject: "Gear, Services & Deals We Actually Use in Sam Roi Yot",
    html,
    text,
  };
}

/**
 * Email 4: Nurture + Re-engagement (sent day 14)
 * Goal: Re-engage cold leads, move warm leads to property inquiry
 */
export function getEmail4Template(context: EmailTemplateContext): {
  subject: string;
  html: string;
  text: string;
} {
  const name = context.firstName || "there";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .content { padding: 20px 0; }
    .cta-button { background: #fa709a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
    .footer { border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666; }
    .faq-section { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .faq-item { margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Still Thinking About Sam Roi Yot?</h1>
      <p>Here's What You Might Have Missed</p>
    </div>

    <div class="content">
      <p>Hi ${name},</p>
      
      <p>It's been two weeks since you joined the Sam Roi Yot Insider community. I wanted to check in and share what's new.</p>

      <div class="faq-section">
        <h3>What's New This Week:</h3>
        <ul>
          <li>New property listings in the area</li>
          <li>Updated visa guides for 2026</li>
          <li>Community events and activities</li>
        </ul>

        <h3 style="margin-top: 20px;">Top Questions We Get Asked:</h3>
        
        <div class="faq-item">
          <strong>Q: What visa should I get?</strong><br>
          A: It depends on your situation. Check our guide for all 2026 options.
        </div>

        <div class="faq-item">
          <strong>Q: How much does it cost to live here?</strong><br>
          A: Real answer: $800-1,500/month depending on lifestyle. Watch our cost breakdown video.
        </div>

        <div class="faq-item">
          <strong>Q: Is it a good investment?</strong><br>
          A: Yes, if you buy right. Properties appreciate 8-12% annually. Let's talk about your goals.
        </div>
      </div>

      <p>Ready to take the next step? Let's schedule a call to discuss your options.</p>

      <a href="https://samroiyotinsider.com/contact" class="cta-button">Schedule a Consultation</a>

      <p>Or just reply to this email with any questions!</p>

      <p>Best,<br>
      The Sam Roi Yot Insider Team</p>
    </div>

    <div class="footer">
      <p><a href="https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}">Unsubscribe</a></p>
      <p>© 2026 Sam Roi Yot Insider. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Still Thinking About Sam Roi Yot? Here's What You Might Have Missed

Hi ${name},

It's been two weeks since you joined the Sam Roi Yot Insider community. I wanted to check in and share what's new.

WHAT'S NEW THIS WEEK:
- New property listings in the area
- Updated visa guides for 2026
- Community events and activities

TOP QUESTIONS WE GET ASKED:

Q: What visa should I get?
A: It depends on your situation. Check our guide for all 2026 options.

Q: How much does it cost to live here?
A: Real answer: $800-1,500/month depending on lifestyle. Watch our cost breakdown video.

Q: Is it a good investment?
A: Yes, if you buy right. Properties appreciate 8-12% annually. Let's talk about your goals.

Ready to take the next step? Let's schedule a call to discuss your options.

Schedule a Consultation: https://samroiyotinsider.com/contact

Or just reply to this email with any questions!

Best,
The Sam Roi Yot Insider Team

Unsubscribe: https://samroiyotinsider.com/unsubscribe?token=${context.unsubscribeToken}
  `;

  return {
    subject: "Still Thinking About Sam Roi Yot? Here's What You Might Have Missed",
    html,
    text,
  };
}
