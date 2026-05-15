import React from "react";
import {
  Smartphone,
  Code2,
  Zap,
  Layers,
  RefreshCw,
  Cpu,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.react-native-flutter.module.css";

export default function ReactNativeFlutterPage() {
  return (
    <ServiceDetailTemplate
      title="REACT NATIVE / FLUTTER"
      subtitle="CROSS-PLATFORM MOBILE DEVELOPMENT FRAMEWORKS"
      serviceId="MOB-XPLAT"
      description="Maximize efficiency with unified codebases that deploy to both iOS and Android ecosystems. We leverage industry-leading frameworks to deliver near-native performance while significantly reducing development time and maintenance overhead."
      color="muted"
      relatedServices={[
        { label: "NATIVE IOS / ANDROID", path: "/services/native-ios-android" },
        { label: "OFFLINE ARCHITECTURE", path: "/services/offline-first-architecture" },
        { label: "IOT INTEGRATION", path: "/services/iot-integration" },
      ]}
    >
      {/* Framework Comparison Section */}
      <div className={styles.comparisonSection}>
        <div className={styles.frameworkCard}>
          <div className={styles.frameworkHeader}>
            <Code2 size={24} />
            <h3>REACT NATIVE</h3>
          </div>
          <div className={styles.frameworkSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>LANGUAGE</span>
              <span className={styles.specValue}>TypeScript / JavaScript</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RENDERING</span>
              <span className={styles.specValue}>Native Components</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>ECOSYSTEM</span>
              <span className={styles.specValue}>NPM / Node.js</span>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li>Over-the-air updates (CodePush)</li>
            <li>Massive community library support</li>
            <li>Seamless web code sharing</li>
          </ul>
        </div>

        <div className={styles.vsBadge}>VS</div>

        <div className={styles.frameworkCard}>
          <div className={styles.frameworkHeader}>
            <Layers size={24} />
            <h3>FLUTTER</h3>
          </div>
          <div className={styles.frameworkSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>LANGUAGE</span>
              <span className={styles.specValue}>Dart</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RENDERING</span>
              <span className={styles.specValue}>Skia Engine (Canvas)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>ECOSYSTEM</span>
              <span className={styles.specValue}>Pub.dev</span>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li>Pixel-perfect consistency</li>
            <li>Superior animation performance</li>
            <li>Built-in widget catalog</li>
          </ul>
        </div>
      </div>

      {/* Core Benefits Grid */}
      <LcarsPanel title="OPERATIONAL ADVANTAGES" color="muted">
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitItem}>
            <RefreshCw className={styles.benefitIcon} size={24} />
            <h4>HOT RELOAD</h4>
            <p>Instant feedback loop accelerates UI development cycles by 40-50% compared to traditional compilation.</p>
          </div>
          <div className={styles.benefitItem}>
            <Smartphone className={styles.benefitIcon} size={24} />
            <h4>SINGLE CODEBASE</h4>
            <p>Share up to 90% of code between platforms, ensuring feature parity and synchronized release schedules.</p>
          </div>
          <div className={styles.benefitItem}>
            <Cpu className={styles.benefitIcon} size={24} />
            <h4>NATIVE MODULES</h4>
            <p>Direct bridges to platform-specific APIs allow for high-performance native functionality when required.</p>
          </div>
          <div className={styles.benefitItem}>
            <Zap className={styles.benefitIcon} size={24} />
            <h4>PERFORMANCE</h4>
            <p>Modern engines (Hermes for RN, Impeller for Flutter) deliver 60fps performance on mid-range devices.</p>
          </div>
        </div>
      </LcarsPanel>

      {/* Decision Matrix */}
      <div className={styles.decisionMatrix}>
        <h3 className={styles.matrixTitle}>SELECTION PROTOCOL</h3>
        <div className={styles.matrixGrid}>
          <div className={styles.matrixRow}>
            <span className={styles.matrixLabel}>Complex Animations</span>
            <div className={styles.matrixBar}>
              <div className={styles.barFill} style={{ width: "90%" }}>FLUTTER PREFERRED</div>
            </div>
          </div>
          <div className={styles.matrixRow}>
            <span className={styles.matrixLabel}>Web Integration</span>
            <div className={styles.matrixBar}>
              <div className={styles.barFill} style={{ width: "85%" }}>REACT NATIVE PREFERRED</div>
            </div>
          </div>
          <div className={styles.matrixRow}>
            <span className={styles.matrixLabel}>OS Look & Feel</span>
            <div className={styles.matrixBar}>
              <div className={styles.barFill} style={{ width: "75%" }}>REACT NATIVE PREFERRED</div>
            </div>
          </div>
          <div className={styles.matrixRow}>
            <span className={styles.matrixLabel}>Custom UI Design</span>
            <div className={styles.matrixBar}>
              <div className={styles.barFill} style={{ width: "95%" }}>FLUTTER PREFERRED</div>
            </div>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}