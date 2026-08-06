export const caseStudies = [
  {
    slug: 'aws-kubernetes-migration',
    eyebrow: 'Cloud modernization',
    metadataTitle: 'AWS and Kubernetes Platform Migration | Zach Quintana',
    title: 'Replatforming a legacy SaaS platform to AWS and Kubernetes',
    summary:
      'Played a central technical role in moving a long-lived production SaaS platform from colocated infrastructure to AWS EKS while maintaining continuity for active business operations.',
    outcome: 'Production migration from colocation to AWS EKS',
    situation:
      'An established enterprise SaaS platform was operating in a self-managed colocated environment. The organization needed a more maintainable infrastructure foundation while continuing to support active production workloads and ongoing product delivery.',
    constraints: [
      'The platform was already supporting active customers and business operations.',
      'Modernization could not assume a clean-sheet rewrite.',
      'Product delivery and operational support had to continue during the migration.',
      'Infrastructure, application behavior, deployment processes, networking, observability, and security were interconnected.',
      'The internal team needed to understand and operate the resulting environment.',
    ],
    technicalWork: [
      'Contributed to AWS architecture and Amazon EKS platform design within the broader migration.',
      'Implemented Terraform-based infrastructure automation and Kubernetes deployment practices.',
      'Worked across networking and connectivity, CI/CD modernization, observability, and production troubleshooting.',
      'Contributed to backend and platform changes required by the migration, along with documentation and team knowledge transfer.',
    ],
    result:
      'The organization transitioned production infrastructure to AWS and Kubernetes while maintaining continuity for active operations. The work created a stronger foundation for repeatable deployment, infrastructure ownership, observability, reliability, and continued platform modernization.',
    role: 'As Lead Software Engineer, I played a central technical role across architecture and hands-on implementation. The overall migration was a team effort involving engineering, infrastructure, leadership, and external dependencies.',
    ownership: 'Direct architecture and implementation contribution within a broader team-led business and infrastructure migration.',
    technologies: ['AWS', 'Amazon EKS', 'Kubernetes', 'Terraform', 'CI/CD', 'Networking', 'Observability'],
  },
  {
    slug: 'search-performance-modernization',
    eyebrow: 'Search and AI-assisted retrieval',
    metadataTitle: 'Search Performance Modernization | Zach Quintana',
    title: 'Improving enterprise search performance by 99.67%',
    summary:
      'Modernized search for an enterprise RFP platform, combining improvements to retrieval and system behavior with practical AI-assisted capabilities.',
    outcome: '99.67% measured search-performance improvement',
    situation:
      'Search was an important part of an enterprise RFP workflow, but existing performance made retrieving relevant information slower than users and the product required.',
    constraints: [
      'The search capability existed inside an established production platform.',
      'Improvements had to fit the existing application and data environment.',
      'Search quality and response performance both mattered.',
      'AI-assisted functionality could not compensate for weak retrieval or inefficient system design.',
      'Changes needed to be understandable and supportable by the engineering team.',
    ],
    technicalWork: [
      'Analyzed the existing retrieval path and improved query and data-flow behavior.',
      'Worked on search-result selection and ranking at an appropriate level for the established platform.',
      'Integrated practical AI-assisted capabilities without treating AI as a substitute for sound retrieval or system design.',
      'Contributed to testing, measurement, and production integration while balancing response usefulness with system performance.',
    ],
    result:
      'Improved measured search performance by 99.67% while supporting more useful search and AI-assisted workflows. The exact benchmark, baseline, and test conditions still require owner verification, so this page does not infer a response-time figure or a particular measurement method.',
    role: 'I worked directly on the search modernization and the integration of AI-assisted retrieval capabilities within the established platform.',
    ownership: 'Direct technical contribution to search architecture and implementation within a broader product and platform environment.',
    technologies: ['Backend services', 'Search and retrieval', 'AI-assisted engineering', 'Production measurement'],
    verificationTodo: 'Verify the exact definition, baseline, and test conditions for the 99.67% search-performance measurement before publishing.',
  },
  {
    slug: 'high-volume-processing',
    eyebrow: 'Backend platform performance',
    metadataTitle: '100× Processing Performance Improvement | Zach Quintana',
    title: 'Producing a 100× processing-performance improvement',
    summary:
      'Reworked a critical processing path inside a high-volume SaaS messaging platform, producing a measured 100× performance improvement and restoring operating headroom.',
    outcome: '100× processing-performance improvement',
    situation:
      'A critical processing path inside a SaaS messaging platform had become a material bottleneck. The platform handled millions of messages per month, so inefficient processing consumed operating headroom and affected system responsiveness.',
    constraints: [
      'The system was already operating at meaningful production volume.',
      'Correctness and production behavior had to be preserved.',
      'Changes had to fit a broader team-owned platform.',
      'Processing improvements could not destabilize message delivery or dependent workflows.',
      'The solution needed to remain maintainable by the engineering organization.',
    ],
    technicalWork: [
      'Analyzed the processing path and identified unnecessary work and bottlenecks.',
      'Refactored critical code to reduce avoidable processing overhead.',
      'Measured the performance change and validated the result in production.',
      'Coordinated the improvement with surrounding services and workflows.',
    ],
    result:
      'The resulting implementation achieved a measured 100× improvement in processing performance and gave the platform substantially more operating capacity.',
    role: 'I drove architectural and code-level improvements within a broader team-owned and team-operated platform.',
    ownership: 'Direct technical ownership of the processing improvement within a larger team-operated SaaS platform.',
    technologies: ['Backend processing', 'Event-driven architecture', 'Distributed SaaS systems', 'Performance profiling'],
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
