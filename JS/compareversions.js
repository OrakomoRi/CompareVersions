/**
 * Compare two version strings according to the Semantic Versioning specification.
 * @param {string} v1 - The first version string.
 * @param {string} v2 - The second version string.
 * @returns {number} Returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal.
 * @throws {TypeError} Throws if either version string is not valid semver.
*/
function compareVersions(v1, v2) {
	const parseVersion = (inputVersion) => {
		// Original regex from (c) semver.org
		const match = inputVersion.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/);
		if (!match) return null;
		return {
			common: [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)],
			prerelease: match[4] ? match[4].split('.') : []
		};
	};

	const parsedV1 = parseVersion(v1);
	const parsedV2 = parseVersion(v2);

	if (!parsedV1 || !parsedV2) {
		throw new TypeError(`Invalid version string: "${!parsedV1 ? v1 : v2}"`);
	}

	const { common: common1, prerelease: prerelease1 } = parsedV1;
	const { common: common2, prerelease: prerelease2 } = parsedV2;

	for (let i = 0; i < 3; i++) {
		if (common1[i] > common2[i]) return 1;
		if (common1[i] < common2[i]) return -1;
	}

	// A release version is higher than its prerelease (semver §9)
	if (prerelease1.length === 0 && prerelease2.length > 0) return 1;
	if (prerelease1.length > 0 && prerelease2.length === 0) return -1;
	if (prerelease1.length === 0 && prerelease2.length === 0) return 0;

	for (let i = 0; i < Math.max(prerelease1.length, prerelease2.length); i++) {
		const pid1 = prerelease1[i];
		const pid2 = prerelease2[i];

		// The version with more fields has higher precedence (semver §11.4.4)
		if (pid1 === undefined) return -1;
		if (pid2 === undefined) return 1;

		const isNumeric1 = /^\d+$/.test(pid1);
		const isNumeric2 = /^\d+$/.test(pid2);

		if (isNumeric1 && isNumeric2) {
			const num1 = parseInt(pid1, 10);
			const num2 = parseInt(pid2, 10);
			if (num1 !== num2) return num1 > num2 ? 1 : -1;
		} else if (isNumeric1 !== isNumeric2) {
			// Numeric identifiers have lower precedence than alphanumeric (semver §11.4.1)
			return isNumeric1 ? -1 : 1;
		} else {
			if (pid1 !== pid2) return pid1 < pid2 ? -1 : 1;
		}
	}

	return 0;
}