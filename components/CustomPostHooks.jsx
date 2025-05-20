import { useState, useEffect, useMemo } from 'react';

/**
 * useCustomPostsMap
 * Builds a map of selected IDs → index.
 */
export function useCustomPostsMap(customPosts) {
  return useMemo(() => {
    const selected = customPosts?.selected || [];
    return selected.reduce((map, id, idx) => {
      map[id] = idx;
      return map;
    }, {});
  }, [customPosts]);
}

/**
 * useSelectedPostsRecords
 * Fetches only the selected posts (in order) from the REST API.
 */
export function useSelectedPostsRecords(customPosts) {
  const { selected = [], selectedCPT = '' } = customPosts || {};
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!selectedCPT || !selected.length) {
      setRecords([]);
      return;
    }
    let isMounted = true;
    const fetchSelected = async () => {
      try {
        const root = window.wpApiSettings?.root || '/wp-json/';
        const params = new URLSearchParams({ include: selected.join(','), per_page: selected.length, _embed: '' });
        const res = await fetch(`${root}wp/v2/${selectedCPT}?${params}`);
        const posts = await res.json();
        const ordered = selected
          .map((id) => posts.find((p) => p.id === id))
          .filter(Boolean);
        if (isMounted) {
          setRecords(ordered);
        }
      } catch {
        if (isMounted) {
          setRecords([]);
        }
      }
    };
    fetchSelected();
    return () => {
      isMounted = false;
    };
  }, [selectedCPT, JSON.stringify(selected)]);

  return records;
}

/**
 * useAutoPostsRecords
 * Fetches all posts for the CPT, then applies filtering and ordering if needed.
 */
export function useAutoPostsRecords(customPosts) {
  const {
    selectedCPT = '',
    autoOption = 'all',
    filterField = '',
    operator = '',
    filterValue = '',
    orderField = '',
    orderDirection = 'asc',
  } = customPosts || {};
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!selectedCPT) {
      setRecords([]);
      return;
    }
    let isMounted = true;
    const fetchAll = async () => {
      try {
        const root = window.wpApiSettings?.root || '/wp-json/';
        const limit = 100;
        const res = await fetch(`${root}wp/v2/${selectedCPT}?per_page=${limit}&_embed=1`);
        let posts = await res.json();
        if (!Array.isArray(posts)) {
          posts = [];
        }

        // Apply filtered mode (only if both field and operator selected)
        if (autoOption === 'filtered' && filterField && operator) {
          posts = posts.filter((post) => {
            const value = filterField === 'title' ? post.title.rendered : post[filterField];
            switch (operator) {
              case 'contains':
                return String(value).toLowerCase().includes(filterValue.toLowerCase());
              case 'equals':
                return String(value) === filterValue;
              case 'greater':
                return new Date(value) > new Date(filterValue);
              case 'less':
                return new Date(value) < new Date(filterValue);
              default:
                return true;
            }
          });
        }

        // Apply ordering if orderField is provided
        if (orderField) {
          posts.sort((a, b) => {
            let aVal = orderField === 'title' ? a.title.rendered : a[orderField];
            let bVal = orderField === 'title' ? b.title.rendered : b[orderField];
            if (orderField === 'date') {
              aVal = new Date(a.date);
              bVal = new Date(b.date);
            }
            if (aVal < bVal) return orderDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return orderDirection === 'asc' ? 1 : -1;
            return 0;
          });
        }

        if (isMounted) {
          setRecords(posts);
        }
      } catch {
        if (isMounted) {
          setRecords([]);
        }
      }
    };
    fetchAll();
    return () => {
      isMounted = false;
    };
  }, [
    selectedCPT,
    autoOption,
    filterField,
    operator,
    filterValue,
    orderField,
    orderDirection,
  ]);

  return records;
}

/**
 * useCustomPostsRecords
 * Chooses between selected or auto hooks based on readType (defaulting to 'auto').
 */
export function useCustomPostsRecords(customPosts) {
  const { readType = 'auto' } = customPosts || {};
  if (readType === 'select') {
    return useSelectedPostsRecords(customPosts);
  }
  return  useAutoPostsRecords(customPosts);
}
