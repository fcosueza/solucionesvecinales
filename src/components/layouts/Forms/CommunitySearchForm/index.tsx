"use client";

import Table, { TableRow } from "@/components/ui/Table";
import { useMemo, useState } from "react";
import style from "./style.module.css";

interface CommunityRow {
  id: number;
  nombre: string;
  calle: string;
  numero: number;
  ciudad: string;
  provincia: string;
  pais: string;
}

interface Props {
  communities: CommunityRow[];
}

const headers = ["Nombre", "Calle", "Numero", "Ciudad", "Provincia", "Pais"];

const CommunitySearchForm = ({ communities }: Props): React.ReactNode => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCommunities = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return communities;
    }

    return communities.filter(community => {
      const searchableFields = [
        community.nombre,
        community.calle,
        String(community.numero),
        community.ciudad,
        community.provincia,
        community.pais
      ];

      return searchableFields.some(field => field.toLowerCase().includes(normalizedSearch));
    });
  }, [communities, searchTerm]);

  const rows: TableRow[] = filteredCommunities.map(community => ({
    key: community.id,
    cells: [
      community.nombre,
      community.calle,
      community.numero,
      community.ciudad,
      community.provincia,
      community.pais
    ]
  }));

  return (
    <section className={style.container}>
      <label htmlFor="community-search" className={style.searchLabel}>
        Search community
      </label>
      <input
        id="community-search"
        aria-label="search-community-input"
        name="community-search"
        type="search"
        placeholder="Type name, street, city, province or country..."
        value={searchTerm}
        className={style.searchInput}
        onChange={event => setSearchTerm(event.target.value)}
      />

      <Table
        headers={headers}
        rows={rows}
        emptyMessage="No communities match your search."
      />
    </section>
  );
};

export default CommunitySearchForm;
