import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createWebPageSchema,
} from "../components/StructuredData";

interface Job {
  id: string;
  title: string;
  icon: React.ReactNode;
  location: string;
  type: string;
  level: string;
  availablePositions: number;
  summary: string;
  description: string;
}

interface JobCategory {
  title: string;
  jobs: Job[];
}
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Collapsible } from "../components/ui/collapsible";
import { Input } from "../components/ui/input";
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  Code,
  Database,
  Shield,
  TrendingUp,
  Settings,
  BarChart3,
  Brain,
  FileCheck,
  DollarSign,
  Layers,
  Monitor,
  Cloud,
  GraduationCap,
  Search,
} from "lucide-react";

export default function Careers() {
  useSEO({
    title: "OneAlgorithm — Careers",
    description:
      "Join OneAlgorithm's innovative technology team. Explore career opportunities in software development, IT consulting, and operations technology.",
    canonical: getCanonicalUrl("/careers"),
    keywords:
      "OneAlgorithm careers, technology jobs, software developer jobs, IT consulting careers, operations technology jobs, remote work opportunities",
    ogTitle: "OneAlgorithm — Careers",
    ogDescription:
      "Join OneAlgorithm's innovative team of technology experts. Explore career opportunities in software development, IT consulting, operations technology, and more. Build your career with us.",
    ogUrl: getCanonicalUrl("/careers"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Careers",
    twitterDescription:
      "Join OneAlgorithm's innovative team of technology experts. Explore career opportunities in software development, IT consulting, operations technology, and more. Build your career with us.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  const [searchTerm, setSearchTerm] = useState("");

  /*
    Openings listed directly on the site.

    This is a recruitment advertisement placed for labour certification, so the
    wording is reproduced EXACTLY as supplied — including the relocation clause
    and the postal address. Do not tidy, shorten or rephrase it: the text of
    this kind of notice has legal significance and paraphrasing it can
    invalidate the filing. Take the wording from the requester, not from here.

    When the role is filled, delete the entry. Anything published in Ghost with
    the "job" tag is added to this list automatically.
  */
  const listedRoles: Job[] = [
    {
      id: "sr-business-systems-engineer-i",
      title: "Sr. Business Systems Engineer I",
      icon: <Briefcase className="w-8 h-8 text-onealgo-orange-500" />,
      location: "Malvern, PA",
      type: "Full-time",
      level: "",
      availablePositions: 1,
      summary:
        "Design and develop solutions to complex application problems, system administration issues, and network concerns.",
      description:
        "Design and develop solutions to complex application problems, system administration issues, and network concerns. " +
        "Job based in Malvern, PA. No travel (US or Intl), but 40% chance of relocation to unanticipated locations " +
        "throughout the U.S. Email resumes to careers@onealgorithm.com or mail: One Algorithm LLC, 625B Swedesford Rd., " +
        "Malvern, PA 19355.",
    },
  ];

  const [jobs, setJobs] = useState<Job[]>(listedRoles);
  const [loadingJobs, setLoadingJobs] = useState(true);

  React.useEffect(() => {
    const KEY = "9c852884ecf4b8b550b743674b"; // Ghost Content API key - read-only, safe in a browser
    const url =
      "https://blog.onealgorithm.com/ghost/api/content/posts/" +
      "?key=" + KEY + "&filter=tag:job&limit=all&include=tags";

    let cancelled = false;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (cancelled) return;
        const posts = (data && data.posts) || [];
        const fromGhost = posts.map((p: any) => {
            // Optional detail carried as extra tags, e.g. #remote #full-time.
            const extra = (p.tags || [])
              .map((t: any) => t.name)
              .filter((n: string) => n && n.toLowerCase() !== "job");
            return {
              id: p.slug,
              title: p.title,
              icon: <Briefcase className="w-8 h-8 text-onealgo-orange-500" />,
              location: extra[0] || "",
              type: extra[1] || "",
              level: extra[2] || "",
              availablePositions: 1,
              summary: p.custom_excerpt || p.excerpt || "",
              description: p.url,
            } as Job;
        });
        // Ghost postings are ADDED to the roles listed above, not swapped for
        // them — otherwise publishing the first Ghost job would silently remove
        // a live advert from the page.
        setJobs([...listedRoles, ...fromGhost]);
      })
      .catch(() => {
        // A failed fetch must leave the listed roles standing. It must also not
        // invent anything: if there are none, the empty state below says so and
        // gives a real address to write to.
        if (!cancelled) setJobs(listedRoles);
      })
      .finally(() => {
        if (!cancelled) setLoadingJobs(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const jobCategories: JobCategory[] = useMemo(
    () => (jobs.length ? [{ title: "Current Openings", jobs }] : []),
    [jobs],
  );

  // Filter jobs based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return jobCategories;
    }

    return jobCategories
      .map((category) => ({
        ...category,
        jobs: category.jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.availablePositions
              .toString()
              .includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((category) => category.jobs.length > 0);
  }, [jobCategories, searchTerm]);

  return (
    <Layout>
      <StructuredData
        data={createWebPageSchema(
          "Careers at OneAlgorithm - Join Our Technology Team",
          "Join OneAlgorithm's innovative team of technology experts. Explore career opportunities in software development, IT consulting, operations technology, and more.",
          "https://onealgorithm.com/careers",
        )}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Build Your <span className="text-onealgo-orange-500">Career</span>{" "}
              With Us
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Join a dynamic team that's transforming businesses through
              innovative technology solutions. Grow your career while making a
              real impact.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OneAlgorithm?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in empowering our team members to do their best work
              while building solutions that transform businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Collaborative Culture
              </h3>
              <p className="text-gray-600">
                Work with a diverse, global team that values innovation and
                mutual support.
              </p>
            </div>
            <div className="text-center">
              <Briefcase className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Meaningful Projects
              </h3>
              <p className="text-gray-600">
                Build solutions that directly impact businesses and help them
                achieve their goals.
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-onealgo-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Work-Life Balance
              </h3>
              <p className="text-gray-600">
                Flexible schedules and remote-first approach to help you thrive
                professionally and personally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore opportunities to grow your career with us
            </p>

            {/* Search Filter */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search jobs by title, skills, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-onealgo-orange-500 rounded-lg"
              />
            </div>

            {searchTerm && (
              <p className="text-sm text-gray-600 mt-4">
                {filteredCategories.reduce(
                  (total, category) => total + category.jobs.length,
                  0,
                )}{" "}
                positions found
              </p>
            )}
          </div>

          {loadingJobs ? (
            <div className="text-center py-16">
              <p className="text-gray-500">Loading current openings…</p>
            </div>
          ) : jobs.length === 0 ? (
            /*
              No openings, said plainly.

              The previous version of this page filled the gap with eighteen
              invented roles. An empty careers page is not a problem to be
              disguised - it is the truth, and it still has somewhere useful to
              send an interested person.
            */
            <div className="text-center py-16 max-w-2xl mx-auto">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No open roles at the moment
              </h3>
              <p className="text-gray-600 mb-6">
                We are not actively recruiting right now, but we do keep
                speculative applications on file and we hire as projects grow.
                If your experience fits the work we do, we would still like to
                hear from you.
              </p>
              <Button
                asChild
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
              >
                <a href="mailto:careers@onealgorithm.com?subject=Speculative%20application">
                  Email careers@onealgorithm.com
                </a>
              </Button>
            </div>
          ) : filteredCategories.length === 0 && searchTerm ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all available
                positions.
              </p>
              <Button
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {category.jobs.map((job) => (
                    <Card
                      key={job.id}
                      className="border-2 hover:border-onealgo-orange-500 transition-colors h-full"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            {job.icon}
                            <div>
                              <CardTitle className="text-xl text-onealgo-blue-950">
                                {job.title}
                              </CardTitle>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {job.location}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {job.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  <Briefcase className="w-3 h-3 mr-1" />
                                  {job.level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge
                              className={`text-xs px-3 py-1 ${
                                job.availablePositions > 0
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : "bg-red-100 text-red-800 border-red-300"
                              }`}
                            >
                              {job.availablePositions} Position
                              {job.availablePositions !== 1 ? "s" : ""}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/*
                          The full advert is shown, not hidden behind a toggle.

                          It previously sat inside a <Collapsible>, which renders
                          nothing until a visitor clicks — so the text was absent
                          from the page source entirely. For a recruitment notice
                          placed for labour certification that is not acceptable:
                          the wording has to be plainly readable, and anyone
                          checking the posting (or any crawler) has to be able to
                          find it without interacting with the page.
                        */}
                        <p className="text-gray-600 mb-4 whitespace-pre-line">
                          {job.description || job.summary}
                        </p>

                        <Collapsible trigger="How to apply">
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Ready to apply?</strong> Send your resume
                              and cover letter to{" "}
                              <a
                                href="mailto:careers@onealgorithm.com"
                                className="text-onealgo-blue-950 hover:text-onealgo-orange-500"
                              >
                                careers@onealgorithm.com
                              </a>{" "}
                              with the position title in the subject line.
                            </p>
                          </div>
                        </Collapsible>

                        <div className="mt-6">
                          <Button
                            className={`w-full ${
                              job.availablePositions > 0
                                ? "bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            onClick={() => {
                              if (job.availablePositions > 0) {
                                window.open(
                                  `mailto:careers@onealgorithm.com?subject=Application for ${job.title}`,
                                  "_blank",
                                );
                              }
                            }}
                            disabled={job.availablePositions === 0}
                          >
                            {job.availablePositions > 0
                              ? "Apply Now"
                              : "Currently Unavailable"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            How to Apply
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="w-12 h-12 bg-onealgo-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Submit Application
              </h3>
              <p className="text-gray-600">
                Send your resume and cover letter for the position you're
                interested in.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-onealgo-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Initial Review
              </h3>
              <p className="text-gray-600">
                Our team will review your application and reach out within 5-7
                business days.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-onealgo-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Interview Process
              </h3>
              <p className="text-gray-600">
                Participate in our interview process to showcase your skills and
                learn about the role.
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Don't see the perfect role? We're always looking for talented
            individuals to join our growing team.
          </p>
          <Button
            size="lg"
            className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white px-8 py-4"
            onClick={() =>
              window.open(
                "mailto:careers@onealgorithm.com?subject=General Career Inquiry",
                "_blank",
              )
            }
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </Layout>
  );
}
