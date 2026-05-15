import React from "react";
import {
  Apple,
  Smartphone,
  Maximize,
  ShieldCheck,
  Gauge,
  Palette,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.native-ios-android.module.css";

export default function NativeMobilePage() {
  return (
    <ServiceDetailTemplate
      title="NATIVE IOS / ANDROID"
      subtitle="PLATFORM-SPECIFIC ENGINEERING"
      serviceId="MOB-NATIVE"
      description="When performance is non-negotiable and deep system integration is required. We engineer native applications that fully leverage the distinct capabilities of Apple and Android ecosystems, delivering the highest possible fidelity and user experience."
      color="muted"
      relatedServices={[
        { label: "REACT NATIVE / FLUTTER", path: "/services/react-native-flutter" },
        { label: "OFFLINE ARCHITECTURE", path: "/services/offline-first-architecture" },
        { label: "IOT INTEGRATION", path: "/services/iot-integration" },
      ]}
    >
      {/* Platform Ecosystems */}
      <div className={styles.ecosystemsContainer}>
        <div className={`${styles.platformBlock} ${styles.ios}`}>
          <div className={styles.platformIcon}>
            <Apple size={32} />
          </div>
          <h3 className={styles.platformTitle}>APPLE IOS</h3>
          <div className={styles.techStack}>
            <span className={styles.techBadge}>SWIFT 5</span>
            <span className={styles.techBadge}>SWIFTUI</span>
            <span className={styles.techBadge}>XCODE</span>
            <span className={styles.techBadge}>COCOA TOUCH</span>
          </div>
          <p className={styles.platformDesc}>
            Strict adherence to Human Interface Guidelines ensures a premium, fluid experience. Optimized for the latest iPhone and iPad hardware capabilities including ARKit, CoreML, and Metal.
          </p>
        </div>

        <div className={`${styles.platformBlock} ${styles.android}`}>
          <div className={styles.platformIcon}>
            <Smartphone size={32} />
          </div>
          <h3 className={styles.platformTitle}>ANDROID</h3>
          <div className={styles.techStack}>
            <span className={styles.techBadge}>KOTLIN</span>
            <span className={styles.techBadge}>JETPACK COMPOSE</span>
            <span className={styles.techBadge}>ANDROID STUDIO</span>
            <span className={styles.techBadge}>MATERIAL 3</span>
          </div>
          <p className={styles.platformDesc}>
            Built for the diverse Android ecosystem. We utilize modern Jetpack libraries to ensure compatibility across thousands of device variations while maintaining Material Design standards.
          </p>
        </div>
      </div>

      {/* Performance Metrics */}
      <LcarsPanel title="NATIVE ADVANTAGE" color="muted">
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <Gauge size={24} className={styles.metricIcon} />
            <h4>MAXIMUM PERFORMANCE</h4>
            <p>Direct hardware access without bridge layers. Ideal for 3D rendering, complex computations, and real-time audio processing.</p>
          </div>
          <div className={styles.metricCard}>
            <Maximize size={24} className={styles.metricIcon} />
            <h4>FULL API ACCESS</h4>
            <p>Immediate access to new OS features on day one. No waiting for third-party wrappers or community support.</p>
          </div>
          <div className={styles.metricCard}>
            <ShieldCheck size={24} className={styles.metricIcon} />
            <h4>ENHANCED SECURITY</h4>
            <p>Deep integration with Secure Enclave and Keystore systems for banking-grade data protection and biometric authentication.</p>
          </div>
          <div className={styles.metricCard}>
            <Palette size={24} className={styles.metricIcon} />
            <h4>UX FIDELITY</h4>
            <p>Interactions that feel exactly as the OS manufacturer intended. Standard navigation patterns reduce user cognitive load.</p>
          </div>
        </div>
      </LcarsPanel>

      {/* Store Optimization */}
      <div className={styles.storeSection}>
        <h3 className={styles.storeTitle}>APP STORE OPTIMIZATION (ASO)</h3>
        <div className={styles.storeSteps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>METADATA OPTIMIZATION</h4>
              <p>Keyword targeting and description structuring for maximum discoverability.</p>
            </div>
          </div>
          <div className={styles.stepConnector} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>VISUAL ASSETS</h4>
              <p>High-conversion screenshots and video previews tailored to device sizes.</p>
            </div>
          </div>
          <div className={styles.stepConnector} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>REVIEW MANAGEMENT</h4>
              <p>Strategies for soliciting positive feedback and addressing user concerns.</p>
            </div>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}