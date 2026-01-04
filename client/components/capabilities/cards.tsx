import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ExternalLink,
  Handshake,
  Layers,
  Lightbulb,
  Mail,
  Phone,
  Shield,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  CoreCompetency,
  Differentiator,
  FederalExperienceItem,
  MentorProtegeHighlight,
  JointVenturePartnerInfo,
  ProjectHighlight,
  KeyPerson,
  IconName,
} from "../../../shared/capabilities-data";

const iconMap: Record<IconName, LucideIcon> = {
  target: Target,
  lightbulb: Lightbulb,
  users: Users,
  shield: Shield,
  checkCircle: CheckCircle,
};

export function CompetencyCard({ competency }: { competency: CoreCompetency }) {
  const Icon = iconMap[competency.icon];

  return (
    <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-onealgo-blue-950">
          <Icon className="w-8 h-8 text-onealgo-orange-500" />
          {competency.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-gray-700">
          {competency.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function DifferentiatorCard({ differentiator }: { differentiator: Differentiator }) {
  const Icon = iconMap[differentiator.icon];

  return (
    <Card className="h-full bg-white shadow-sm">
      <CardContent className="pt-6 text-center space-y-4">
        <Icon className="w-12 h-12 text-onealgo-orange-500 mx-auto" />
        <h4 className="text-lg font-semibold text-gray-900">
          {differentiator.title}
        </h4>
        <p className="text-sm text-gray-600">{differentiator.description}</p>
      </CardContent>
    </Card>
  );
}

export function ExperienceCard({ experience }: { experience: FederalExperienceItem }) {
  return (
    <Card className="border-2 hover:border-onealgo-orange-500 transition-colors h-full">
      <CardHeader>
        <CardTitle className="text-onealgo-blue-950">
          {experience.title}
        </CardTitle>
        <p className="text-sm text-gray-500">{experience.rfq}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-gray-700">
        <p className="font-medium text-onealgo-blue-900">{experience.role}</p>
        {experience.partner ? (
          <p className="text-sm text-gray-600">{experience.partner}</p>
        ) : null}
        <p className="text-sm leading-relaxed">{experience.scope}</p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 pt-2 border-t border-gray-100">
          <span className="font-semibold text-gray-900">{experience.submissionDate}</span>
          <Badge variant="secondary" className="text-onealgo-orange-600 bg-onealgo-orange-50">
            {experience.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function MentorProtegeCard({ note }: { note: MentorProtegeHighlight }) {
  return (
    <Card className="border-2 hover:border-onealgo-orange-500 transition-colors h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-onealgo-blue-950">
          <Handshake className="w-6 h-6 text-onealgo-orange-500" />
          {note.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{note.description}</p>
      </CardContent>
    </Card>
  );
}

export function JointVentureCard({ partner }: { partner: JointVenturePartnerInfo }) {
  return (
    <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-onealgo-blue-950">
          <Layers className="w-6 h-6 text-onealgo-orange-500" />
          {partner.name}
        </CardTitle>
        <p className="text-sm text-gray-600">{partner.summary}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-700">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="font-semibold">Address</p>
            <p>{partner.address}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Registration</p>
            <p>{partner.cage}</p>
            <p>{partner.uei}</p>
            <p>{partner.samStatus}</p>
            <p>{partner.certifications}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Core Services</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {partner.services.map((service) => (
              <li key={service} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-onealgo-orange-500 font-semibold hover:underline"
          >
            Visit {partner.website.replace("https://", "")}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

interface ComplianceCardProps {
  title: string;
  items: string[];
  icon?: LucideIcon;
}

export function ComplianceCard({ title, items, icon: Icon = Shield }: ComplianceCardProps) {
  return (
    <Card className="border-2 hover:border-onealgo-orange-500 transition-colors h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-onealgo-blue-950">
          <Icon className="w-5 h-5 text-onealgo-orange-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-gray-700">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-onealgo-orange-500 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function ProjectCard({ project }: { project: ProjectHighlight }) {
  return (
    <Card className="border-2 hover:border-onealgo-orange-500 transition-colors h-full">
      <CardHeader>
        <CardTitle className="text-onealgo-blue-950">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-gray-700">
          {project.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-onealgo-orange-500 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function KeyPersonCard({ person }: { person: KeyPerson }) {
  return (
    <Card className="border-2 hover:border-onealgo-orange-500 transition-colors h-full">
      <CardHeader>
        <CardTitle className="text-onealgo-blue-950">{person.name}</CardTitle>
        <p className="text-sm text-gray-600">{person.role}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-gray-700">
        <p>{person.summary}</p>
        <div className="space-y-2 text-sm">
          {person.email ? (
            <a
              href={`mailto:${person.email}`}
              className="flex items-center gap-2 text-onealgo-blue-900 hover:underline"
            >
              <Mail className="w-4 h-4" />
              {person.email}
            </a>
          ) : null}
          {person.phone ? (
            <a
              href={`tel:${person.phone}`}
              className="flex items-center gap-2 text-onealgo-blue-900 hover:underline"
            >
              <Phone className="w-4 h-4" />
              {person.phone}
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function CodesCard({ title, codes }: { title: string; codes: string[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-onealgo-blue-950">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 sm:grid-cols-3">
          {codes.map((code) => (
            <div
              key={code}
              className="bg-onealgo-light px-3 py-2 rounded text-center font-mono"
            >
              {code}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
