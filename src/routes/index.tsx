import {
  createResource,
  createMemo,
  createSignal,
  For,
  Show,
  onCleanup,
  onMount,
} from "solid-js";
import { FaSolidMagnifyingGlass } from "solid-icons/fa";

async function fetchBills() {
  const res = await fetch("http://127.0.0.1:3000/bills-and-propositions");
  if (!res.ok) throw new Error("Failed to fetch bills");
  return res.json();
}

type Field = {
  key: string;
  text?: string;
};

export default function Bills_Propositions() {
  const [sortOrder, setSortOrder] = createSignal<"new" | "old">("new");
  const [bills] = createResource(fetchBills);

  const sections = [
    { title: "Open for Voting", status: "in_progress" },
    { title: "Passed", status: "done" },
    { title: "In Draft", status: "not_started" },
    { title: "Rejected", status: "Opt24XEVXH0" },
    { title: "Nulled", status: "OptOAQ966M6" },
  ];

  const [searchInput, setSearchInput] = createSignal("");
  const [debouncedSearch, setDebouncedSearch] = createSignal("");

  let debounceTimer: number | undefined;

  const onSearchInput = (value: string) => {
    setSearchInput(value);
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      setDebouncedSearch(value.toLowerCase().trim());
    }, 300);
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    setSortOrder(params.get("sort") === "old" ? "old" : "new")
  })

  onCleanup(() => clearTimeout(debounceTimer));

  const groupedBills = createMemo(() => {
    const items = bills()?.data?.items ?? [];
    const groups: Record<string, any[]> = {};

    for (const item of items) {
      const status = item.fields[1].value;
      if (!groups[status]) groups[status] = [];
      groups[status].push(item);
    }

    return groups;
  });

  function replaceMentions(text: string, users: Record<string, string>) {
    return text.replace(/<@(\w+)>/g, (_, id) => users[id] ?? `<@${id}>`);
  }

  return (
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-l">Bills/Propositions</h1>
      <p class="govuk-body" style="width: 100%; white-space: nowrap;">
        {sortOrder() === "old"
          ? "These bills/propositions are sorted by oldest to newest. "
          : "These bills/propositions are sorted by newest to oldest. "}
        <a
          style={{ cursor: "pointer" }}
          class="govuk-link"
          onClick={() => {
            if (sortOrder() === "old") {
              window.location.assign("/");
            } else {
              window.location.assign("/?sort=old");
            }
          }}
        >
          {sortOrder() === "old"
            ? "Sort them by newest to oldest."
            : "Sort them by oldest to newest."}
        </a>
      </p>
      <div class="govuk-form-group">
        <div class="govuk-input__wrapper">
          <input
            class="govuk-input"
            type="text"
            spellcheck="false"
            value={searchInput()}
            onInput={(e) =>
              onSearchInput(e.currentTarget.value)
            }
          />
          <div
            class="govuk-input__suffix"
            style={{
              cursor: "pointer",
              "background-color": "#080"
            }}
            onClick={() => {
              clearTimeout(debounceTimer);
              setDebouncedSearch(searchInput().toLowerCase().trim());
            }}
          >
            <FaSolidMagnifyingGlass color="white" />
          </div>
        </div>
        <p class="govuk-body-s" style={{ "padding-top": "4px" }}>
          {bills()?.data?.items.length ?? 0} bills/propositions
        </p>
        <For each={sections}>
          {(section) => {
            const filtered = createMemo(() => {
              const items =
                groupedBills()[section.status] ?? [];
              const query = debouncedSearch();

              if (!query) return items;

              return items.filter((item) => {
                const title = item.fields[0] as Field;
                return (
                  title.text
                    ?.toLowerCase()
                    .includes(query) ?? false
                );
              });
            });

            return (
              <Show when={filtered().length > 0}>
                <h1 class="govuk-heading-m">
                  {section.title}
                </h1>
                <ul class="govuk-list">
                  <For each={filtered().slice().sort((a, b) => {
                    const dateA = new Date(a.date_created).getTime();
                    const dateB = new Date(b.date_created).getTime();
                    return sortOrder() === "old" ? dateA - dateB : dateB - dateA;
                  })}>
                    {(data) => {
                      const title =
                        data.fields[0] as Field;

                      const usersMapping = bills()?.users ?? {};
                      const text = replaceMentions(title.text ?? "", usersMapping);
                      return (
                        <>
                          <li>
                            <a
                              class="govuk-link govuk-body-m"
                              href={`/bills/${data.id}`}
                            >
                              {text ?? ""}
                            </a>
                          </li>
                          <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                        </>
                      );
                    }}
                  </For>
                </ul>
              </Show>
            );
          }}
        </For>
      </div>
    </div>
  );
}
