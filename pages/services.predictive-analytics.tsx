import React from "react";
import {
  TrendingUp,
  LineChart,
  BarChart,
  Target,
  Activity,
  ArrowRight,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.predictive-analytics.module.css";

const relatedServices = [
  { label: "NATURAL LANGUAGE PROCESSING", path: "/services/natural-language-processing" },
  { label: "COMPUTER VISION", path: "/services/computer-vision" },
  { label: "NEURAL NETWORK DESIGN", path: "/services/neural-network-design" },
];

export default function PredictiveAnalyticsPage() {
  return (
    <ServiceDetailTemplate
      title="PREDICTIVE ANALYTICS"
      subtitle="FORECASTING FUTURE VECTORS FROM HISTORICAL DATA STREAMS"
      serviceId="PRED-ANLY"
      description="Leverage historical data to predict future outcomes with high precision. Our predictive models transform raw data into actionable foresight, enabling proactive decision-making across your enterprise operations."
      relatedServices={relatedServices}
      color="accent"
    >
      {/* Use Cases Grid */}
      <LcarsPanel title="CORE APPLICATIONS" color="accent">
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <TrendingUp className={styles.icon} />
              <span className={styles.cardTitle}>DEMAND FORECASTING</span>
            </div>
            <p className={styles.cardText}>
              Optimize inventory and resource allocation by accurately predicting future demand patterns based on seasonality and market trends.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Activity className={styles.icon} />
              <span className={styles.cardTitle}>CHURN PREDICTION</span>
            </div>
            <p className={styles.cardText}>
              Identify at-risk customers before they leave. Analyze behavioral signals to trigger proactive retention strategies.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Target className={styles.icon} />
              <span className={styles.cardTitle}>RISK ASSESSMENT</span>
            </div>
            <p className={styles.cardText}>
              Quantify potential risks in financial transactions, insurance underwriting, or project management using probabilistic modeling.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <BarChart className={styles.icon} />
              <span className={styles.cardTitle}>PRICING OPTIMIZATION</span>
            </div>
            <p className={styles.cardText}>
              Dynamic pricing models that adjust in real-time to maximize revenue while maintaining competitiveness.
            </p>
          </div>
        </div>
      </LcarsPanel>

      {/* Methodology Comparison */}
      <div className={styles.splitSection}>
        <LcarsPanel title="STATISTICAL MODELS" color="muted" className={styles.halfPanel}>
          <ul className={styles.featureList}>
            <li>ARIMA / SARIMA Time Series</li>
            <li>Exponential Smoothing</li>
            <li>Linear & Logistic Regression</li>
            <li>Bayesian Inference</li>
          </ul>
        </LcarsPanel>
        <LcarsPanel title="MACHINE LEARNING" color="accent" className={styles.halfPanel}>
          <ul className={styles.featureList}>
            <li>Gradient Boosting (XGBoost, LightGBM)</li>
            <li>Random Forests</li>
            <li>Support Vector Machines</li>
            <li>Neural Networks (LSTM, GRU)</li>
          </ul>
        </LcarsPanel>
      </div>

      {/* Pipeline Visualization */}
      <LcarsPanel title="REAL-TIME PREDICTION PIPELINE" color="info">
        <div className={styles.pipelineContainer}>
          <div className={styles.pipelineStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepLabel}>DATA INGESTION</div>
            <div className={styles.stepDesc}>Kafka / Kinesis Streams</div>
          </div>
          <ArrowRight className={styles.pipelineArrow} />
          <div className={styles.pipelineStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepLabel}>FEATURE ENG.</div>
            <div className={styles.stepDesc}>Real-time Transformation</div>
          </div>
          <ArrowRight className={styles.pipelineArrow} />
          <div className={styles.pipelineStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepLabel}>INFERENCE</div>
            <div className={styles.stepDesc}>Model Serving Layer</div>
          </div>
          <ArrowRight className={styles.pipelineArrow} />
          <div className={styles.pipelineStep}>
            <div className={styles.stepNumber}>04</div>
            <div className={styles.stepLabel}>ACTION</div>
            <div className={styles.stepDesc}>Automated Response</div>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}