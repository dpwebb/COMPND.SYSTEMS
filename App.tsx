import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import PageLayout_0 from "./pages/$.pageLayout.tsx";
import PageLayout_1 from "./pages/blog.pageLayout.tsx";
import PageLayout_2 from "./pages/about.pageLayout.tsx";
import PageLayout_3 from "./pages/_index.pageLayout.tsx";
import PageLayout_4 from "./pages/contact.pageLayout.tsx";
import PageLayout_5 from "./pages/estimate.pageLayout.tsx";
import PageLayout_6 from "./pages/services.pageLayout.tsx";
import PageLayout_7 from "./pages/software.pageLayout.tsx";
import PageLayout_8 from "./pages/case-studies.pageLayout.tsx";
import PageLayout_9 from "./pages/services.etl-pipelines.pageLayout.tsx";
import PageLayout_10 from "./pages/services.api-management.pageLayout.tsx";
import PageLayout_11 from "./pages/services.computer-vision.pageLayout.tsx";
import PageLayout_12 from "./pages/services.iot-integration.pageLayout.tsx";
import PageLayout_13 from "./pages/services.legacy-bridging.pageLayout.tsx";
import PageLayout_14 from "./pages/services.ci-cd-automation.pageLayout.tsx";
import PageLayout_15 from "./pages/services.data-warehousing.pageLayout.tsx";
import PageLayout_16 from "./pages/services.esb-implementation.pageLayout.tsx";
import PageLayout_17 from "./pages/services.native-ios-android.pageLayout.tsx";
import PageLayout_18 from "./pages/services.big-data-processing.pageLayout.tsx";
import PageLayout_19 from "./pages/services.real-time-analytics.pageLayout.tsx";
import PageLayout_20 from "./pages/services.security-compliance.pageLayout.tsx";
import PageLayout_21 from "./pages/services.data-synchronization.pageLayout.tsx";
import PageLayout_22 from "./pages/services.multi-cloud-strategy.pageLayout.tsx";
import PageLayout_23 from "./pages/services.predictive-analytics.pageLayout.tsx";
import PageLayout_24 from "./pages/services.react-native-flutter.pageLayout.tsx";
import PageLayout_25 from "./pages/services.neural-network-design.pageLayout.tsx";
import PageLayout_26 from "./pages/services.full-cycle-development.pageLayout.tsx";
import PageLayout_27 from "./pages/services.infrastructure-as-code.pageLayout.tsx";
import PageLayout_28 from "./pages/services.offline-first-architecture.pageLayout.tsx";
import PageLayout_29 from "./pages/services.legacy-system-modernization.pageLayout.tsx";
import PageLayout_30 from "./pages/services.natural-language-processing.pageLayout.tsx";
import PageLayout_31 from "./pages/services.microservices-implementation.pageLayout.tsx";
import PageLayout_32 from "./pages/services.high-performance-architecture.pageLayout.tsx";
import PageLayout_33 from "./pages/admin.autonomy.pageLayout.tsx";

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    setTimeout(cb, 1);
  };
}

import "./base.css";

const Page_0 = lazy(() => import("./pages/$.tsx"));
const Page_1 = lazy(() => import("./pages/blog.tsx"));
const Page_2 = lazy(() => import("./pages/about.tsx"));
const Page_3 = lazy(() => import("./pages/_index.tsx"));
const Page_4 = lazy(() => import("./pages/contact.tsx"));
const Page_5 = lazy(() => import("./pages/estimate.tsx"));
const Page_6 = lazy(() => import("./pages/services.tsx"));
const Page_7 = lazy(() => import("./pages/software.tsx"));
const Page_8 = lazy(() => import("./pages/case-studies.tsx"));
const Page_9 = lazy(() => import("./pages/services.etl-pipelines.tsx"));
const Page_10 = lazy(() => import("./pages/services.api-management.tsx"));
const Page_11 = lazy(() => import("./pages/services.computer-vision.tsx"));
const Page_12 = lazy(() => import("./pages/services.iot-integration.tsx"));
const Page_13 = lazy(() => import("./pages/services.legacy-bridging.tsx"));
const Page_14 = lazy(() => import("./pages/services.ci-cd-automation.tsx"));
const Page_15 = lazy(() => import("./pages/services.data-warehousing.tsx"));
const Page_16 = lazy(() => import("./pages/services.esb-implementation.tsx"));
const Page_17 = lazy(() => import("./pages/services.native-ios-android.tsx"));
const Page_18 = lazy(() => import("./pages/services.big-data-processing.tsx"));
const Page_19 = lazy(() => import("./pages/services.real-time-analytics.tsx"));
const Page_20 = lazy(() => import("./pages/services.security-compliance.tsx"));
const Page_21 = lazy(() => import("./pages/services.data-synchronization.tsx"));
const Page_22 = lazy(() => import("./pages/services.multi-cloud-strategy.tsx"));
const Page_23 = lazy(() => import("./pages/services.predictive-analytics.tsx"));
const Page_24 = lazy(() => import("./pages/services.react-native-flutter.tsx"));
const Page_25 = lazy(() => import("./pages/services.neural-network-design.tsx"));
const Page_26 = lazy(() => import("./pages/services.full-cycle-development.tsx"));
const Page_27 = lazy(() => import("./pages/services.infrastructure-as-code.tsx"));
const Page_28 = lazy(() => import("./pages/services.offline-first-architecture.tsx"));
const Page_29 = lazy(() => import("./pages/services.legacy-system-modernization.tsx"));
const Page_30 = lazy(() => import("./pages/services.natural-language-processing.tsx"));
const Page_31 = lazy(() => import("./pages/services.microservices-implementation.tsx"));
const Page_32 = lazy(() => import("./pages/services.high-performance-architecture.tsx"));
const Page_33 = lazy(() => import("./pages/admin.autonomy.tsx"));

