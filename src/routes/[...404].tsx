import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <div class="govuk-grid-column-two-thirds">
      <main>
        <Title>Not Found</Title>
        <HttpStatusCode code={404} />
        <span class="govuk-caption-l">Error 404</span>
        <h1 class="govuk-heading-l">The page you're looking for doesn't exist</h1>
        <p class="govuk-body">If you typed a web address, check it was correct.</p>
        <p class="govuk-body">You can <a class="govuk-link govuk-body-m" href="/" target="_blank">go back to the homepage</a>.</p>
      </main>
    </div>
  );
}
