import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStorage, DEFAULT_STATE } from '../src/hooks/useStorage.js';
import { STORAGE_KEY } from '../src/constants.js';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('useStorage', () => {
  it('returns default state when storage is empty', () => {
    const { result } = renderHook(() => useStorage());
    expect(result.current.state).toMatchObject(DEFAULT_STATE);
  });

  it('persists state across re-mounts', () => {
    const { result, unmount } = renderHook(() => useStorage());
    act(() => result.current.update({ allTimeTotal: 42 }));
    unmount();

    const { result: result2 } = renderHook(() => useStorage());
    expect(result2.current.state.allTimeTotal).toBe(42);
  });

  it('resets to default state on reset()', () => {
    const { result } = renderHook(() => useStorage());
    act(() => result.current.update({ allTimeTotal: 99 }));
    act(() => result.current.reset());
    expect(result.current.state.allTimeTotal).toBe(0);
  });

  it('resets and logs warning on version mismatch', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 999, allTimeTotal: 50 }));

    const { result } = renderHook(() => useStorage());
    expect(result.current.state.allTimeTotal).toBe(0);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('version mismatch'));
  });
});