const fileNameToRoute = new Map([["./pages/$.tsx","/*"],["./pages/blog.tsx","/blog"],["./pages/about.tsx","/about"],["./pages/_index.tsx","/"],["./pages/contact.tsx","/contact"],["./pages/estimate.tsx","/estimate"],["./pages/services.tsx","/services"],["./pages/software.tsx","/software"],["./pages/case-studies.tsx","/case-studies"],["./pages/services.etl-pipelines.tsx","/services/etl-pipelines"],["./pages/services.api-management.tsx","/services/api-management"],["./pages/services.computer-vision.tsx","/services/computer-vision"],["./pages/services.iot-integration.tsx","/services/iot-integration"],["./pages/services.legacy-bridging.tsx","/services/legacy-bridging"],["./pages/services.ci-cd-automation.tsx","/services/ci-cd-automation"],["./pages/services.data-warehousing.tsx","/services/data-warehousing"],["./pages/services.esb-implementation.tsx","/services/esb-implementation"],["./pages/services.native-ios-android.tsx","/services/native-ios-android"],["./pages/services.big-data-processing.tsx","/services/big-data-processing"],["./pages/services.real-time-analytics.tsx","/services/real-time-analytics"],["./pages/services.security-compliance.tsx","/services/security-compliance"],["./pages/services.data-synchronization.tsx","/services/data-synchronization"],["./pages/services.multi-cloud-strategy.tsx","/services/multi-cloud-strategy"],["./pages/services.predictive-analytics.tsx","/services/predictive-analytics"],["./pages/services.react-native-flutter.tsx","/services/react-native-flutter"],["./pages/services.neural-network-design.tsx","/services/neural-network-design"],["./pages/services.full-cycle-development.tsx","/services/full-cycle-development"],["./pages/services.infrastructure-as-code.tsx","/services/infrastructure-as-code"],["./pages/services.offline-first-architecture.tsx","/services/offline-first-architecture"],["./pages/services.legacy-system-modernization.tsx","/services/legacy-system-modernization"],["./pages/services.natural-language-processing.tsx","/services/natural-language-processing"],["./pages/services.microservices-implementation.tsx","/services/microservices-implementation"],["./pages/services.high-performance-architecture.tsx","/services/high-performance-architecture"],["./pages/admin.autonomy.tsx","/admin/autonomy"]]);
const fileNameToComponent = new Map([
    ["./pages/$.tsx", Page_0],
["./pages/blog.tsx", Page_1],
["./pages/about.tsx", Page_2],
["./pages/_index.tsx", Page_3],
["./pages/contact.tsx", Page_4],
["./pages/estimate.tsx", Page_5],
["./pages/services.tsx", Page_6],
["./pages/software.tsx", Page_7],
["./pages/case-studies.tsx", Page_8],
["./pages/services.etl-pipelines.tsx", Page_9],
["./pages/services.api-management.tsx", Page_10],
["./pages/services.computer-vision.tsx", Page_11],
["./pages/services.iot-integration.tsx", Page_12],
["./pages/services.legacy-bridging.tsx", Page_13],
["./pages/services.ci-cd-automation.tsx", Page_14],
["./pages/services.data-warehousing.tsx", Page_15],
["./pages/services.esb-implementation.tsx", Page_16],
["./pages/services.native-ios-android.tsx", Page_17],
["./pages/services.big-data-processing.tsx", Page_18],
["./pages/services.real-time-analytics.tsx", Page_19],
["./pages/services.security-compliance.tsx", Page_20],
["./pages/services.data-synchronization.tsx", Page_21],
["./pages/services.multi-cloud-strategy.tsx", Page_22],
["./pages/services.predictive-analytics.tsx", Page_23],
["./pages/services.react-native-flutter.tsx", Page_24],
["./pages/services.neural-network-design.tsx", Page_25],
["./pages/services.full-cycle-development.tsx", Page_26],
["./pages/services.infrastructure-as-code.tsx", Page_27],
["./pages/services.offline-first-architecture.tsx", Page_28],
["./pages/services.legacy-system-modernization.tsx", Page_29],
["./pages/services.natural-language-processing.tsx", Page_30],
["./pages/services.microservices-implementation.tsx", Page_31],
["./pages/services.high-performance-architecture.tsx", Page_32],
["./pages/admin.autonomy.tsx", Page_33],
  ]);

