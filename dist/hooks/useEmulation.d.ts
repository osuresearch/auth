/**
 * Emulation query and control
 */
declare function useEmulation(): {
    active: boolean;
    allowed: boolean;
    emulate: (id?: string | undefined) => Promise<void>;
};
export default useEmulation;
//# sourceMappingURL=useEmulation.d.ts.map