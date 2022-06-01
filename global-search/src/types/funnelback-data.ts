export interface ResultPacket {
    contextualNavigation: {
        searchTerm : string,
        currStart: string,
        currEnd : string,
        totalMatching : string
    };
    resultsSummary: {
        currStart : number
        currEnd: number
        totalMatching : number
    };
    results: Array<any>;
}

export interface ParamMap {
    query : string
    profile: string
    label : string
    filter : string
    numRanks : number
    startRank : number
    collection : string
    scope : string
    activePage : number
}
