import React from "react";
import { Helmet } from "react-helmet";
import { LcarsPanel } from "../components/LcarsPanel";
import { Testimonials } from "../components/Testimonials";
import {
  AboutTeamMemberCard,
  TeamMember,
} from "../components/AboutTeamMemberCard";
import { Award, Users, Globe, Zap } from "lucide-react";
import styles from "./about.module.css";

const teamMembers: TeamMember[] = [
  {
    id: "CMD-01",
    name: "Sarah Chen",
    role: "Chief Architect",
    dept: "Engineering",
    specialization: "Distributed Systems",
    years: 12,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    color: "primary",
  },
  {
    id: "OPS-04",
    name: "Marcus Thorne",
    role: "Operations Lead",
    dept: "DevOps",
    specialization: "Cloud Infrastructure",
    years: 8,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    color: "secondary",
  },
  {
    id: "SCI-02",
    name: "Dr. Elena Vostok",
    role: "Head of AI",
    dept: "Science",
    specialization: "Neural Networks",
    years: 10,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    color: "accent",
  },
  {
    id: "ENG-07",
    name: "David Okonjo",
    role: "Senior Developer",
    dept: "Engineering",
    specialization: "Frontend Architecture",
    years: 6,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    color: "primary",
  },
  {
    id: "SEC-03",
    name: "Aisha Patel",
    role: "Security Officer",
    dept: "Security",
    specialization: "Cybersecurity",
    years: 9,
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    color: "destructive",
  },
  {
    id: "COM-05",
    name: "James Wilson",
    role: "Product Owner",
    dept: "Command",
    specialization: "Product Strategy",
    years: 7,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    color: "secondary",
  },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Personnel | COMPND.SYSTEMS</title>
        <meta name="description" content="Meet the senior officers of COMPND.SYSTEMS." />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>PERSONNEL DATABASE</h1>
        <div className={styles.headerDecor} />
      </div>

      <div className={styles.missionSection}>
        <LcarsPanel title="MISSION PROFILE" color="primary">
          <div className={styles.missionContent}>
            <p className={styles.missionText}>
              TO ENGINEER ROBUST DIGITAL SOLUTIONS THAT ADVANCE HUMAN CAPABILITY.
              WE OPERATE AT THE INTERSECTION OF CREATIVITY AND LOGIC, BUILDING
              SYSTEMS THAT ARE NOT ONLY FUNCTIONAL BUT RESILIENT AGAINST THE
              UNKNOWN CHALLENGES OF TOMORROW.
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <Globe className={styles.statIcon} />
                <div className={styles.statValue}>12+</div>
                <div className={styles.statLabel}>COUNTRIES</div>
              </div>
              <div className={styles.statCard}>
                <Users className={styles.statIcon} />
                <div className={styles.statValue}>45+</div>
                <div className={styles.statLabel}>SPECIALISTS</div>
              </div>
              <div className={styles.statCard}>
                <Zap className={styles.statIcon} />
                <div className={styles.statValue}>200+</div>
                <div className={styles.statLabel}>PROJECTS</div>
              </div>
              <div className={styles.statCard}>
                <Award className={styles.statIcon} />
                <div className={styles.statValue}>15</div>
                <div className={styles.statLabel}>AWARDS</div>
              </div>
            </div>
          </div>
        </LcarsPanel>
      </div>

      <div className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>SENIOR OFFICERS</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <AboutTeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      <div className={styles.spacer} />

            <Testimonials />
    </>
  );
}