import React from "react";
import {
  Network,
  BrainCircuit,
  Cpu,
  Layers,
  Share2,
  Zap,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.neural-network-design.module.css";

const relatedServices = [
  { label: "PREDICTIVE ANALYTICS", path: "/services/predictive-analytics" },
  { label: "NATURAL LANGUAGE PROCESSING", path: "/services/natural-language-processing" },
  { label: "COMPUTER VISION", path: "/services/computer-vision" },
];

export default function NeuralNetworkPage() {
  return (
    <ServiceDetailTemplate
      title="NEURAL NETWORK DESIGN"
      subtitle="CUSTOM DEEP LEARNING ARCHITECTURES AND OPTIMIZATION"
      serviceId="NEURO-NET"
      description="Bespoke neural architectures designed for your specific problem space. We move beyond off-the-shelf models to build high-performance deep learning systems optimized for your unique data and constraints."
      relatedServices={relatedServices}
      color="accent"
    >
      {/* Architecture Types */}
      <LcarsPanel title="ARCHITECTURE SPECIALIZATIONS" color="accent">
        <div className={styles.archGrid}>
          <div className={styles.archItem}>
            <Layers className={styles.archIcon} />
            <div className={styles.archInfo}>
              <h4>CNN</h4>
              <p>Convolutional Neural Networks for spatial data and imagery.</p>
            </div>
          </div>
          <div className={styles.archItem}>
            <Share2 className={styles.archIcon} />
            <div className={styles.archInfo}>
              <h4>RNN / LSTM</h4>
              <p>Recurrent networks for sequential and time-series data.</p>
            </div>
          </div>
          <div className={styles.archItem}>
            <BrainCircuit className={styles.archIcon} />
            <div className={styles.archInfo}>
              <h4>TRANSFORMERS</h4>
              <p>Attention-based models for complex sequence modeling.</p>
            </div>
          </div>
          <div className={styles.archItem}>
            <Network className={styles.archIcon} />
            <div className={styles.archInfo}>
              <h4>GANs</h4>
              <p>Generative Adversarial Networks for synthetic data creation.</p>
            </div>
          </div>
        </div>
      </LcarsPanel>

      {/* Frameworks & Infra */}
      <div className={styles.splitSection}>
        <LcarsPanel title="FRAMEWORKS" color="info" className={styles.halfPanel}>
          <div className={styles.tagCloud}>
            <span className={styles.tag}>TensorFlow</span>
            <span className={styles.tag}>PyTorch</span>
            <span className={styles.tag}>Keras</span>
            <span className={styles.tag}>JAX</span>
            <span className={styles.tag}>MXNet</span>
          </div>
        </LcarsPanel>
        <LcarsPanel title="INFRASTRUCTURE" color="secondary" className={styles.halfPanel}>
          <div className={styles.infraList}>
            <div className={styles.infraItem}>
              <Cpu size={16} /> GPU Cluster Orchestration
            </div>
            <div className={styles.infraItem}>
              <Zap size={16} /> TPU Optimization
            </div>
            <div className={styles.infraItem}>
              <Layers size={16} /> Distributed Training
            </div>
          </div>
        </LcarsPanel>
      </div>

      {/* Deployment */}
      <LcarsPanel title="MODEL SERVING & DEPLOYMENT" color="muted">
        <div className={styles.deploySection}>
          <p className={styles.deployText}>
            We ensure your models perform in production with enterprise-grade serving infrastructure.
          </p>
          <div className={styles.deployGrid}>
            <div className={styles.deployCard}>
              <span className={styles.deployTitle}>ONNX RUNTIME</span>
              <span className={styles.deployDesc}>Cross-platform interoperability</span>
            </div>
            <div className={styles.deployCard}>
              <span className={styles.deployTitle}>TENSORFLOW SERVING</span>
              <span className={styles.deployDesc}>High-performance gRPC endpoints</span>
            </div>
            <div className={styles.deployCard}>
              <span className={styles.deployTitle}>TORCHSERVE</span>
              <span className={styles.deployDesc}>Scalable PyTorch model serving</span>
            </div>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}