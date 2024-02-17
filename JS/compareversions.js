/**
 * Compare two version strings according to the Semantic Versioning specification.
 * @param {string} v1 - The first version string.
 * @param {string} v2 - The second version string.
 * @returns {number} Returns 1 if v1 is greater than v2, -1 if v1 is less than v2, 0 if they are equal, or -2 if parsing fails.
*/
function compareVersions(v1, v2) {
	// Helper function to parse version strings into an object
	const parseVersion = (inputVersion) => {
		// Original regex from (c) semver.org
		const match = inputVersion.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/);
		if (!match) { // If the version format is incorrect
			return;
		}
		return { // If the version was correctly parsed by regex
			common: [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)],
			prerelease: match[4] ? match[4].split('.') : []
		};
	};

	// Parse version strings into objects
	const parsedV1 = parseVersion(v1);
	const parsedV2 = parseVersion(v2);

	// Check if parsing failed
	if (!parsedV1 || !parsedV2) {
		return -2; // Return error
	}

	// Destructure parsed versions for easier access
	const { common: common1, prerelease: prerelease1 } = parsedV1;
	const { common: common2, prerelease: prerelease2 } = parsedV2;

	// Compare numerical parts (major, minor, patch)
	for (let i = 0; i < 3; i++) {
		if (common1[i] > common2[i]) return 1; // v1 > v2
		if (common1[i] < common2[i]) return -1; // v1 < v2
	}

	// Check if one version has prerelease and the other does not
	if (prerelease1.length === 0 && prerelease2.length > 0) return 1; // v1 has no prerelease; v2 has prerelease, so v1 > v2
	if (prerelease1.length > 0 && prerelease2.length === 0) return -1; // v1 has prerelease; v2 has no prerelease, so v2 > v1
	if (prerelease1.length === 0 && prerelease2.length === 0) return 0; // versions are equal

	// Compare prerelease identifiers
	for (let i = 0; i < Math.max(prerelease1.length, prerelease2.length); i++) {
		// Temporary variables for single prerelease identifier; if some of them are undefined, it equals to -1 for correct comprassion
		const pid1 = prerelease1[i] || -1;
		const pid2 = prerelease2[i] || -1;

		// Check if identifiers are numeric
		const isNumeric1 = /^-?\d+$/.test(pid1);
		const isNumeric2 = /^-?\d+$/.test(pid2);

		// If both identifiers are numeric, compare them numerically
		if (isNumeric1 && isNumeric2) {
			const num1 = parseInt(pid1, 10);
			const num2 = parseInt(pid2, 10);

			if (num1 !== num2) return num1 > num2 ? 1 : -1;
		} else if (isNumeric1 !== isNumeric2) { // If one is numeric and the other isn't
			return isNumeric1 ? -1 : 1; // Numeric has lower priority
		} else {
			// Lexical comparison for non-numeric identifiers
            if (pid1 !== pid2) {
				for (let j = 0; j < Math.max(pid1.length, pid2.length); j++) {
					// Temporary variables for single character of identifier; if some of them are undefined, it equals to 'space' for correct comprassion
					const char1 = pid1[i] || ' ';
					const char2 = pid2[i] || ' ';

					// Compare characters by ASCII value
					if (char1.charCodeAt(0) !== char2.charCodeAt(0)) return char1.charCodeAt(0) > char2.charCodeAt(0) ? 1 : -1;
				}
			}
		}
	}

	// If all comparisons are equal, versions are considered equal
	return 0;
}