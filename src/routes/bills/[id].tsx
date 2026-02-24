import {
    createResource,
    createMemo,
    Show,
    For,
    JSX
} from "solid-js";
import { useParams } from "@solidjs/router";

async function fetchBills() {
    if (!import.meta.env?.DEV) {
        const res = await fetch("http://127.0.0.1:3000/bills-and-propositions");
        if (!res.ok) throw new Error("Failed to fetch bills");
        return res.json();
    }
    const res = await fetch("https://govlib.avcap.xyz/bills-and-propositions");
    if (!res.ok) throw new Error("Failed to fetch bills");
    return res.json();
}

interface RichTextElement {
    type: "text" | "rich_text_section";
    text?: string;
    style?: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
    };
    elements?: RichTextElement[];
}

interface Field {
    key: string;
    text?: string;
    value?: string;
    user?: string[];
    rich_text?: RichTextElement[];
}

interface Item {
    id: string;
    title?: string;
    fields?: Field[];
    [key: string]: any;
}

export default function Bills_Propositions() {
    const [bills] = createResource(fetchBills);
    const params = useParams();

    const bill = createMemo<Item | undefined>(() => {
        const items = bills()?.data?.items ?? [];
        return items.find((item: Item) => item.id === params.id);
    });

    const status = [
        { color: "", text: "is in voting.", status: "in_progress" },
        { color: "#080", text: "was passed.", status: "done" },
        { color: "", text: "is still being drafted.", status: "not_started" },
        { color: "#c52929", text: "was rejected.", status: "Opt24XEVXH0" }, // Rejected,
        { color: "#000", text: "was nulled.", status: "OptOAQ966M6" } // Nulled,
    ];

    const renderRichText = (elements: RichTextElement[]): JSX.Element[] =>
        elements.flatMap((el) => {
            if (el.type === "text" && el.text) {
                let style = "";
                if (el.style?.bold) style += "font-weight: bold;";
                if (el.style?.italic) style += "font-style: italic;";
                if (el.style?.underline) style += "text-decoration: underline; ";

                return el.text.split("\n").flatMap((line, i, arr) => [
                    <span style={style}>{line}</span>,
                    i < arr.length - 1 ? <br /> : null,
                ]);
            }

            if (el.elements && el.elements.length > 0) {
                return renderRichText(el.elements);
            }

            return [];
        });

    const titleField = createMemo(() => bill()?.fields?.find(f => f.key === "name"));
    const billStatus = createMemo(() => {
        const statusField = bill()?.fields?.find(f => f.key === "status");
        const value = statusField?.value;
        return status.find(s => s.status === value) ?? { color: "", text: "" };
    });

    const titleRichText = createMemo(() => {
        const titleFieldVal = titleField()?.rich_text ?? [];
        return renderRichText(titleFieldVal)
    })

    const descriptionRichText = createMemo(() => {
        const desc = bill()?.fields?.find(f => f.key === "description");
        const data = renderRichText(desc?.rich_text ?? []);
        return data;
    });

    return (
        <Show when={bill() && billStatus()}>
            <div class="govuk-grid-column-two-thirds">
                <a href="#" class="govuk-back-link" onClick={() => history.back()}>Back</a>
                <h1 class="govuk-heading-l" style={{
                    "margin-bottom": "0.25rem",
                }}>
                    {titleRichText()}
                </h1>
                <span class="govuk-caption-m">
                    Created at {new Date(bill()!.date_created * 1000).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })}
                </span>
                <div class="govuk-form-group">
                    <div
                        class="govuk-inset-text"
                        style={{
                            "border-left": billStatus().color ? `10px solid ${billStatus().color}` : undefined,
                            "background-color": "#bfbfbf",
                            padding: "10px",
                        }}
                    >
                        This bill {billStatus().text}
                    </div>
                    <div class="govuk-body">{descriptionRichText()}</div>
                    <span class="govuk-caption-m">Created by</span>
                    <h1 class="govuk-heading-m">{bills()?.users[bill()!.created_by] ?? bill()!.created_by}</h1>
                    <Show when={(bill()?.fields?.find(f => f.key === "assignee")?.user?.length ?? 0) > 0}>
                        <h2 class="govuk-heading-m">Sponsors of this bill</h2>
                        <For each={bill()?.fields?.filter(f => f.key === "assignee") ?? []}>
                            {(data, i) => (
                                <div class="govuk-body">
                                    <For each={data.user ?? []}>
                                        {(userId) => {
                                            const userName = bills()?.users[userId] ?? userId;
                                            const addLineBreak = (data.user ?? []).length > 1 && i() < (data.user ?? []).length - 1;
                                            return (
                                                <>
                                                    <span>{userName ?? userId}</span>
                                                    {addLineBreak && <br />}
                                                </>
                                            );
                                        }}
                                    </For>
                                </div>
                            )}
                        </For>
                    </Show>
                    <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                </div>
            </div>
        </Show >
    );
}
