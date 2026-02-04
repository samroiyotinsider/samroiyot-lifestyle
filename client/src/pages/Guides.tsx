import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, MapPin, DollarSign, Users, Utensils, Calendar, CheckCircle2, BookOpen, Home } from "lucide-react";

export default function Guides() {
  const { t, language } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>("practical");

  const sections = {
    en: [
      {
        id: "practical",
        icon: DollarSign,
        title: "Practical Living Guide",
        subtitle: "Essential information for residents and visitors",
        content: [
          {
            heading: "Cost of Living",
            items: [
              "Accommodation: 5,000-30,000 THB/month",
              "Food: Local markets 30-50% cheaper than supermarkets",
              "Utilities: 2,000-4,000 THB/month",
              "Transportation: Scooter 100-150 THB/day",
              "Overall: $1,000-1,500 USD/month comfortable living"
            ]
          },
          {
            heading: "Daily Fresh Markets",
            items: [
              "Main market near town center",
              "Best times: Early morning (6-9 AM)",
              "Fresh seafood, tropical fruits, local herbs",
              "Beachfront and neighborhood markets available"
            ]
          },
          {
            heading: "Healthcare & Medical",
            items: [
              "Public hospital for basic services",
              "Private clinics with English-speaking staff",
              "International hospital in Hua Hin (45 min)",
              "Health insurance recommended",
              "Most medications available without prescription"
            ]
          },
          {
            heading: "Banking & Financial Services",
            items: [
              "Thai banks: Bangkok Bank, Krung Thai, Kasikornbank",
              "Account opening: Passport, visa, proof of residence",
              "ATMs widely available",
              "Easy international money transfers",
              "Tax ID required for property and business"
            ]
          },
          {
            heading: "Internet & Connectivity",
            items: [
              "Mobile: AIS, Dtac, True Move reliable coverage",
              "Fixed broadband: Fiber optic in newer areas",
              "Speed: 10-50 Mbps suitable for remote work",
              "Cost: 500-1,500 THB/month"
            ]
          },
          {
            heading: "Transportation",
            items: [
              "Scooter: Most practical; 100-150 THB/day rental",
              "Car rental: 800-1,500 THB/day from Hua Hin",
              "Buses: To Pranburi (15 min) and Hua Hin (30-40 min)",
              "Train: Limited service to Bangkok and south",
              "Taxi: Available; negotiate price beforehand"
            ]
          }
        ]
      },
      {
        id: "activities",
        icon: MapPin,
        title: "Activities & Attractions",
        subtitle: "Things to do in Sam Roi Yot",
        content: [
          {
            heading: "Khao Sam Roi Yot National Park",
            items: [
              "Phraya Nakhon Cave: Visit 10-11 AM for perfect sunlight",
              "Hiking trails: Multiple difficulty levels through tropical forest",
              "Kayaking: Mangrove channels with wildlife viewing",
              "Multiple beaches within the park",
              "Entrance: 200 THB for foreigners",
              "Best time: November-April (dry season)"
            ]
          },
          {
            heading: "Beach Activities",
            items: [
              "Kite surfing: Hidden gem with consistent winds",
              "Swimming: Warm water year-round, gentle waves",
              "Fishing: Traditional fishing villages",
              "Sunset viewing: Multiple scenic spots",
              "Beach walks: Kilometers of relatively empty beaches"
            ]
          },
          {
            heading: "Local Tours & Experiences",
            items: [
              "Biking tours: Off-the-beaten-track exploration",
              "Boat tours: Long-tail boat island exploration",
              "Temple visits: Wat Huai Prab Wararam and others",
              "Market tours: Guided local food experiences",
              "Cooking classes: Learn Thai cuisine"
            ]
          },
          {
            heading: "Nearby Attractions",
            items: [
              "Hua Hin: 45 min north; night markets, golf, urban amenities",
              "Pranburi River: Mangrove kayaking and bird watching",
              "Chumphon Islands: Pristine beaches and diving",
              "Koh Tao: Diving paradise; day trip or overnight"
            ]
          }
        ]
      },
      {
        id: "visa",
        icon: BookOpen,
        title: "Visa & Immigration",
        subtitle: "Guide to relocating to Thailand",
        content: [
          {
            heading: "Visa Types",
            items: [
              "Tourist Visa: 60 days; renewable in-country",
              "Retirement Visa: Age 50+; 800,000 THB deposit or 65,000 THB/month income",
              "Thailand Elite: Premium visa program",
              "Digital Nomad Visa (DTV): For remote workers",
              "Business Visa: For entrepreneurs"
            ]
          },
          {
            heading: "Retirement Visa Process",
            items: [
              "1. Open Thai bank account with 800,000 THB",
              "2. Apply at immigration with required documents",
              "3. One-year visa granted; renewable annually",
              "4. Maintain financial requirements"
            ]
          },
          {
            heading: "Required Documents",
            items: [
              "Valid passport (6+ months validity)",
              "Completed TM.86 form",
              "Passport-sized photos",
              "Proof of financial means",
              "Medical certificate (for some visas)",
              "Proof of residence"
            ]
          },
          {
            heading: "Immigration Office",
            items: [
              "Location: Prachuap Khiri Khan (30 min from Sam Roi Yot)",
              "Hours: 8:30 AM - 4:30 PM, Monday-Friday",
              "Services: Visa extensions, renewals, permits"
            ]
          }
        ]
      },
      {
        id: "property",
        icon: Home,
        title: "Property & Real Estate",
        subtitle: "Buying and renting in Sam Roi Yot",
        content: [
          {
            heading: "Property Types",
            items: [
              "Condominiums: Modern units; 1-3 bedrooms",
              "Villas: Standalone homes; various sizes",
              "Land: Chanote (titled) and non-titled available",
              "Townhouses: Intermediate option"
            ]
          },
          {
            heading: "Foreign Ownership",
            items: [
              "Condominiums: Up to 49% of total units",
              "Land: Cannot own directly; 30-year lease renewable",
              "Villas: Ownership through Thai company structure",
              "Legal consultation highly recommended"
            ]
          },
          {
            heading: "Rental Market",
            items: [
              "Prices: 5,000-30,000 THB/month",
              "Lease terms: Monthly to annual options",
              "Furnished: 20-30% more than unfurnished",
              "Deposits: Usually 1-2 months' rent"
            ]
          },
          {
            heading: "Investment Potential",
            items: [
              "Market trends: Growing foreign investor interest",
              "Rental income: 1,500-3,000 THB/night (tourist); 5,000-15,000 THB/month (long-term)",
              "Appreciation: Steady growth expected",
              "Management: Services available for absentee owners"
            ]
          }
        ]
      },
      {
        id: "community",
        icon: Users,
        title: "Community & Social",
        subtitle: "Understanding the expat and local community",
        content: [
          {
            heading: "Expat Community",
            items: [
              "Demographics: Retirees, remote workers, families, entrepreneurs",
              "Size: 500-1,000+ growing community",
              "Integration: Naturally integrated with local Thai community",
              "Social activities: Beach walks, hiking, restaurant gatherings",
              "Support network: Established and welcoming"
            ]
          },
          {
            heading: "Local Community",
            items: [
              "Population: 5,000-7,000 residents",
              "Livelihoods: Fishing, agriculture, tourism",
              "Culture: Traditional Thai; not commercialized",
              "Festivals: Songkran, Loy Krathong, local celebrations",
              "Temples: Active Buddhist temples welcoming visitors"
            ]
          },
          {
            heading: "Making Connections",
            items: [
              "Facebook Group: 'Friends of Sam Roi Yot' with 3,300+ members",
              "Local restaurants: Regular gathering spots",
              "Community events: Regular meetups and activities",
              "Language: Thai spoken locally; English increasingly common",
              "Respect & integration: Learning Thai phrases appreciated"
            ]
          },
          {
            heading: "Safety & Security",
            items: [
              "Crime rate: Low; generally safe community",
              "Police: Local station available",
              "Emergency services: Hospital and medical available",
              "Natural hazards: Occasional flooding; snakes rarely problematic"
            ]
          }
        ]
      },
      {
        id: "food",
        icon: Utensils,
        title: "Food & Dining",
        subtitle: "Culinary experiences in Sam Roi Yot",
        content: [
          {
            heading: "Local Cuisine",
            items: [
              "Seafood: Fresh daily catch; grilled fish, shrimp curry specialties",
              "Regional dishes: Som tam, larb, curry dishes",
              "Street food: Night markets with affordable local dishes",
              "Restaurants: Thai, international, and fusion options"
            ]
          },
          {
            heading: "Markets & Shopping",
            items: [
              "Daily markets: Fresh produce, seafood at best prices",
              "Supermarkets: 7-Eleven and local shops",
              "Specialty shops: Health food, organic produce",
              "Cooking ingredients: All necessary items available"
            ]
          },
          {
            heading: "Dining Options",
            items: [
              "Local restaurants: Authentic Thai; 50-150 THB/meal",
              "Beachfront: Scenic dining with fresh seafood",
              "International: Growing selection in town",
              "Cooking classes: Learn Thai cuisine from locals"
            ]
          }
        ]
      },
      {
        id: "seasonal",
        icon: Calendar,
        title: "Seasonal Guide",
        subtitle: "Best times to visit and live",
        content: [
          {
            heading: "Dry Season (November-April)",
            items: [
              "Weather: Sunny, warm, minimal rain",
              "Best for: Beach activities, hiking, outdoor exploration",
              "Crowds: Peak tourist season",
              "Accommodation: Higher prices during peak"
            ]
          },
          {
            heading: "Green Season (May-October)",
            items: [
              "Weather: Warm with afternoon rains; lush landscape",
              "Best for: Fewer tourists, lower prices, green scenery",
              "Activities: Some outdoor activities affected by rain",
              "Accommodation: Lower prices; better deals"
            ]
          },
          {
            heading: "Monsoon Considerations",
            items: [
              "Timing: Generally lighter than Andaman coast",
              "Rainfall: Afternoon showers; mornings usually clear",
              "Impact: Minimal disruption to daily life",
              "Advantages: Fewer tourists, lower prices, beautiful landscape"
            ]
          }
        ]
      },
      {
        id: "checklist",
        icon: CheckCircle2,
        title: "Getting Started",
        subtitle: "First steps for relocating",
        content: [
          {
            heading: "Before Arrival",
            items: [
              "Obtain appropriate visa",
              "Book accommodation for first month",
              "Arrange travel insurance",
              "Notify bank of travel plans",
              "Book property viewings (if interested)"
            ]
          },
          {
            heading: "Upon Arrival",
            items: [
              "Register with embassy/consulate",
              "Open Thai bank account",
              "Obtain Thai phone number (SIM card)",
              "Set up internet service",
              "Register with local police (TM.47)"
            ]
          },
          {
            heading: "First Month",
            items: [
              "Explore neighborhoods and community",
              "Meet other expats and locals",
              "Establish daily routines",
              "Visit immigration office for visa extension",
              "Arrange long-term accommodation"
            ]
          },
          {
            heading: "Ongoing",
            items: [
              "Maintain visa requirements",
              "Build community connections",
              "Explore surrounding areas",
              "Participate in local events",
              "Consider property investment"
            ]
          }
        ]
      }
    ],
    th: [
      {
        id: "practical",
        icon: DollarSign,
        title: "คู่มือการใช้ชีวิตในทางปฏิบัติ",
        subtitle: "ข้อมูลที่จำเป็นสำหรับผู้อยู่อาศัยและนักท่องเที่ยว",
        content: [
          {
            heading: "ค่าครองชีพ",
            items: [
              "ที่พัก: 5,000-30,000 บาท/เดือน",
              "อาหาร: ตลาดท้องถิ่น 30-50% ถูกกว่าซูเปอร์มาร์เก็ต",
              "สาธารณูปโภค: 2,000-4,000 บาท/เดือน",
              "การขนส่ง: จักรยานยนต์ 100-150 บาท/วัน",
              "โดยรวม: 1,000-1,500 ดอลลาร์สหรัฐ/เดือน"
            ]
          },
          {
            heading: "ตลาดสดใหม่ทุกวัน",
            items: [
              "ตลาดหลักใกล้ใจกลางเมือง",
              "เวลาที่ดีที่สุด: เช้ามืด (6-9 น.)",
              "อาหารทะเล ผลไม้เขตร้อน สมุนไพรท้องถิ่น",
              "ตลาดริมชายหาดและตลาดใกล้เคียง"
            ]
          }
        ]
      }
    ]
  };

  const currentSections = language === "en" ? sections.en : sections.th;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Guides & Resources" : "คู่มือและทรัพยากร"}
          </h1>
          <p className="text-xl text-blue-100">
            {language === "en"
              ? "Everything you need to know about living in Sam Roi Yot"
              : "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับการใช้ชีวิตในสามร้อยยอด"}
          </p>
        </div>
      </div>

      {/* Guides Sections */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {currentSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <Card
                key={section.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() =>
                    setExpandedSection(isExpanded ? null : section.id)
                  }
                  className="w-full px-6 py-6 flex items-start justify-between hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <Icon className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {section.title}
                      </h2>
                      <p className="text-slate-600 mt-1">{section.subtitle}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-200 px-6 py-6 bg-slate-50">
                    <div className="space-y-8">
                      {section.content.map((subsection, idx) => (
                        <div key={idx}>
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">
                            {subsection.heading}
                          </h3>
                          <ul className="space-y-2">
                            {subsection.items.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                className="flex items-start gap-3 text-slate-700"
                              >
                                <span className="text-blue-600 font-bold mt-1">
                                  •
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-8 text-center border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {language === "en"
              ? "Ready to Make the Move?"
              : "พร้อมที่จะย้ายหรือยัง?"}
          </h3>
          <p className="text-slate-700 mb-6">
            {language === "en"
              ? "Our concierge team is here to help with visa assistance, property viewings, and relocation support."
              : "ทีมคอนเซียร์จของเรายินดีช่วยเหลือด้านวีซ่า การดูอสังหาริมทรัพย์ และการย้ายถิ่น"}
          </p>
          <a
            href="/concierge"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {language === "en" ? "Request Consultation" : "ขอคำปรึกษา"}
          </a>
        </div>
      </div>
    </div>
  );
}
