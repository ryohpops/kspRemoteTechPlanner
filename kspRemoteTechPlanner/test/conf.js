exports.config = {
    directConnect: true,
    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: 4
    },

    specs: ["spec_*.js"]
};
