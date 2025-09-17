import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { StructuredData, createWebPageSchema } from "../components/StructuredData";

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
  const [searchTerm, setSearchTerm] = useState("");

  const jobCategories = [
    {
      title: "Development & Engineering",
      jobs: [
        {
          id: "software-engineer",
          title: "Software Engineer",
          icon: <Code className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid to Senior",
          availablePositions: 0,
          summary:
            "Build scalable software solutions that power business transformation across multiple industries.",
          description:
            "Join our engineering team to develop cutting-edge applications that streamline business operations. You'll work with modern technologies including React, Node.js, and cloud platforms to create solutions that make a real impact for our clients. Collaborate with cross-functional teams to deliver high-quality software that scales with growing businesses.",
        },
        {
          id: "full-stack-developer",
          title: "Full-Stack Web Developer",
          icon: <Monitor className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / On-site",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Create end-to-end web applications from concept to deployment using modern frameworks.",
          description:
            "Develop complete web applications using both frontend and backend technologies. Work with React, TypeScript, Node.js, and databases to build responsive, user-friendly applications. You'll be involved in the entire development lifecycle, from initial design to deployment and maintenance.",
        },
        {
          id: "devops-engineer",
          title: "DevOps Engineer",
          icon: <Cloud className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote",
          type: "Full-time",
          level: "Mid to Senior",
          availablePositions: 0,
          summary:
            "Optimize deployment pipelines and infrastructure to ensure reliable, scalable system operations.",
          description:
            "Design and maintain CI/CD pipelines, manage cloud infrastructure, and implement monitoring solutions. Work with AWS, Docker, Kubernetes, and automation tools to ensure our applications run smoothly in production. Focus on security, scalability, and performance optimization.",
        },
        {
          id: "salesforce-developer",
          title: "Salesforce Developer",
          icon: <Settings className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Customize and extend Salesforce platforms to meet unique business requirements.",
          description:
            "Develop custom Salesforce solutions using Apex, Lightning Web Components, and Flow. Create integrations with external systems and implement complex business logic. Work directly with clients to understand requirements and deliver tailored CRM solutions that drive business growth.",
        },
        {
          id: "data-engineer",
          title: "Data Engineer",
          icon: <Database className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid to Senior",
          availablePositions: 0,
          summary:
            "Build robust data pipelines and infrastructure to support analytics and business intelligence.",
          description:
            "Design and implement data pipelines, ETL processes, and data warehouses. Work with big data technologies like Apache Spark, Kafka, and cloud data platforms. Ensure data quality, performance, and security while supporting business analytics and machine learning initiatives.",
        },
        {
          id: "servicenow-developer",
          title: "ServiceNow Developer",
          icon: <Layers className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Develop and customize ServiceNow applications for IT service management and workflow automation.",
          description:
            "Build custom ServiceNow applications and workflows to automate business processes. Work with ServiceNow platform tools, scripting, and integrations to deliver solutions that improve operational efficiency. Collaborate with IT teams to implement ITSM best practices.",
        },
        {
          id: "workday-developer",
          title: "Workday Developer",
          icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Configure and customize Workday HCM solutions for human resources and talent management.",
          description:
            "Implement Workday HCM modules including Core HCM, Recruiting, and Performance Management. Create custom reports, configure business processes, and integrate Workday with other enterprise systems. Work with HR teams to optimize workforce management processes.",
        },
      ],
    },
    {
      title: "Data & Analytics",
      jobs: [
        {
          id: "ai-ml-engineer",
          title: "AI/ML Engineer",
          icon: <Brain className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Senior",
          availablePositions: 0,
          summary:
            "Develop and deploy machine learning models to solve complex business problems.",
          description:
            "Design, train, and deploy machine learning models for predictive analytics, automation, and intelligent decision-making. Work with TensorFlow, PyTorch, and cloud ML platforms. Collaborate with data scientists and engineers to bring AI solutions from research to production.",
        },
        {
          id: "bi-developer",
          title: "BI Developer",
          icon: <BarChart3 className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Create dashboards and reports that turn data into actionable business insights.",
          description:
            "Develop business intelligence solutions using tools like Power BI, Tableau, and SQL. Design interactive dashboards, create automated reports, and work with stakeholders to understand analytical requirements. Transform complex data into clear, actionable insights for decision-making.",
        },
        {
          id: "data-governance-specialist",
          title: "Data Governance Specialist",
          icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid to Senior",
          availablePositions: 0,
          summary:
            "Ensure data quality, security, and compliance across all organizational data assets.",
          description:
            "Establish and maintain data governance frameworks, policies, and procedures. Work with cross-functional teams to ensure data quality, privacy, and regulatory compliance. Implement data catalog systems and metadata management to support data discovery and lineage.",
        },
      ],
    },
    {
      title: "Business & Strategy",
      jobs: [
        {
          id: "business-analyst",
          title: "Business Analyst",
          icon: <TrendingUp className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Bridge business needs and technology solutions through detailed analysis and requirements gathering.",
          description:
            "Work closely with stakeholders to understand business requirements and translate them into technical specifications. Conduct process analysis, create documentation, and facilitate communication between business users and development teams. Help identify opportunities for process improvement and automation.",
        },
        {
          id: "product-owner",
          title: "Product Owner",
          icon: <Briefcase className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Senior",
          availablePositions: 0,
          summary:
            "Drive product strategy and roadmap to deliver solutions that meet market and customer needs.",
          description:
            "Define product vision, strategy, and roadmap. Work with development teams in an Agile environment to prioritize features and ensure delivery of valuable products. Conduct market research, gather customer feedback, and make data-driven decisions about product direction.",
        },
        {
          id: "program-manager",
          title: "Program Manager",
          icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Senior",
          availablePositions: 0,
          summary:
            "Coordinate multiple projects and teams to deliver complex initiatives on time and within budget.",
          description:
            "Lead cross-functional teams to deliver large-scale programs and initiatives. Manage project timelines, budgets, and resources while ensuring alignment with business objectives. Communicate with stakeholders at all levels and remove blockers to keep projects on track.",
        },
        {
          id: "finance-strategy-manager",
          title: "Finance and Strategy Manager",
          icon: <DollarSign className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Senior",
          availablePositions: 0,
          summary:
            "Drive financial planning and strategic initiatives to support business growth and profitability.",
          description:
            "Lead financial analysis, budgeting, and forecasting processes. Develop strategic plans and business cases for new initiatives. Work with leadership to analyze market opportunities and optimize resource allocation. Support decision-making with financial modeling and ROI analysis.",
        },
      ],
    },
    {
      title: "Quality & Compliance",
      jobs: [
        {
          id: "qa-specialist",
          title: "QA Specialist",
          icon: <FileCheck className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Ensure software quality through comprehensive testing strategies and automation frameworks.",
          description:
            "Design and execute test plans, create automated testing frameworks, and ensure software quality throughout the development lifecycle. Work with development teams to implement testing best practices and identify potential issues before production deployment.",
        },
        {
          id: "compliance-analyst",
          title: "Compliance Analyst",
          icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Ensure organizational compliance with industry regulations and internal policies.",
          description:
            "Monitor compliance with regulatory requirements and internal policies across all business operations. Conduct risk assessments, develop compliance procedures, and provide training to ensure adherence to standards. Work with legal and audit teams to maintain compliance certifications.",
        },
      ],
    },
    {
      title: "Marketing & Growth",
      jobs: [
        {
          id: "digital-marketing-specialist",
          title: "Digital Marketing Specialist",
          icon: <TrendingUp className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Full-time",
          level: "Mid-level",
          availablePositions: 0,
          summary:
            "Drive online presence and lead generation through strategic digital marketing campaigns.",
          description:
            "Develop and execute digital marketing strategies across multiple channels including SEO, SEM, social media, and content marketing. Analyze campaign performance, optimize conversion rates, and work with sales teams to generate qualified leads. Stay current with digital marketing trends and best practices.",
        },
      ],
    },
    {
      title: "Early Career Opportunities",
      jobs: [
        {
          id: "internships",
          title: "Internship Program",
          icon: <GraduationCap className="w-8 h-8 text-onealgo-orange-500" />,
          location: "Remote / Hybrid",
          type: "Internship",
          level: "Entry-level",
          availablePositions: 0,
          summary:
            "Gain hands-on experience in technology and business while contributing to real projects.",
          description:
            "Our comprehensive internship program offers students and recent graduates the opportunity to work on meaningful projects across various departments. Receive mentorship from experienced professionals, participate in training sessions, and contribute to client solutions. Available in software development, data analysis, business analysis, and digital marketing.",
        },
      ],
    },
  ];

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

          {filteredCategories.length === 0 && searchTerm ? (
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
                        <p className="text-gray-600 mb-4">{job.summary}</p>

                        <Collapsible trigger="Learn More">
                          <p className="text-gray-600">{job.description}</p>
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