function makePageRoute(filename: string) {
  const Component = fileNameToComponent.get(filename);
  if (!Component) {
    return <NotFound />;
  }
  return <Component />;
}

function toElement({
  trie,
  fileNameToRoute,
  makePageRoute,
}: {
  trie: LayoutTrie;
  fileNameToRoute: Map<string, string>;
  makePageRoute: (filename: string) => React.ReactNode;
}) {
  return [
    ...trie.topLevel.map((filename) => (
      <Route
        key={fileNameToRoute.get(filename)}
        path={fileNameToRoute.get(filename)}
        element={makePageRoute(filename)}
      />
    )),
    ...Array.from(trie.trie.entries()).map(([Component, child], index) => (
      <Route
        key={index}
        element={
          <Component>
            <Outlet />
          </Component>
        }
      >
        {toElement({ trie: child, fileNameToRoute, makePageRoute })}
      </Route>
    )),
  ];
}

type LayoutTrieNode = Map<
  React.ComponentType<{ children: React.ReactNode }>,
  LayoutTrie
>;
type LayoutTrie = { topLevel: string[]; trie: LayoutTrieNode };
function buildLayoutTrie(layouts: {
  [fileName: string]: React.ComponentType<{ children: React.ReactNode }>[];
}): LayoutTrie {
  const result: LayoutTrie = { topLevel: [], trie: new Map() };
  Object.entries(layouts).forEach(([fileName, components]) => {
    let cur: LayoutTrie = result;
    for (const component of components) {
      if (!cur.trie.has(component)) {
        cur.trie.set(component, {
          topLevel: [],
          trie: new Map(),
        });
      }
      cur = cur.trie.get(component)!;
    }
    cur.topLevel.push(fileName);
  });
  return result;
}

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Go back to the <a href="/" style={{ color: 'blue' }}>home page</a>.</p>
    </div>
  );
}

function RouteLoading() {
  return <div aria-label="Loading route" />;
}

import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"

  useEffect(() => {
    // Back/forward: keep browser-like behavior
    if (navType === "POP") return;

    // Hash links: let the browser scroll to the anchor
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash, navType]);

  return null;
}

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <ScrollManager />
      <GlobalContextProviders>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            {toElement({ trie: buildLayoutTrie({
"./pages/$.tsx": PageLayout_0,
"./pages/blog.tsx": PageLayout_1,
"./pages/about.tsx": PageLayout_2,
"./pages/_index.tsx": PageLayout_3,
"./pages/contact.tsx": PageLayout_4,
"./pages/estimate.tsx": PageLayout_5,
"./pages/services.tsx": PageLayout_6,
"./pages/software.tsx": PageLayout_7,
"./pages/case-studies.tsx": PageLayout_8,
"./pages/services.etl-pipelines.tsx": PageLayout_9,
"./pages/services.api-management.tsx": PageLayout_10,
"./pages/services.computer-vision.tsx": PageLayout_11,
"./pages/services.iot-integration.tsx": PageLayout_12,
"./pages/services.legacy-bridging.tsx": PageLayout_13,
"./pages/services.ci-cd-automation.tsx": PageLayout_14,
"./pages/services.data-warehousing.tsx": PageLayout_15,
"./pages/services.esb-implementation.tsx": PageLayout_16,
"./pages/services.native-ios-android.tsx": PageLayout_17,
"./pages/services.big-data-processing.tsx": PageLayout_18,
"./pages/services.real-time-analytics.tsx": PageLayout_19,
"./pages/services.security-compliance.tsx": PageLayout_20,
"./pages/services.data-synchronization.tsx": PageLayout_21,
"./pages/services.multi-cloud-strategy.tsx": PageLayout_22,
"./pages/services.predictive-analytics.tsx": PageLayout_23,
"./pages/services.react-native-flutter.tsx": PageLayout_24,
"./pages/services.neural-network-design.tsx": PageLayout_25,
"./pages/services.full-cycle-development.tsx": PageLayout_26,
"./pages/services.infrastructure-as-code.tsx": PageLayout_27,
"./pages/services.offline-first-architecture.tsx": PageLayout_28,
"./pages/services.legacy-system-modernization.tsx": PageLayout_29,
"./pages/services.natural-language-processing.tsx": PageLayout_30,
"./pages/services.microservices-implementation.tsx": PageLayout_31,
"./pages/services.high-performance-architecture.tsx": PageLayout_32,
"./pages/admin.autonomy.tsx": PageLayout_33,
}), fileNameToRoute, makePageRoute })} 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
