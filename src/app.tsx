import { MetaProvider, Title } from "@solidjs/meta";
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
