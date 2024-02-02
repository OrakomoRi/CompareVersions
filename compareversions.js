function compareVersions(v1, v2) {

	// Function to split version string into an array
	function parseVersion(versionString) {
		return versionString.split(/(?<=[a-zA-Z])(?=\d)|(?<=\d)(?=[a-zA-Z])|[_\-.]+/);
	}

	// Predefined stage values and their corresponding numeric values
	const stage = {
		'pre': -6, 'alpha': -5, 'beta': -4, 'gamma': -3, 'delta': -3, 'release': -2, 'final': -1
	};
	
	// If the parsed version consists only of numbers and values from the 'stage' array
	function isValidVersion(parsedVersion) {
		return parsedVersion.every(element => !isNaN(element) || stage.hasOwnProperty(element));
	}

	// Function to check if the version contains only one (or zero) values from 'stage' array
	function isCorrectStageUsing(parsedVersion) {
        return parsedVersion.filter(element => stage.hasOwnProperty(element)).length <= 1;
    }

	// Function to compare versions
	function compareVersions(v1, v2) {
		// Temporary versions values (to find which is greater)
		var version1 = 0;
		var version2 = 0;

		// Loop to take all values from both arrays
		for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
			
			/**
			 * is checking whether the current position i in the version arrays v1 and v2
			 * contains a non-empty string (v1[i] and v2[i] are truthy) and whether that
			 * string is a key in the 'stage' array.
			*/
			if ((v1[i] && stage.hasOwnProperty(v1[i])) || (v2[i] && stage.hasOwnProperty(v2[i]))) {
				// Temporaty substring values
				const value1 = v1[i];
				const value2 = v2[i];
				
				/**
				 * If value is undefined, the num is equal to 0, otherwise it is checked
				 * if it is a key in the 'stage' array. If so, num is equal to the value
				 * of the key, else it is parsed as int value.
				*/
				let num1 = (value1 === undefined) ? 0 : (stage.hasOwnProperty(value1) ? stage[value1] : parseInt(value1));
				let num2 = (value2 === undefined) ? 0 : (stage.hasOwnProperty(value2) ? stage[value2] : parseInt(value2));				

				// Checks which subsring is greater as value
				if (num1 > num2) {
					++version1;
				} else if (num1 < num2) {
					++version2;
				}
			} else { // If both of substrings are not key values from 'stage' array
				// They are parsed as integers, if the substring is undefined, default value is 0
				const num1 = parseInt(v1[i]) || 0;
				const num2 = parseInt(v2[i]) || 0;

				// Checks which subsring is greater as value
				if (num1 > num2) {
					++version1;
				} else if (num1 < num2) {
					++version2;
				}
			}

			// Each substring has it's own priority
			version1 *= 10;
			version2 *= 10;
		}

		if (version1 > version2) {
			return 1;
		} else if (version1 < version2) {
			return -1;
		} else {
			return 0;
		}
	}

	// Parse the input version strings
	const arr1 = parseVersion(v1);
	const arr2 = parseVersion(v2);

	// If the version has more than 7 substrings it is incorrect, e.g. 1.2.3.4.5.6.7.8 or 1.2.3-pre1.2.3.0
	if (arr1.length > 7 || arr2.length > 7) {
		return -2; // Error code, version has wrong format
	}

	if (!isValidVersion(arr1) || !isValidVersion(arr2)) {
		return -2; // Error code, version has wrong format
	}

	// Check if both versions have correct usage of stage values
	if (!isCorrectStageUsing(arr1) || !isCorrectStageUsing(arr2)) {
		return -2; // Error code, version has wrong format
	}

	// Check if some elements are equal to elements from 'stage' array
	// If the version doesn't consist any value from 'stage' array, it can have a maximum of 3 substrings
	if (!(arr1.concat(arr2)).some(element => stage.hasOwnProperty(element)) && (arr1.length > 3 || arr2.length > 3)) {
		return -2; // Error code, version has wrong format
	}

	return compareVersions(arr1, arr2);
}