import type { AiRating, ConfidenceRating, HealthCheckAnswer, HealthCheckFinding, HealthCheckQuestion, HealthCheckRating, HealthCheckResult, ResilienceRating, RiskRating } from '../types.ts';

type Recommendation = { id: string; title: string; action: string; why: string; priority: number };

export const recommendations: Record<string, Recommendation> = {
  ownership: { id: 'ownership', title: 'Assign clear technology ownership', action: 'Name a business owner and an operational owner for technology decisions, risks, and major providers.', why: 'Clear ownership makes it easier to prioritize investments and respond when something goes wrong.', priority: 8 },
  planning: { id: 'planning', title: 'Create a simple annual technology review', action: 'List critical systems, device ages, expected renewals, known pain points, and likely replacements for the next 12–24 months. Use the review to inform budgeting and priorities.', why: 'Anticipating technology needs reduces surprise costs, rushed purchases, and preventable disruptions without requiring a complex planning process.', priority: 6 },
  alignment: { id: 'alignment', title: 'Connect technology priorities to business goals', action: 'Identify the business outcomes technology must support and review progress with leadership at least quarterly.', why: 'Technology should make important work easier, safer, and more resilient—not become a separate technical agenda.', priority: 5 },
  reliability: { id: 'reliability', title: 'Reduce recurring technology interruptions', action: 'Track the top recurring interruptions, identify their causes, and assign owners and target dates for the highest-impact fixes.', why: 'Frequent small interruptions compound into lost time, frustrated employees, and missed commitments.', priority: 8 },
  documentation: { id: 'documentation', title: 'Reduce key-person dependency', action: 'Document critical processes and technology knowledge, then have someone else practice the most important procedures.', why: 'The business is more resilient when important knowledge is available beyond one person.', priority: 7 },
  mfa: { id: 'mfa', title: 'Protect all important and administrative accounts with MFA', action: 'Require MFA for email, administrator, owner, accounting, backup, domain, cloud, and password-manager accounts.', why: 'A stolen password is much less useful when the most important accounts require a second verification step.', priority: 10 },
  updates: { id: 'updates', title: 'Make updates consistent and visible', action: 'Use automatic updates or a managed process, and review exceptions rather than relying on memory.', why: 'Consistent updates reduce avoidable exposure and unexpected device failures.', priority: 7 },
  'incident-response': { id: 'incident-response', title: 'Clarify how security incidents are handled', action: 'Document who to contact, what to preserve, and what decisions to make if suspicious activity is discovered.', why: 'A calm, practiced response can limit confusion and business impact.', priority: 8 },
  passwords: { id: 'passwords', title: 'Move business passwords into business-controlled access', action: 'Use a business-managed password manager with shared ownership, recovery access, and an offboarding process.', why: 'Business-controlled access protects continuity when employees change roles or leave.', priority: 9 },
  recovery: { id: 'recovery', title: 'Prove that important data can be recovered', action: 'Choose a critical system, perform a restore test, record what worked, and schedule recurring tests.', why: 'A backup is only dependable after the business has successfully restored from it.', priority: 10 },
  continuity: { id: 'continuity', title: 'Document a practical disruption plan', action: 'Define the first actions, owners, communication steps, provider contacts, and recovery priorities for a major interruption.', why: 'A short, usable plan is more valuable than a document nobody can find or use.', priority: 8 },
  lifecycle: { id: 'lifecycle', title: 'Plan the technology lifecycle', action: 'Create a simple replacement schedule for aging devices and systems, tied to budget and business impact.', why: 'Planned replacement is usually less expensive and disruptive than emergency replacement.', priority: 6 },
  inventory: { id: 'inventory', title: 'Create a current technology inventory', action: 'List important devices, software, services, vendors, owners, and renewal or replacement dates.', why: 'You cannot protect, recover, or improve technology you cannot see.', priority: 8 },
  'ai-governance': { id: 'ai-governance', title: 'Set practical AI data-use guidance', action: 'Define approved tools, business use cases, and what company or customer information must not be entered into AI tools.', why: 'Clear guidance lets employees explore useful AI applications without guessing about sensitive information.', priority: 7 },
};

const findingCopy: Record<string, { title: string; why: string; nextStep: string }> = {
  'No clear technology ownership': { title: 'Technology ownership is unclear', why: 'Important decisions, risks, and provider relationships may not have an accountable owner.', nextStep: recommendations.ownership.action },
  'Technology spending is largely reactive': { title: 'Technology spending is largely reactive', why: 'When upcoming needs are not identified early, surprise costs, rushed purchases, and preventable disruptions become more likely.', nextStep: recommendations.planning.action },
  'Frequent technology interruptions': { title: 'Technology interruptions are affecting operations', why: 'Recurring interruptions consume employee time and can affect customer commitments.', nextStep: recommendations.reliability.action },
  'Critical technology knowledge depends on one person': { title: 'Critical technology knowledge depends on one person', why: 'A vacation, departure, or emergency could leave the business unable to resolve an important issue.', nextStep: recommendations.documentation.action },
  'Administrative accounts lack MFA protection': { title: 'Administrative accounts may lack MFA protection', why: 'A compromised administrator or owner password can affect many business systems at once.', nextStep: recommendations.mfa.action },
  'Backups have never been restore-tested': { title: 'Backups may not be recoverable', why: 'The existence of a backup does not prove that important data can be restored when needed.', nextStep: recommendations.recovery.action },
  'Important systems or data are not consistently backed up': { title: 'Important systems or data may not be consistently backed up', why: 'A failure or security incident could leave the business without a usable recovery path.', nextStep: recommendations.recovery.action },
  'Essential operations may take more than a week to recover': { title: 'Recovery may take longer than the business can tolerate', why: 'A prolonged outage can affect revenue, customers, employees, and reputation.', nextStep: recommendations.continuity.action },
  'No documented disruption plan': { title: 'There is no documented disruption plan', why: 'People may lose valuable time deciding who acts, who communicates, and what gets restored first.', nextStep: recommendations.continuity.action },
  'Passwords are shared through insecure channels': { title: 'Some passwords are shared insecurely', why: 'Shared passwords are difficult to protect, revoke, and attribute to a specific person.', nextStep: recommendations.passwords.action },
  'AI use is not governed by company guidance': { title: 'AI use is happening without clear guidance', why: 'Employees may unknowingly put company or customer information into tools that the business has not reviewed.', nextStep: recommendations['ai-governance'].action },
};

