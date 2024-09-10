import { useSearchParams, useRouter } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = (key: string) => {
    return searchParams.get(key);
  };

  const setQuery = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search); // Prende tutti i parametri già esistenti
    if (value) {
      params.set(key, value); // Imposta la query dinamica con la chiave fornita
    } else {
      params.delete(key); // Rimuove la query se il valore è vuoto
    }

    // Aggiorna l'URL senza ricaricare la pagina e senza rimuovere altri parametri
    router.push(`${window.location.pathname}?${params.toString()}`, undefined);
  };

  const clear = () => {
    // Clear all query parameters by creating an empty URLSearchParams object
    const params = new URLSearchParams();
    router.push(`${window.location.pathname}?${params.toString()}`, undefined);
  };

  return { query, setQuery, clear };
};
