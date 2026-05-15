import React from "react";
import {
  Eye,
  Scan,
  Camera,
  Aperture,
  BoxSelect,
  ScanFace,
  FileSearch,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.computer-vision.module.css";

const relatedServices = [
  { label: "PREDICTIVE ANALYTICS", path: "/services/predictive-analytics" },
  { label: "NATURAL LANGUAGE PROCESSING", path: "/services/natural-language-processing" },
  { label: "NEURAL NETWORK DESIGN", path: "/services/neural-network-design" },
];

export default function ComputerVisionPage() {
  return (
    <ServiceDetailTemplate
      title="COMPUTER VISION"
      subtitle="VISUAL DATA INTERPRETATION AND AUTOMATED RECOGNITION"
      serviceId="COMP-VIS"
      description="Empower your systems to 'see' and interpret the world. From quality control on the manufacturing floor to advanced security surveillance, our computer vision algorithms deliver real-time visual intelligence."
      relatedServices={relatedServices}
      color="accent"
    >
      {/* Visual Processing Grid */}
      <LcarsPanel title="VISUAL PROCESSING MODULES" color="accent">
        <div className={styles.modulesGrid}>
          <div className={styles.moduleCard}>
            <BoxSelect className={styles.moduleIcon} />
            <h3>OBJECT DETECTION</h3>
            <p>Real-time identification and tracking of multiple objects in video streams.</p>
          </div>
          <div className={styles.moduleCard}>
            <ScanFace className={styles.moduleIcon} />
            <h3>FACIAL RECOGNITION</h3>
            <p>Secure biometric authentication and demographic analysis.</p>
          </div>
          <div className={styles.moduleCard}>
            <FileSearch className={styles.moduleIcon} />
            <h3>OCR & TEXT</h3>
            <p>Extraction of structured text from documents, signs, and displays.</p>
          </div>
          <div className={styles.moduleCard}>
            <Scan className={styles.moduleIcon} />
            <h3>DEFECT DETECTION</h3>
            <p>Automated visual inspection for manufacturing quality assurance.</p>
          </div>
        </div>
      </LcarsPanel>

      {/* Industry Applications */}
      <LcarsPanel title="SECTOR APPLICATIONS" color="secondary">
        <div className={styles.sectorList}>
          <div className={styles.sectorItem}>
            <div className={styles.sectorHeader}>
              <span className={styles.sectorTitle}>MANUFACTURING</span>
              <div className={styles.sectorLine} />
            </div>
            <p>Automated assembly verification and surface defect analysis.</p>
          </div>
          <div className={styles.sectorItem}>
            <div className={styles.sectorHeader}>
              <span className={styles.sectorTitle}>MEDICAL IMAGING</span>
              <div className={styles.sectorLine} />
            </div>
            <p>Radiology assistance, tumor detection, and cell counting automation.</p>
          </div>
          <div className={styles.sectorItem}>
            <div className={styles.sectorHeader}>
              <span className={styles.sectorTitle}>SECURITY</span>
              <div className={styles.sectorLine} />
            </div>
            <p>Perimeter monitoring, anomaly detection, and access control.</p>
          </div>
        </div>
      </LcarsPanel>

      {/* Edge Deployment */}
      <LcarsPanel title="EDGE DEPLOYMENT ARCHITECTURE" color="muted">
        <div className={styles.edgeSection}>
          <div className={styles.edgeGraphic}>
            <Camera size={40} className={styles.edgeIcon} />
            <div className={styles.edgeConnection} />
            <Aperture size={40} className={styles.edgeIcon} />
            <div className={styles.edgeConnection} />
            <Eye size={40} className={styles.edgeIcon} />
          </div>
          <div className={styles.edgeContent}>
            <h4>LOW LATENCY PROCESSING</h4>
            <p>
              We optimize models for deployment on edge devices (NVIDIA Jetson, Coral TPU, Mobile) to ensure real-time performance without cloud dependency.
            </p>
            <div className={styles.specs}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>INFERENCE</span>
                <span className={styles.specValue}>&lt; 15ms</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ACCURACY</span>
                <span className={styles.specValue}>99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}