import React from "react";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";

export default function Events() {
  // Placeholder events - to be replaced with actual event data
  const upcomingEvents = [
    {
      id: 1,
      title: "Exciting Events Coming Soon!",
      description:
        "We're planning amazing workshops, webinars, and networking events. Stay tuned for announcements!",
      date: "Coming Soon",
      time: "TBD",
      location: "TBD",
      type: "Coming Soon",
      attendees: "TBD",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
      registrationUrl: "#",
      isPlaceholder: true,
    },
    {
      id: 2,
      title: "Industry Workshops in Planning",
      description:
        "Interactive workshops covering the latest in business automation and digital transformation.",
      date: "Coming Soon",
      time: "TBD",
      location: "TBD",
      type: "Coming Soon",
      attendees: "TBD",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
      registrationUrl: "#",
      isPlaceholder: true,
    },
    {
      id: 3,
      title: "Expert-Led Webinar Series",
      description:
        "Join our experts for in-depth discussions on technology trends and best practices.",
      date: "Coming Soon",
      time: "TBD",
      location: "TBD",
      type: "Coming Soon",
      attendees: "TBD",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
      registrationUrl: "#",
      isPlaceholder: true,
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Manufacturing Automation Conference 2024",
      description:
        "Successful conference showcasing the latest in manufacturing automation and Industry 4.0 solutions.",
      date: "December 10, 2024",
      type: "Conference",
      attendees: "300+ Attendees",
      image:
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Data Analytics Masterclass",
      description:
        "Intensive workshop on business intelligence and data visualization best practices.",
      date: "November 18, 2024",
      type: "Masterclass",
      attendees: "75 Participants",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Events &{" "}
              <span className="text-onealgo-orange-500">Workshops</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Join us for exclusive events, workshops, and webinars designed to
              help you stay ahead in the rapidly evolving world of business
              technology.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't miss these exciting opportunities to learn, network, and
              grow your expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="border-2 hover:border-onealgo-orange-500 transition-colors h-full overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-onealgo-orange-500 text-white">
                      {event.type}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-onealgo-blue-950 line-clamp-2">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                  <p className="text-gray-600 mb-4 flex-grow">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-onealgo-orange-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-onealgo-orange-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-onealgo-orange-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-onealgo-orange-500" />
                      {event.attendees}
                    </div>
                  </div>

                  {event.isPlaceholder ? (
                    <Button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                    >
                      Stay Tuned
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                      onClick={() => window.open(event.registrationUrl, "_blank")}
                    >
                      Register Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Past Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our successful events and what we've
              accomplished together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                className="border-2 hover:border-onealgo-blue-950 transition-colors h-full overflow-hidden opacity-75"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="outline"
                      className="bg-white/90 text-gray-600"
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-700">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      {event.attendees}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-onealgo-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated on Future Events
          </h2>
          <p className="text-blue-200 mb-8">
            Subscribe to our newsletter to be the first to know about upcoming
            events, workshops, and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-onealgo-orange-500"
            />
            <Button className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
