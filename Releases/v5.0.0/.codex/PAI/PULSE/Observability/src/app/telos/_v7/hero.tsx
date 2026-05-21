"use client";

import type { ReactNode } from "react";
import type { Telos } from "./data";
import type { TweakVals } from "./tweaks";
import { DimensionRing } from "./rings";

// Hero — narrative + 6 Current-Ideal gap rings.

interface TraceTextProps {
  id: string | null | undefined;
  children: ReactNode;
  cls?: string;
  showIds: boolean;
  onTrace: (id: string | null) => void;
}

interface NarrativeProps {
  telos: Telos;
  tone?: TweakVals["narrativeTone"];
  showIds: boolean;
  onTrace: (id: string | null) => void;
}

interface HeroProps {
  telos: Telos;
  tone: TweakVals["narrativeTone"];
  showIds: boolean;
  onTrace: (id: string | null) => void;
}

type MoodDimension = Telos["dimensions"][number];

interface MoodDimensions {
  positive: MoodDimension;
  flat: MoodDimension;
  negative: MoodDimension;
}

function TraceText({ id, children, cls, showIds, onTrace }: TraceTextProps) {
  return (
    <span className={'n-trace '+(cls||'')} role="button" tabIndex={0} onClick={()=>onTrace(id ?? null)}>
      {children}{showIds && id && <span className="n-id mono">{id}</span>}
    </span>
  );
}

function pickMoodDimensions(dimensions: readonly MoodDimension[]): MoodDimensions | null {
  if (dimensions.length < 3) {
    // Fewer than three dimensions cannot support a climbing/steady/drifting trio.
    return null;
  }
  let positive: MoodDimension | null = null;
  let flat: MoodDimension | null = null;
  let negative: MoodDimension | null = null;
  for (const dimension of dimensions) {
    if (dimension.velo > 0 && (!positive || dimension.velo > positive.velo)) {
      positive = dimension;
    }
    if (!flat || Math.abs(dimension.velo) < Math.abs(flat.velo)) {
      flat = dimension;
    }
    if (dimension.velo < 0 && (!negative || dimension.velo < negative.velo)) {
      negative = dimension;
    }
  }
  if (!positive || !negative || !flat) {
    // If all velocities share one sign, omit the mood line instead of inventing contrast.
    return null;
  }
  return { positive, flat, negative };
}

function buildMoodLine(dimensions: readonly MoodDimension[]): string | null {
  const moodDimensions = pickMoodDimensions(dimensions);
  return moodDimensions
    ? `${moodDimensions.positive.label.toLowerCase()} climbing. ${moodDimensions.flat.label.toLowerCase()} steady. ${moodDimensions.negative.label.toLowerCase()} drifting.`
    : null;
}

