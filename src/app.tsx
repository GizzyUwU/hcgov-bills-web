import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css"
import "../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css";
import { FaSolidScaleBalanced } from 'solid-icons/fa'
import Fallback from "./routes/fallback";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>Hack Club Parliament - Bills and Propositions</Title>
          <Meta name="description" content="View of bills and propositions from Hack Club Parliament, listing the number that has been passed, and those that have been rejected or nullled or ones that are." />
          <Meta itemprop="name" content="Hack Club Parliament - Bills and Propositions" />
          <Meta itemprop="description" content="View of bills and propositions from Hack Club Parliament, listing the number that has been passed, and those that have been rejected or nullled or ones that are." />
          <Meta itemprop="image" content="https://gov.avcap.xyz/meta.svg" />
          <Meta property="og:url" content="https://gov.avcap.xyz/" />
          <Meta property="og:type" content="website" />
          <Meta property="og:title" content="Hack Club Parliament - Bills and Propositions" />
          <Meta property="og:description" content="View of bills and propositions from Hack Club Parliament, listing the number that has been passed, and those that have been rejected or nullled or ones that are." />
          <Meta property="og:image" content="https://gov.avcap.xyz/meta.svg" />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta name="twitter:title" content="Hack Club Parliament - Bills and Propositions" />
          <Meta name="twitter:description" content="View of bills and propositions from Hack Club Parliament, listing the number that has been passed, and those that have been rejected or nullled or ones that are." />
          <Meta name="twitter:image" content="https://gov.avcap.xyz/meta.svg" />
          <header class="govuk-header" data-module="govuk-header">
            <div class="govuk-header__container govuk-width-container">
              <div class="govuk-header__logo">
                <a href="/" class="govuk-header__link govuk-header__link--homepage no-highlight">
                  <img
                    src="https://parliament.hcgov.uk/querr.svg"
                    height="46px"
                  />
                </a>
              </div>
            </div>
          </header>
          <div class="govuk-width-container">
            <main class="govuk-main-wrapper">
              <div class="govuk-grid-row">
                <Suspense fallback={<Fallback />}>{props.children}</Suspense>
              </div>
            </main>
          </div>
          <footer class="govuk-footer" >
            <div class="govuk-width-container">
              <FaSolidScaleBalanced size="32" class="govuk-footer__crown" />
              <div class="govuk-footer__meta">
                <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
                  <span class="govuk-footer__licence-description">
                    All content is available under the {" "}
                    <a
                      class="govuk-footer__link"
                      href="https://github.com/GizzyUwU/hcgov-bills-web/blob/main/LICENSE"
                      rel="license">MIT License</a>, except where otherwise stated
                  </span>
                </div>
                <div class="govuk-footer__meta-item">
                  © Copyright of Hack Club Government
                </div>
              </div>
            </div>
          </footer>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
