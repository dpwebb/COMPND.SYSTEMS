import React from "react";
import { Badge } from "./Badge";
import styles from "./AboutTeamMemberCard.module.css";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  specialization: string;
  years: number;
  image: string;
  color: "primary" | "secondary" | "accent" | "destructive";
}

interface AboutTeamMemberCardProps {
  member: TeamMember;
}

export const AboutTeamMemberCard = ({ member }: AboutTeamMemberCardProps) => {
  return (
    <div className={`${styles.memberCard} ${styles[member.color]}`}>
      <div className={styles.cardHeader}>
        <span className={styles.memberId}>{member.id}</span>
        <div className={styles.headerBar} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.memberInfo}>
          <h3 className={styles.memberName}>{member.name}</h3>
          <p className={styles.memberRole}>{member.role}</p>
          <div className={styles.badges}>
            <Badge variant="outline" className={styles.badge}>
              {member.dept}
            </Badge>
            <Badge variant="secondary" className={styles.badge}>
              {member.years} YRS EXP
            </Badge>
          </div>
          <div className={styles.specBox}>
            <span className={styles.specLabel}>SPEC:</span>
            <span className={styles.specValue}>{member.specialization}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageFrame}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.image}
            />
            {/* LCARS decorative elements for the frame */}
            <div className={styles.frameDecorationTop} />
            <div className={styles.frameDecorationBottom} />
          </div>
        </div>
      </div>
    </div>
  );
};