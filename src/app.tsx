import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css"
import "../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css";
import Fa7SolidBalanceScale from '~icons/fa7-solid/balance-scale';
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
                <Suspense fallback={<Fallback />}>{props.children}</Suspense>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
