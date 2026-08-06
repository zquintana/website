export const caseStudies = [
  {
    slug: 'aws-kubernetes-migration',
    eyebrow: 'Cloud modernization',
    title: 'Production migration from colocation to AWS EKS',
    summary:
      'Replatforming a long-lived SaaS platform with AWS, Kubernetes, Terraform, and modern deployment practices while maintaining continuity for active operations.',
    outcome: 'Production migration from colocation to AWS EKS',
    context:
      'The work involved a long-lived SaaS platform moving from colocated infrastructure toward a production environment built around AWS EKS.',
    challenge:
      'The migration had to support active operations while changing the infrastructure and deployment foundation underneath an established product.',
    approach: [
      'Played a central technical role in the replatforming effort.',
      'Used AWS, Kubernetes, Terraform, and modern deployment practices as the foundation for the new environment.',
      'Stayed close to the operational details required to maintain continuity while the platform changed underneath active users.',
    ],
    result:
      'The platform moved from colocation to AWS EKS with a more maintainable cloud and deployment foundation. This case study intentionally does not claim zero downtime or a single-owner delivery model.',
    role: 'Played a central technical role in the replatforming effort.',
    technologies: ['AWS', 'EKS', 'Kubernetes', 'Terraform'],
  },
  {
    slug: 'search-performance-modernization',
    eyebrow: 'Search and AI-assisted retrieval',
    title: '99.67% measured search-performance improvement',
    summary:
      'Modernizing search for an enterprise RFP platform by combining improved retrieval with AI-assisted capabilities and materially reducing response time.',
    outcome: '99.67% measured search-performance improvement',
    context:
      'The project focused on search for an enterprise RFP platform where response time directly affected how quickly users could find and work with relevant information.',
    challenge:
      'Search needed to become materially more responsive while also supporting improved retrieval and practical AI-assisted capabilities.',
    approach: [
      'Modernized the search experience and underlying retrieval approach.',
      'Combined improved retrieval with AI-assisted capabilities where they supported the product outcome.',
      'Focused the work on measurable search performance rather than adding AI terminology without a useful result.',
    ],
    result:
      'The measured result was a 99.67% improvement in search performance. The available project record does not specify the benchmark, baseline, or test conditions, so this page does not infer a response-time figure or a particular measurement method.',
    role: 'Hands-on engineering and architecture work across the search and retrieval initiative.',
    technologies: ['Search', 'Retrieval', 'AI-assisted capabilities'],
  },
  {
    slug: 'high-volume-processing',
    eyebrow: 'Backend platform performance',
    title: '100× processing-performance improvement',
    summary:
      'Reworking a critical processing path in a high-volume SaaS messaging system to restore operating headroom and improve responsiveness.',
    outcome: '100× processing-performance improvement',
    context:
      'The work centered on a high-volume SaaS messaging system with a critical processing path that constrained responsiveness and available operating headroom.',
    challenge:
      'A bottleneck in the processing path needed to be addressed without losing sight of the production system and the teams operating it.',
    approach: [
      'Reworked the critical processing path rather than treating the symptom as a general scaling problem.',
      'Used hands-on backend engineering to remove the bottleneck and improve responsiveness.',
      'Kept the result tied to operating headroom, not just an isolated benchmark.',
    ],
    result:
      'The processing path achieved a 100× performance improvement, restoring operating headroom and improving responsiveness for the SaaS messaging system.',
    role: 'Hands-on backend engineering and technical leadership for the processing improvement.',
    technologies: ['SaaS platforms', 'Messaging systems', 'Backend processing'],
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