const fallbackFinding = (signal: string): { title: string; why: string; nextStep: string } => ({
  title: signal,
  why: 'This answer indicates an area where the business may have avoidable technology or operational exposure.',
  nextStep: 'Review this area with the person responsible for technology and decide whether additional evidence is needed.',
});

const priorityRecommendationMap: Record<string, string> = {
  reliability: 'reliability',
  security: 'mfa',
  productivity: 'alignment',
  cost: 'planning',
  planning: 'planning',
  recovery: 'recovery',
};

function average(values: number[]): number { return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0; }
function rating(score: number): HealthCheckRating { return score >= 80 ? 'Healthy Foundation' : score >= 65 ? 'Generally Healthy, With Gaps' : score >= 45 ? 'Needs Attention' : score >= 25 ? 'Elevated Risk' : 'High Risk'; }
function riskRating(score: number): RiskRating { return score < 20 ? 'Low' : score < 45 ? 'Moderate' : score < 70 ? 'Elevated' : 'High'; }
function resilienceRating(score: number): ResilienceRating { return score >= 80 ? 'Strong' : score >= 60 ? 'Adequate' : score >= 35 ? 'Fragile' : 'High Concern'; }
function confidenceRating(score: number): ConfidenceRating { return score >= 70 ? 'High' : score >= 45 ? 'Medium' : 'Low'; }
function aiRating(score: number, unmanaged: boolean): AiRating { return unmanaged ? 'Unmanaged Adoption' : score >= 80 ? 'Governed and Advancing' : score >= 60 ? 'Ready to Experiment' : score >= 35 ? 'Emerging Opportunity' : 'Foundational Work Needed'; }

export function calculateHealthCheckResult(questions: HealthCheckQuestion[], answers: Record<string, HealthCheckAnswer>): HealthCheckResult {
  const visible = questions.filter((question) => answers[question.id]);
  const dimensions = ['health', 'risk', 'resilience', 'confidence', 'ai'] as const;
  const scores = Object.fromEntries(dimensions.map((dimension) => [dimension, 0])) as Record<typeof dimensions[number], number>;
  const totals = Object.fromEntries(dimensions.map((dimension) => [dimension, 0])) as Record<typeof dimensions[number], number>;
  const strengths: HealthCheckResult['strengths'] = [];
  const findings: HealthCheckFinding[] = [];
  const recommendationIds: string[] = [];
  let unmanagedAi = false;

  for (const question of visible) {
    const answer = answers[question.id];
    const selected = question.options.find((option) => option.id === answer.optionId);
    if (!selected) continue;
    const weight = question.weight ?? 1;
    for (const dimension of dimensions) {
      if (typeof selected.scores[dimension] === 'number') {
        scores[dimension] += (selected.scores[dimension] ?? 0) * weight;
        totals[dimension] += 4 * weight;
      }
    }
    if (selected.strengthSignal) strengths.push({ title: selected.strengthSignal, detail: question.question, questionId: question.id });
    if (selected.riskSignal) {
      const copy = findingCopy[selected.riskSignal] ?? fallbackFinding(selected.riskSignal);
      findings.push({ id: `${question.id}-${selected.id}`, title: copy.title, why: copy.why, nextStep: copy.nextStep, severity: (selected.scores.risk ?? 0) >= 4 ? 'high' : 'moderate', questionId: question.id });
    }
    for (const signal of selected.recommendationSignals ?? []) if (!recommendationIds.includes(signal)) recommendationIds.push(signal);
    if (question.id === 'ai-use' && selected.id === 'independent') unmanagedAi = true;
  }
  const normalized = (dimension: typeof dimensions[number]) => totals[dimension] ? Math.round((scores[dimension] / totals[dimension]) * 100) : 0;
  const healthScore = normalized('health');
  const riskScore = normalized('risk');
  const resilienceScore = normalized('resilience');
  const confidenceScore = normalized('confidence');
  const aiScore = normalized('ai');
  const priorityArea = answers['priority-area']?.optionId;
  if (priorityArea && priorityRecommendationMap[priorityArea]) recommendationIds.unshift(priorityRecommendationMap[priorityArea]);
  const uniqueRecommendations = recommendationIds.filter((id, index, all) => all.indexOf(id) === index && recommendations[id]).sort((a, b) => recommendations[b].priority - recommendations[a].priority).slice(0, 3);
  const prioritizedFindings = findings.sort((a, b) => (b.severity === 'high' ? 1 : 0) - (a.severity === 'high' ? 1 : 0));
  return { healthScore, healthRating: rating(healthScore), risk: riskRating(riskScore), resilience: resilienceRating(resilienceScore), confidence: confidenceRating(confidenceScore), aiReadiness: aiRating(aiScore, unmanagedAi), strengths: strengths.slice(0, 3), findings: prioritizedFindings.slice(0, 3), recommendationIds: uniqueRecommendations, priorityArea };
}

export function getRecommendation(id: string): Recommendation | undefined { return recommendations[id]; }
