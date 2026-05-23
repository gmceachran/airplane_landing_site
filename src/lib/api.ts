const API_BASE =
  (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export interface Component {
  id: number;
  part_number: string;
  serial_number: string | null;
  description: string | null;
  manufacturer: string | null;
  component_type: string | null;
}

export interface ComponentDetail extends Component {
  warehouse_status: {
    shelf: string | null;
    condition: string | null;
    available_for_sale: boolean;
  } | null;
  certifications: {
    id: number;
    form_type: string | null;
    form_tracking_number: string | null;
    approving_authority: string | null;
    condition_at_release: string | null;
    release_date: string | null;
  }[];
  installation_history: {
    engine_sn: string | null;
    aircraft_tail: string | null;
    position: string | null;
    installed_date: string | null;
  }[];
  latest_life_data: {
    snapshot_date: string;
    tpc: number | null;
    slr_cyc: number | null;
    slr_hrs: number | null;
    source: string | null;
  } | null;
}

export interface SearchResults {
  query: string;
  results: {
    components: Component[];
    engines: { id: number; serial_number: string; model: string | null }[];
    aircraft: { id: number; tail_number: string; operator: string | null }[];
    documents: {
      id: number;
      filename: string | null;
      document_type: string | null;
      ingestion_status: string;
    }[];
  };
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  searchComponents(q: string): Promise<{ components: Component[] }> {
    const params = new URLSearchParams({ q });
    return apiFetch(`/api/v1/components?${params}`);
  },

  getComponent(id: number | string): Promise<{ component: ComponentDetail }> {
    return apiFetch(`/api/v1/components/${id}`);
  },

  search(q: string): Promise<SearchResults> {
    const params = new URLSearchParams({ q });
    return apiFetch(`/api/v1/search?${params}`);
  },
};
