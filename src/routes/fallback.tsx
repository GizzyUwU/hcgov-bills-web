export default function Fallback() {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "text-align": "center",
      }}
    >
      <img src="/hc.svg" height="64px" />
      <br />
      <h1 class="govuk-heading-m">Loading...</h1>
    </div>
  );
}
