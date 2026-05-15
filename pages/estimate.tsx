import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Form, useForm } from "../components/Form";
import { Checkbox } from "../components/Checkbox";
import { Slider } from "../components/Slider";
import { Button } from "../components/Button";
import { LcarsPanel } from "../components/LcarsPanel";
import { ArrowRight, Calculator, CheckCircle2, RefreshCw } from "lucide-react";
import styles from "./estimate.module.css";

// Schema for the estimator
const estimateSchema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),
  teamSize: z.array(z.number()).min(1),
  duration: z.array(z.number()).min(1),
  complexity: z.enum(["LOW", "MEDIUM", "HIGH"]),
  requirements: z.array(z.string()),
});

const SERVICES = [
  { id: "custom-dev", label: "CUSTOM DEVELOPMENT" },
  { id: "cloud", label: "CLOUD ARCHITECTURE" },
  { id: "ai-ml", label: "AI & MACHINE LEARNING" },
  { id: "integration", label: "ENTERPRISE INTEGRATION" },
  { id: "mobile", label: "MOBILE APPLICATIONS" },
  { id: "data", label: "DATA ENGINEERING" },
];

const REQUIREMENTS = [
  { id: "24-7", label: "24/7 SUPPORT COVERAGE" },
  { id: "audit", label: "SECURITY AUDIT" },
  { id: "training", label: "PERSONNEL TRAINING" },
  { id: "docs", label: "EXTENDED DOCUMENTATION" },
];

