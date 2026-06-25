// Define the shape of your global store
interface CctStore {
    iconSpriteAssetUrl?: string; 
    conditionalVisibility: Record<string, unknown>;
    url: Record<string, unknown>;
    expandedIds?: Record<string | number, Array<string | number>>;
}

const cctStore: CctStore = {
    conditionalVisibility: {},
    url: {},
};
