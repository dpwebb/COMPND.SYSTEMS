import React from "react";
import {
  MessageSquareText,
  Languages,
  FileText,
  Bot,
  BrainCircuit,
  Search,
} from "lucide-react";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { LcarsPanel } from "../components/LcarsPanel";
import styles from "./services.natural-language-processing.module.css";

const relatedServices = [
  { label: "PREDICTIVE ANALYTICS", path: "/services/predictive-analytics" },
  { label: "COMPUTER VISION", path: "/services/computer-vision" },
  { label: "NEURAL NETWORK DESIGN", path: "/services/neural-network-design" },
];

export default function NLPPage() {
  return (
    <ServiceDetailTemplate
      title="NATURAL LANGUAGE PROCESSING"
      subtitle="ADVANCED LINGUISTIC COMPUTATION AND SEMANTIC ANALYSIS"
      serviceId="NLP-CORE"
      description="Unlock the value hidden in unstructured text data. Our NLP solutions bridge the gap between human communication and machine understanding, powering intelligent interfaces and automated analysis at scale."
      relatedServices={relatedServices}
      color="accent"
    >
      {/* Capabilities Grid */}
      <LcarsPanel title="LINGUISTIC CAPABILITIES" color="accent">
        <div className={styles.capabilitiesGrid}>
          <div className={styles.capItem}>
            <MessageSquareText className={styles.capIcon} />
            <div className={styles.capContent}>
              <h4>SENTIMENT ANALYSIS</h4>
              <p>Detect emotional tone and intent in customer feedback and social streams.</p>
            </div>
          </div>
          <div className={styles.capItem}>
            <Search className={styles.capIcon} />
            <div className={styles.capContent}>
              <h4>ENTITY EXTRACTION</h4>
              <p>Automatically identify names, organizations, locations, and custom entities.</p>
            </div>
          </div>
          <div className={styles.capItem}>
            <Languages className={styles.capIcon} />
            <div className={styles.capContent}>
              <h4>MULTI-LANGUAGE</h4>
              <p>Real-time translation and cross-lingual information retrieval.</p>
            </div>
          </div>
          <div className={styles.capItem}>
            <FileText className={styles.capIcon} />
            <div className={styles.capContent}>
              <h4>SUMMARIZATION</h4>
              <p>Condense long documents into concise executive summaries automatically.</p>
            </div>
          </div>
        </div>
      </LcarsPanel>

      {/* LLM Integration */}
      <LcarsPanel title="LARGE LANGUAGE MODEL INTEGRATION" color="info">
        <div className={styles.llmSection}>
          <div className={styles.llmIntro}>
            <BrainCircuit size={48} className={styles.llmIcon} />
            <p>
              We integrate state-of-the-art Foundation Models (GPT-4, Claude, Llama) into your enterprise workflow, ensuring data privacy and domain specificity through RAG (Retrieval-Augmented Generation) and fine-tuning.
            </p>
          </div>
          <div className={styles.techStack}>
            <span className={styles.techBadge}>OpenAI GPT-4</span>
            <span className={styles.techBadge}>Anthropic Claude</span>
            <span className={styles.techBadge}>Meta Llama 3</span>
            <span className={styles.techBadge}>Hugging Face</span>
            <span className={styles.techBadge}>LangChain</span>
            <span className={styles.techBadge}>Vector DBs</span>
          </div>
        </div>
      </LcarsPanel>

      {/* Conversational AI */}
      <LcarsPanel title="CONVERSATIONAL INTERFACES" color="muted">
        <div className={styles.chatSection}>
          <div className={styles.chatVisual}>
            <Bot size={32} className={styles.botIcon} />
            <div className={styles.chatBubble}>
              How can I assist with your system diagnostics today?
            </div>
          </div>
          <div className={styles.chatFeatures}>
            <ul>
              <li>Context-aware dialogue management</li>
              <li>Omnichannel deployment (Web, Mobile, Slack, Teams)</li>
              <li>Seamless human hand-off protocols</li>
              <li>Custom personality and tone calibration</li>
            </ul>
          </div>
        </div>
      </LcarsPanel>
    </ServiceDetailTemplate>
  );
}