export default function EstimatePage() {
  const form = useForm({
    defaultValues: {
      services: [],
      teamSize: [3],
      duration: [6],
      complexity: "MEDIUM" as const,
      requirements: [],
    },
    schema: estimateSchema,
  });

  const [classification, setClassification] = useState("STANDARD");
  const [estimatedHours, setEstimatedHours] = useState(0);

  // Watch form values for real-time updates
  const values = form.values;

  useEffect(() => {
    // Simple calculation logic for demo purposes
    const serviceCount = values.services.length;
    const team = values.teamSize[0];
    const months = values.duration[0];
    const complexityMult =
      values.complexity === "HIGH"
        ? 1.5
        : values.complexity === "MEDIUM"
        ? 1.2
        : 1.0;
    const reqCount = values.requirements.length;

    // Rough calculation: (Team * Months * 160 hours) * Complexity
    // Adjusted by service count slightly
    const baseHours = team * months * 160;
    const total = Math.round(baseHours * complexityMult * (1 + reqCount * 0.05));

    setEstimatedHours(total);

    // Classification logic
    if (months >= 12 || team >= 8) {
      setClassification("ENTERPRISE");
    } else if (months >= 6 || team >= 5) {
      setClassification("LARGE-SCALE");
    } else if (months >= 3 || team >= 3) {
      setClassification("STANDARD");
    } else {
      setClassification("MINOR");
    }
  }, [values]);

  const handleServiceToggle = (id: string) => {
    const current = [...values.services];
    if (current.includes(id)) {
      form.setValues({
        ...values,
        services: current.filter((s) => s !== id),
      });
    } else {
      form.setValues({
        ...values,
        services: [...current, id],
      });
    }
  };

  const handleRequirementToggle = (id: string) => {
    const current = [...values.requirements];
    if (current.includes(id)) {
      form.setValues({
        ...values,
        requirements: current.filter((r) => r !== id),
      });
    } else {
      form.setValues({
        ...values,
        requirements: [...current, id],
      });
    }
  };

  // Construct contact URL with params
  const contactUrl = `/contact?subject=Estimate Inquiry: ${classification}&message=Project Estimate Reference: ${classification} // Services: ${values.services.join(
    ", "
  )} // Team: ${values.teamSize[0]} // Duration: ${values.duration[0]} months`;

  return (
    <>
      <Helmet>
        <title>Mission Planning | COMPND.SYSTEMS</title>
        <meta
          name="description"
          content="Interactive project estimation interface."
        />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>MISSION PLANNING INTERFACE</h1>
        <div className={styles.headerDecor}>ESTIMATION PROTOCOL V2.1</div>
      </div>

      <div className={styles.layout}>
        <div className={styles.formColumn}>
          <Form {...form}>
            <form className={styles.formStack}>
              {/* PHASE 1 */}
              <LcarsPanel title="PHASE 1: MODULE SELECTION" color="primary">
                <div className={styles.panelContent}>
                  <p className={styles.instruction}>
                    SELECT REQUIRED OPERATIONAL CAPABILITIES
                  </p>
                  <div className={styles.checkboxGrid}>
                    {SERVICES.map((service) => (
                      <div
                        key={service.id}
                        className={`${styles.checkboxCard} ${
                          values.services.includes(service.id)
                            ? styles.checked
                            : ""
                        }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className={styles.checkboxHeader}>
                          <Checkbox
                            checked={values.services.includes(service.id)}
                            readOnly
                            tabIndex={-1}
                          />
                          <span className={styles.checkboxLabel}>
                            {service.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                                    {form.errors.services && (
                    <p className={styles.errorMsg}>
                      {String(form.errors.services)}
                    </p>
                  )}
                </div>
              </LcarsPanel>

              {/* PHASE 2 */}
              <LcarsPanel title="PHASE 2: SCOPE PARAMETERS" color="secondary">
                <div className={styles.panelContent}>
                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderHeader}>
                      <label>ENGINEERING TEAM SIZE</label>
                      <span className={styles.sliderValue}>
                        {values.teamSize[0]} PERSONNEL
                      </span>
                    </div>
                    <Slider
                      value={values.teamSize}
                      onValueChange={(val) =>
                        form.setValues({ ...values, teamSize: val })
                      }
                      min={1}
                      max={15}
                      step={1}
                    />
                  </div>

                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderHeader}>
                      <label>MISSION DURATION</label>
                      <span className={styles.sliderValue}>
                        {values.duration[0]} MONTHS
                      </span>
                    </div>
                    <Slider
                      value={values.duration}
                      onValueChange={(val) =>
                        form.setValues({ ...values, duration: val })
                      }
                      min={1}
                      max={24}
                      step={1}
                    />
                  </div>

                  <div className={styles.complexityGroup}>
                    <label className={styles.groupLabel}>
                      SYSTEM COMPLEXITY
                    </label>
                    <div className={styles.complexityOptions}>
                      {["LOW", "MEDIUM", "HIGH"].map((level) => (
                        <button
                          key={level}
                          type="button"
                          className={`${styles.complexityBtn} ${
                            values.complexity === level ? styles.active : ""
                          }`}
                          onClick={() =>
                            form.setValues({
                              ...values,
                              complexity: level as "LOW" | "MEDIUM" | "HIGH",
                            })
                          }
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </LcarsPanel>

              {/* PHASE 3 */}
              <LcarsPanel title="PHASE 3: AUXILIARY SYSTEMS" color="accent">
                <div className={styles.panelContent}>
                  <div className={styles.reqList}>
                    {REQUIREMENTS.map((req) => (
                      <div
                        key={req.id}
                        className={styles.reqItem}
                        onClick={() => handleRequirementToggle(req.id)}
                      >
                        <Checkbox
                          checked={values.requirements.includes(req.id)}
                          readOnly
                        />
                        <span>{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </LcarsPanel>
            </form>
          </Form>
        </div>

        {/* SIDEBAR MONITOR */}
        <div className={styles.monitorColumn}>
          <div className={styles.monitorPanel}>
            <div className={styles.monitorHeader}>
              <Calculator size={20} />
              <span>ESTIMATE PROJECTION</span>
            </div>
            
            <div className={styles.monitorBody}>
              <div className={styles.monitorRow}>
                <span className={styles.monitorLabel}>CLASSIFICATION</span>
                <span className={`${styles.monitorValue} ${styles.highlight}`}>
                  {classification}
                </span>
              </div>
              
              <div className={styles.monitorRow}>
                <span className={styles.monitorLabel}>MODULES</span>
                <span className={styles.monitorValue}>
                  {values.services.length}
                </span>
              </div>

              <div className={styles.monitorRow}>
                <span className={styles.monitorLabel}>TIMELINE</span>
                <span className={styles.monitorValue}>
                  {values.duration[0]} MO
                </span>
              </div>

              <div className={styles.monitorDivider} />

              <div className={styles.monitorTotal}>
                <span className={styles.totalLabel}>EST. EFFORT</span>
                <span className={styles.totalValue}>
                  ~{estimatedHours.toLocaleString()} HRS
                </span>
              </div>

              <div className={styles.monitorVisual}>
                {/* Visual bar representing complexity/load */}
                <div 
                  className={styles.loadBar} 
                  style={{ width: `${Math.min((estimatedHours / 5000) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className={styles.monitorFooter}>
              <Button asChild size="lg" className={styles.submitBtn}>
                <Link to={contactUrl}>
                  INITIATE PROJECT <ArrowRight size={18} />
                </Link>
              </Button>
              <div className={styles.disclaimer}>
                * PRELIMINARY ESTIMATE ONLY. FINAL PARAMETERS SUBJECT TO DETAILED ANALYSIS.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}