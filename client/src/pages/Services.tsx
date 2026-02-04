import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Globe, Users, Wrench, Utensils, Home, Bike, Heart } from "lucide-react";
import { useState } from "react";

export default function Services() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const services = {
    en: [
      {
        category: "Construction & Renovation",
        icon: Wrench,
        services: [
          {
            name: "Sam Roi Yot Local Home Builders",
            description: "Experienced local contractors specializing in residential construction, renovation, and repair projects. Familiar with expat requirements and international standards.",
            specialties: ["New construction", "Renovations", "Repairs", "Project management"],
            rating: 4.8
          },
          {
            name: "Thai Construction Services",
            description: "Full-service construction company offering design consultation, material sourcing, and project supervision.",
            specialties: ["Villa construction", "Condo renovation", "Interior design", "Quality assurance"],
            rating: 4.7
          }
        ]
      },
      {
        category: "Dining & Food",
        icon: Utensils,
        services: [
          {
            name: "Local Seafood Restaurants",
            description: "Fresh daily catch prepared traditional Thai style. Popular gathering spots for both expats and locals.",
            specialties: ["Fresh seafood", "Thai cuisine", "Beachfront dining", "Casual atmosphere"],
            rating: 4.6
          },
          {
            name: "International Restaurants",
            description: "Growing selection of restaurants offering Western, Asian fusion, and international cuisine.",
            specialties: ["Western food", "Asian fusion", "Vegetarian options", "Takeout available"],
            rating: 4.5
          },
          {
            name: "Night Market Food Stalls",
            description: "Affordable local food experiences with authentic Thai dishes and street food specialties.",
            specialties: ["Local cuisine", "Budget-friendly", "Authentic experience", "Evening dining"],
            rating: 4.7
          }
        ]
      },
      {
        category: "Activities & Tours",
        icon: Bike,
        services: [
          {
            name: "Sam Roi Yot Biking Tours",
            description: "Local biking tour agency offering guided tours through scenic routes and hidden trails.",
            specialties: ["Off-road biking", "Scenic routes", "Small groups", "Equipment provided"],
            rating: 4.9
          },
          {
            name: "Boat Tours & Kayaking",
            description: "Long-tail boat rentals and guided kayaking through mangrove channels with wildlife viewing.",
            specialties: ["Island hopping", "Mangrove kayaking", "Wildlife viewing", "Photography tours"],
            rating: 4.8
          },
          {
            name: "Cooking Classes",
            description: "Learn to prepare authentic Thai cuisine from experienced local instructors.",
            specialties: ["Thai cooking", "Market tours", "Hands-on classes", "Recipe books included"],
            rating: 4.9
          }
        ]
      },
      {
        category: "Accommodations & Real Estate",
        icon: Home,
        services: [
          {
            name: "Property Rentals",
            description: "Wide selection of furnished and unfurnished properties for short and long-term rental.",
            specialties: ["Condos", "Villas", "Townhouses", "Flexible terms"],
            rating: 4.6
          },
          {
            name: "Real Estate Sales",
            description: "Professional real estate agents specializing in property sales for foreign buyers.",
            specialties: ["Property sales", "Legal assistance", "Market analysis", "Investment advice"],
            rating: 4.7
          }
        ]
      },
      {
        category: "Health & Wellness",
        icon: Heart,
        services: [
          {
            name: "Local Clinics",
            description: "Private medical clinics with English-speaking staff providing quality healthcare services.",
            specialties: ["General medicine", "Dental care", "Pharmacy", "Emergency services"],
            rating: 4.8
          },
          {
            name: "Wellness & Spa",
            description: "Traditional Thai massage and wellness centers offering relaxation and therapeutic treatments.",
            specialties: ["Thai massage", "Spa treatments", "Yoga classes", "Traditional medicine"],
            rating: 4.7
          }
        ]
      },
      {
        category: "Transportation & Logistics",
        icon: MapPin,
        services: [
          {
            name: "Scooter & Car Rental",
            description: "Vehicle rental services for daily transportation and exploring the region.",
            specialties: ["Scooter rental", "Car rental", "Flexible terms", "Insurance available"],
            rating: 4.6
          },
          {
            name: "Taxi & Transfer Services",
            description: "Reliable transportation for airport transfers and local travel.",
            specialties: ["Airport transfers", "City tours", "Long-distance travel", "Negotiable rates"],
            rating: 4.5
          }
        ]
      }
    ],
    th: [
      {
        category: "ก่อสร้างและปรับปรุง",
        icon: Wrench,
        services: [
          {
            name: "ผู้รับเหมาก่อสร้างท้องถิ่นสามร้อยยอด",
            description: "ผู้รับเหมาท้องถิ่นที่มีประสบการณ์เชี่ยวชาญในการก่อสร้างที่อยู่อาศัย ปรับปรุง และซ่อมแซม",
            specialties: ["ก่อสร้างใหม่", "ปรับปรุง", "ซ่อมแซม", "จัดการโครงการ"],
            rating: 4.8
          }
        ]
      },
      {
        category: "ร้านอาหารและอาหาร",
        icon: Utensils,
        services: [
          {
            name: "ร้านอาหารทะเลท้องถิ่น",
            description: "อาหารทะเลสดใหม่ที่เก็บเกี่ยวรายวันเตรียมแบบไทยดั้งเดิม",
            specialties: ["อาหารทะเล", "อาหารไทย", "ร้านริมชายหาด", "บรรยากาศสบาย ๆ"],
            rating: 4.6
          }
        ]
      },
      {
        category: "กิจกรรมและทัวร์",
        icon: Bike,
        services: [
          {
            name: "ทัวร์จักรยานสามร้อยยอด",
            description: "บริษัททัวร์จักรยานท้องถิ่นนำเสนอทัวร์ที่มีไกด์ผ่านเส้นทางสวยงาม",
            specialties: ["จักรยานออฟโรด", "เส้นทางสวยงาม", "กลุ่มเล็ก", "อุปกรณ์ให้"],
            rating: 4.9
          }
        ]
      }
    ]
  };

  const currentServices = language === "en" ? services.en : services.th;

  const filteredServices = selectedCategory
    ? currentServices.filter(cat => cat.category === selectedCategory)
    : currentServices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Local Services Directory" : "ไดเรกทอรีบริการท้องถิ่น"}
          </h1>
          <p className="text-xl text-blue-100">
            {language === "en"
              ? "Trusted local businesses and services recommended by our community"
              : "ธุรกิจและบริการท้องถิ่นที่เชื่อถือได้ที่แนะนำโดยชุมชนของเรา"}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-800 hover:bg-slate-300"
            }`}
          >
            {language === "en" ? "All Services" : "บริการทั้งหมด"}
          </button>
          {currentServices.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === cat.category
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          {filteredServices.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-slate-900">
                    {category.category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.services.map((service, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-slate-900 flex-1">
                          {service.name}
                        </h3>
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold text-slate-900">
                            {service.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-700 mb-4">
                        {service.description}
                      </p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-slate-600 mb-2">
                          {language === "en" ? "Specialties:" : "ความเชี่ยวชาญ:"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.specialties.map((specialty, sidx) => (
                            <span
                              key={sidx}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        {language === "en" ? "Learn More" : "เรียนรู้เพิ่มเติม"}
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-8 text-center border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {language === "en" ? "Can't Find What You Need?" : "หาไม่เจอสิ่งที่คุณต้องการหรือ?"}
          </h3>
          <p className="text-slate-700 mb-6">
            {language === "en"
              ? "Contact our concierge team for personalized recommendations and assistance."
              : "ติดต่อทีมคอนเซียร์จของเราเพื่อรับคำแนะนำและความช่วยเหลือ"}
          </p>
          <a
            href="/concierge"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {language === "en" ? "Contact Concierge" : "ติดต่อคอนเซียร์จ"}
          </a>
        </div>
      </div>
    </div>
  );
}
