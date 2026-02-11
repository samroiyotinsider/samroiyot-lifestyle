import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Bike, Utensils, Home, Heart, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnersList() {
  const partners = [
    {
      category: "Biking Tours",
      name: "Sam Roi Yot Biking Tours",
      contact: "+66 (0)8-XXXX-XXXX",
      email: "info@samroiyotbiking.com",
      address: "123 Beach Road, Sam Roi Yot",
      specialties: ["Off-road biking", "Scenic routes", "Small groups", "Equipment provided"],
      hours: "8:00 AM - 6:00 PM",
      commission: "15-20%",
      notes: "Reliable, professional guides. Can handle groups up to 15 people."
    },
    {
      category: "Kayaking & Boat Tours",
      name: "Boat Tours & Kayaking",
      contact: "+66 (0)8-YYYY-YYYY",
      email: "kayak@samroiyot.com",
      address: "Pier Area, Sam Roi Yot Beach",
      specialties: ["Island hopping", "Mangrove kayaking", "Wildlife viewing", "Photography tours"],
      hours: "7:00 AM - 5:00 PM",
      commission: "20%",
      notes: "Excellent for sunset tours. Provide life jackets and equipment."
    },
    {
      category: "Cooking Classes",
      name: "Thai Cooking Classes",
      contact: "+66 (0)9-ZZZZ-ZZZZ",
      email: "cooking@samroiyot.com",
      address: "456 Market Street, Sam Roi Yot",
      specialties: ["Thai cooking", "Market tours", "Hands-on classes", "Recipe books included"],
      hours: "9:00 AM - 4:00 PM",
      commission: "18%",
      notes: "Classes include market visit and lunch. Max 8 people per class."
    },
    {
      category: "Market Tours",
      name: "Local Market Guide",
      contact: "+66 (0)8-AAAA-AAAA",
      email: "market@samroiyot.com",
      address: "Central Market, Sam Roi Yot",
      specialties: ["Market tours", "Local cuisine", "Shopping assistance", "Cultural insights"],
      hours: "6:00 AM - 12:00 PM",
      commission: "10-15%",
      notes: "Best in early morning. Can arrange cooking class follow-up."
    },
    {
      category: "Hiking & Nature",
      name: "National Park Hiking Tours",
      contact: "+66 (0)8-BBBB-BBBB",
      email: "hiking@samroiyot.com",
      address: "Khao Sam Roi Yot National Park Entrance",
      specialties: ["Hiking", "Nature exploration", "Wildlife viewing", "Photography"],
      hours: "7:00 AM - 4:00 PM",
      commission: "15%",
      notes: "Licensed park guides. Provide water and snacks."
    },
    {
      category: "Photography Walks",
      name: "Sunset Photography Tours",
      contact: "+66 (0)8-CCCC-CCCC",
      email: "photo@samroiyot.com",
      address: "Various locations",
      specialties: ["Photography tours", "Sunset sessions", "Editing workshop", "Print services"],
      hours: "3:00 PM - 8:00 PM",
      commission: "20%",
      notes: "Photographer provides prints. Great for couples and solo travelers."
    },
    {
      category: "Transportation",
      name: "Airport Transfer Service",
      contact: "+66 (0)8-DDDD-DDDD",
      email: "transfer@samroiyot.com",
      address: "Main Office, Sam Roi Yot Town",
      specialties: ["Airport transfers", "City tours", "Long-distance travel", "Negotiable rates"],
      hours: "24/7",
      commission: "10%",
      notes: "Reliable, air-conditioned vehicles. Can arrange multi-day tours."
    },
    {
      category: "Wellness",
      name: "Thai Massage & Spa",
      contact: "+66 (0)8-EEEE-EEEE",
      email: "spa@samroiyot.com",
      address: "789 Wellness Street, Sam Roi Yot",
      specialties: ["Thai massage", "Spa treatments", "Wellness packages", "Couples packages"],
      hours: "10:00 AM - 9:00 PM",
      commission: "15%",
      notes: "Traditional Thai massage. Offer package deals for multiple sessions."
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 print:mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Internal Partner List
              </h1>
              <p className="text-slate-600">
                Staff Reference Guide - For Concierge Service Bookings
              </p>
            </div>
            <Button
              onClick={handlePrint}
              className="print:hidden bg-blue-600 hover:bg-blue-700"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
          <div className="border-t-2 border-blue-600 pt-4">
            <p className="text-sm text-slate-600 mb-2">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-slate-600">
              <strong>Instructions:</strong> Use this list to contact partners when customers book concierge services. Track commission payments manually.
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="space-y-6 print:space-y-4">
          {partners.map((partner, idx) => (
            <Card
              key={idx}
              className="p-6 print:p-4 print:page-break-inside-avoid border-2 border-slate-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:gap-4">
                {/* Left Column - Contact Info */}
                <div>
                  <div className="mb-4 print:mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-2 print:text-xs">
                      {partner.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 print:text-lg">
                      {partner.name}
                    </h3>
                  </div>

                  <div className="space-y-3 print:space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">{partner.contact}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">{partner.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700">{partner.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700">{partner.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Column - Services & Commission */}
                <div>
                  <div className="mb-4 print:mb-2">
                    <h4 className="font-bold text-slate-900 mb-2 print:text-sm print:mb-1">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2 print:gap-1">
                      {partner.specialties.map((specialty, sidx) => (
                        <span
                          key={sidx}
                          className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded print:text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded p-3 print:p-2">
                    <p className="text-sm font-bold text-amber-900 print:text-xs">
                      Commission: {partner.commission}
                    </p>
                  </div>
                </div>

                {/* Right Column - Notes */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 print:text-sm print:mb-1">
                    Staff Notes
                  </h4>
                  <p className="text-sm text-slate-700 print:text-xs print:leading-tight">
                    {partner.notes}
                  </p>

                  {/* Booking Checklist */}
                  <div className="mt-4 print:mt-2 pt-4 print:pt-2 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-2 print:mb-1">
                      BOOKING CHECKLIST
                    </p>
                    <div className="space-y-1 print:space-y-0.5">
                      <label className="flex items-center gap-2 text-xs print:text-xs">
                        <input type="checkbox" className="w-3 h-3 print:w-2 print:h-2" />
                        <span>Confirm availability</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs print:text-xs">
                        <input type="checkbox" className="w-3 h-3 print:w-2 print:h-2" />
                        <span>Get customer details</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs print:text-xs">
                        <input type="checkbox" className="w-3 h-3 print:w-2 print:h-2" />
                        <span>Confirm booking</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs print:text-xs">
                        <input type="checkbox" className="w-3 h-3 print:w-2 print:h-2" />
                        <span>Track commission</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 print:mt-6 pt-8 print:pt-4 border-t-2 border-slate-300 text-center text-xs text-slate-600 print:text-xs">
          <p>This is a confidential staff reference document. Not for customer distribution.</p>
          <p className="mt-2 print:mt-1">Sam Roi Yot Lifestyle - Internal Use Only</p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:page-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
