import type { AutomationAction } from "./types/automation.types";

const API_URL = "http://localhost:3001";

export async function getAutomations(): Promise<
    AutomationAction[]
> {
    const response = await fetch(
        `${API_URL}/automations`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch automations"
        );
    }

    return response.json();
}