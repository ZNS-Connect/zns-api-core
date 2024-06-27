export default class ZNSEventListener {
    constructor();
    mountBscMainnet: () => Promise<void>;
    mountScrollMainnet: () => Promise<void>;
    mountBlastMainnet: () => Promise<void>;
    mountPolygonMainnet: () => Promise<void>;
    mountAll: () => Promise<void>;
}
