function applyBiome(e) {
    // these thresholds will need tuning to match your generator
    if (e < 0.001) return ['#6071e5', 'Deep water'];
    else if (e < 0.2) return ['#60cfe6', 'Water'];
    else if (e < 0.5) return ['#60e682', 'Plains'];

    else return ['#fffafa', 'Dessert'];
};