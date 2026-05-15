import React from "react";
import {
  Bluetooth,
  Wifi,
  Radio,
  Activity,
  Home,
  Factory,
  Watch,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.iot-integration.module.css";

export default function IoTIntegrationPage() {
  return (
    <ServiceDetailTemplate
      title="IOT INTEGRATION"
      subtitle="CONNECTED DEVICE ECOSYSTEMS"
      serviceId="MOB-IOT"
      description="Transform mobile devices into powerful command centers for the physical world. We build secure, low-latency bridges between mobile applications and smart hardware, enabling real-time monitoring, control, and data visualization."
      color="muted"
      relatedServices={[
        { label: "REACT NATIVE / FLUTTER", path: "/services/react-native-flutter" },
        { label: "NATIVE IOS / ANDROID", path: "/services/native-ios-android" },
        { label: "OFFLINE ARCHITECTURE", path: "/services/offline-first-architecture" },
      ]}
    >
      {/* Protocol Grid */}
      <div className={styles.protocolGrid}>
        <div className={styles.protocolCard}>
          <Bluetooth size={32} className={styles.protocolIcon} />
          <h3>BLE / BLUETOOTH 5</h3>
          <p>Low-energy communication for wearables and proximity sensors. Direct device-to-device pairing.</p>
        </div>
        <div className={styles.protocolCard}>
          <Wifi size={32} className={styles.protocolIcon} />
          <h3>MQTT / COAP</h3>
          <p>Lightweight messaging protocols optimized for unreliable networks and constrained devices.</p>
        </div>
        <div className={styles.protocolCard}>
          <Radio size={32} className={styles.protocolIcon} />
          <h3>NFC / RFID</h3>
          <p>Secure short-range communication for payments, access control, and rapid pairing.</p>
        </div>
      </div>

      {/* Data Visualization Demo */}
      <LcarsPanel title="SENSOR TELEMETRY" color="muted">
        <div className={styles.telemetryContainer}>
          <div className={styles.chartArea}>
            <div className={styles.chartGrid}>
              <div className={styles.chartLine} />
              <div className={styles.chartPoint} style={{ left: "20%", top: "60%" }} />
              <div className={styles.chartPoint} style={{ left: "40%", top: "30%" }} />
              <div className={styles.chartPoint} style={{ left: "60%", top: "45%" }} />
              <div className={styles.chartPoint} style={{ left: "80%", top: "20%" }} />
            </div>
            <div className={styles.chartLabels}>
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
            </div>
          </div>
          <div className={styles.telemetryStats}>
            <div className={styles.statRow}>
              <Activity size={16} />
              <span className={styles.statLabel}>SIGNAL STRENGTH</span>
              <span className={styles.statValue}>-42 dBm</span>
            </div>
            <div className={styles.statRow}>
              <Activity size={16} />
              <span className={styles.statLabel}>PACKET LOSS</span>
              <span className={styles.statValue}>0.02%</span>
            </div>
            <div className={styles.statRow}>
              <Activity size={16} />
              <span className={styles.statLabel}>LATENCY</span>
              <span className={styles.statValue}>12ms</span>
            </div>
          </div>
        </div>
      </LcarsPanel>

      {/* Use Cases */}
      <div className={styles.useCases}>
        <h3 className={styles.sectionTitle}>APPLICATION SECTORS</h3>
        <div className={styles.sectorList}>
          <div className={styles.sectorItem}>
            <div className={styles.sectorIcon}>
              <Home size={24} />
            </div>
            <div className={styles.sectorContent}>
              <h4>SMART HOME</h4>
              <p>Unified control interfaces for lighting, HVAC, security, and entertainment systems.</p>
            </div>
          </div>
          <div className={styles.sectorItem}>
            <div className={styles.sectorIcon}>
              <Watch size={24} />
            </div>
            <div className={styles.sectorContent}>
              <h4>WEARABLES</h4>
              <p>Health data synchronization and companion apps for fitness trackers and medical devices.</p>
            </div>
          </div>
          <div className={styles.sectorItem}>
            <div className={styles.sectorIcon}>
              <Factory size={24} />
            </div>
            <div className={styles.sectorContent}>
              <h4>INDUSTRIAL IOT</h4>
              <p>Field maintenance tools, asset tracking, and machine diagnostics for Industry 4.0.</p>
            </div>
          </div>
        </div>
      </div>
    </ServiceDetailTemplate>
  );
}