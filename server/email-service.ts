// Email service for sending transactional emails using Manus notification system
import { notifyOwner } from "./_core/notification";

export interface EmailContent {
  to: string;
  subject: string;
  htmlContent: string;
  pdfUrl?: string;
}

/**
 * Send email using Manus notification system as backend
 * All emails are delivered to the project owner
 */
export async function sendEmail(email: EmailContent): Promise<boolean> {
  try {
    console.log(`[Email Service] Sending email to ${email.to}`);
    console.log(`[Email Service] Subject: ${email.subject}`);

    // Convert HTML to plain text for notification
    const plainText = email.htmlContent
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .trim();

    // Send via notification system
    const success = await notifyOwner({
      title: email.subject,
      content: plainText,
    });

    if (success) {
      console.log(`[Email Service] Email notification sent for: ${email.subject}`);
    } else {
      console.error(`[Email Service] Failed to send email notification for: ${email.subject}`);
    }

    return success;
  } catch (error) {
    console.error("[Email Service] Error sending email:", error);
    return false;
  }
}

/**
 * Schedule email to be sent at a specific time
 */
export async function scheduleEmail(
  email: EmailContent,
  delayDays: number
): Promise<boolean> {
  try {
    const sendAt = new Date();
    sendAt.setDate(sendAt.getDate() + delayDays);

    console.log(
      `[Email Service] Scheduling email to ${email.to} for ${sendAt.toISOString()}`
    );

    // TODO: Store in database and implement scheduled job runner
    return true;
  } catch (error) {
    console.error("[Email Service] Error scheduling email:", error);
    return false;
  }
}

/**
 * Send welcome email with PDF and YouTube links
 */
export async function sendWelcomeEmail(
  email: string,
  firstName: string,
  pdfUrl: string,
  youtubeLinks: string[]
): Promise<boolean> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Sam Roi Yot Insider!</h2>
      
      <p>Hi ${firstName},</p>
      
      <p>Thank you for downloading your free Sam Roi Yot Insider Guide! We're excited to help you discover Thailand's best-kept secret.</p>
      
      <h3>Your Free Guide</h3>
      <p>Your comprehensive guide is attached and ready to download. It includes:</p>
      <ul>
        <li>Best beaches and hidden spots</li>
        <li>Visa tips and relocation advice</li>
        <li>Cost of living breakdown</li>
        <li>Insider secrets from the community</li>
      </ul>
      
      <h3>Watch These Videos</h3>
      <p>Get a visual tour of Sam Roi Yot:</p>
      <ul>
        ${youtubeLinks.map((link) => `<li><a href="${link}">${link}</a></li>`).join("")}
      </ul>
      
      <h3>Next Steps</h3>
      <p>Over the next two weeks, we'll send you:</p>
      <ul>
        <li>Day 3: Insider property investment tips</li>
        <li>Day 7: Recommended local services & affiliate partners</li>
        <li>Day 14: Ready to explore? Let's schedule a call</li>
      </ul>
      
      <p>Questions? Reply to this email anytime.</p>
      
      <p>Best regards,<br/>
      Sam Roi Yot Insider Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Your Free Sam Roi Yot Insider Guide",
    htmlContent,
    pdfUrl,
  });
}

/**
 * Send property pitch email
 */
export async function sendPropertyPitchEmail(
  email: string,
  firstName: string,
  youtubeUrl: string
): Promise<boolean> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Exclusive Property Opportunity</h2>
      
      <p>Hi ${firstName},</p>
      
      <p>We wanted to share an exclusive opportunity with our insider community.</p>
      
      <h3>Mango Hills Resort Estate</h3>
      <p>Watch this video tour to see what makes this property special:</p>
      <p><a href="${youtubeUrl}">Watch the full tour</a></p>
      
      <p>This is a rare opportunity in Sam Roi Yot. Limited units available.</p>
      
      <p>Interested? Schedule a private viewing</p>
      
      <p>Best regards,<br/>
      Sam Roi Yot Insider Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Exclusive: Mango Hills Resort Estate",
    htmlContent,
  });
}

/**
 * Send affiliate recommendations email
 */
export async function sendAffiliateEmail(
  email: string,
  firstName: string,
  affiliateLinks: { name: string; url: string }[]
): Promise<boolean> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Recommended Services & Partners</h2>
      
      <p>Hi ${firstName},</p>
      
      <p>As part of our insider community, we've curated the best services and partners for living in Sam Roi Yot.</p>
      
      <h3>Recommended Partners</h3>
      <ul>
        ${affiliateLinks
          .map(
            (link) =>
              `<li><a href="${link.url}">${link.name}</a></li>`
          )
          .join("")}
      </ul>
      
      <p>These are services we personally use and recommend.</p>
      
      <p>Best regards,<br/>
      Sam Roi Yot Insider Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Insider Recommendations: Services & Partners",
    htmlContent,
  });
}

/**
 * Send re-engagement email
 */
export async function sendReengagementEmail(
  email: string,
  firstName: string
): Promise<boolean> {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Ready to Explore Sam Roi Yot?</h2>
      
      <p>Hi ${firstName},</p>
      
      <p>We hope you've enjoyed the insider guide and videos. Now it's time to experience Sam Roi Yot in person.</p>
      
      <h3>What We Offer</h3>
      <ul>
        <li>Private property viewings</li>
        <li>Area tours with local guides</li>
        <li>Visa & relocation assistance</li>
        <li>Community introductions</li>
      </ul>
      
      <p>Schedule a free consultation</p>
      
      <p>Let's find your perfect home in Sam Roi Yot.</p>
      
      <p>Best regards,<br/>
      Sam Roi Yot Insider Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Let's Find Your Perfect Home in Sam Roi Yot",
    htmlContent,
  });
}

/**
 * Send inquiry notification email to owner
 */
export async function sendInquiryNotificationEmail(
  inquiryType: string,
  name: string,
  visitorEmail: string,
  phone: string | undefined,
  message: string,
  propertyTitle: string | undefined
): Promise<boolean> {
  const details = [
    `From: ${name}`,
    `Email: ${visitorEmail}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    ...(propertyTitle ? [`Property: ${propertyTitle}`] : []),
    `\nMessage:\n${message}`,
  ].join("\n");

  const success = await notifyOwner({
    title: `New ${inquiryType} Inquiry from ${name}`,
    content: details,
  });

  console.log(
    `[Email Service] Inquiry notification ${success ? "sent" : "failed"} for ${name}`
  );

  return success;
}
