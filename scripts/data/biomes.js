function applyBiome(e) {
    // these thresholds will need tuning to match your generator
    if (e < 0.001) return ['#6071e5', 'Deep water'];
    else if (e < 0.1) return ['#60cfe6', 'Water'];
    else if (e < 0.55) return ['#60e682', 'Plains'];
    else if (e < 0.75) return ['#34974D', 'forest'];
    else if (e < 0.85) return ['#206F33', 'deep forest'];

    else return ['#fffafa', 'Undefined'];
};