function Narrative({ telos, tone='operator', showIds, onTrace }: NarrativeProps) {
  const n = telos.narrativeSeed;
  const work = telos.projects.flatMap(p=>p.work).find(w=>w.id===n.current_work);
  const strat = telos.strategies.find(s=>s.id===n.via_strategy);
  const chal  = telos.challenges.find(c=>c.id===n.addresses);
  const goal  = telos.goals.find(g=>g.id===n.moves_goal);
  const miss  = telos.missions.find(m=>m.id===n.serves_mission);
  const prob  = telos.problems.find(p=>(miss?.addresses||[]).includes(p.id));

  if (!work || !strat || !chal || !goal || !miss) return null;

  const strategyTitle = strat.title.toLowerCase();
  const challengeTitle = chal.title.toLowerCase();
  const goalTitle = goal.title.toLowerCase();
  const missionTitle = miss.title.toLowerCase();
  const problemTitle = prob?.title.toLowerCase();
  const moodLine = buildMoodLine(telos.dimensions);

  const Trace = ({ id, children, cls }: Omit<TraceTextProps, "showIds" | "onTrace">) => (
    <TraceText id={id} cls={cls} showIds={showIds} onTrace={onTrace}>{children}</TraceText>
  );

  if (tone === 'terse') {
    return (
      <p className="narrative">
        <Trace id={null} cls="n-accent">{n.days_into}</Trace> {n.push_name}.{' '}
        <Trace id={work.id} cls="n-accent">{work.title.toLowerCase()}</Trace> —{' '}
        <Trace id={strat.id} cls="n-soft">{strategyTitle}</Trace>,{' '}
        <Trace id={chal.id} cls="n-warm">{challengeTitle}</Trace>.
      </p>
    );
  }

  return (
    <p className="narrative">
      You&rsquo;re <span className="n-accent">{n.days_into} days</span> into the <span className="n-accent">{n.push_name}</span>.
      {' '}Right now you&rsquo;re on <Trace id={work.id} cls="n-accent">{work.title.toLowerCase()}</Trace> —
      a <Trace id={strat.id} cls="n-soft">{strategyTitle}</Trace> move,
      pressing on <Trace id={chal.id} cls="n-warm">{challengeTitle}</Trace>.
      {' '}It pushes <Trace id={goal.id} cls="n-soft">{goalTitle}</Trace> forward,
      serves <Trace id={miss.id} cls="n-warm">{missionTitle}</Trace>
      {problemTitle && (
        <>
          , and pulls at <Trace id={prob?.id} cls="n-warm">{problemTitle}</Trace>
        </>
      )}.
      {moodLine && <> {' '}<span className="n-quiet">{moodLine}</span></>}
    </p>
  );
}

export function Hero({ telos, tone, showIds, onTrace }: HeroProps) {
  const green = telos.projects.filter(p=>p.status==='green').length;
  const amber = telos.projects.filter(p=>p.status==='amber').length;
  const red   = telos.projects.filter(p=>p.status==='red').length;
  const wip   = telos.projects.reduce((a,p)=>a+p.work.length,0);

  return (
    <section className="hero">
      <div className="hero-date">
        <span className="hero-date-day">{telos.owner.day}</span>
        <span className="hero-streak">
          <span className="hero-streak-flame">◆</span>
          <span>{telos.owner.streak} days in a row</span>
        </span>
        <span className="hero-date-meta">· 09:14</span>
      </div>

      <Narrative telos={telos} tone={tone} showIds={showIds} onTrace={onTrace}/>

      <p className="hero-sub">
        {green} moving well. {amber} need{amber===1?'s':''} attention.
        {red > 0 && <> {red===1?'One is':`${red} are`} stuck.</>}
        {' '}<span className="hero-sub-soft">{wip} threads in flight · cap is 2.</span>
      </p>

      <div className="ideal-head">
        <div className="ideal-head-l">
          <span className="ideal-label">Current vs Ideal</span>
          <span className="ideal-horizon">{telos.idealState.horizon}</span>
        </div>
        <span className="ideal-note">{telos.idealState.note}</span>
      </div>

      <div className="hero-rings">
        {telos.dimensions.map(d=>(
          <DimensionRing key={d.id} d={d} onClick={()=>onTrace(d.id)}/>
        ))}
      </div>

      <div className="hero-snapshot">
        {telos.snapshot.map(s=>{
          const label =
            s.id==='mood'   ? (s.v>=7?'steady':s.v>=5?'mixed':'low') :
            s.id==='energy' ? `${s.v.toFixed(0)} / 10` :
                              (s.v>=8?'sharp':s.v>=6?'clear':'scattered');
          return (
            <div key={s.id} className="snap">
              <span className="snap-dot" style={{background:`var(${s.id==='mood'?'--freedom':s.id==='energy'?'--money':'--creative'})`,opacity:0.35 + (s.v/s.of)*0.65}}/>
              <span className="snap-label">{s.label}</span>
              <span className="snap-sep">·</span>
              <span className="snap-value">{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
